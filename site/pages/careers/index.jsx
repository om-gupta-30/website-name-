import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Company details
const companyInfo = {
  name: "YNM Mega Industries Pvt Ltd",
  tagline: "Manufacturing & Export Excellence Since 2013",
  email: "hr@ynmsafety.com",
  phone: "+91 96765 75770 / +91 90002 62013",
};

// Available positions
const openPositions = [
  {
    id: 1,
    title: "Production Manager",
    department: "Manufacturing",
    location: "Hyderabad, India",
    type: "Full-time",
    description: "Lead our production team and ensure quality manufacturing processes.",
  },
  {
    id: 2,
    title: "Quality Control Engineer",
    department: "Quality Assurance",
    location: "Hyderabad, India",
    type: "Full-time",
    description: "Maintain ISO standards and ensure product quality excellence.",
  },
  {
    id: 3,
    title: "Export Coordinator",
    department: "International Trade",
    location: "Hyderabad, India",
    type: "Full-time",
    description: "Manage export documentation and international logistics.",
  },
  {
    id: 4,
    title: "Sales Executive",
    department: "Sales & Marketing",
    location: "Hyderabad, India",
    type: "Full-time",
    description: "Build client relationships and drive business growth.",
  },
];

export default function CareersPage() {
  // Generate CAPTCHA
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { question: `${num1} + ${num2}`, answer: num1 + num2 };
  };

  // Initialize CAPTCHA with a default to avoid hydration mismatch
  // Will be regenerated in useEffect on client side
  const [captcha, setCaptcha] = useState({ question: '0 + 0', answer: 0 });
  const [captchaInitialized, setCaptchaInitialized] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: null,
    coverLetter: "",
    captchaAnswer: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const recaptchaWidgetId = useRef(null);

  // Initialize CAPTCHA on client side only (fixes hydration error)
  useEffect(() => {
    if (!captchaInitialized) {
      setCaptcha(generateCaptcha());
      setCaptchaInitialized(true);
    }
  }, [captchaInitialized]);

  // Load reCAPTCHA script
  useEffect(() => {
    // Wait for recaptchaRef to be available
    if (!recaptchaRef.current) return;

    // Check if reCAPTCHA is already loaded
    const existingScript = document.querySelector('script[src*="recaptcha/api.js"]');
    
    const initRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.render && recaptchaRef.current && !recaptchaWidgetId.current) {
        try {
          recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // Default test key
            callback: (token) => {
              setRecaptchaToken(token);
            },
            'expired-callback': () => {
              setRecaptchaToken(null);
            },
            'error-callback': () => {
              setRecaptchaToken(null);
            }
          });
        } catch (error) {
          console.error('reCAPTCHA render error:', error);
        }
      }
    };

    // If script already exists and grecaptcha is available
    if (existingScript && window.grecaptcha) {
      initRecaptcha();
      return;
    }

    // Create a unique callback name (using ref to avoid hydration issues)
    // Use a counter-based approach instead of Date.now() during render
    const callbackCounter = Math.floor(Math.random() * 1000000);
    const callbackName = `recaptchaCallback_${callbackCounter}`;
    
    // Set up global callback
    window[callbackName] = () => {
      initRecaptcha();
      // Clean up callback after use
      if (window[callbackName]) {
        delete window[callbackName];
      }
    };

    // Load reCAPTCHA v2 script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error('Failed to load reCAPTCHA script');
      delete window[callbackName];
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (window.grecaptcha && recaptchaWidgetId.current) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId.current);
        } catch (error) {
          // Ignore cleanup errors
        }
      }
      if (window[callbackName]) {
        delete window[callbackName];
      }
    };
  }, []);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file) {
        // Clear previous errors
        setFileError(null);
        
        // Validate file type - must be PDF
        const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
        
        if (!isPDF) {
          setFileError('Invalid file type. Only PDF files are allowed. Please select a PDF file.');
          e.target.value = '';
          setFormData({ ...formData, resume: null });
          return;
        }
        
        // Additional validation: Check if file extension is .pdf (double-check)
        const fileName = file.name.toLowerCase();
        if (!fileName.endsWith('.pdf')) {
          setFileError('Invalid file extension. Only .pdf files are allowed.');
          e.target.value = '';
          setFormData({ ...formData, resume: null });
          return;
        }
        
        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          setFileError(`File size exceeds 5MB limit (${(file.size / 1024 / 1024).toFixed(2)} MB). Please upload a smaller PDF file.`);
          e.target.value = '';
          setFormData({ ...formData, resume: null });
          return;
        }
        
        // Check minimum file size (PDFs should be at least a few KB)
        if (file.size < 1024) {
          setFileError('File appears to be too small to be a valid PDF. Please check your file.');
          e.target.value = '';
          setFormData({ ...formData, resume: null });
          return;
        }
        
        // File is valid - store it
        setFileError(null);
        setFormData({ ...formData, resume: file });
      } else {
        // No file selected - clear resume
        setFormData({ ...formData, resume: null });
        setFileError(null);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Validate reCAPTCHA
    if (!recaptchaToken) {
      setError('Please complete the "I\'m not a robot" verification.');
      setIsSubmitting(false);
      return;
    }

    // Validate CAPTCHA
    if (parseInt(formData.captchaAnswer) !== captcha.answer) {
      setError('CAPTCHA verification failed. Please try again.');
      setCaptcha(generateCaptcha());
      setIsSubmitting(false);
      return;
    }

    // Validate resume file
    if (!formData.resume) {
      setError('Please upload your resume. Only PDF files are accepted.');
      setIsSubmitting(false);
      return;
    }

    // Double-check file type before submission
    const fileName = formData.resume.name.toLowerCase();
    const isValidPDF = formData.resume.type === 'application/pdf' && fileName.endsWith('.pdf');
    
    if (!isValidPDF) {
      setError('Invalid file type. Only PDF files are allowed. Please upload a PDF resume.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('resume', formData.resume);
      formDataToSend.append('captchaAnswer', formData.captchaAnswer);
      formDataToSend.append('captchaQuestion', captcha.question);
      formDataToSend.append('recaptchaToken', recaptchaToken);

      const response = await fetch('/api/careers/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitted(true);
      setFormData({ 
        name: "", 
        email: "", 
        phone: "", 
        position: "", 
        experience: "", 
        resume: null, 
        coverLetter: "",
        captchaAnswer: ""
      });
      setCaptcha(generateCaptcha());
      setFileError(null);
      setRecaptchaToken(null);
      // Reset reCAPTCHA
      if (window.grecaptcha && recaptchaWidgetId.current) {
        window.grecaptcha.reset(recaptchaWidgetId.current);
      }
      
      setTimeout(() => {
        setSubmitted(false);
      }, 10000);

    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to submit application. Please try again.');
      setCaptcha(generateCaptcha());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Careers | YNM Mega Industries Pvt Ltd</title>
        <meta name="description" content="Join YNM Mega Industries. Explore career opportunities in manufacturing, quality control, export, and sales. Build your career with us." />
      </Head>

      <Navbar />

      <main className="careers-page">
        {/* Hero Section */}
        <section className="careers-hero">
          <div className="careers-hero-bg" />
          <div className="careers-hero-overlay" />
          <div className="careers-hero-content">
            <span className="careers-tag">JOIN OUR TEAM</span>
            <h1>Careers at YNM</h1>
            <p>Be part of a growing team that's manufacturing excellence and exporting quality products worldwide</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="careers-main">
          <div className="careers-container">
            {/* Open Positions */}
            <div className="positions-section">
              <div className="section-header">
                <h2>Open Positions</h2>
                <p>Explore current job opportunities at YNM Mega Industries</p>
              </div>

              <div className="positions-grid">
                {openPositions.map((position) => (
                  <div key={position.id} className="position-card">
                    <div className="position-header">
                      <h3>{position.title}</h3>
                      <span className="position-badge">{position.type}</span>
                    </div>
                    <div className="position-meta">
                      <span className="position-dept">{position.department}</span>
                      <span className="position-location">📍 {position.location}</span>
                    </div>
                    <p className="position-desc">{position.description}</p>
                    <button 
                      className="position-apply-btn"
                      onClick={() => {
                        setFormData({ ...formData, position: position.title });
                        document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Apply Now
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div id="application-form" className="application-section">
              <div className="section-header">
                <h2>Submit Your Application</h2>
                <p>Fill out the form below to apply for a position or send us your resume for future opportunities</p>
              </div>

              {submitted ? (
                <div className="application-success">
                  <div className="success-icon">✓</div>
                  <h3>Application Submitted!</h3>
                  <p>Thank you for your interest. We'll review your application and get back to you soon.</p>
                  <button onClick={() => setSubmitted(false)} className="careers-btn">
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="application-form">
                  {error && (
                    <div className="application-error">
                      <span className="error-icon">⚠️</span>
                      <p>{error}</p>
                    </div>
                  )}
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="position">Position Applied For *</label>
                      <select
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a position</option>
                        {openPositions.map((pos) => (
                          <option key={pos.id} value={pos.title}>{pos.title}</option>
                        ))}
                        <option value="General Application">General Application</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="experience">Years of Experience *</label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="2-3">2-3 years</option>
                      <option value="4-5">4-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="resume">Upload Resume/CV (PDF Only) *</label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      onChange={handleChange}
                      accept="application/pdf,.pdf"
                      required
                    />
                    <small>Only PDF files are allowed. Maximum file size: 5MB. Password-protected PDFs are not accepted.</small>
                    {fileError && (
                      <span className="file-error">⚠️ {fileError}</span>
                    )}
                    {formData.resume && !fileError && (
                      <span className="file-success">✓ {formData.resume.name} ({(formData.resume.size / 1024).toFixed(2)} KB)</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="coverLetter">Cover Letter</label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us why you'd be a great fit for this role..."
                    />
                  </div>

                  {/* reCAPTCHA */}
                  <div className="form-group recaptcha-group">
                    <label>Security Verification *</label>
                    <div ref={recaptchaRef} className="recaptcha-container"></div>
                    <small>Please complete the "I'm not a robot" verification.</small>
                  </div>

                  {/* CAPTCHA */}
                  <div className="form-group captcha-group">
                    <label htmlFor="captchaAnswer">Additional Security Verification *</label>
                    <div className="captcha-container">
                      <div className="captcha-question">
                        <span>What is {captcha.question}?</span>
                        <button 
                          type="button" 
                          className="captcha-refresh"
                          onClick={() => setCaptcha(generateCaptcha())}
                          title="Refresh CAPTCHA"
                        >
                          🔄
                        </button>
                      </div>
                      <input
                        type="number"
                        id="captchaAnswer"
                        name="captchaAnswer"
                        value={formData.captchaAnswer}
                        onChange={handleChange}
                        required
                        placeholder="Enter answer"
                        min="0"
                        max="100"
                      />
                    </div>
                    <small>Please solve this simple math problem to verify you're human.</small>
                  </div>

                  <button type="submit" className="careers-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="btn-spinner" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Why Join Us */}
            <div className="why-join-section">
              <h2>Why Join YNM Mega Industries?</h2>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">🏭</div>
                  <h3>Growth Opportunities</h3>
                  <p>Advance your career in a fast-growing manufacturing company</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">🌍</div>
                  <h3>Global Exposure</h3>
                  <p>Work with international clients and expand your horizons</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">✓</div>
                  <h3>Quality Focus</h3>
                  <p>Be part of a team committed to excellence and ISO standards</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">🤝</div>
                  <h3>Team Culture</h3>
                  <p>Join a collaborative and supportive work environment</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .careers-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #F7F3EA 0%, #E6D3A3 100%);
          padding-top: 100px;
        }

        /* Hero Section */
        .careers-hero {
          position: relative;
          height: 45vh;
          min-height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .careers-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 50%, #5a0509 100%);
        }

        .careers-hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 40%, rgba(201, 162, 77, 0.2), transparent 60%),
                      radial-gradient(circle at 70% 60%, rgba(154, 27, 46, 0.15), transparent 50%);
        }

        .careers-hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 20px;
        }

        .careers-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #74060D;
          background: #C9A24D;
          border: 2px solid #E6D3A3;
          padding: 8px 20px;
          border-radius: 30px;
          margin-bottom: 20px;
        }

        .careers-hero-content h1 {
          font-size: clamp(36px, 6vw, 56px);
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }

        .careers-hero-content p {
          font-size: 16px;
          color: #E6D3A3;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 500;
        }

        /* Main Content */
        .careers-main {
          padding: 80px 20px;
        }

        .careers-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-header h2 {
          font-size: clamp(32px, 5vw, 42px);
          font-weight: 800;
          color: #74060D;
          margin: 0 0 12px;
        }

        .section-header p {
          font-size: 16px;
          color: #9A1B2E;
          margin: 0;
        }

        /* Positions Grid */
        .positions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }

        .position-card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          border: 2px solid #E6D3A3;
          box-shadow: 0 10px 40px rgba(116, 6, 13, 0.1);
          transition: all 0.3s ease;
        }

        .position-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(116, 6, 13, 0.2);
          border-color: #C9A24D;
        }

        .position-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 16px;
        }

        .position-header h3 {
          font-size: 20px;
          font-weight: 700;
          color: #74060D;
          margin: 0;
        }

        .position-badge {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          padding: 4px 12px;
          background: #C9A24D;
          color: #74060D;
          border-radius: 12px;
        }

        .position-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .position-dept {
          font-size: 13px;
          color: #9A1B2E;
          font-weight: 600;
        }

        .position-location {
          font-size: 13px;
          color: #9A1B2E;
        }

        .position-desc {
          font-size: 14px;
          color: #5a4a4a;
          line-height: 1.6;
          margin: 0 0 20px;
        }

        .position-apply-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #F7F3EA;
          background: linear-gradient(135deg, #74060D, #9A1B2E);
          border: 2px solid #C9A24D;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .position-apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(116, 6, 13, 0.3);
        }

        /* Application Form */
        .application-section {
          background: white;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 20px 60px rgba(116, 6, 13, 0.1);
          border: 2px solid #E6D3A3;
          margin-bottom: 80px;
        }

        .application-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: #74060D;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 14px 18px;
          font-size: 15px;
          border: 2px solid #E6D3A3;
          border-radius: 12px;
          background: #F7F3EA;
          color: #74060D;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-group input[type="file"] {
          padding: 10px;
          cursor: pointer;
        }

        .form-group small {
          font-size: 12px;
          color: #9A1B2E;
          margin-top: 4px;
        }

        .file-error {
          display: block;
          font-size: 12px;
          color: #dc2626;
          margin-top: 4px;
          font-weight: 600;
        }

        .file-success {
          display: block;
          font-size: 12px;
          color: #16a34a;
          margin-top: 4px;
          font-weight: 600;
        }

        .captcha-group {
          background: #F7F3EA;
          padding: 20px;
          border-radius: 12px;
          border: 2px solid #E6D3A3;
        }

        .captcha-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .captcha-question {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 18px;
          font-weight: 700;
          color: #74060D;
          padding: 12px 16px;
          background: white;
          border-radius: 8px;
          border: 2px solid #C9A24D;
        }

        .captcha-question span {
          flex: 1;
        }

        .captcha-refresh {
          background: #C9A24D;
          border: none;
          border-radius: 6px;
          padding: 6px 10px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s ease;
        }

        .captcha-refresh:hover {
          background: #E6D3A3;
          transform: rotate(90deg);
        }

        .captcha-group input[type="number"] {
          width: 100%;
          max-width: 200px;
        }

        .recaptcha-group {
          background: #F7F3EA;
          padding: 20px;
          border-radius: 12px;
          border: 2px solid #E6D3A3;
        }

        .recaptcha-container {
          display: flex;
          justify-content: center;
          margin: 12px 0;
        }

        .recaptcha-container iframe {
          border-radius: 4px;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #C9A24D;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(201, 162, 77, 0.15);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .careers-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 32px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #F7F3EA;
          background: linear-gradient(135deg, #74060D, #9A1B2E);
          border: 2px solid #C9A24D;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          align-self: flex-start;
        }

        .careers-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(116, 6, 13, 0.3);
        }

        .careers-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid transparent;
          border-top-color: #F7F3EA;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .application-success {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #c9a227, #e8d48a);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          color: #0d1321;
          margin: 0 auto 24px;
        }

        .application-success h3 {
          font-size: 24px;
          color: #74060D;
          margin: 0 0 12px;
        }

        .application-success p {
          color: #9A1B2E;
          margin: 0 0 24px;
        }

        .application-error {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(220, 38, 38, 0.1);
          border: 2px solid rgba(220, 38, 38, 0.3);
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .error-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .application-error p {
          margin: 0;
          color: #dc2626;
          font-size: 14px;
        }

        /* Why Join Section */
        .why-join-section {
          margin-top: 80px;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .benefit-card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          text-align: center;
          border: 2px solid #E6D3A3;
          box-shadow: 0 10px 40px rgba(116, 6, 13, 0.1);
          transition: all 0.3s ease;
        }

        .benefit-card:hover {
          transform: translateY(-8px);
          border-color: #C9A24D;
          box-shadow: 0 20px 60px rgba(116, 6, 13, 0.2);
        }

        .benefit-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .benefit-card h3 {
          font-size: 18px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 12px;
        }

        .benefit-card p {
          font-size: 14px;
          color: #5a4a4a;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .careers-main {
            padding: 40px 16px;
          }

          .application-section {
            padding: 32px 24px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .positions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
