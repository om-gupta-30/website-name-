import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmployeesSection from "@/components/EmployeesSection";

export default function OurTeamPage() {
  return (
    <>
      <Head>
        <title>Our Team - YNM Mega Industries Pvt Ltd</title>
        <meta name="description" content="Meet the dedicated team behind YNM Mega Industries - experienced professionals committed to manufacturing excellence and global expansion." />
      </Head>

      <Navbar />

      <main className="our-team-page">
        {/* Hero Section */}
        <section className="our-team-hero">
          <div className="our-team-hero-bg" />
          <div className="our-team-hero-overlay" />
          <div className="our-team-hero-content">
            <span className="our-team-tag">OUR TEAM</span>
            <h1>Meet Our Team</h1>
            <p>Dedicated professionals committed to manufacturing excellence and global expansion</p>
          </div>
        </section>

        {/* Employees Section */}
        <EmployeesSection employeesData={null} />

        {/* CTA Section */}
        <section className="our-team-cta">
          <div className="our-team-cta-content">
            <h2>Join Our Team</h2>
            <p>We're always looking for talented individuals to join our growing team.</p>
            <a href="/careers" className="our-team-cta-btn">
              View Careers
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .our-team-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #F7F3EA 0%, #E6D3A3 100%);
          padding-top: 100px;
        }

        /* Hero Section */
        .our-team-hero {
          position: relative;
          height: 50vh;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .our-team-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 50%, #5a0509 100%);
        }

        .our-team-hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 40%, rgba(201, 162, 77, 0.2), transparent 60%),
                      radial-gradient(circle at 70% 60%, rgba(154, 27, 46, 0.15), transparent 50%);
        }

        .our-team-hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 20px;
        }

        .our-team-tag {
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

        .our-team-hero-content h1 {
          font-size: clamp(40px, 7vw, 64px);
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }

        .our-team-hero-content p {
          font-size: 18px;
          color: #E6D3A3;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 500;
        }

        /* CTA Section */
        .our-team-cta {
          padding: 80px 20px;
          text-align: center;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%);
        }

        .our-team-cta-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .our-team-cta h2 {
          font-size: 32px;
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 12px;
        }

        .our-team-cta p {
          font-size: 16px;
          color: #E6D3A3;
          margin: 0 0 30px;
          font-weight: 500;
        }

        .our-team-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #74060D;
          background: #C9A24D;
          border: 2px solid #E6D3A3;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .our-team-cta-btn:hover {
          background: #E6D3A3;
          color: #9A1B2E;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(201, 162, 77, 0.4);
        }

        @media (max-width: 600px) {
          .our-team-hero {
            height: 40vh;
            min-height: 300px;
          }

          .our-team-cta {
            padding: 60px 16px;
          }

          .our-team-cta h2 {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
}
