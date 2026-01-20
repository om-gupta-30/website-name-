"use client";

import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

// Foreign collaboration partners
const collaborations = [
  {
    id: "1",
    name: "European Manufacturing Alliance",
    country: "Germany",
    flag: "🇩🇪",
    type: "Manufacturing Partnership",
    description: "Strategic manufacturing partnership for advanced industrial coatings and metal fabrication technologies. Sharing expertise in precision engineering and quality control systems.",
    duration: "3 Years",
    focus: ["Industrial Coatings", "Quality Standards", "Technology Transfer"],
    benefits: "Access to European quality standards and advanced manufacturing techniques.",
    image: "/assets/gallery-manufacturing-facility.jpg"
  },
  {
    id: "2",
    name: "Asian Export Network",
    country: "Singapore",
    flag: "🇸🇬",
    type: "Export & Distribution",
    description: "Regional distribution hub partnership enabling seamless exports across Southeast Asia. Leveraging Singapore's strategic location for efficient logistics and market access.",
    duration: "4 Years",
    focus: ["Regional Distribution", "Logistics", "Market Expansion"],
    benefits: "Enhanced market reach across ASEAN countries with streamlined export processes.",
    image: "/assets/gallery-warehouse.jpg"
  },
  {
    id: "3",
    name: "Middle East Trading Consortium",
    country: "UAE",
    flag: "🇦🇪",
    type: "Trading Partnership",
    description: "Long-standing trading partnership facilitating exports to GCC countries. Specializing in industrial paints, safety equipment, and school furniture distribution across the region.",
    duration: "5 Years",
    focus: ["GCC Markets", "Product Distribution", "Cultural Adaptation"],
    benefits: "Strong presence in Middle Eastern markets with local market expertise.",
    image: "/assets/product-industrial-paint.png"
  },
  {
    id: "4",
    name: "African Development Partnership",
    country: "Kenya",
    flag: "🇰🇪",
    type: "Development Collaboration",
    description: "Comprehensive partnership supporting infrastructure development across East Africa. Providing quality manufacturing solutions for education and construction sectors.",
    duration: "3 Years",
    focus: ["Infrastructure", "Education Sector", "Local Capacity Building"],
    benefits: "Contribution to African development while expanding market presence.",
    image: "/assets/product-student-desk-chair.png"
  },
  {
    id: "5",
    name: "North American Tech Transfer",
    country: "USA",
    flag: "🇺🇸",
    type: "Technology Collaboration",
    description: "Knowledge exchange partnership focusing on advanced coating technologies and sustainable manufacturing practices. Collaborative R&D initiatives for innovative product development.",
    duration: "2 Years",
    focus: ["R&D Collaboration", "Sustainable Practices", "Innovation"],
    benefits: "Cutting-edge technology access and sustainable manufacturing expertise.",
    image: "/assets/gallery-quality-control.jpg"
  },
  {
    id: "6",
    name: "Oceanic Trade Alliance",
    country: "Australia",
    flag: "🇦🇺",
    type: "Trade Partnership",
    description: "Emerging trade partnership for premium industrial products. Focus on high-quality standards and regulatory compliance for Australian market requirements.",
    duration: "1 Year",
    focus: ["Quality Compliance", "Premium Products", "Regulatory Standards"],
    benefits: "Access to highly regulated markets with premium product positioning.",
    image: "/assets/product-epoxy-floor-coating.png"
  }
];

// Collaboration statistics
const collaborationStats = [
  { label: "Global Partners", value: "15+", icon: "🌍" },
  { label: "Countries Covered", value: "25+", icon: "🗺️" },
  { label: "Years of Collaboration", value: "5+", icon: "🤝" },
  { label: "Joint Projects", value: "50+", icon: "📦" }
];

// Types of collaborations
const collaborationTypes = [
  {
    icon: "🏭",
    title: "Manufacturing Partnerships",
    description: "Collaborative manufacturing with international partners to share technology, expertise, and production capabilities."
  },
  {
    icon: "🚢",
    title: "Export & Distribution",
    description: "Strategic alliances for seamless export operations and regional distribution networks across global markets."
  },
  {
    icon: "🔬",
    title: "R&D Collaboration",
    description: "Joint research and development initiatives to innovate new products and improve manufacturing processes."
  },
  {
    icon: "📋",
    title: "Quality Standards",
    description: "Adoption and implementation of international quality standards through partnerships with certified organizations."
  }
];

