import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | YNM Mega Industries Pvt Ltd</title>
        <meta name="description" content="Terms and Conditions for YNM Mega Industries Pvt Ltd - Manufacturing and Export Excellence" />
      </Head>

      <Navbar />

      <main className="legal-page">
        <div className="legal-hero">
          <div className="legal-hero-bg" />
          <h1>Terms & Conditions</h1>
          <p>Last updated: January 2026</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the services of YNM Mega Industries Pvt Ltd ("Company", "we", "us", or "our"), 
              you accept and agree to be bound by the terms and conditions outlined in this agreement. If you do not agree 
              to these terms, please do not use our services.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Services</h2>
            <p>
              YNM Mega Industries provides manufacturing and export services for premium paints, metal fabrications, 
              and school furniture. Our services include but are not limited to:
            </p>
            <ul>
              <li>Custom manufacturing solutions</li>
              <li>Product customization and private labeling</li>
              <li>International export services</li>
              <li>Quality assurance and certification</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Orders and Payments</h2>
            <p>
              All orders are subject to acceptance and availability. Prices are subject to change without prior notice. 
              Payment terms will be specified in individual contracts or quotations. We reserve the right to cancel 
              orders if payment is not received as per agreed terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Shipping and Delivery</h2>
            <p>
              Delivery times are estimates and not guaranteed. We are not liable for delays caused by customs, 
              shipping carriers, or circumstances beyond our control. Risk of loss passes to the buyer upon delivery 
              to the carrier (FOB) or as specified in the contract.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Quality and Returns</h2>
            <p>
              We maintain strict quality control standards. All products undergo quality checks before dispatch. 
              Claims for defects must be made within 7 days of receipt. Returns are subject to inspection and approval.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Intellectual Property</h2>
            <p>
              All content on this website, including logos, images, and text, is the property of YNM Mega Industries 
              and is protected by intellectual property laws. Unauthorized use is prohibited.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Limitation of Liability</h2>
            <p>
              YNM Mega Industries shall not be liable for any indirect, incidental, special, or consequential damages 
              arising from the use of our products or services. Our liability is limited to the value of the goods supplied.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes 
              shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Contact Information</h2>
            <p>
              For any questions regarding these terms, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> sales@ynmmegaindustries.com<br />
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
