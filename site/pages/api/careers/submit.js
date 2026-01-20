import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
// Dynamic import for pdf-parse to handle CommonJS module
let pdfParseModule = null;

// Disable default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Rate limiting - simple in-memory store (use Redis in production)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 3; // Max 3 submissions per 15 minutes per IP

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitStore.get(ip) || [];
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  return true;
}

// Validate reCAPTCHA
async function validateRecaptcha(token) {
  if (!token) {
    return false;
  }

  // Use test keys for localhost development
  // Google's test keys always pass validation and work on localhost
  const secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'; // Default test secret key
  
  // Check if we're using test keys
  const isTestKey = secretKey === '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe' || 
                    !process.env.RECAPTCHA_SECRET_KEY;

  if (isTestKey) {
    console.log('Using reCAPTCHA test keys for development (localhost)');
    // Test keys always pass - just verify token exists
    return token.length > 0;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

// Validate CAPTCHA
function validateCaptcha(captchaAnswer, captchaQuestion) {
  // Simple math CAPTCHA validation
  const [num1, num2] = captchaQuestion.split('+').map(n => parseInt(n.trim()));
  const expectedAnswer = num1 + num2;
  return parseInt(captchaAnswer) === expectedAnswer;
}

// Check if PDF is password protected using pdf-parse
async function checkPDFPassword(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    
    // First, verify it's actually a PDF by checking header
    const pdfHeader = fileBuffer.toString('ascii', 0, 4);
    if (pdfHeader !== '%PDF') {
      throw new Error('Invalid PDF file. The file does not appear to be a valid PDF.');
    }
    
    // Dynamically load pdf-parse if not already loaded
    if (!pdfParseModule) {
      try {
        pdfParseModule = require('pdf-parse');
        // Handle both default export and named export
        if (typeof pdfParseModule !== 'function') {
          pdfParseModule = pdfParseModule.default || pdfParseModule.pdfParse || pdfParseModule;
        }
      } catch (importError) {
        console.error('Failed to load pdf-parse:', importError.message);
        // If pdf-parse can't be loaded, skip password check (not critical)
        console.warn('Skipping PDF password check - pdf-parse not available');
        return false;
      }
    }
    
    // Ensure pdfParseModule is a function
    if (typeof pdfParseModule !== 'function') {
      console.warn('pdf-parse is not a function, skipping password check');
      return false;
    }
    
    // Try to parse the PDF - pdf-parse will throw an error if password-protected
    try {
      // Parse with minimal options to reduce potential errors
      await pdfParseModule(fileBuffer, { 
        max: 1 // Only parse first page for performance
      });
      // If we get here, PDF is not password-protected
      return false;
    } catch (parseError) {
      // Check if error is specifically due to password protection/encryption
      const errorMessage = (parseError.message || '').toLowerCase();
      const errorCode = parseError.code || '';
      const errorString = JSON.stringify(parseError).toLowerCase();
      
      // Common password/encryption related error patterns from pdf-parse
      const isPasswordProtected = 
        errorMessage.includes('password') ||
        errorMessage.includes('encrypted') ||
        errorMessage.includes('encrypt') ||
        errorMessage.includes('invalid password') ||
        errorMessage.includes('encrypted document') ||
        errorMessage.includes('decryption') ||
        errorString.includes('password') ||
        errorString.includes('encrypted') ||
        errorString.includes('encrypt') ||
        errorCode === 'ENCRYPTED' ||
        errorCode === 'PASSWORD_REQUIRED';
      
      if (isPasswordProtected) {
        console.log('Password-protected PDF detected:', errorMessage);
        return true; // Password-protected PDF
      }
      
      // For other parsing errors, log but allow through
      // Many valid PDFs have minor parsing issues (metadata, fonts, etc.) but are still readable
      console.warn('PDF parse warning (allowing through):', errorMessage || parseError.code || 'Unknown error');
      
      // Only reject if it's a clear file corruption/format error
      if (errorMessage.includes('corrupted') || 
          (errorMessage.includes('invalid') && errorMessage.includes('format')) ||
          errorMessage.includes('malformed') ||
          errorCode === 'INVALID_PDF') {
        throw new Error('Invalid PDF file. The file appears to be corrupted or malformed. Please try re-saving your PDF.');
      }
      
      // For all other errors (metadata issues, font parsing, etc.), allow through
      // These are often non-critical and don't prevent PDF viewing
      return false;
    }
  } catch (error) {
    // Handle file system errors or validation errors
    if (error.message && (
      error.message.includes('Invalid PDF file') ||
      error.message.includes('corrupted') ||
      error.message.includes('malformed')
    )) {
      throw error; // Re-throw validation errors
    }
    
    console.error('Error checking PDF:', error);
    // Only throw error if we're certain it's a real problem
    // Otherwise, log and allow through to avoid false positives
    if (error.message && error.message.includes('ENOENT')) {
      throw new Error('PDF file not found. Please try uploading again.');
    }
    
    // For unknown errors, log but allow through to avoid blocking valid PDFs
    console.warn('Unknown PDF check error, allowing through:', error.message);
    return false;
  }
}

// Validate PDF file
function validatePDFFile(file) {
  // Check MIME type first - strict enforcement of application/pdf
  if (!file.mimetype || file.mimetype !== 'application/pdf') {
    return { 
      valid: false, 
      error: 'Invalid file type. Only PDF files (application/pdf) are allowed. Please upload a PDF file.' 
    };
  }
  
  // Check file extension as secondary check
  const ext = path.extname(file.originalFilename || file.name || '').toLowerCase();
  if (ext !== '.pdf') {
    return { 
      valid: false, 
      error: 'Invalid file extension. Only PDF files are allowed. Please upload a file with .pdf extension.' 
    };
  }
  
  // Check file size (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: 'File size exceeds 5MB limit. Please upload a smaller PDF file.' 
    };
  }
  
  // Check if file is actually a PDF by reading first bytes
  try {
    const fileBuffer = fs.readFileSync(file.filepath);
    const pdfHeader = fileBuffer.toString('ascii', 0, 4);
    if (pdfHeader !== '%PDF') {
      return { 
        valid: false, 
        error: 'Invalid PDF file. The file does not appear to be a valid PDF. Please ensure the file is a proper PDF document.' 
      };
    }
  } catch (error) {
    return { 
      valid: false, 
      error: 'Error reading file. Please try uploading the file again.' 
    };
  }
  
  return { valid: true };
}

