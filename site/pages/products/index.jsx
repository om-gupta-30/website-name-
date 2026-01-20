import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// All products organized under Manufacturing (all products are manufactured and exported)
const productsData = {
  manufacturing: {
    title: "What We Manufacture",
    description: "Premium quality products manufactured in-house with strict quality control. All our products are exported to 15+ countries worldwide.",
    icon: "🏭",
    categories: {
      paints: {
        title: "Premium Paints",
        description: "High-quality industrial and decorative paints for every surface",
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
      fabrication: {
        title: "Metal Fabrication",
        description: "Custom steel and metal fabrication solutions for all industries",
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
        description: "Ergonomic and durable furniture for educational institutions",
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
      },
      safety: {
        title: "Safety Equipment",
        description: "Premium safety gear and equipment for industrial use",
        products: [
          {
            id: "se1",
            name: "Safety Helmets",
            desc: "Industrial-grade safety helmets with impact resistance.",
            image: "/assets/product-industrial-paint.png",
            specs: ["IS certified", "UV resistant", "Adjustable fit", "Ventilation system"]
          },
          {
            id: "se2",
            name: "Protective Gloves",
            desc: "Heavy-duty protective gloves for various industrial applications.",
            image: "/assets/product-exterior-weather-coat.png",
            specs: ["Cut resistant", "Chemical protection", "Multiple sizes", "Durable material"]
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

export default function ProductsPage() {
  const router = useRouter();
  const { category } = router.query;
  const [expandedCategory, setExpandedCategory] = useState(category || null);

  useEffect(() => {
    if (category) {
      setExpandedCategory(category);
    }
  }, [category]);

  const handleCategoryClick = (categoryKey) => {
    if (expandedCategory === categoryKey) {
      setExpandedCategory(null);
      router.push('/products', undefined, { shallow: true });
    } else {
      setExpandedCategory(categoryKey);
      router.push(`/products?category=${categoryKey}`, undefined, { shallow: true });
    }
  };

  const handleProductClick = (product) => {
    router.push(`/products/${product.id}`);
  };

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
          <div className="products-hero-content">
            <span className="products-hero-tag">Our Products</span>
            <h1>Quality Products for Every Need</h1>
            <p>Explore our comprehensive range of premium paints, metal fabrication, and school furniture</p>
          </div>
        </section>

        {/* Main Section: Manufacturing */}
        <section className="products-content">
          {Object.entries(productsData).map(([sectionKey, section]) => {
            const categories = Object.entries(section.categories);
            
            return (
              <div key={sectionKey} className="product-section">
                <div className="product-section-header">
                  <div className="product-section-title">
                    <span className="product-section-icon">{section.icon}</span>
                    <div>
                      <h2>{section.title}</h2>
                      <p>{section.description}</p>
                    </div>
                  </div>
                </div>

                <div className="product-section-content">
                  {categories.map(([categoryKey, category]) => {
                    const isCategoryExpanded = expandedCategory === categoryKey;
                    
                    return (
                      <div key={categoryKey} className="product-category">
                        <div 
                          className="product-category-header"
                          onClick={() => handleCategoryClick(categoryKey)}
                        >
                          <div>
                            <h3>{category.title}</h3>
                            <p>{category.description}</p>
                          </div>
                          <svg 
                            className={`expand-icon ${isCategoryExpanded ? 'expanded' : ''}`}
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </div>

                        {isCategoryExpanded && (
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
                                </div>
                                <div className="product-card-content">
                                  <h4>{product.name}</h4>
                                  <p>{product.desc}</p>
                                  <span className="product-card-cta">
                                    View Details
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>


        {/* CTA Section */}
        <section className="products-cta">
          <h2>Need Custom Products?</h2>
          <p>We offer customization across all product categories. Contact us with your requirements.</p>
          <Link href="/contact" className="products-cta-btn">
            Contact Us
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .products-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #F7F3EA 0%, #E6D3A3 100%);
        }

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

        .products-hero-bg::after {
          content: '';
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

        .products-content {
          padding: 60px 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .product-section {
          margin-bottom: 40px;
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(116, 6, 13, 0.1);
          border: 2px solid #E6D3A3;
        }

        .product-section-header {
          padding: 32px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%);
        }

        .product-section-title {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .product-section-icon {
          font-size: 48px;
        }

        .product-section-title h2 {
          font-size: 32px;
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 8px;
        }

        .product-section-title p {
          font-size: 15px;
          color: #E6D3A3;
          margin: 0;
          font-weight: 500;
        }

        .expand-icon {
          color: #C9A24D;
          transition: transform 0.3s ease;
        }

        .expand-icon.expanded {
          transform: rotate(180deg);
        }

        .product-section-content {
          padding: 40px;
          background: white;
        }

        .product-category {
          margin-bottom: 30px;
          border: 2px solid #E6D3A3;
          border-radius: 16px;
          overflow: hidden;
        }

        .product-category:last-child {
          margin-bottom: 0;
        }

        .product-category-header {
          padding: 24px 28px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #F7F3EA;
          transition: all 0.3s ease;
        }

        .product-category-header:hover {
          background: #E6D3A3;
        }

        .product-category-header h3 {
          font-size: 24px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 6px;
        }

        .product-category-header p {
          font-size: 14px;
          color: #9A1B2E;
          margin: 0;
        }

        .product-category-header .expand-icon {
          color: #74060D;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          padding: 24px;
          background: white;
        }

        .product-card {
          position: relative;
          background: white;
          border: 2px solid #E6D3A3;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 5px 20px rgba(116, 6, 13, 0.08);
        }

        .product-card:hover {
          transform: translateY(-8px);
          border-color: #C9A24D;
          box-shadow: 0 20px 50px rgba(116, 6, 13, 0.15), 0 0 30px rgba(201, 162, 77, 0.1);
        }

        .product-card-image {
          position: relative;
          height: 200px;
        }

        .product-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(247, 243, 234, 0.95) 100%);
        }

        .product-card-content {
          padding: 20px;
          background: white;
        }

        .product-card-content h4 {
          font-size: 18px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 10px;
        }

        .product-card-content p {
          font-size: 13px;
          color: #5a4a4a;
          line-height: 1.6;
          margin: 0 0 16px;
        }

        .product-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9A1B2E;
          transition: gap 0.3s ease;
        }

        .product-card:hover .product-card-cta {
          gap: 12px;
          color: #C9A24D;
        }


        /* CTA Section */
        .products-cta {
          text-align: center;
          padding: 80px 20px;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%);
          border-top: 4px solid #C9A24D;
        }

        .products-cta h2 {
          font-size: 32px;
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 12px;
        }

        .products-cta p {
          font-size: 16px;
          color: #E6D3A3;
          margin: 0 0 30px;
          font-weight: 500;
        }

        .products-cta-btn {
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

        .products-cta-btn:hover {
          background: #E6D3A3;
          color: #9A1B2E;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(201, 162, 77, 0.4);
        }

        @media (max-width: 768px) {
          .product-section-header {
            padding: 24px 20px;
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .product-section-title {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .product-section-title h2 {
            font-size: 24px;
          }

          .product-section-content {
            padding: 24px;
          }

          .product-category-header {
            padding: 20px;
          }

          .product-category-header h3 {
            font-size: 20px;
          }

          .products-grid {
            grid-template-columns: 1fr;
            padding: 16px;
          }

        }
      `}</style>
    </>
  );
}
