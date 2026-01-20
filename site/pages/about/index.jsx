"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

// Gallery images
const galleryImages = [
  { id: 1, src: "/assets/gallery-manufacturing-facility.jpg", alt: "Manufacturing Facility", category: "facility" },
  { id: 2, src: "/assets/gallery-production-line.jpg", alt: "Production Line", category: "production" },
  { id: 3, src: "/assets/gallery-quality-control.jpg", alt: "Quality Control", category: "quality" },
  { id: 4, src: "/assets/gallery-warehouse.jpg", alt: "Warehouse", category: "facility" },
  { id: 5, src: "/assets/product-industrial-paint.png", alt: "Industrial Paints", category: "products" },
  { id: 6, src: "/assets/product-structural-steel.png", alt: "Metal Fabrication", category: "products" },
  { id: 7, src: "/assets/product-student-desk-chair.png", alt: "School Furniture", category: "products" },
  { id: 8, src: "/assets/product-laboratory-table.png", alt: "Laboratory Equipment", category: "products" },
];

// Company values
const companyValues = [
  {
    icon: "🏭",
    title: "Manufacturing Excellence",
    description: "State-of-the-art facilities with modern machinery and automated processes ensuring consistent quality."
  },
  {
    icon: "✅",
    title: "Quality Certified",
    description: "ISO 9001:2015 certified with strict quality control at every stage and premium raw materials."
  },
  {
    icon: "🌍",
    title: "Global Reach",
    description: "Exporting to 15+ countries across Asia, Africa, and Middle East with seamless logistics."
  },
  {
    icon: "🎨",
    title: "Custom Solutions",
    description: "Bespoke solutions tailored to your needs - from custom formulations to made-to-order products."
  }
];

// Company timeline
const timeline = [
  {
    year: "2013",
    title: "Foundation",
    description: "YNM Mega Industries was established with a vision to deliver quality manufacturing and export services."
  },
  {
    year: "2015",
    title: "ISO Certification",
    description: "Achieved ISO 9001:2015 certification, establishing our commitment to quality excellence."
  },
  {
    year: "2018",
    title: "Global Expansion",
    description: "Expanded export operations to 15+ countries across Asia, Africa, and the Middle East."
  },
  {
    year: "2023",
    title: "10 Years of Excellence",
    description: "Celebrated a decade of manufacturing excellence with 500+ projects and 100+ satisfied clients."
  }
];

