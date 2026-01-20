import { google } from 'googleapis';

// ==============================================
// GOOGLE SHEETS CONFIGURATION
// ==============================================
const SHEETS_CONFIG = {
  spreadsheetId: process.env.GOOGLE_SHEET_ID, // Your Google Sheet ID
  range: 'Form Submissions!A:G', // Sheet name and range
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
};

// ==============================================
// GOOGLE SHEETS INTEGRATION
// ==============================================
async function saveToGoogleSheets(formData) {
  if (
    !SHEETS_CONFIG.credentials.client_email ||
    !SHEETS_CONFIG.credentials.private_key ||
    !SHEETS_CONFIG.spreadsheetId
  ) {
    throw new Error('Google Sheets is not configured on the server.');
  }

  const auth = new google.auth.JWT({
    email: SHEETS_CONFIG.credentials.client_email,
    key: SHEETS_CONFIG.credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const values = [[
    timestamp,
    formData.name,
    formData.email,
    formData.phone || '',
    formData.company || '',
    formData.subject,
    formData.message,
  ]];

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEETS_CONFIG.spreadsheetId,
    range: SHEETS_CONFIG.range,
    valueInputOption: 'USER_ENTERED',
    resource: { values },
  });

  console.log('Google Sheets saved:', response.data.updates);
  return { success: true, updates: response.data.updates };
}

// ==============================================
// API HANDLER
// ==============================================
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, company, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'email', 'subject', 'message']
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const formData = { name, email, phone, company, subject, message };

    // Save to Google Sheets (primary + only action)
    const sheetsResult = await saveToGoogleSheets(formData);

    // Return success
    return res.status(200).json({
      success: true,
      message: 'Thanks! Your message has been submitted successfully.',
      sheets: sheetsResult,
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      error: 'Failed to process your request',
      message: error.message 
    });
  }
}