export default function ForeignCollaborationsPage() {
  return (
    <>
      <Head>
        <title>Foreign Collaborations - YNM Mega Industries Pvt Ltd</title>
        <meta name="description" content="Our international partnerships and collaborations spanning 25+ countries. Building global connections for manufacturing excellence." />
      </Head>

      <Navbar />

      <main className="fc-page">
        {/* Hero Section */}
        <section className="fc-hero">
          <div className="fc-hero-bg" />
          <div className="fc-hero-pattern" aria-hidden="true" />
          <div className="fc-hero-glow fc-hero-glow-1" aria-hidden="true" />
          <div className="fc-hero-glow fc-hero-glow-2" aria-hidden="true" />
          <div className="fc-hero-inner">
            <span className="fc-hero-badge">Foreign Collaborations</span>
            <h1 className="fc-hero-title">Building Global Partnerships</h1>
            <p className="fc-hero-subtitle">
              Connecting with international partners across 25+ countries to deliver manufacturing excellence and expand our global reach
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="fc-stats">
          <div className="fc-stats-inner">
            {collaborationStats.map((stat, i) => (
              <div key={i} className="fc-stat">
                <span className="fc-stat-icon">{stat.icon}</span>
                <span className="fc-stat-value">{stat.value}</span>
                <span className="fc-stat-label">{stat.label}</span>
                {i < collaborationStats.length - 1 && <span className="fc-stat-sep" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </section>

        {/* Types of Collaborations */}
        <section className="fc-types">
          <div className="fc-types-inner">
            <h2 className="fc-sec-title">Types of Collaborations</h2>
            <div className="fc-sec-rule" />
            <p className="fc-sec-sub">We engage in diverse partnerships to strengthen our global presence</p>
            <div className="fc-types-grid">
              {collaborationTypes.map((t, i) => (
                <article key={i} className="fc-type-card">
                  <div className="fc-type-icon-wrap">
                    <span className="fc-type-icon">{t.icon}</span>
                  </div>
                  <h3 className="fc-type-title">{t.title}</h3>
                  <p className="fc-type-desc">{t.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* International Partners */}
        <section className="fc-partners">
          <div className="fc-partners-inner">
            <h2 className="fc-sec-title">Our International Partners</h2>
            <div className="fc-sec-rule" />
            <p className="fc-sec-sub">Strategic partnerships across continents driving innovation and growth</p>

            <div className="fc-partners-list">
              {collaborations.map((c, i) => (
                <article key={c.id} className={`fc-partner ${i % 2 === 1 ? "fc-partner-reverse" : ""}`}>
                  <div className="fc-partner-media">
                    <div className="fc-partner-img-wrap">
                      <Image
                        src={c.image}
                        alt={c.name}
                        width={560}
                        height={380}
                        sizes="(max-width: 900px) 100vw, 50vw"
                        className="fc-partner-img"
                      />
                    </div>
                  </div>
                  <div className="fc-partner-body">
                    <div className="fc-partner-head">
                      <span className="fc-partner-flag" aria-hidden="true">{c.flag}</span>
                      <div>
                        <h3 className="fc-partner-name">{c.name}</h3>
                        <p className="fc-partner-country">{c.country}</p>
                      </div>
                    </div>
                    <span className="fc-partner-type">{c.type}</span>
                    <p className="fc-partner-desc">{c.description}</p>
                    <div className="fc-partner-meta">
                      <div className="fc-partner-meta-item">
                        <span className="fc-meta-label">Duration</span>
                        <span className="fc-meta-value">{c.duration}</span>
                      </div>
                      <div className="fc-partner-meta-item">
                        <span className="fc-meta-label">Focus</span>
                        <div className="fc-focus-tags">
                          {c.focus.map((f, j) => (
                            <span key={j} className="fc-focus-tag">{f}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="fc-partner-benefit">
                      <span className="fc-benefit-dot" aria-hidden="true" />
                      <p>{c.benefits}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Partner With Us */}
        <section className="fc-why">
          <div className="fc-why-inner">
            <h2 className="fc-sec-title">Why Partner With Us?</h2>
            <div className="fc-sec-rule" />
            <div className="fc-why-grid">
              <article className="fc-why-card">
                <div className="fc-why-icon">🏆</div>
                <h3>Proven Track Record</h3>
                <p>10+ years of manufacturing excellence with 500+ successful projects and 100+ satisfied clients globally.</p>
              </article>
              <article className="fc-why-card">
                <div className="fc-why-icon">✅</div>
                <h3>Quality Certified</h3>
                <p>ISO 9001:2015 certified operations with strict quality control standards ensuring consistent product quality.</p>
              </article>
              <article className="fc-why-card">
                <div className="fc-why-icon">🚀</div>
                <h3>Scalable Operations</h3>
                <p>Modern facilities and automated processes that can scale to meet growing demand and partnership requirements.</p>
              </article>
              <article className="fc-why-card">
                <div className="fc-why-icon">🤝</div>
                <h3>Reliable Partnership</h3>
                <p>Long-term commitment to partnership success with transparent communication and collaborative approach.</p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="fc-cta">
          <div className="fc-cta-pattern" aria-hidden="true" />
          <div className="fc-cta-inner">
            <h2 className="fc-cta-title">Interested in Collaborating?</h2>
            <p className="fc-cta-text">We're always open to exploring new partnerships and opportunities for mutual growth.</p>
            <Link href="/contact" className="fc-cta-btn">
              Get In Touch
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .fc-page {
          min-height: 100vh;
          background: #faf9f7;
          padding-top: 0;
        }

        /* —— Hero —— */
        .fc-hero {
          position: relative;
          min-height: 58vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .fc-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(152deg, #5c0310 0%, #8b1528 35%, #6b0a14 70%, #3d0208 100%);
        }
        .fc-hero-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .fc-hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.35;
          pointer-events: none;
        }
        .fc-hero-glow-1 {
          width: 420px;
          height: 420px;
          background: rgba(201, 162, 77, 0.25);
          top: -120px;
          right: -80px;
        }
        .fc-hero-glow-2 {
          width: 320px;
          height: 320px;
          background: rgba(154, 27, 46, 0.3);
          bottom: -100px;
          left: -60px;
        }
        .fc-hero-inner {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 140px 24px 100px;
          max-width: 820px;
        }
        .fc-hero-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #2d0a0d;
          background: #d4af37;
          padding: 10px 22px;
          border-radius: 100px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.35);
        }
        .fc-hero-title {
          font-size: clamp(36px, 5.8vw, 62px);
          font-weight: 800;
          color: #fdfbf7;
          margin: 0 0 18px;
          letter-spacing: -0.03em;
          line-height: 1.08;
        }
        .fc-hero-subtitle {
          font-size: 17px;
          color: rgba(253, 251, 247, 0.88);
          line-height: 1.65;
          margin: 0;
          font-weight: 500;
        }

        /* —— Stats —— */
        .fc-stats {
          padding: 0 20px;
          margin-top: -48px;
          position: relative;
          z-index: 10;
        }
        .fc-stats-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0;
          background: #fff;
          border-radius: 20px;
          padding: 36px 24px;
          box-shadow: 0 24px 64px rgba(92, 3, 16, 0.12), 0 8px 24px rgba(0,0,0,0.06);
          border: 1px solid rgba(201, 162, 77, 0.2);
        }
        .fc-stat {
          flex: 1 1 180px;
          min-width: 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 20px;
          position: relative;
        }
        .fc-stat-sep {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 48px;
          background: linear-gradient(180deg, transparent, rgba(201, 162, 77, 0.4), transparent);
        }
        .fc-stat:last-child .fc-stat-sep { display: none; }
        .fc-stat-icon {
          font-size: 28px;
          margin-bottom: 8px;
          opacity: 0.9;
        }
        .fc-stat-value {
          font-size: 36px;
          font-weight: 800;
          color: #74060d;
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .fc-stat-label {
          font-size: 11px;
          font-weight: 600;
          color: #6b5a5a;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        /* —— Types —— */
        .fc-types {
          padding: 100px 20px;
          background: #fff;
        }
        .fc-types-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .fc-sec-title {
          font-size: clamp(28px, 3.6vw, 40px);
          font-weight: 800;
          color: #2d0a0d;
          text-align: center;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }
        .fc-sec-rule {
          width: 56px;
          height: 4px;
          background: linear-gradient(90deg, #c9a24d, #e6d3a3);
          margin: 0 auto 20px;
          border-radius: 2px;
        }
        .fc-sec-sub {
          text-align: center;
          font-size: 15px;
          color: #7a5a5a;
          margin: 0 0 48px;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }
        .fc-types-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .fc-type-card {
          background: #faf9f7;
          border: 1px solid rgba(116, 6, 13, 0.08);
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .fc-type-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(92, 3, 16, 0.08);
          border-color: rgba(201, 162, 77, 0.35);
        }
        .fc-type-icon-wrap {
          width: 64px;
          height: 64px;
          margin: 0 auto 20px;
          background: linear-gradient(145deg, #fff 0%, #f0ebe3 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(201, 162, 77, 0.2);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }
        .fc-type-icon {
          font-size: 30px;
        }
        .fc-type-title {
          font-size: 16px;
          font-weight: 700;
          color: #2d0a0d;
          margin: 0 0 10px;
          line-height: 1.3;
        }
        .fc-type-desc {
          font-size: 13px;
          line-height: 1.6;
          color: #6b5a5a;
          margin: 0;
        }

        /* —— Partners —— */
        .fc-partners {
          padding: 100px 20px;
          background: linear-gradient(180deg, #f5f2ed 0%, #ebe6df 100%);
        }
        .fc-partners-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .fc-partners-inner .fc-sec-sub { margin-bottom: 56px; }
        .fc-partners-list {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }
        .fc-partner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 44px;
          align-items: center;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(92, 3, 16, 0.07);
          border: 1px solid rgba(116, 6, 13, 0.06);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .fc-partner:hover {
          box-shadow: 0 20px 56px rgba(92, 3, 16, 0.1);
          transform: translateY(-2px);
        }
        .fc-partner-reverse .fc-partner-media { order: 2; }
        .fc-partner-reverse .fc-partner-body { order: 1; }
        .fc-partner-media {
          padding: 20px 20px 20px 24px;
        }
        .fc-partner-reverse .fc-partner-media { padding: 20px 24px 20px 20px; }
        .fc-partner-img-wrap {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 4/3;
          border: 2px solid rgba(201, 162, 77, 0.25);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.5);
        }
        .fc-partner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .fc-partner-body {
          padding: 32px 32px 32px 20px;
        }
        .fc-partner-reverse .fc-partner-body { padding: 32px 20px 32px 32px; }
        .fc-partner-head {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 12px;
        }
        .fc-partner-flag {
          font-size: 40px;
          line-height: 1;
          flex-shrink: 0;
        }
        .fc-partner-name {
          font-size: 22px;
          font-weight: 800;
          color: #2d0a0d;
          margin: 0 0 4px;
          letter-spacing: -0.02em;
        }
        .fc-partner-country {
          font-size: 14px;
          font-weight: 600;
          color: #9a1b2e;
          margin: 0;
        }
        .fc-partner-type {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #74060d;
          background: rgba(201, 162, 77, 0.2);
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 14px;
        }
        .fc-partner-desc {
          font-size: 15px;
          line-height: 1.65;
          color: #4a3d3d;
          margin: 0 0 18px;
        }
        .fc-partner-meta {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 16px;
          margin-bottom: 18px;
        }
        .fc-partner-meta-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .fc-meta-label {
          font-size: 10px;
          font-weight: 700;
          color: #74060d;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .fc-meta-value {
          font-size: 16px;
          font-weight: 800;
          color: #9a1b2e;
        }
        .fc-focus-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .fc-focus-tag {
          font-size: 11px;
          padding: 4px 10px;
          background: #f5f2ed;
          color: #5c0310;
          border-radius: 8px;
          font-weight: 600;
        }
        .fc-partner-benefit {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 18px;
          background: linear-gradient(135deg, #5c0310 0%, #8b1528 100%);
          border-radius: 12px;
          color: #fdfbf7;
        }
        .fc-benefit-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d4af37;
          flex-shrink: 0;
          margin-top: 7px;
        }
        .fc-partner-benefit p {
          font-size: 13px;
          line-height: 1.55;
          margin: 0;
        }

        /* —— Why —— */
        .fc-why {
          padding: 100px 20px;
          background: #fff;
        }
        .fc-why-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .fc-why-inner .fc-sec-rule { margin-bottom: 48px; }
        .fc-why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .fc-why-card {
          background: #faf9f7;
          border: 1px solid rgba(116, 6, 13, 0.08);
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .fc-why-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(92, 3, 16, 0.08);
        }
        .fc-why-icon {
          font-size: 36px;
          margin-bottom: 16px;
          opacity: 0.95;
        }
        .fc-why-card h3 {
          font-size: 17px;
          font-weight: 700;
          color: #2d0a0d;
          margin: 0 0 10px;
        }
        .fc-why-card p {
          font-size: 13px;
          line-height: 1.6;
          color: #6b5a5a;
          margin: 0;
        }

        /* —— CTA —— */
        .fc-cta {
          position: relative;
          padding: 100px 20px;
          text-align: center;
          background: linear-gradient(155deg, #4a0210 0%, #74060d 40%, #5c0310 100%);
          overflow: hidden;
        }
        .fc-cta-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .fc-cta-inner {
          position: relative;
          z-index: 1;
          max-width: 640px;
          margin: 0 auto;
        }
        .fc-cta-title {
          font-size: clamp(28px, 3.2vw, 38px);
          font-weight: 800;
          color: #fdfbf7;
          margin: 0 0 12px;
          letter-spacing: -0.02em;
        }
        .fc-cta-text {
          font-size: 16px;
          color: rgba(253, 251, 247, 0.9);
          margin: 0 0 32px;
          font-weight: 500;
        }
        .fc-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #2d0a0d;
          background: #d4af37;
          border: none;
          border-radius: 100px;
          text-decoration: none;
          box-shadow: 0 8px 28px rgba(212, 175, 55, 0.35);
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .fc-cta-btn:hover {
          background: #e6c04a;
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(212, 175, 55, 0.45);
        }

        /* —— Responsive —— */
        @media (max-width: 1024px) {
          .fc-types-grid { grid-template-columns: repeat(2, 1fr); }
          .fc-why-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .fc-partner {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .fc-partner-reverse .fc-partner-media,
          .fc-partner-reverse .fc-partner-body { order: unset; }
          .fc-partner-media {
            padding: 24px 24px 0;
          }
          .fc-partner-reverse .fc-partner-media { padding: 24px 24px 0; }
          .fc-partner-body {
            padding: 24px 24px 28px;
          }
          .fc-partner-reverse .fc-partner-body { padding: 24px 24px 28px; }
          .fc-partner-meta { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .fc-stats-inner {
            flex-direction: column;
            align-items: center;
            gap: 24px;
            padding: 32px 20px;
          }
          .fc-stat-sep { display: none !important; }
          .fc-stat { min-width: auto; }
          .fc-types-grid,
          .fc-why-grid { grid-template-columns: 1fr; }
          .fc-types, .fc-partners, .fc-why, .fc-cta { padding: 72px 16px; }
        }
        @media (max-width: 560px) {
          .fc-hero-inner { padding: 120px 16px 80px; }
          .fc-hero-title { font-size: 30px; }
          .fc-hero-subtitle { font-size: 15px; }
          .fc-stats { margin-top: -32px; }
          .fc-sec-title { font-size: 26px; }
          .fc-partner-name { font-size: 19px; }
          .fc-partner-img-wrap { aspect-ratio: 16/10; }
        }
      `}</style>
    </>
  );
}
