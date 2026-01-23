import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllProducts as getEnhancedProducts } from "@/lib/productsData";

// All products organized under Manufacturing (all products are manufactured and exported)
const productsData = {
  manufacturing: {
    title: "What We Manufacture",
    description: "Premium quality products manufactured in-house with strict quality control. All our products are exported to 15+ countries worldwide.",
    icon: "🏭",
    categories: {
      paints: {
        title: "Paints",
        description: "High-quality industrial and decorative paints for every surface. Durable, vibrant, and eco-friendly formulations for long-lasting protection.",
        icon: "🎨",
        products: [
          {
            id: "p1",
            name: "Industrial Enamel Paint",
            desc: "Heavy-duty enamel paint for industrial machinery and equipment. Excellent corrosion resistance.",
            image: "/assets/product-industrial-paint.png",
            specs: ["Oil-based formula", "High gloss finish", "5-year durability", "Heat resistant up to 200°C"]
          },
          {
            id: "p2",
            name: "Exterior Weather Coat",
            desc: "All-weather protection for exterior walls. UV resistant and waterproof formulation.",
            image: "/assets/product-exterior-weather-coat.png",
            specs: ["Acrylic-based", "UV protection", "Anti-fungal", "10-year warranty"]
          },
          {
            id: "p3",
            name: "Epoxy Floor Coating",
            desc: "Industrial-grade epoxy coating for warehouses, factories, and commercial spaces.",
            image: "/assets/product-epoxy-floor-coating.png",
            specs: ["Two-component epoxy", "Chemical resistant", "Anti-slip option", "Heavy traffic rated"]
          },
          {
            id: "p4",
            name: "Wood Finish Lacquer",
            desc: "Premium wood finish for furniture and interior woodwork. Crystal clear finish.",
            image: "/assets/product-wood-finish-lacquer.png",
            specs: ["Nitrocellulose base", "Quick drying", "Scratch resistant", "Multiple sheen levels"]
          }
        ]
      },
      "road-safety-furniture": {
        title: "Road Safety Furniture",
        description: "Essential road safety equipment including guardrails, bollards, and traffic barriers designed for maximum durability and safety compliance.",
        icon: "🛣️",
        products: [
          {
            id: "rsf1",
            name: "Traffic Bollards",
            desc: "High-visibility traffic bollards for pedestrian safety and traffic management.",
            image: "/assets/product-industrial-racking.png",
            specs: ["Reflective strips", "Steel construction", "Weather resistant", "Easy installation"]
          },
          {
            id: "rsf2",
            name: "Guardrail Posts",
            desc: "Durable guardrail posts for road safety barriers and median dividers.",
            image: "/assets/product-structural-steel.png",
            specs: ["Galvanized steel", "IS certified", "Corrosion resistant", "Long service life"]
          },
          {
            id: "rsf3",
            name: "Road Delineators",
            desc: "Flexible road delineators for lane marking and traffic guidance.",
            image: "/assets/product-custom-metal-enclosure.png",
            specs: ["Flexible design", "High visibility", "Impact resistant", "Easy maintenance"]
          }
        ]
      },
      "crash-barriers": {
        title: "Metal Beam Crash Barriers",
        description: "High-strength metal beam crash barriers and W-beam guardrails for highways and expressways. Engineered for maximum impact resistance.",
        icon: "🛡️",
        products: [
          {
            id: "cb1",
            name: "W-Beam Crash Barrier",
            desc: "Standard W-beam crash barriers for highways and expressways. Maximum impact resistance.",
            image: "/assets/product-structural-steel.png",
            specs: ["W-beam profile", "Galvanized finish", "IS 14687 certified", "High tensile strength"]
          },
          {
            id: "cb2",
            name: "Thrie-Beam Guardrail",
            desc: "Heavy-duty thrie-beam guardrails for high-speed highways and bridges.",
            image: "/assets/product-structural-steel.png",
            specs: ["Thrie-beam profile", "Extra strength", "Bridge applications", "Long span capability"]
          },
          {
            id: "cb3",
            name: "Terminal End Treatment",
            desc: "Safety terminal end treatments for crash barrier systems.",
            image: "/assets/product-custom-metal-enclosure.png",
            specs: ["Energy absorbing", "Safe termination", "Easy installation", "IS certified"]
          }
        ]
      },
      signages: {
        title: "Signages",
        description: "Retro-reflective sign boards and traffic signages for roads and highways. High visibility and weather-resistant for optimal safety.",
        icon: "🚦",
        products: [
          {
            id: "sg1",
            name: "Retro-Reflective Sign Boards",
            desc: "High-visibility retro-reflective sign boards for highways and urban roads.",
            image: "/assets/product-exterior-weather-coat.png",
            specs: ["Retro-reflective film", "Aluminum substrate", "Weather resistant", "Long visibility range"]
          },
          {
            id: "sg2",
            name: "Traffic Signages",
            desc: "Standard traffic signages for regulatory, warning, and informational purposes.",
            image: "/assets/product-exterior-weather-coat.png",
            specs: ["IRR 2000 compliant", "Multiple sizes", "Durable materials", "Easy installation"]
          },
          {
            id: "sg3",
            name: "Directional Sign Boards",
            desc: "Large format directional and destination sign boards for highways.",
            image: "/assets/product-exterior-weather-coat.png",
            specs: ["High visibility", "Custom sizes", "Weatherproof", "Long service life"]
          }
        ]
      },
      fabrication: {
        title: "Fabrication",
        description: "Custom steel and metal fabrication solutions. From structural components to precision-engineered parts for all industrial needs.",
        icon: "⚙️",
        products: [
          {
            id: "f1",
            name: "Structural Steel Components",
            desc: "Heavy-duty structural steel for construction and infrastructure projects.",
            image: "/assets/product-structural-steel.png",
            specs: ["MS & SS options", "Custom dimensions", "IS certified", "Corrosion protected"]
          },
          {
            id: "f2",
            name: "Industrial Racking Systems",
            desc: "Heavy-duty storage solutions for warehouses and factories.",
            image: "/assets/product-industrial-racking.png",
            specs: ["Load capacity: 500kg/shelf", "Powder coated", "Modular design", "Easy assembly"]
          },
          {
            id: "f3",
            name: "Custom Metal Enclosures",
            desc: "Precision-engineered enclosures for electrical and industrial equipment.",
            image: "/assets/product-custom-metal-enclosure.png",
            specs: ["Sheet metal fabrication", "IP65 rating available", "Powder coating", "Custom cutouts"]
          }
        ]
      },
      furniture: {
        title: "School Furniture",
        description: "Ergonomic and durable furniture for educational institutions. Desks, chairs, and complete classroom solutions built to last.",
        icon: "🪑",
        products: [
          {
            id: "s1",
            name: "Student Desk & Chair Set",
            desc: "Ergonomic classroom furniture designed for comfort and durability.",
            image: "/assets/product-student-desk-chair.png",
            specs: ["Steel frame", "Laminated top", "Adjustable height", "10-year warranty"]
          },
          {
            id: "s2",
            name: "Laboratory Tables",
            desc: "Chemical-resistant lab tables for science laboratories.",
            image: "/assets/product-laboratory-table.png",
            specs: ["Acid resistant top", "Steel frame", "Sink cutout option", "Chemical resistant"]
          },
          {
            id: "s3",
            name: "Library Shelving Units",
            desc: "Modular library shelving systems for schools and colleges.",
            image: "/assets/product-library-shelving.png",
            specs: ["Heavy-duty steel", "Adjustable shelves", "Book dividers", "Label holders"]
          }
        ]
      }
    }
  }
};

