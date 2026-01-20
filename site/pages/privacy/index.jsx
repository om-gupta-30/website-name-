import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | YNM Mega Industries Pvt Ltd</title>
        <meta name="description" content="Privacy Policy for YNM Mega Industries Pvt Ltd - How we collect, use, and protect your information" />
      </Head>

      <Navbar />

      <main className="legal-page">
        <div className="legal-hero">
          <div className="legal-hero-bg" />
          <h1>Privacy Policy</h1>
          <p>Last updated: January 2026</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              YNM Mega Industries Pvt Ltd ("Company", "we", "us", or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
              our website or use our services.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, company name, and address when you submit inquiries or place orders.</li>
              <li><strong>Business Information:</strong> Company details, order history, and communication preferences.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and website usage patterns.</li>
              <li><strong>Communication Data:</strong> Content of messages sent through our contact forms or email.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>Processing and fulfilling orders</li>
              <li>Responding to inquiries and providing customer support</li>
              <li>Sending quotations and business communications</li>
              <li>Improving our website and services</li>
              <li>Complying with legal obligations</li>
              <li>Marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul>
              <li>Service providers who assist in our operations (shipping, payment processing)</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners for order fulfillment (with your consent)</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
              over the Internet is 100% secure.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
              policy, unless a longer retention period is required by law. Business records may be retained for up to 
              7 years for legal and accounting purposes.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>8. Cookies</h2>
            <p>
              Our website may use cookies and similar technologies to enhance your browsing experience. 
              You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy 
              practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with 
              an updated revision date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> privacy@ynmmegaindustries.com<br />
              <strong>Phone:</strong> +91 98765 43210<br />
              <strong>Address:</strong> Hyderabad, Telangana, India
            </p>
          </section>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .legal-page {
          min-height: 100vh;
          background: var(--soft-ivory, #F7F3EA);
          padding-top: 100px;
        }

        .legal-hero {
          position: relative;
          padding: 80px 20px;
          text-align: center;
          overflow: hidden;
        }

        .legal-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--deep-maroon, #74060D) 0%, var(--rich-wine, #9A1B2E) 100%);
        }

        .legal-hero h1 {
          position: relative;
          z-index: 1;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          color: #fff;
          margin: 0 0 12px;
        }

        .legal-hero p {
          position: relative;
          z-index: 1;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        .legal-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .legal-section {
          margin-bottom: 40px;
        }

        .legal-section h2 {
          font-size: 20px;
          font-weight: 700;
          color: var(--deep-maroon, #74060D);
          margin: 0 0 16px;
        }

        .legal-section p {
          font-size: 15px;
          line-height: 1.8;
          color: #444;
          margin: 0 0 12px;
        }

        .legal-section ul {
          margin: 12px 0;
          padding-left: 24px;
        }

        .legal-section li {
          font-size: 15px;
          line-height: 1.8;
          color: #444;
          margin-bottom: 8px;
        }
      `}</style>
    </>
  );
}
