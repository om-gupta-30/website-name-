"use client";

import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

// Detailed client data
const clientsData = [
  {
    id: "1",
    name: "Elite Constructions",
    logo: "/assets/client-logo-elite-constructions.png",
    industry: "Construction & Infrastructure",
    location: "India",
    yearsOfPartnership: 5,
    relationship: "Long-term partner for structural steel and industrial paints. We've supplied premium materials for over 20 major construction projects.",
    products: ["Structural Steel", "Industrial Paints", "Epoxy Coatings"],
    testimonial: "YNM has been our trusted supplier for structural components. Their quality and reliability are unmatched."
  },
  {
    id: "2",
    name: "Global Exports Ltd",
    logo: "/assets/client-logo-global-exports.png",
    industry: "International Trading",
    location: "Multiple Countries",
    yearsOfPartnership: 4,
    relationship: "Key export partner helping us reach markets across Asia and Africa. They handle our logistics and distribution network.",
    products: ["Road Marking Paints", "Safety Equipment"],
    testimonial: "Excellent export services and product quality. YNM makes international trade seamless."
  },
  {
    id: "3",
    name: "Sunrise Builders",
    logo: "/assets/client-logo-sunrise-builders.png",
    industry: "Real Estate Development",
    location: "India",
    yearsOfPartnership: 3,
    relationship: "Reliable supplier for decorative paints and metal fabrication. Their products enhance our project quality significantly.",
    products: ["Decorative Paints", "Metal Fabrication"],
    testimonial: "Quality products and timely delivery. YNM understands our project needs perfectly."
  },
  {
    id: "4",
    name: "Prime Education",
    logo: "/assets/client-logo-prime-education.png",
    industry: "Education",
    location: "India",
    yearsOfPartnership: 6,
    relationship: "Exclusive supplier for school furniture across multiple educational institutions. We've furnished over 50 schools together.",
    products: ["School Furniture", "Laboratory Tables", "Library Shelving"],
    testimonial: "Durable and safe furniture for our students. YNM's products have improved our learning environments."
  },
  {
    id: "5",
    name: "Interior Solutions",
    logo: "/assets/client-logo-interior-solutions.png",
    industry: "Interior Design",
    location: "India",
    yearsOfPartnership: 4,
    relationship: "Premium decorative paints and wood finishes partner. Their products are featured in high-end residential and commercial projects.",
    products: ["Decorative Paints", "Wood Finish Lacquer"],
    testimonial: "The quality of decorative paints from YNM is unmatched. Our clients love the finish and durability."
  },
  {
    id: "6",
    name: "Gulf Traders LLC",
    logo: "/assets/client-logo-gulf-traders.png",
    industry: "International Trading",
    location: "Middle East",
    yearsOfPartnership: 5,
    relationship: "Strategic export partner for Middle Eastern markets. We've successfully exported to 8 countries through them.",
    products: ["All Product Categories"],
    testimonial: "Seamless export process and premium products. YNM has been our trusted supplier for 5 years."
  },
  {
    id: "7",
    name: "Metro Developers",
    logo: "/assets/client-logo-metro-developers.png",
    industry: "Real Estate",
    location: "India",
    yearsOfPartnership: 2,
    relationship: "Growing partnership for industrial paints and metal fabrication. They value our quality and competitive pricing.",
    products: ["Industrial Paints", "Metal Fabrication"],
    testimonial: "Great quality and service. YNM delivers exactly what they promise."
  },
  {
    id: "8",
    name: "Kenya Imports Co",
    logo: "/assets/client-logo-kenya-imports.png",
    industry: "International Trading",
    location: "Kenya, Africa",
    yearsOfPartnership: 3,
    relationship: "Key African market partner. We've established a strong presence in East Africa through this partnership.",
    products: ["School Furniture", "Safety Equipment", "Paints"],
    testimonial: "Best supplier for African markets. Competitive pricing, reliable shipping, and products that meet international standards."
  }
];

