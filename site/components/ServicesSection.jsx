"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

// Services data with the new images
const getServicesData = (language) => [
  {
    id: 1,
    label: "SERVICE 01",
    title: language === 'hi' ? "कस्टम निर्माण" : "Custom Manufacturing",
    subtitle: language === 'hi' ? "एंड-टू-एंड निर्माण समाधान" : "End-to-end manufacturing solutions",
    description: language === 'hi'
      ? "हमारी अत्याधुनिक निर्माण सुविधा आधुनिक मशीनरी और स्वचालित प्रक्रियाओं से सुसज्जित है। प्रोटोटाइप से लेकर बड़े पैमाने पर उत्पादन तक, हम गुणवत्तापूर्ण उत्पाद प्रदान करते हैं।"
      : "Our state-of-the-art manufacturing facility is equipped with modern machinery and automated processes. From prototype to mass production, we deliver quality products.",
    bullets: language === 'hi'
      ? ["स्वचालित बैच प्रसंस्करण", "हर चरण में गुणवत्ता नियंत्रण", "कस्टम विनिर्देश"]
      : ["Automated batch processing", "Quality control at every stage", "Custom specifications"],
    image: "/assets/99.png",
  },
  {
    id: 2,
    label: "SERVICE 02",
    title: language === 'hi' ? "वैश्विक निर्यात सेवाएं" : "Global Export Services",
    subtitle: language === 'hi' ? "सहज अंतर्राष्ट्रीय शिपिंग" : "Seamless international shipping",
    description: language === 'hi'
      ? "हम एशिया, अफ्रीका और मध्य पूर्व में 15+ देशों में निर्यात करते हैं। हमारी अनुभवी निर्यात टीम दस्तावेजीकरण, रसद और सीमा शुल्क निकासी संभालती है।"
      : "We export to 15+ countries across Asia, Africa, and the Middle East. Our experienced export team handles documentation, logistics, and customs clearance.",
    bullets: language === 'hi'
      ? ["अंतर्राष्ट्रीय प्रमाणपत्र", "प्रतिस्पर्धी FOB और CIF मूल्य निर्धारण", "विश्वसनीय शिपिंग"]
      : ["International certifications", "Competitive FOB & CIF pricing", "Reliable shipping"],
    image: "/assets/222.png",
  },
  {
    id: 3,
    label: "SERVICE 03",
    title: language === 'hi' ? "उत्पाद अनुकूलन" : "Product Customization",
    subtitle: language === 'hi' ? "आपकी जरूरतों के लिए बेस्पोक समाधान" : "Bespoke solutions for your needs",
    description: language === 'hi'
      ? "कस्टम पेंट सूत्रों से लेकर बेस्पोक निर्माण डिजाइन और ऑर्डर-मेड फर्नीचर तक। आपके विनिर्देश, हमारी विशेषज्ञता।"
      : "From custom paint formulations to bespoke fabrication designs and made-to-order furniture. Your specifications, our expertise.",
    bullets: language === 'hi'
      ? ["कस्टम सूत्र", "बेस्पोक डिजाइन", "निजी लेबलिंग"]
      : ["Custom formulations", "Bespoke designs", "Private labeling"],
    image: "/assets/444.png",
  },
];

export default function ServicesSection() {
  const { t, language } = useLanguage();
  const servicesData = getServicesData(language);
  const sectionRef = useRef(null);

  // Trigger reveal animations only when blocks enter the viewport
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = sectionRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) return;

    const blocks = Array.from(root.querySelectorAll(".srv-block"));
    if (blocks.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("srv-inview");
        });
      },
      { threshold: 0.15, rootMargin: "100px 0px" },
    );

    blocks.forEach((b) => observer.observe(b));
    return () => observer.disconnect();
  }, []);

  const handleComingSoon = (e) => {
    e.preventDefault();
    alert("🚧 Coming Soon! This feature is under development.");
  };

  return (
    <section id="services-section" className="srv" ref={sectionRef}>
      {/* Neon Particles */}
      <div className="neon-particles">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="neon-particle" />
        ))}
      </div>

      {/* Section Header */}
      <div className="srv-header">
        <span className="srv-tag">{t?.services?.tag || "What We Do"}</span>
        <h2>{t?.services?.title || "Our Solutions"}</h2>
        <p>{t?.services?.description || "Complete manufacturing, customization, and export solutions"}</p>
        <div className="srv-header-bar" />
      </div>

      {/* Service Blocks - Alternating Layout with B&W to Color Reveal */}
      <div className="srv-blocks">
        {servicesData.map((service, index) => {
          const isEven = index % 2 === 0;
          const directionClass = isEven ? "img-left" : "img-right";
          return (
            <div
              key={service.id}
              className={`srv-block ${directionClass}`}
              style={{ "--reveal-delay": `${index * 0.15}s` }}
            >
              {/* Image Side with B&W to Color Reveal */}
              <div className="srv-image-wrap">
                {/* Grayscale base */}
                <div className="srv-image srv-image-gray">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                {/* Color overlay that reveals */}
                <div className="srv-image srv-image-color">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                {/* Gradient overlay */}
                <div className="srv-image-overlay" />
                {/* Animated reveal line */}
                <div className="srv-reveal-line" />
              </div>

              {/* Content Side */}
              <div className="srv-content">
                <div className="srv-gold-line" />
                <span className="srv-label">{service.label}</span>
                <h3>{service.title}</h3>
                <p className="srv-subtitle">{service.subtitle}</p>
                <p className="srv-desc">{service.description}</p>
                <ul className="srv-bullets">
                  {service.bullets.map((bullet, i) => (
                    <li key={i}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <button className="srv-cta" onClick={handleComingSoon}>
                  {t?.services?.learnMore || "Learn More"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
