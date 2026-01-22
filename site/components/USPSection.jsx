"use client";

import { useEffect, useCallback, useRef, memo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const benefitIcons = ["🏭", "✓", "🌍", "🎨"];
const benefitIds = ["manufacturing", "certified", "export", "customization"];

function USPSection({ uspData: propUspData }) {
  const { t } = useLanguage();
  const uspData = propUspData || null;
  const activeCardRef = useRef(null);

  const benefitsFromT = (t?.usp?.benefits || []).map((b, i) => ({
    id: benefitIds[i] || `usp-${i}`,
    title: b.title,
    icon: benefitIcons[i] || "",
    description: b.description,
  }));
  const benefitsData = uspData && Array.isArray(uspData) && uspData.length > 0
    ? uspData.map((benefit) => ({
        id: benefit.id?.toString() || `usp-${benefit.id}`,
        title: benefit.title,
        icon: benefit.icon || "",
        description: benefit.description,
      }))
    : benefitsFromT.length > 0 ? benefitsFromT : [{
        id: "manufacturing", title: "Advanced Manufacturing", icon: "🏭",
        description: "YNM Mega Industries operates advanced manufacturing facilities delivering high-quality industrial paints, precision metal fabrication, and engineered school furniture. As a trusted global manufacturer, we combine modern machinery, skilled expertise, and efficient processes to serve worldwide industrial and infrastructure projects."
      }, { id: "certified", title: "Quality Certified", icon: "✓", description: "At YNM Mega Industries, quality is our foundation. All our products including industrial paints, fabrication components, and school furniture are manufactured under ISO 9001:2015 certified quality systems, ensuring durability, safety, and consistent performance for global markets." },
      { id: "export", title: "Global Export Network", icon: "🌍", description: "YNM Mega Industries is a reliable global exporter of industrial paints, metal fabrication products, safety solutions, and school furniture. We supply to clients across Asia, Africa, the Middle East, and international markets with efficient logistics, compliance, and timely delivery." },
      { id: "customization", title: "Custom Solutions", icon: "🎨", description: "We specialize in customized manufacturing solutions including bespoke paint formulations, custom metal fabrication, and made-to-order school furniture. YNM Mega Industries supports global clients with flexible production, technical expertise, and project-specific solutions." }];

  const closePopup = useCallback(() => {
    const popup = document.getElementById('why-popup');
    const activeCard = activeCardRef.current;
    
    if (popup) {
      popup.classList.remove('visible');
    }
    
    setTimeout(() => {
      if (activeCard) {
        activeCard.classList.remove('flipped');
        activeCardRef.current = null;
      }
    }, 150);
  }, []);

  const openPopup = useCallback((card, detail, icon) => {
    const popup = document.getElementById('why-popup');
    if (!popup) return;

    const title = card.querySelector('h3')?.textContent || '';
    popup.innerHTML = `
      <button class="why-popup-close" aria-label="Close">&times;</button>
      <div class="why-popup-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${detail}</p>
    `;

    popup.classList.add('visible');
  }, []);

  const handleCardClick = useCallback((e) => {
    const card = e.currentTarget;
    const detail = card.querySelector('.why-detail')?.textContent || '';
    const icon = card.querySelector('.why-showcase-icon')?.textContent || '';
    
    if (activeCardRef.current === card) {
      closePopup();
      return;
    }

    if (activeCardRef.current) {
      const popup = document.getElementById('why-popup');
      if (popup) popup.classList.remove('visible');
      activeCardRef.current.classList.remove('flipped');
    }

    card.classList.add('flipped');
    activeCardRef.current = card;

    setTimeout(() => {
      openPopup(card, detail, icon);
    }, 350);
  }, [closePopup, openPopup]);

  const handlePopupClick = useCallback((e) => {
    if (e.target.classList.contains('why-popup-close')) {
      closePopup();
    }
  }, [closePopup]);

  const handleOutsideClick = useCallback((e) => {
    const isClickOnCard = e.target.closest('.why-showcase-item');
    const isClickOnPopup = e.target.closest('#why-popup');
    const isClickOnBackdrop = e.target.id === 'why-backdrop';
    
    if (isClickOnBackdrop || (!isClickOnCard && !isClickOnPopup && activeCardRef.current)) {
      closePopup();
    }
  }, [closePopup]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && activeCardRef.current) {
      closePopup();
    }
  }, [closePopup]);

  useEffect(() => {
    const popup = document.getElementById('why-popup');
    
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    if (popup) {
      popup.addEventListener('click', handlePopupClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      if (popup) {
        popup.removeEventListener('click', handlePopupClick);
      }
    };
  }, [handleOutsideClick, handleKeyDown, handlePopupClick]);

  return (
    <section id="why-choose-ynm">
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

      {/* Decorative elements */}
      <div className="why-deco why-deco-1"></div>
      <div className="why-deco why-deco-2"></div>
      
      <div className="why-header">
        <span className="why-tag">{t?.usp?.tag || "About Us"}</span>
        <h2>{t?.usp?.title || "About section"}</h2>
        {t?.usp?.subtitle ? <p className="why-subtitle">{t.usp.subtitle}</p> : null}
        <div className="why-bar"></div>
      </div>

      <div className="why-showcase">
        {benefitsData.map((benefit, index) => (
          <div 
            key={benefit.id} 
            className="why-showcase-item"
            onClick={handleCardClick}
            data-index={index}
          >
            <div className="why-showcase-bg"></div>
            <div className="why-showcase-content">
              <div className="why-showcase-number">0{index + 1}</div>
              <div className="why-showcase-icon">{benefit.icon}</div>
              <div className="why-showcase-text">
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </div>
            <div className="why-showcase-overlay"></div>
            <div className="why-detail">{benefit.description}</div>
          </div>
        ))}
      </div>

      <div id="why-popup"></div>
      <div id="why-backdrop"></div>
    </section>
  );
}

export default memo(USPSection);