// Helper function to get all products with their IDs for routing
export function getAllProducts() {
  const allProducts = [];
  Object.values(productsData.manufacturing.categories).forEach((category) => {
    category.products.forEach((product) => {
      allProducts.push(product);
    });
  });
  return allProducts;
}

// Helper function to get product by ID
export function getProductById(id) {
  const allProducts = getAllProducts();
  return allProducts.find((p) => p.id === id);
}

// Get all products (enhanced + legacy)
export function getAllProductsCombined() {
  const enhanced = getEnhancedProducts();
  const legacy = getAllProducts();
  // Merge and deduplicate by ID
  const combined = [...enhanced];
  legacy.forEach(legacyProduct => {
    if (!combined.find(p => p.id === legacyProduct.id)) {
      combined.push(legacyProduct);
    }
  });
  return combined;
}

export default function ProductsPage() {
  const router = useRouter();
  const { category } = router.query;
  const [activeCategory, setActiveCategory] = useState(category || "all");

  useEffect(() => {
    if (category) {
      setActiveCategory(category);
    }
  }, [category]);

  const handleCategoryChange = (categoryKey) => {
    setActiveCategory(categoryKey);
    if (categoryKey === "all") {
      router.push('/products', undefined, { shallow: true });
    } else {
      router.push(`/products?category=${categoryKey}`, undefined, { shallow: true });
    }
  };

  const handleProductClick = (product) => {
    router.push(`/products/${product.id}`);
  };

  // Get all categories
  const categories = Object.entries(productsData.manufacturing.categories);
  
  // Get all products
  const allProducts = getAllProducts();
  
  // Filter products by category
  const filteredProducts = activeCategory === "all" 
    ? allProducts 
    : categories.find(([key]) => key === activeCategory)?.[1]?.products || [];

  return (
    <>
      <Head>
        <title>Our Products - YNM Mega Industries</title>
        <meta name="description" content="Explore our range of premium paints, metal fabrication, and school furniture products." />
      </Head>

      <Navbar />

      <main className="products-page">
        {/* Hero Section */}
        <section className="products-hero">
          <div className="products-hero-bg" />
          <div className="products-hero-overlay" />
          <div className="products-hero-content">
            <span className="products-hero-tag">Our Products</span>
            <h1>Quality Products for Every Need</h1>
            <p>Explore our comprehensive range of premium paints, metal fabrication, and school furniture</p>
          </div>
        </section>

        {/* Category Filter Tabs */}
        <section className="products-categories-section">
          <div className="products-categories-container">
            <button
              className={`category-tab ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => handleCategoryChange("all")}
            >
              <span className="tab-icon">🌟</span>
              <span>All Products</span>
              <span className="tab-count">({allProducts.length})</span>
            </button>
            {categories.map(([categoryKey, category]) => (
              <button
                key={categoryKey}
                className={`category-tab ${activeCategory === categoryKey ? "active" : ""}`}
                onClick={() => handleCategoryChange(categoryKey)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span>{category.title}</span>
                <span className="tab-count">({category.products.length})</span>
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid Section */}
        <section className="products-grid-section">
          <div className="products-grid-container">
            {activeCategory === "all" ? (
              // Show products grouped by category
              categories.map(([categoryKey, category]) => (
                <div key={categoryKey} className="category-group">
                  <div className="category-group-header">
                    <div className="category-group-icon">{category.icon}</div>
                    <div>
                      <h2>{category.title}</h2>
                      <p>{category.description}</p>
                    </div>
                  </div>
                  <div className="products-grid">
                    {category.products.map((product) => (
                      <div
                        key={product.id}
                        className="product-card"
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="product-card-image">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                          <div className="product-card-overlay" />
                          <div className="product-card-badge">{category.title}</div>
                        </div>
                        <div className="product-card-content">
                          <h3>{product.name}</h3>
                          <p>{product.desc}</p>
                          <div className="product-card-specs">
                            {product.specs.slice(0, 2).map((spec, i) => (
                              <span key={i} className="spec-tag">{spec}</span>
                            ))}
                          </div>
                          <div className="product-card-footer">
                            <span className="product-card-cta">
                              View Details
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Show filtered products
              <div className="products-grid">
                {filteredProducts.map((product) => {
                  const category = categories.find(([_, cat]) => 
                    cat.products.some(p => p.id === product.id)
                  )?.[1];
                  
                  return (
                    <div
                      key={product.id}
                      className="product-card"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="product-card-image">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        <div className="product-card-overlay" />
                        <div className="product-card-badge">{category?.title}</div>
                      </div>
                      <div className="product-card-content">
                        <h3>{product.name}</h3>
                        <p>{product.desc}</p>
                        <div className="product-card-specs">
                          {product.specs.slice(0, 2).map((spec, i) => (
                            <span key={i} className="spec-tag">{spec}</span>
                          ))}
                        </div>
                        <div className="product-card-footer">
                          <span className="product-card-cta">
                            View Details
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="products-cta">
          <div className="products-cta-content">
            <h2>Need Custom Products?</h2>
            <p>We offer customization across all product categories. Contact us with your requirements.</p>
            <Link href="/contact" className="products-cta-btn">
              Contact Us
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .products-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #F7F3EA 0%, #E6D3A3 100%);
        }

        /* Hero Section */
        .products-hero {
          position: relative;
          height: 50vh;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .products-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 50%, #5a0509 100%);
        }

        .products-hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(201, 162, 77, 0.2) 0%, transparent 70%);
        }

        .products-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 20px;
        }

        .products-hero-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #74060D;
          padding: 8px 20px;
          background: #C9A24D;
          border: 2px solid #E6D3A3;
          border-radius: 30px;
          margin-bottom: 20px;
        }

        .products-hero-content h1 {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 16px;
        }

        .products-hero-content p {
          font-size: 16px;
          color: #E6D3A3;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 500;
        }

        /* Category Tabs Section */
        .products-categories-section {
          padding: 40px 20px;
          background: white;
          border-bottom: 2px solid #E6D3A3;
          position: sticky;
          top: 100px;
          z-index: 10;
          box-shadow: 0 4px 20px rgba(116, 6, 13, 0.05);
        }

        .products-categories-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .category-tab {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 600;
          color: #9A1B2E;
          background: #F7F3EA;
          border: 2px solid #E6D3A3;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .category-tab:hover {
          background: #E6D3A3;
          border-color: #C9A24D;
          transform: translateY(-2px);
        }

        .category-tab.active {
          background: linear-gradient(135deg, #74060D, #9A1B2E);
          color: #F7F3EA;
          border-color: #C9A24D;
          box-shadow: 0 8px 25px rgba(116, 6, 13, 0.3);
        }

        .tab-icon {
          font-size: 20px;
        }

        .tab-count {
          font-size: 12px;
          opacity: 0.8;
          font-weight: 500;
        }

        /* Products Grid Section */
        .products-grid-section {
          padding: 60px 20px;
        }

        .products-grid-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .category-group {
          margin-bottom: 80px;
        }

        .category-group:last-child {
          margin-bottom: 0;
        }

        .category-group-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 3px solid #C9A24D;
        }

        .category-group-icon {
          font-size: 48px;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.1), rgba(201, 162, 77, 0.1));
          border-radius: 20px;
          border: 2px solid #C9A24D;
        }

        .category-group-header h2 {
          font-size: 32px;
          font-weight: 800;
          color: #74060D;
          margin: 0 0 8px;
        }

        .category-group-header p {
          font-size: 16px;
          color: #5a4a4a;
          margin: 0;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        .product-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 30px rgba(116, 6, 13, 0.1);
          border: 2px solid transparent;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-12px) scale(1.02);
          border-color: #C9A24D;
          box-shadow: 0 25px 60px rgba(116, 6, 13, 0.25), 0 0 40px rgba(201, 162, 77, 0.15);
        }

        .product-card-image {
          position: relative;
          height: 280px;
          overflow: hidden;
        }

        .product-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(116, 6, 13, 0.4) 100%);
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-card-overlay {
          opacity: 0.6;
        }

        .product-card-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(201, 162, 77, 0.95);
          color: #74060D;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          backdrop-filter: blur(10px);
          z-index: 2;
        }

        .product-card-content {
          padding: 28px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .product-card-content h3 {
          font-size: 22px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 12px;
          line-height: 1.3;
        }

        .product-card-content > p {
          font-size: 14px;
          color: #5a4a4a;
          line-height: 1.6;
          margin: 0 0 16px;
          flex-grow: 1;
        }

        .product-card-specs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .spec-tag {
          font-size: 11px;
          font-weight: 600;
          color: #9A1B2E;
          background: rgba(201, 162, 77, 0.15);
          padding: 4px 12px;
          border-radius: 12px;
          border: 1px solid rgba(201, 162, 77, 0.3);
        }

        .product-card-footer {
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid #E6D3A3;
        }

        .product-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9A1B2E;
          transition: all 0.3s ease;
        }

        .product-card:hover .product-card-cta {
          color: #C9A24D;
          gap: 12px;
        }

        /* CTA Section */
        .products-cta {
          padding: 80px 20px;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%);
          text-align: center;
        }

        .products-cta-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .products-cta h2 {
          font-size: 36px;
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 16px;
        }

        .products-cta p {
          font-size: 18px;
          color: #E6D3A3;
          margin: 0 0 40px;
          font-weight: 500;
        }

        .products-cta-btn {
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

        .products-cta-btn:hover {
          background: #E6D3A3;
          color: #9A1B2E;
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(201, 162, 77, 0.4);
        }

        @media (max-width: 968px) {
          .products-categories-section {
            top: 80px;
          }

          .category-tab {
            padding: 12px 20px;
            font-size: 14px;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 24px;
          }

          .category-group-header {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .category-group-icon {
            width: 60px;
            height: 60px;
            font-size: 36px;
          }
        }

        @media (max-width: 768px) {
          .products-hero {
            height: 40vh;
            min-height: 300px;
          }

          .products-categories-container {
            flex-direction: column;
            align-items: stretch;
          }

          .category-tab {
            width: 100%;
            justify-content: center;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .category-group-header h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
}