export default function ClientsPage() {

  return (
    <>
      <Head>
        <title>Our Clients - YNM Mega Industries Pvt Ltd</title>
        <meta name="description" content="Trusted by leading companies and institutions across India and globally. See our client portfolio and partnerships." />
      </Head>

      <Navbar />

      <main className="clients-page">
        {/* Hero Section */}
        <section className="clients-hero">
          <div className="clients-hero-bg" />
          <div className="clients-hero-overlay" />
          <div className="clients-hero-content">
            <span className="clients-tag">OUR CLIENTS</span>
            <h1>Our Valued Clients & Partners</h1>
            <p>Trusted by leading companies and institutions across India and globally. Building lasting relationships through quality and reliability.</p>
          </div>
        </section>

        {/* Clients Grid */}
        <section className="clients-grid-section">
          <div className="clients-container">
            {clientsData.map((client) => (
              <div key={client.id} className="client-card">
                <div className="client-card-header">
                  <div className="client-logo-wrapper">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={120}
                      height={80}
                      className="client-logo"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="client-basic-info">
                    <h3>{client.name}</h3>
                    <p className="client-industry">{client.industry}</p>
                    <p className="client-location">📍 {client.location}</p>
                  </div>
                </div>
                
                <div className="client-card-body">
                  <div className="client-partnership-badge">
                    <span className="partnership-years">{client.yearsOfPartnership} Years</span>
                    <span className="partnership-label">Partnership</span>
                  </div>
                  
                  <p className="client-relationship">{client.relationship}</p>
                  
                  <div className="client-products">
                    <strong>Products Supplied:</strong>
                    <div className="products-tags">
                      {client.products.map((product, idx) => (
                        <span key={idx} className="product-tag">{product}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="client-testimonial">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.6 }}>
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                    <p>"{client.testimonial}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="clients-cta">
          <div className="clients-cta-content">
            <h2>Want to Become Our Client?</h2>
            <p>Join our network of satisfied clients and experience quality manufacturing and reliable export services.</p>
            <Link href="/contact" className="clients-cta-btn">
              Get Started
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .clients-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #F7F3EA 0%, #E6D3A3 100%);
          padding-top: 100px;
        }

        /* Hero Section */
        .clients-hero {
          position: relative;
          height: 50vh;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .clients-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 50%, #5a0509 100%);
        }

        .clients-hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 40%, rgba(201, 162, 77, 0.2), transparent 60%),
                      radial-gradient(circle at 70% 60%, rgba(154, 27, 46, 0.15), transparent 50%);
        }

        .clients-hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 20px;
        }

        .clients-tag {
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

        .clients-hero-content h1 {
          font-size: clamp(40px, 7vw, 64px);
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }

        .clients-hero-content p {
          font-size: 18px;
          color: #E6D3A3;
          max-width: 700px;
          margin: 0 auto;
          font-weight: 500;
        }

        /* Clients Grid Section */
        .clients-grid-section {
          padding: 80px 20px;
        }

        .clients-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        .client-card {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(116, 6, 13, 0.1);
          transition: all 0.3s ease;
          border: 1px solid rgba(201, 162, 77, 0.2);
        }

        .client-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(116, 6, 13, 0.15);
        }

        .client-card-header {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 2px solid #F7F3EA;
        }

        .client-logo-wrapper {
          flex-shrink: 0;
          width: 120px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F7F3EA;
          border-radius: 8px;
          padding: 10px;
        }

        .client-logo {
          max-width: 100%;
          max-height: 100%;
        }

        .client-basic-info {
          flex: 1;
        }

        .client-basic-info h3 {
          font-size: 20px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 6px;
        }

        .client-industry {
          font-size: 14px;
          color: #9A1B2E;
          font-weight: 600;
          margin: 0 0 4px;
        }

        .client-location {
          font-size: 13px;
          color: #666;
          margin: 0;
        }

        .client-card-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .client-partnership-badge {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%);
          color: #F7F3EA;
          padding: 12px 20px;
          border-radius: 8px;
          width: fit-content;
        }

        .partnership-years {
          font-size: 24px;
          font-weight: 800;
          line-height: 1;
        }

        .partnership-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.9;
        }

        .client-relationship {
          font-size: 14px;
          color: #333;
          line-height: 1.6;
          margin: 0;
        }

        .client-products {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .client-products strong {
          font-size: 13px;
          color: #74060D;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .products-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .product-tag {
          font-size: 12px;
          padding: 4px 10px;
          background: #F7F3EA;
          color: #74060D;
          border-radius: 12px;
          font-weight: 500;
        }

        .client-testimonial {
          display: flex;
          gap: 10px;
          padding: 12px;
          background: #F7F3EA;
          border-radius: 8px;
          border-left: 3px solid #C9A24D;
        }

        .client-testimonial svg {
          flex-shrink: 0;
          color: #C9A24D;
        }

        .client-testimonial p {
          font-size: 13px;
          color: #555;
          font-style: italic;
          margin: 0;
          line-height: 1.5;
        }

        /* CTA Section */
        .clients-cta {
          padding: 80px 20px;
          text-align: center;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%);
        }

        .clients-cta-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .clients-cta h2 {
          font-size: 32px;
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 12px;
        }

        .clients-cta p {
          font-size: 16px;
          color: #E6D3A3;
          margin: 0 0 30px;
          font-weight: 500;
        }

        .clients-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 40px;
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #74060D;
          background: #C9A24D;
          border: 3px solid #E6D3A3;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(201, 162, 77, 0.3);
          cursor: pointer;
        }

        .clients-cta-btn:hover {
          background: #E6D3A3;
          color: #74060D;
          border-color: #C9A24D;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(201, 162, 77, 0.5);
        }

        .clients-cta-btn:active {
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .clients-container {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .clients-hero {
            height: 40vh;
            min-height: 300px;
          }

          .clients-cta {
            padding: 60px 16px;
          }

          .clients-cta h2 {
            font-size: 28px;
          }

          .clients-grid-section {
            padding: 60px 16px;
          }
        }
      `}</style>
    </>
  );
}
