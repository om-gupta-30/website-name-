import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Company financial highlights
const financialHighlights = [
  {
    year: "2024",
    revenue: "₹45.2 Cr",
    growth: "+18%",
    profit: "₹6.8 Cr",
    exportShare: "68%",
  },
  {
    year: "2023",
    revenue: "₹38.3 Cr",
    growth: "+15%",
    profit: "₹5.2 Cr",
    exportShare: "65%",
  },
  {
    year: "2022",
    revenue: "₹33.3 Cr",
    growth: "+12%",
    profit: "₹4.1 Cr",
    exportShare: "62%",
  },
];

// Key metrics
const keyMetrics = [
  {
    label: "Total Revenue (2024)",
    value: "₹45.2 Cr",
    change: "+18% YoY",
    icon: "📈",
  },
  {
    label: "Export Revenue",
    value: "₹30.7 Cr",
    change: "+22% YoY",
    icon: "🌍",
  },
  {
    label: "Net Profit Margin",
    value: "15.0%",
    change: "+2.1% YoY",
    icon: "💰",
  },
  {
    label: "Countries Served",
    value: "15+",
    change: "Growing",
    icon: "🌐",
  },
];

// Recent announcements
const announcements = [
  {
    date: "2024-12-15",
    title: "Q3 2024 Financial Results Released",
    description: "Strong growth in export markets with 22% increase in international revenue.",
    type: "Financial",
  },
  {
    date: "2024-11-20",
    title: "Expansion into Middle East Markets",
    description: "YNM Mega Industries announces strategic partnerships in UAE and Saudi Arabia.",
    type: "Business",
  },
  {
    date: "2024-10-10",
    title: "ISO 9001:2015 Recertification",
    description: "Successfully renewed quality management certification for another 3 years.",
    type: "Certification",
  },
  {
    date: "2024-09-05",
    title: "New Manufacturing Facility Inauguration",
    description: "State-of-the-art facility expansion to increase production capacity by 40%.",
    type: "Infrastructure",
  },
];

// Investor resources
const investorResources = [
  {
    title: "Annual Report 2024",
    type: "PDF",
    size: "2.4 MB",
    date: "2024-03-31",
    href: "#",
  },
  {
    title: "Quarterly Results Q3 2024",
    type: "PDF",
    size: "1.8 MB",
    date: "2024-12-15",
    href: "#",
  },
  {
    title: "Investor Presentation",
    type: "PDF",
    size: "3.2 MB",
    date: "2024-11-01",
    href: "#",
  },
  {
    title: "Corporate Governance Policy",
    type: "PDF",
    size: "1.5 MB",
    date: "2024-01-15",
    href: "#",
  },
];

// Board of directors
const boardMembers = [
  {
    name: "Rajesh Kumar",
    position: "Chairman & CEO",
    experience: "25+ years in manufacturing",
    background: "Extensive experience in industrial manufacturing and global trade.",
  },
  {
    name: "Priya Sharma",
    position: "Director - Operations",
    experience: "18+ years in operations",
    background: "Expert in supply chain management and quality assurance.",
  },
  {
    name: "Amit Patel",
    position: "Director - Finance",
    experience: "20+ years in finance",
    background: "Chartered Accountant with expertise in corporate finance.",
  },
];