export default function AboutPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ["all", "facility", "production", "quality", "products"];
  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <>
      <Head>
        <title>About Us - YNM Mega Industries Pvt Ltd</title>
        <meta name="description" content="Learn about YNM Mega Industries - Leading manufacturer and exporter of premium paints, metal fabrications, and school furniture since 2013." />
      </Head>

      <Navbar />

      <main className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-bg" />
          <div className="about-hero-overlay" />
          <div className="about-hero-content">
            <span className="about-tag">ABOUT US</span>
            <h1>Manufacturing Excellence Since 2013</h1>
            <p>Leading manufacturer and exporter delivering quality products to global markets</p>
          </div>
        </section>

        {/* Company Story Section */}
        <section className="about-story">
          <div className="about-story-container">
            <div className="about-story-content">
              <h2>Our Story</h2>
              <div className="story-divider" />
              <p>
                YNM Mega Industries Pvt Ltd was founded in 2013 with a vision to become a leading 
                manufacturer and exporter of premium industrial products. What started as a small operation 
                has grown into a trusted partner for businesses across India and 15+ countries worldwide.
              </p>
              <p>
                Over the past decade, we have built a reputation for manufacturing excellence, quality 
                assurance, and reliable export services. Our state-of-the-art facility is equipped with 
                modern machinery and automated processes, ensuring consistent quality and timely delivery 
                for every project.
              </p>
              <p>
                Today, we manufacture premium paints, metal fabrications, school furniture, and safety 
                equipment, serving diverse industries from construction to education. Our commitment to 
                quality, innovation, and customer satisfaction drives everything we do.
              </p>
            </div>
            <div className="about-story-image">
              <Image
                src="/assets/gallery-manufacturing-facility.jpg"
                alt="YNM Manufacturing Facility"
                width={600}
                height={400}
                style={{ objectFit: "cover", borderRadius: "16px" }}
              />
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="about-timeline">
          <div className="timeline-container">
            <h2>Our Journey</h2>
            <div className="story-divider" />
            <div className="timeline-grid">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-values">
          <div className="values-container">
            <h2>Our Core Values</h2>
            <div className="story-divider" />
            <div className="values-grid">
              {companyValues.map((value, index) => (
                <div key={index} className="value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="about-gallery">
          <div className="gallery-container">
            <h2>Our Gallery</h2>
            <div className="story-divider" />
            <p className="gallery-subtitle">Take a look at our facilities, production processes, and products</p>
            
            {/* Category Filter */}
            <div className="gallery-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="gallery-grid">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="gallery-item"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={300}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="gallery-overlay">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="about-stats">
          <div className="about-stats-container">
            <div className="about-stat">
              <div className="about-stat-value">10+</div>
              <div className="about-stat-label">Years Experience</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-value">500+</div>
              <div className="about-stat-label">Projects Delivered</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-value">15+</div>
              <div className="about-stat-label">Export Countries</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-value">100+</div>
              <div className="about-stat-label">Happy Clients</div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="about-mission">
          <div className="mission-container">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To deliver premium quality manufacturing and export services that exceed customer expectations, 
                while maintaining the highest standards of quality, innovation, and reliability in every product we create.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>
                To become a globally recognized manufacturing and export company, known for product excellence, 
                innovation, and reliability, while expanding our presence across continents.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="about-cta-content">
            <h2>Ready to Work With Us?</h2>
            <p>Get in touch to discuss your manufacturing and export requirements.</p>
            <Link href="/contact" className="about-cta-btn">
              Contact Us
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "90vh" }}
            />
            <p className="modal-caption">{selectedImage.alt}</p>
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        .about-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #F7F3EA 0%, #E6D3A3 100%);
          padding-top: 100px;
        }

        /* Hero Section */
        .about-hero {
          position: relative;
          height: 60vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .about-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 50%, #5a0509 100%);
        }

        .about-hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 40%, rgba(201, 162, 77, 0.2), transparent 60%),
                      radial-gradient(circle at 70% 60%, rgba(154, 27, 46, 0.15), transparent 50%);
        }

        .about-hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 20px;
        }

        .about-tag {
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

        .about-hero-content h1 {
          font-size: clamp(40px, 7vw, 72px);
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }

        .about-hero-content p {
          font-size: 20px;
          color: #E6D3A3;
          max-width: 700px;
          margin: 0 auto;
          font-weight: 500;
        }

        /* Story Section */
        .about-story {
          padding: 100px 20px;
          background: #FFFFFF;
        }

        .about-story-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .about-story-content h2 {
          font-size: 42px;
          font-weight: 800;
          color: #74060D;
          margin: 0 0 20px;
        }

        .story-divider {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #C9A24D 0%, #E6D3A3 100%);
          margin: 0 0 30px;
          border-radius: 2px;
        }

        .about-story-content p {
          font-size: 16px;
          line-height: 1.8;
          color: #5a4a4a;
          margin: 0 0 20px;
        }

        .about-story-image {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(116, 6, 13, 0.2);
        }

        /* Timeline Section */
        .about-timeline {
          padding: 100px 20px;
          background: linear-gradient(180deg, #F7F3EA 0%, #E6D3A3 100%);
        }

        .timeline-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .timeline-container h2 {
          font-size: 42px;
          font-weight: 800;
          color: #74060D;
          text-align: center;
          margin: 0 0 20px;
        }

        .timeline-container .story-divider {
          margin: 0 auto 60px;
        }

        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
        }

        .timeline-item {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(116, 6, 13, 0.1);
          border-left: 4px solid #C9A24D;
          transition: transform 0.3s ease;
        }

        .timeline-item:hover {
          transform: translateY(-5px);
        }

        .timeline-year {
          font-size: 32px;
          font-weight: 900;
          color: #C9A24D;
          margin-bottom: 12px;
        }

        .timeline-content h3 {
          font-size: 20px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 10px;
        }

        .timeline-content p {
          font-size: 14px;
          line-height: 1.6;
          color: #666;
          margin: 0;
        }

        /* Values Section */
        .about-values {
          padding: 100px 20px;
          background: #FFFFFF;
        }

        .values-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .values-container h2 {
          font-size: 42px;
          font-weight: 800;
          color: #74060D;
          text-align: center;
          margin: 0 0 20px;
        }

        .values-container .story-divider {
          margin: 0 auto 60px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .value-card {
          background: linear-gradient(135deg, #F7F3EA 0%, #E6D3A3 100%);
          border-radius: 16px;
          padding: 40px 30px;
          text-align: center;
          border: 2px solid rgba(201, 162, 77, 0.3);
          transition: all 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(116, 6, 13, 0.15);
        }

        .value-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .value-card h3 {
          font-size: 20px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 12px;
        }

        .value-card p {
          font-size: 14px;
          line-height: 1.6;
          color: #5a4a4a;
          margin: 0;
        }

        /* Gallery Section */
        .about-gallery {
          padding: 100px 20px;
          background: linear-gradient(180deg, #F7F3EA 0%, #E6D3A3 100%);
        }

        .gallery-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .gallery-container h2 {
          font-size: 42px;
          font-weight: 800;
          color: #74060D;
          text-align: center;
          margin: 0 0 20px;
        }

        .gallery-container .story-divider {
          margin: 0 auto 20px;
        }

        .gallery-subtitle {
          text-align: center;
          font-size: 16px;
          color: #9A1B2E;
          margin: 0 0 40px;
        }

        .gallery-filters {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 600;
          color: #74060D;
          background: #FFFFFF;
          border: 2px solid #E6D3A3;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          background: #F7F3EA;
          border-color: #C9A24D;
        }

        .filter-btn.active {
          background: #C9A24D;
          color: #74060D;
          border-color: #C9A24D;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .gallery-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 4/3;
          box-shadow: 0 10px 30px rgba(116, 6, 13, 0.15);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover {
          transform: scale(1.05);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: rgba(116, 6, 13, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-overlay svg {
          color: #FFFFFF;
        }

        /* Stats Section */
        .about-stats {
          padding: 80px 20px;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%);
        }

        .about-stats-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
        }

        .about-stat {
          text-align: center;
          background: rgba(247, 243, 234, 0.1);
          border: 2px solid rgba(201, 162, 77, 0.3);
          border-radius: 20px;
          padding: 40px 20px;
          backdrop-filter: blur(10px);
        }

        .about-stat-value {
          font-size: 48px;
          font-weight: 900;
          color: #C9A24D;
          margin-bottom: 12px;
        }

        .about-stat-label {
          font-size: 14px;
          font-weight: 600;
          color: #E6D3A3;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Mission Section */
        .about-mission {
          padding: 100px 20px;
          background: #FFFFFF;
        }

        .mission-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 40px;
        }

        .mission-card {
          background: linear-gradient(135deg, #F7F3EA 0%, #E6D3A3 100%);
          border-radius: 20px;
          padding: 50px 40px;
          text-align: center;
          border: 2px solid rgba(201, 162, 77, 0.3);
        }

        .mission-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .mission-card h3 {
          font-size: 28px;
          font-weight: 800;
          color: #74060D;
          margin: 0 0 20px;
        }

        .mission-card p {
          font-size: 16px;
          line-height: 1.8;
          color: #5a4a4a;
          margin: 0;
        }

        /* CTA Section */
        .about-cta {
          padding: 100px 20px;
          text-align: center;
          background: linear-gradient(180deg, #F7F3EA 0%, #E6D3A3 100%);
        }

        .about-cta-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .about-cta h2 {
          font-size: 42px;
          font-weight: 800;
          color: #74060D;
          margin: 0 0 16px;
        }

        .about-cta p {
          font-size: 18px;
          color: #9A1B2E;
          margin: 0 0 40px;
          font-weight: 500;
        }

        .about-cta-btn {
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
          border: 2px solid #E6D3A3;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .about-cta-btn:hover {
          background: #E6D3A3;
          color: #9A1B2E;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(201, 162, 77, 0.4);
        }

        /* Image Modal */
        .image-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }

        .image-modal {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .modal-close {
          position: absolute;
          top: -50px;
          right: 0;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #FFFFFF;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .modal-caption {
          color: #FFFFFF;
          font-size: 16px;
          margin-top: 20px;
          text-align: center;
        }

        @media (max-width: 968px) {
          .about-story-container {
            grid-template-columns: 1fr;
          }

          .mission-container {
            grid-template-columns: 1fr;
          }

          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }

        @media (max-width: 600px) {
          .about-hero {
            height: 50vh;
            min-height: 400px;
          }

          .about-story,
          .about-timeline,
          .about-values,
          .about-gallery,
          .about-mission,
          .about-cta {
            padding: 60px 16px;
          }

          .about-story-content h2,
          .timeline-container h2,
          .values-container h2,
          .gallery-container h2 {
            font-size: 32px;
          }

          .timeline-grid,
          .values-grid {
            grid-template-columns: 1fr;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