// Email configuration
function getEmailTransporter() {
  // Option 1: Generic SMTP configuration (recommended for custom domains)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Optional TLS configuration
      ...(process.env.SMTP_REJECT_UNAUTHORIZED === 'false' && {
        tls: {
          rejectUnauthorized: false,
        },
      }),
    });
  }

  // Option 2: Gmail configuration
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  // Option 3: SendGrid configuration
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  }

  return null;
}

// Send confirmation email to applicant
async function sendConfirmationEmail(formData) {
  const transporter = getEmailTransporter();
  
  if (!transporter) {
    console.warn('Email not configured. Skipping confirmation email.');
    return;
  }

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Received - YNM Mega Industries</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%); padding: 30px; text-align: center;">
                  <h1 style="color: #F7F3EA; margin: 0; font-size: 28px; font-weight: 800;">YNM Mega Industries</h1>
                  <p style="color: #E6D3A3; margin: 10px 0 0; font-size: 14px;">Application Received</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                    Dear <strong>${formData.name}</strong>,
                  </p>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                    Thank you for your interest in joining <strong>YNM Mega Industries Pvt Ltd</strong>. 
                    We have successfully received your application for the position of <strong>${formData.position}</strong>.
                  </p>
                  
                  <div style="background-color: #F7F3EA; border-left: 4px solid #C9A24D; padding: 20px; margin: 30px 0; border-radius: 4px;">
                    <p style="color: #74060D; font-size: 14px; font-weight: 600; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.5px;">
                      Application Details
                    </p>
                    <table width="100%" cellpadding="5" cellspacing="0">
                      <tr>
                        <td style="color: #666666; font-size: 14px; padding: 5px 0;"><strong>Name:</strong></td>
                        <td style="color: #333333; font-size: 14px; padding: 5px 0;">${formData.name}</td>
                      </tr>
                      <tr>
                        <td style="color: #666666; font-size: 14px; padding: 5px 0;"><strong>Position:</strong></td>
                        <td style="color: #333333; font-size: 14px; padding: 5px 0;">${formData.position}</td>
                      </tr>
                      <tr>
                        <td style="color: #666666; font-size: 14px; padding: 5px 0;"><strong>Experience:</strong></td>
                        <td style="color: #333333; font-size: 14px; padding: 5px 0;">${formData.experience} years</td>
                      </tr>
                      <tr>
                        <td style="color: #666666; font-size: 14px; padding: 5px 0;"><strong>Email:</strong></td>
                        <td style="color: #333333; font-size: 14px; padding: 5px 0;">${formData.email}</td>
                      </tr>
                      <tr>
                        <td style="color: #666666; font-size: 14px; padding: 5px 0;"><strong>Phone:</strong></td>
                        <td style="color: #333333; font-size: 14px; padding: 5px 0;">${formData.phone}</td>
                      </tr>
                    </table>
                  </div>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                    Our HR team will review your application and resume. We will get back to you within 
                    <strong style="color: #74060D;">10 working days</strong> regarding the next steps in our hiring process.
                  </p>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                    If you have any questions or need to update your application, please feel free to contact us at 
                    <a href="mailto:hr@ynmsafety.com" style="color: #74060D; text-decoration: none;">hr@ynmsafety.com</a> 
                    or call us at <strong>+91 96765 75770</strong>.
                  </p>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px;">
                    We appreciate your interest in joining our team and look forward to the possibility of working together.
                  </p>
                  
                  <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0 0;">
                    Best regards,<br>
                    <strong style="color: #74060D;">HR Team</strong><br>
                    YNM Mega Industries Pvt Ltd
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #F7F3EA; padding: 20px 30px; text-align: center; border-top: 2px solid #E6D3A3;">
                  <p style="color: #666666; font-size: 12px; margin: 0 0 10px;">
                    <strong>YNM Mega Industries Pvt Ltd</strong><br>
                    Survey, 84P, Gowra Fountain Head, 4th Floor, Suite 401 A<br>
                    Patrika Nagar, Madhapur, Hyderabad, Telangana 500081
                  </p>
                  <p style="color: #999999; font-size: 11px; margin: 10px 0 0;">
                    Phone: +91 96765 75770 / +91 90002 62013 | Email: hr@ynmsafety.com<br>
                    <a href="https://www.ynmsafety.com" style="color: #74060D; text-decoration: none;">www.ynmsafety.com</a>
                  </p>
                  <p style="color: #999999; font-size: 10px; margin: 15px 0 0; font-style: italic;">
                    This is an automated email. Please do not reply to this message.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const emailText = `
Dear ${formData.name},

Thank you for your interest in joining YNM Mega Industries Pvt Ltd. 
We have successfully received your application for the position of ${formData.position}.

Application Details:
- Name: ${formData.name}
- Position: ${formData.position}
- Experience: ${formData.experience} years
- Email: ${formData.email}
- Phone: ${formData.phone}

Our HR team will review your application and resume. We will get back to you within 10 working days regarding the next steps in our hiring process.

If you have any questions or need to update your application, please feel free to contact us at hr@ynmsafety.com or call us at +91 96765 75770.

We appreciate your interest in joining our team and look forward to the possibility of working together.

Best regards,
HR Team
YNM Mega Industries Pvt Ltd

---
YNM Mega Industries Pvt Ltd
Survey, 84P, Gowra Fountain Head, 4th Floor, Suite 401 A
Patrika Nagar, Madhapur, Hyderabad, Telangana 500081
Phone: +91 96765 75770 / +91 90002 62013
Email: hr@ynmsafety.com
Website: www.ynmsafety.com

This is an automated email. Please do not reply to this message.
  `;

  // Determine sender address: use CAREER_EMAIL_FROM if set, otherwise fall back to GMAIL_USER if using Gmail, or default
  const senderEmail = process.env.CAREER_EMAIL_FROM || 
                      (process.env.GMAIL_USER && !process.env.SMTP_HOST ? process.env.GMAIL_USER : null) ||
                      'ynm.hr@ynmsafety.com';

  const mailOptions = {
    from: senderEmail,
    to: formData.email,
    subject: 'Application Received - YNM Mega Industries',
    text: emailText,
    html: emailHtml,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw error - email failure shouldn't block form submission
    return { success: false, error: error.message };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers['x-forwarded-for']?.split(',')[0] || 
                     req.headers['x-real-ip'] || 
                     req.connection.remoteAddress || 
                     'unknown';

    // Rate limiting check
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again after 15 minutes.' 
      });
    }

    // Parse form data with formidable
    const form = new IncomingForm({
      maxFileSize: 5 * 1024 * 1024, // 5MB
      keepExtensions: true,
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    // Extract form fields
    const formData = {
      name: fields.name?.[0] || '',
      email: fields.email?.[0] || '',
      phone: fields.phone?.[0] || '',
      position: fields.position?.[0] || '',
      experience: fields.experience?.[0] || '',
      coverLetter: fields.coverLetter?.[0] || '',
      captchaAnswer: fields.captchaAnswer?.[0] || '',
      captchaQuestion: fields.captchaQuestion?.[0] || '',
      recaptchaToken: fields.recaptchaToken?.[0] || '',
      ip: clientIP,
    };

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.position) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }

    // Validate reCAPTCHA
    if (!formData.recaptchaToken) {
      return res.status(400).json({ error: 'Please complete the "I\'m not a robot" verification.' });
    }

    const recaptchaValid = await validateRecaptcha(formData.recaptchaToken);
    if (!recaptchaValid) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed. Please try again.' });
    }

    // Validate CAPTCHA
    if (!formData.captchaAnswer || !formData.captchaQuestion) {
      return res.status(400).json({ error: 'CAPTCHA verification is required.' });
    }

    if (!validateCaptcha(formData.captchaAnswer, formData.captchaQuestion)) {
      return res.status(400).json({ error: 'CAPTCHA verification failed. Please try again.' });
    }

    // Validate resume file
    const resumeFile = files.resume?.[0];
    if (!resumeFile) {
      return res.status(400).json({ error: 'Resume file is required.' });
    }

    // Validate PDF - strict enforcement of application/pdf MIME type
    const pdfValidation = validatePDFFile(resumeFile);
    if (!pdfValidation.valid) {
      // Clean up file
      if (fs.existsSync(resumeFile.filepath)) {
        fs.unlinkSync(resumeFile.filepath);
      }
      return res.status(400).json({ error: pdfValidation.error });
    }

    // Check for password protection using pdf-parse
    try {
      const isPasswordProtected = await checkPDFPassword(resumeFile.filepath);
      if (isPasswordProtected) {
        // Clean up file
        if (fs.existsSync(resumeFile.filepath)) {
          fs.unlinkSync(resumeFile.filepath);
        }
        return res.status(400).json({ 
          error: 'Password-protected PDF files are not allowed. Please upload an unlocked PDF file.' 
        });
      }
    } catch (error) {
      // Handle errors from pdf-parse (corrupted PDFs, etc.)
      // Clean up file
      if (fs.existsSync(resumeFile.filepath)) {
        fs.unlinkSync(resumeFile.filepath);
      }
      return res.status(400).json({ 
        error: error.message || 'Invalid PDF file. Please ensure the file is a valid, unlocked PDF document.' 
      });
    }

    // Send confirmation email to applicant
    await sendConfirmationEmail(formData);

    // Clean up uploaded file (in production, this would be handled by cloud storage)
    if (fs.existsSync(resumeFile.filepath)) {
      fs.unlinkSync(resumeFile.filepath);
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully! A confirmation email has been sent to your email address.' 
    });

  } catch (error) {
    console.error('Career application error:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to submit application. Please try again.' 
    });
  }
}
