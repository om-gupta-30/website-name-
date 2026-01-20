"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const productConfig = [
  { id: "paints", image: "/assets/product-industrial-paint.png", link: "/products?type=manufacturing&category=paints", titleKey: "paintsTitle", descKey: "paintsDesc" },
  { id: "fabrication", image: "/assets/product-structural-steel.png", link: "/products?type=manufacturing&category=fabrication", titleKey: "fabricationTitle", descKey: "fabricationDesc" },
  { id: "furniture", image: "/assets/product-student-desk-chair.png", link: "/products?type=manufacturing&category=furniture", titleKey: "furnitureTitle", descKey: "furnitureDesc" },
  { id: "safety", image: "/assets/product-laboratory-table.png", link: "/products?type=manufacturing&category=safety", titleKey: "safetyTitle", descKey: "safetyDesc" },
];

export default function ProductsSection() {
  const { t } = useLanguage();
  const allProducts = productConfig.map(({ id, image, link, titleKey, descKey }) => ({
    id,
    image,
    link,
    title: t?.products?.[titleKey] || id,
    shortDesc: t?.products?.[descKey] || "",
  }));
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
        <span className="ps-tag">{t?.products?.tag || "Our Products"}</span>
        <h2>{t?.products?.title || "What We Manufacture"}</h2>
        <p>{t?.products?.description || "Premium quality products manufactured in-house and exported to clients across 15+ countries worldwide"}</p>
        <div className="ps-bar" />
      </div>

      {/* Side by Side Categories Container */}
      <div className="ps-categories-row">
        {/* Left Column */}
        <div className="ps-category-section">
          <div className="ps-grid-vertical">
            {allProducts.slice(0, 2).map((product, index) => (
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
                  <p>{product.shortDesc}</p>
                  <Link href={product.link} className="ps-product-cta">
                    {t?.products?.explore || "Explore"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="ps-category-section">
          <div className="ps-grid-vertical">
            {allProducts.slice(2, 4).map((product, index) => (
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
                  <span className="ps-product-num">0{index + 3}</span>
                  <h3>{product.title}</h3>
                  <p>{product.shortDesc}</p>
                  <Link href={product.link} className="ps-product-cta">
                    {t?.products?.explore || "Explore"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View All Products Button */}
      <div className="ps-view-all">
        <Link href="/products" className="ps-view-all-btn">
          {t?.products?.viewAll || "View All Products"}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
