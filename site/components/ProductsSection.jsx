"use client";

import Image from "next/image";
import Link from "next/link";

const productConfig = [
  { 
    id: "paints", 
    image: "/assets/product-industrial-paint.png", 
    link: "/products?category=paints", 
    title: "Paints", 
    description: "High-quality industrial and decorative paints for every surface. Durable, vibrant, and eco-friendly formulations for long-lasting protection." 
  },
  { 
    id: "road-safety-furniture", 
    image: "/assets/product-industrial-racking.png", 
    link: "/products?category=road-safety-furniture", 
    title: "Road Safety Furniture", 
    description: "Essential road safety equipment including guardrails, bollards, and traffic barriers designed for maximum durability and safety compliance." 
  },
  { 
    id: "crash-barriers", 
    image: "/assets/product-structural-steel.png", 
    link: "/products?category=crash-barriers", 
    title: "Metal Beam Crash Barriers", 
    description: "High-strength metal beam crash barriers and W-beam guardrails for highways and expressways. Engineered for maximum impact resistance." 
  },
  { 
    id: "signages", 
    image: "/assets/product-exterior-weather-coat.png", 
    link: "/products?category=signages", 
    title: "Signages", 
    description: "Retro-reflective sign boards and traffic signages for roads and highways. High visibility and weather-resistant for optimal safety." 
  },
  { 
    id: "fabrication", 
    image: "/assets/product-custom-metal-enclosure.png", 
    link: "/products?category=fabrication", 
    title: "Fabrication", 
    description: "Custom steel and metal fabrication solutions. From structural components to precision-engineered parts for all industrial needs." 
  },
  { 
    id: "school-furniture", 
    image: "/assets/product-student-desk-chair.png", 
    link: "/products?category=furniture", 
    title: "School Furniture", 
    description: "Ergonomic and durable furniture for educational institutions. Desks, chairs, and complete classroom solutions built to last." 
  },
];

export default function ProductsSection() {
  return (
    <section id="products-section" className="ps">
      {/* Neon Particles */}
      <div className="neon-particles">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="neon-particle" />
        ))}
      </div>

      {/* Header */}
      <div className="ps-header">
        <Link href="/products" className="ps-tag">Our Products</Link>
        <h2>Manufacturers and Exporters of Premium Industrial Products</h2>
        <div className="ps-bar" />
      </div>

      {/* Products Grid - 3 columns */}
      <div className="ps-products-grid-container">
        <div className="ps-products-grid">
          {productConfig.map((product, index) => (
            <div key={product.id} className="ps-product-card">
              <div className="ps-product-image">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="ps-product-overlay" />
              </div>
              <div className="ps-product-content">
                <span className="ps-product-num">0{index + 1}</span>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <Link href={product.link} className="ps-product-cta">
                  Explore
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