export default function InvestorRelationsPage() {
  const [selectedYear, setSelectedYear] = useState("2024");

  return (
    <>
      <Head>
        <title>Investor Relations | YNM Mega Industries Pvt Ltd</title>
        <meta name="description" content="Investor relations information, financial reports, and corporate updates from YNM Mega Industries." />
      </Head>

      <Navbar />

      <main className="investor-page">
        {/* Hero Section */}
        <section className="investor-hero">
          <div className="investor-hero-bg" />
          <div className="investor-hero-overlay" />
          <div className="investor-hero-content">
            <span className="investor-tag">INVESTOR RELATIONS</span>
            <h1>Investor Relations</h1>
            <p>Transparency, Growth, and Value Creation for Our Stakeholders</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="investor-main">
          <div className="investor-container">
            {/* Key Metrics */}
            <div className="metrics-section">
              <h2 className="section-title">Key Financial Metrics</h2>
              <div className="metrics-grid">
                {keyMetrics.map((metric, index) => (
                  <div key={index} className="metric-card">
                    <div className="metric-icon">{metric.icon}</div>
                    <div className="metric-value">{metric.value}</div>
                    <div className="metric-label">{metric.label}</div>
                    <div className="metric-change">{metric.change}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Highlights */}
            <div className="financial-section">
              <h2 className="section-title">Financial Highlights</h2>
              <div className="year-selector">
                {financialHighlights.map((year) => (
                  <button
                    key={year.year}
                    className={`year-btn ${selectedYear === year.year ? "active" : ""}`}
                    onClick={() => setSelectedYear(year.year)}
                  >
                    {year.year}
                  </button>
                ))}
              </div>
              <div className="financial-table">
                {financialHighlights
                  .filter((f) => f.year === selectedYear)
                  .map((data, index) => (
                    <div key={index} className="financial-card">
                      <div className="financial-item">
                        <span className="financial-label">Total Revenue</span>
                        <span className="financial-value">{data.revenue}</span>
                      </div>
                      <div className="financial-item">
                        <span className="financial-label">Revenue Growth</span>
                        <span className="financial-value positive">{data.growth}</span>
                      </div>
                      <div className="financial-item">
                        <span className="financial-label">Net Profit</span>
                        <span className="financial-value">{data.profit}</span>
                      </div>
                      <div className="financial-item">
                        <span className="financial-label">Export Revenue Share</span>
                        <span className="financial-value">{data.exportShare}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="announcements-section">
              <h2 className="section-title">Recent Announcements</h2>
              <div className="announcements-grid">
                {announcements.map((announcement, index) => (
                  <div key={index} className="announcement-card">
                    <div className="announcement-header">
                      <span className="announcement-date">{new Date(announcement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      <span className="announcement-type">{announcement.type}</span>
                    </div>
                    <h3 className="announcement-title">{announcement.title}</h3>
                    <p className="announcement-description">{announcement.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="investor-content-grid">
              {/* Investor Resources */}
              <div className="resources-section">
                <h2 className="section-title">Investor Resources</h2>
                <div className="resources-list">
                  {investorResources.map((resource, index) => (
                    <a key={index} href={resource.href} className="resource-item">
                      <div className="resource-icon">📄</div>
                      <div className="resource-info">
                        <div className="resource-title">{resource.title}</div>
                        <div className="resource-meta">
                          <span>{resource.type}</span>
                          <span>•</span>
                          <span>{resource.size}</span>
                          <span>•</span>
                          <span>{new Date(resource.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                        </div>
                      </div>
                      <div className="resource-download">↓</div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Board of Directors */}
              <div className="board-section">
                <h2 className="section-title">Board of Directors</h2>
                <div className="board-list">
                  {boardMembers.map((member, index) => (
                    <div key={index} className="board-member">
                      <div className="member-header">
                        <h3 className="member-name">{member.name}</h3>
                        <span className="member-position">{member.position}</span>
                      </div>
                      <div className="member-experience">{member.experience}</div>
                      <p className="member-background">{member.background}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact for Investors */}
            <div className="investor-contact-section">
              <h2 className="section-title">Investor Inquiries</h2>
              <div className="investor-contact-card">
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <div>
                      <h4>Email</h4>
                      <p>investors@ynmsafety.com</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <div>
                      <h4>Phone</h4>
                      <p>+91 96765 75770</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📍</span>
                    <div>
                      <h4>Address</h4>
                      <p>Survey, 84P, Gowra Fountain Head, 4th Floor, Suite 401 A, Patrika Nagar, Madhapur, Hyderabad, Telangana 500081</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .investor-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #F7F3EA 0%, #E6D3A3 100%);
          padding-top: 100px;
        }

        /* Hero Section */
        .investor-hero {
          position: relative;
          height: 50vh;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .investor-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 50%, #5a0509 100%);
        }

        .investor-hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 40%, rgba(201, 162, 77, 0.2), transparent 60%),
                      radial-gradient(circle at 70% 60%, rgba(154, 27, 46, 0.15), transparent 50%);
        }

        .investor-hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 20px;
        }

        .investor-tag {
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

        .investor-hero-content h1 {
          font-size: clamp(40px, 7vw, 64px);
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }

        .investor-hero-content p {
          font-size: 18px;
          color: #E6D3A3;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 500;
        }

        /* Main Content */
        .investor-main {
          padding: 80px 20px;
        }

        .investor-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 36px;
          font-weight: 800;
          color: #74060D;
          margin: 0 0 40px;
          text-align: center;
          letter-spacing: -0.02em;
        }

        /* Metrics Section */
        .metrics-section {
          margin-bottom: 80px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .metric-card {
          background: #fff;
          border-radius: 24px;
          padding: 40px 30px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(116, 6, 13, 0.1);
          border: 2px solid #E6D3A3;
          transition: all 0.4s ease;
        }

        .metric-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(116, 6, 13, 0.2);
          border-color: #C9A24D;
        }

        .metric-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .metric-value {
          font-size: 42px;
          font-weight: 900;
          color: #74060D;
          margin-bottom: 8px;
        }

        .metric-label {
          font-size: 14px;
          color: #9A1B2E;
          font-weight: 600;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .metric-change {
          font-size: 13px;
          color: #C9A24D;
          font-weight: 700;
        }

        /* Financial Section */
        .financial-section {
          margin-bottom: 80px;
        }

        .year-selector {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .year-btn {
          padding: 12px 28px;
          font-size: 15px;
          font-weight: 700;
          color: #74060D;
          background: #fff;
          border: 2px solid #E6D3A3;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .year-btn:hover {
          border-color: #C9A24D;
          transform: translateY(-2px);
        }

        .year-btn.active {
          background: linear-gradient(135deg, #74060D, #9A1B2E);
          color: #F7F3EA;
          border-color: #C9A24D;
        }

        .financial-table {
          display: flex;
          justify-content: center;
        }

        .financial-card {
          background: #fff;
          border-radius: 24px;
          padding: 50px;
          box-shadow: 0 20px 60px rgba(116, 6, 13, 0.15);
          border: 2px solid #E6D3A3;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          max-width: 800px;
          width: 100%;
        }

        .financial-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .financial-label {
          font-size: 13px;
          color: #9A1B2E;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .financial-value {
          font-size: 32px;
          font-weight: 800;
          color: #74060D;
        }

        .financial-value.positive {
          color: #C9A24D;
        }

        /* Announcements Section */
        .announcements-section {
          margin-bottom: 80px;
        }

        .announcements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .announcement-card {
          background: #fff;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 40px rgba(116, 6, 13, 0.1);
          border: 2px solid #E6D3A3;
          transition: all 0.4s ease;
        }

        .announcement-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 50px rgba(116, 6, 13, 0.2);
          border-color: #C9A24D;
        }

        .announcement-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .announcement-date {
          font-size: 12px;
          color: #9A1B2E;
          font-weight: 600;
        }

        .announcement-type {
          font-size: 11px;
          color: #F7F3EA;
          background: #74060D;
          padding: 4px 12px;
          border-radius: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .announcement-title {
          font-size: 20px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 12px;
        }

        .announcement-description {
          font-size: 15px;
          color: #9A1B2E;
          line-height: 1.7;
          margin: 0;
        }

        /* Content Grid */
        .investor-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-bottom: 80px;
        }

        /* Resources Section */
        .resources-section {
          background: #fff;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(116, 6, 13, 0.1);
          border: 2px solid #E6D3A3;
        }

        .resources-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .resource-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: #F7F3EA;
          border-radius: 16px;
          border: 2px solid #E6D3A3;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .resource-item:hover {
          background: #fff;
          border-color: #C9A24D;
          transform: translateX(5px);
        }

        .resource-icon {
          font-size: 32px;
          flex-shrink: 0;
        }

        .resource-info {
          flex: 1;
        }

        .resource-title {
          font-size: 16px;
          font-weight: 700;
          color: #74060D;
          margin-bottom: 6px;
        }

        .resource-meta {
          font-size: 12px;
          color: #9A1B2E;
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .resource-download {
          font-size: 24px;
          color: #C9A24D;
        }

        /* Board Section */
        .board-section {
          background: #fff;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(116, 6, 13, 0.1);
          border: 2px solid #E6D3A3;
        }

        .board-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .board-member {
          padding: 24px;
          background: #F7F3EA;
          border-radius: 16px;
          border: 2px solid #E6D3A3;
        }

        .member-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .member-name {
          font-size: 20px;
          font-weight: 700;
          color: #74060D;
          margin: 0;
        }

        .member-position {
          font-size: 13px;
          color: #F7F3EA;
          background: #9A1B2E;
          padding: 4px 12px;
          border-radius: 12px;
          font-weight: 600;
        }

        .member-experience {
          font-size: 13px;
          color: #C9A24D;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .member-background {
          font-size: 14px;
          color: #9A1B2E;
          line-height: 1.6;
          margin: 0;
        }

        /* Investor Contact Section */
        .investor-contact-section {
          margin-bottom: 40px;
        }

        .investor-contact-card {
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%);
          border-radius: 24px;
          padding: 50px;
          box-shadow: 0 20px 60px rgba(116, 6, 13, 0.2);
          border: 2px solid #C9A24D;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .contact-item {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .contact-icon {
          font-size: 32px;
          flex-shrink: 0;
        }

        .contact-item h4 {
          font-size: 16px;
          font-weight: 700;
          color: #C9A24D;
          margin: 0 0 6px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .contact-item p {
          font-size: 15px;
          color: #E6D3A3;
          margin: 0;
          line-height: 1.6;
        }

        /* Responsive */
        @media (max-width: 1000px) {
          .investor-content-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .financial-card {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .investor-hero {
            height: 40vh;
            min-height: 300px;
          }

          .investor-main {
            padding: 40px 16px;
          }

          .section-title {
            font-size: 28px;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .announcements-grid {
            grid-template-columns: 1fr;
          }

          .investor-contact-card {
            padding: 30px;
          }
        }
      `}</style>
    </>
  );
}
