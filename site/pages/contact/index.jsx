import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndiaPresenceMap from "@/components/IndiaPresenceMap";

// Company details
const companyInfo = {
  name: "YNM Mega Industries Pvt Ltd",
  tagline: "Manufacturing & Export Excellence Since 2013",
  address: "Survey, 84P, Gowra Fountain Head, 4th Floor, Suite, 401 A, Patrika Nagar, Madhapur, Hyderabad, Telangana 500081",
  phone: "+91 96765 75770 / +91 90002 62013",
  email: "sales@ynmsafety.com",
  workingHours: "Monday to Saturday 10 am to 6 pm IST",
};

// Social media links
const socialLinks = [
  { name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/ynmsafety/", color: "#0A66C2" },
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/profile.php?id=61583507530283", color: "#1877F2" },
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/ynm.safety/", color: "#E4405F" },
  { name: "WhatsApp", icon: "whatsapp", href: "#", color: "#25D366", isComingSoon: true },
  { name: "Google Maps", icon: "maps", href: "https://maps.app.goo.gl/XVTWwaJb5YofQUv29", color: "#EA4335" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Success!
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
      
      // Auto-hide success message after 10 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 10000);

    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (e, social) => {
    if (social.isComingSoon || social.href === "#") {
      e.preventDefault();
      alert(`🚧 ${social.name} - Coming Soon! We're setting up our social presence.`);
      return;
    }
    // Allow normal link navigation for non-coming-soon links
    // Link will open in new tab (target="_blank" is set)
  };

  // Social icon components
  const SocialIcon = ({ icon }) => {
    switch (icon) {
      case "linkedin":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case "facebook":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case "instagram":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
          </svg>
        );
      case "whatsapp":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        );
      case "maps":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 0C7.802 0 4 3.403 4 7.602 4 11.8 7.469 16.812 12 24c4.531-7.188 8-12.2 8-16.398C20 3.403 16.199 0 12 0zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
          </svg>
        );
      case "twitter":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | YNM Mega Industries Pvt Ltd</title>
        <meta name="description" content="Get in touch with YNM Mega Industries for premium paints, fabrications, and school furniture. Contact us for quotes, exports, and partnerships." />
      </Head>

      <Navbar />

      <main className="contact-page">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="contact-hero-bg" />
          <div className="contact-hero-overlay" />
          <div className="contact-hero-content">
            <span className="contact-tag">GET IN TOUCH</span>
            <h1>Contact Us</h1>
            <p>We'd love to hear from you. Reach out for product inquiries, export quotes, or business partnerships.</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="contact-main">
          <div className="contact-container">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <div className="contact-form-header">
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              {submitted ? (
                <div className="contact-success">
                  <div className="success-icon">✓</div>
                  <h3>Thank You!</h3>
                  <p>Your message has been submitted successfully. We'll get back to you soon.</p>
                  <button onClick={() => setSubmitted(false)} className="contact-btn">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  {error && (
                    <div className="contact-error">
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
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="quote">Request a Quote</option>
                      <option value="product">Product Inquiry</option>
                      <option value="service">Service Inquiry</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="support">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button type="submit" className="contact-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="btn-spinner" />
                        Submitting...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Company Info */}
            <div className="contact-info-wrapper">
              {/* Company Card */}
              <div className="company-card">
                <div className="company-logo">
                  <Image 
                    src="/assets/logo2.jpg" 
                    alt="YNM Mega Industries" 
                    width={70} 
                    height={70} 
                    style={{ objectFit: "contain", borderRadius: "12px" }}
                  />
                </div>
                <h3>{companyInfo.name}</h3>
                <p className="company-tagline">{companyInfo.tagline}</p>
              </div>

              {/* Contact Details */}
              <div className="contact-details">
                <div className="detail-item">
                  <div className="detail-icon">📍</div>
                  <div className="detail-content">
                    <h4>Office Address</h4>
                    <p>{companyInfo.address}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">📞</div>
                  <div className="detail-content">
                    <h4>Phone Number</h4>
                    <p>{companyInfo.phone}</p>
                    <a href={`tel:${companyInfo.phone.replace(/\s/g, '').split('/')[0]}`} className="call-button">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      Call Now
                    </a>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">✉️</div>
                  <div className="detail-content">
                    <h4>Email Address</h4>
                    <p>{companyInfo.email}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">🕐</div>
                  <div className="detail-content">
                    <h4>Working Hours</h4>
                    <p>{companyInfo.workingHours}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-section">
                <h4>Connect With Us</h4>
                <div className="social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="social-link"
                      style={{ pointerEvents: 'auto', cursor: 'pointer', "--social-color": social.color }}
                      target={social.isComingSoon ? "_self" : "_blank"}
                      rel={social.isComingSoon ? undefined : "noopener noreferrer"}
                      onClick={(e) => handleSocialClick(e, social)}
                      title={social.name}
                    >
                      <SocialIcon icon={social.icon} />
                    </a>
                  ))}
                </div>
              </div>

              <IndiaPresenceMap />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #F7F3EA 0%, #E6D3A3 100%);
          padding-top: 100px; /* Account for fixed navbar */
        }

        /* Hero Section */
        .contact-hero {
          position: relative;
          height: 45vh;
          min-height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .contact-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 50%, #5a0509 100%);
        }

        .contact-hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 40%, rgba(201, 162, 77, 0.2), transparent 60%),
                      radial-gradient(circle at 70% 60%, rgba(154, 27, 46, 0.15), transparent 50%);
        }

        .contact-hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 20px;
        }

        .contact-tag {
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

        .contact-hero-content h1 {
          font-size: clamp(36px, 6vw, 56px);
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }

        .contact-hero-content p {
          font-size: 16px;
          color: #E6D3A3;
          max-width: 500px;
          margin: 0 auto;
          font-weight: 500;
        }

        /* Main Content */
        .contact-main {
          padding: 80px 20px;
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
        }

        /* Form Wrapper */
        .contact-form-wrapper {
          background: #fff;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 20px 60px rgba(116, 6, 13, 0.1);
          border: 2px solid #E6D3A3;
        }

        .contact-form-header h2 {
          font-size: 28px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 8px;
        }

        .contact-form-header p {
          font-size: 14px;
          color: #9A1B2E;
          margin: 0 0 32px;
        }

        /* Form Styles */
        .contact-form {
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
          color: #0d1321;
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

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #C9A24D;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(201, 162, 77, 0.15);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #9A1B2E;
          opacity: 0.5;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .contact-btn {
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
        }

        .contact-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(116, 6, 13, 0.3);
          background: linear-gradient(135deg, #9A1B2E, #74060D);
        }

        .contact-btn:disabled {
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

        /* Success State */
        .contact-success {
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

        .contact-success h3 {
          font-size: 24px;
          color: #0d1321;
          margin: 0 0 12px;
        }

        .contact-success p {
          color: #666;
          margin: 0 0 24px;
        }

        /* Error State */
        .contact-error {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(220, 38, 38, 0.1);
          border: 2px solid rgba(220, 38, 38, 0.3);
          border-radius: 12px;
          margin-bottom: 20px;
          animation: errorShake 0.5s ease;
        }

        .error-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .contact-error p {
          margin: 0;
          color: #dc2626;
          font-size: 14px;
          font-weight: 500;
        }

        @keyframes errorShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        /* Info Wrapper */
        .contact-info-wrapper {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Company Card */
        .company-card {
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%);
          border-radius: 24px;
          padding: 40px;
          text-align: center;
          border: 2px solid #C9A24D;
        }

        .company-logo {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          overflow: hidden;
          margin: 0 auto 20px;
          border: 3px solid #C9A24D;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
        }
        
        .company-logo :global(img) {
          object-fit: contain !important;
          width: 100% !important;
          height: 100% !important;
        }

        .company-card h3 {
          font-size: 24px;
          font-weight: 700;
          color: #C9A24D;
          margin: 0 0 8px;
        }

        .company-tagline {
          font-size: 14px;
          color: #E6D3A3;
          margin: 0;
          font-weight: 500;
        }

        /* Contact Details */
        .contact-details {
          background: #fff;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 10px 40px rgba(116, 6, 13, 0.08);
          border: 2px solid #E6D3A3;
        }

        .call-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #34C759, #30D158);
          color: white;
          border: none;
          border-radius: 25px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(52, 199, 89, 0.3);
        }

        .call-button:hover {
          background: linear-gradient(135deg, #30D158, #34C759);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(52, 199, 89, 0.4);
        }

        .call-button svg {
          width: 18px;
          height: 18px;
        }

        .detail-item {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 2px solid #F7F3EA;
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-icon {
          font-size: 24px;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #74060D, #9A1B2E);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .detail-content h4 {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #9A1B2E;
          margin: 0 0 4px;
        }

        .detail-content p {
          font-size: 15px;
          color: #74060D;
          margin: 0;
          font-weight: 500;
        }

        /* Social Section */
        .social-section {
          background: #fff;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 10px 40px rgba(116, 6, 13, 0.08);
          border: 2px solid #E6D3A3;
        }

        .social-section h4 {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #74060D;
          margin: 0 0 20px;
          text-align: center;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .social-link {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: #F7F3EA;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #74060D;
          transition: all 0.3s ease;
          border: 2px solid #E6D3A3;
        }

        .social-link:hover {
          background: var(--social-color);
          color: #fff;
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(116, 6, 13, 0.2);
          border-color: var(--social-color);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .contact-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .contact-form-wrapper {
            padding: 32px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .contact-hero {
            height: 40vh;
            min-height: 300px;
          }

          .contact-main {
            padding: 40px 16px;
          }

          .contact-form-wrapper {
            padding: 24px;
          }

          .company-card {
            padding: 28px;
          }
        }
      `}</style>
    </>
  );
}
