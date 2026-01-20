"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BrandsSection({ brandsData: propBrandsData }) {
  const { t } = useLanguage();
  const [brandsData, setBrandsData] = useState(propBrandsData || []);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (propBrandsData) setBrandsData(propBrandsData);
  }, [propBrandsData]);

  // Enable auto-flip only when the section is in view (smooth + battery-friendly)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setInView(entry.isIntersecting));
      },
      { threshold: 0.15, rootMargin: "150px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!brandsData || brandsData.length === 0) {
    return (
      <section id="brands-section" className="brands" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#c9a227' }}>
          <div style={{ fontSize: '18px' }}>{t?.common?.noBrands || "No brands available"}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="brands-section"
      className={`brands ${inView ? "brands-inview" : ""}`}
      ref={sectionRef}
    >
      {/* Neon Particles */}
      <div className="neon-particles">
        <div className="neon-particle" />
        <div className="neon-particle" />
        <div className="neon-particle" />
        <div className="neon-particle" />
        <div className="neon-particle" />
        <div className="neon-particle" />
        <div className="neon-particle" />
        <div className="neon-particle" />
        <div className="neon-particle" />
        <div className="neon-particle" />
        <div className="neon-particle" />
        <div className="neon-particle" />
        <div className="neon-particle" />
        <div className="neon-particle" />
        <div className="neon-particle" />
        <div className="neon-particle" />
      </div>

      {/* Background Texture */}
      <div className="brands-bg-texture" />
      
      {/* Section Header */}
      <div className="brands-header">
        <span className="brands-tag">{t?.brands?.tag || "Our Partners"}</span>
        <h2>{t?.brands?.title || "Brands We Work With"}</h2>
        <p>{t?.brands?.description || "Trusted by leading companies and institutions across India and globally"}</p>
        <div className="brands-header-bar" />
      </div>

      {/* Brands Grid */}
      <div className="brands-grid">
        {brandsData.map((brand, idx) => (
          <div
            key={brand.id}
            className="brand-tile"
          >
            <div
              className="brand-tile-inner"
              style={{
                // stagger the subtle auto-flip, so they don’t sync up
                "--flip-delay": `${(idx % 8) * 0.45}s`,
                "--flip-cycle": `${12 + (idx % 5) * 1.5}s`,
              }}
            >
              {/* Front Face - Logo Only */}
              <div className="brand-tile-front">
                <div className="brand-tile-texture" />
                <div className="brand-logo-wrap">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={160}
                    height={80}
                    className="brand-logo"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="brand-tile-border" />
                <div className="brand-tile-shine" />
              </div>

              {/* Back Face - Brand Name */}
              <div className="brand-tile-back">
                <div className="brand-tile-texture dark" />
                <div className="brand-name-wrap">
                  <span className="brand-name-text">{brand.name}</span>
                </div>
                <div className="brand-tile-vignette" />
                <div className="brand-tile-glow" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="brands-corner-accent tl" />
      <div className="brands-corner-accent tr" />
      <div className="brands-corner-accent bl" />
      <div className="brands-corner-accent br" />
    </section>
  );
}
