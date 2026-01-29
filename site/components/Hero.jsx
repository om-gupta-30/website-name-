"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/assets/hero-image.png";

const heroNavConfig = [
  { key: "products", href: "/products" },
  { key: "clients", href: "/clients" },
  { key: "about", href: "/about" },
  { key: "team", href: "/our-team" },
  { key: "foreignCollaborations", href: "/foreign-collaborations" },
  { key: "investor", href: "/investor-relations" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
];

const statsData = [
  { value: 10, suffix: "+", key: "yearsExperience" },
  { value: 500, suffix: "+", key: "projectsDelivered" },
  { value: 15, suffix: "+", key: "exportCountries" },
  { value: 100, suffix: "+", key: "happyClients" },
];

export default function Hero({ heroData: propHeroData, navLinks: propNavLinks }) {
  const [heroData, setHeroData] = useState(propHeroData || null);
  const [navLinks, setNavLinks] = useState(propNavLinks || null);
  const heroRef = useRef(null);
  const navbarRef = useRef(null);
  const heroImageWrapperRef = useRef(null);
  const heroTextRef = useRef(null);
  const subtitleRef = useRef(null);
  const [currentTagline, setCurrentTagline] = useState(0);

  const taglines = heroData?.taglines && Array.isArray(heroData.taglines) && heroData.taglines.length > 0
    ? heroData.taglines
    : [
        "Road marking paint manufacturer & industrial exporter",
        "Thermoplastic, cold plastic & water-based paint manufacturing",
        "Road safety products, signages & fabrication solutions",
        "Industrial fabrication & school furniture manufacturer",
        "Global exporter of paints, signages & road safety systems"
      ];
  
  const stats = heroData?.stats && Array.isArray(heroData.stats) && heroData.stats.length > 0
    ? heroData.stats
    : statsData.map(({ value, suffix, key }) => ({ 
        value, 
        suffix, 
        label: key === "yearsExperience" ? "Years Experience" :
               key === "projectsDelivered" ? "Projects Delivered" :
               key === "exportCountries" ? "Export Countries" :
               key === "happyClients" ? "Happy Clients" : key
      }));
  
  // Ensure heroImageUrl is a valid string or fallback to default
  // Fix: Remove /public prefix if present (Next.js public folder files don't need /public)
  let heroImageUrl = heroData?.heroImageUrl && heroData.heroImageUrl.trim() !== "" 
    ? heroData.heroImageUrl.trim() 
    : null;
  
  // Normalize the path - remove /public prefix if it exists
  if (heroImageUrl && heroImageUrl.startsWith('/public/')) {
    heroImageUrl = heroImageUrl.replace('/public', '');
  }
  const ctaButtons = heroData?.ctaButtons && Array.isArray(heroData.ctaButtons) && heroData.ctaButtons.length > 0
    ? heroData.ctaButtons
    : null;

  const navigationLinks = navLinks && Array.isArray(navLinks) && navLinks.length > 0
    ? navLinks
    : heroNavConfig.map(({ key, href }) => ({ 
        label: key === "home" ? "Home" :
               key === "products" ? "Products" :
               key === "clients" ? "Clients" :
               key === "about" ? "About Us" :
               key === "team" ? "Our Director" :
               key === "foreignCollaborations" ? "Foreign Collaborations" :
               key === "investor" ? "Investor Relations" :
               key === "careers" ? "Careers" :
               key === "contact" ? "Contact Us" : key, 
        href 
      }));

  // Coming soon handler
  const handleComingSoon = (e) => {
    e.preventDefault();
    alert("🚧 Coming Soon! This feature is under development.");
  };

  // Fast smooth scroll function
  const smoothScrollTo = (targetY, duration = 600) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let startTime = null;

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      
      window.scrollTo(0, startY + diff * eased);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  // Scroll handler
  const handleScrollClick = () => {
    smoothScrollTo(window.innerHeight, 500);
  };

  const handleNavClick = (e, href) => {
    // Removed smooth scroll behavior - all links now navigate to pages normally
    // Hash links will navigate to homepage and browser will handle scrolling
  };

  // 3D Tilt parallax - dramatic "page moving" effect on hover
  // Optimized to only run RAF when needed (hovering)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hero = heroRef.current;
    const wrapper = heroImageWrapperRef.current;
    if (!hero || !wrapper) return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) return;

    const target = wrapper.querySelector("#hero-image-safe");
    if (!target) return;

    // Current and target values for smooth interpolation
    let current = { rotX: 0, rotY: 0, tx: 0, ty: 0 };
    let target_ = { rotX: 0, rotY: 0, tx: 0, ty: 0 };
    let rafId = null;
    let isHovering = false;
    let isAnimating = false;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    // Check if values are close enough to stop animating
    const isSettled = () => {
      const threshold = 0.01;
      return (
        Math.abs(current.rotX - target_.rotX) < threshold &&
        Math.abs(current.rotY - target_.rotY) < threshold &&
        Math.abs(current.tx - target_.tx) < threshold &&
        Math.abs(current.ty - target_.ty) < threshold
      );
    };

    const animate = () => {
      // Faster lerp when hovering, slower when returning to center
      const factor = isHovering ? 0.12 : 0.08;
      
      current.rotX = lerp(current.rotX, target_.rotX, factor);
      current.rotY = lerp(current.rotY, target_.rotY, factor);
      current.tx = lerp(current.tx, target_.tx, factor);
      current.ty = lerp(current.ty, target_.ty, factor);

      // Apply 3D transform - rotation + translation for that dramatic effect
      target.style.transform = `
        perspective(1200px)
        rotateX(${current.rotX.toFixed(3)}deg)
        rotateY(${current.rotY.toFixed(3)}deg)
        translate3d(${current.tx.toFixed(2)}px, ${current.ty.toFixed(2)}px, 0)
        scale(1.02)
      `;

      // Only continue animating if not settled
      if (!isSettled()) {
        rafId = requestAnimationFrame(animate);
      } else {
        isAnimating = false;
        // Reset transform when fully settled at origin
        if (!isHovering) {
          target.style.transform = 'perspective(1200px) scale(1.02)';
        }
      }
    };

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    const onMove = (e) => {
      isHovering = true;
      const rect = hero.getBoundingClientRect();
      
      // Calculate position relative to center (-0.5 to 0.5)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // 3D rotation - tilt toward cursor (inverted for natural feel)
      const maxRotation = 8; // degrees
      target_.rotX = -y * maxRotation; // Tilt up/down
      target_.rotY = x * maxRotation;  // Tilt left/right

      // Subtle translation for depth
      const maxTranslate = 25;
      target_.tx = x * maxTranslate;
      target_.ty = y * maxTranslate;

      startAnimation();
    };

    const onLeave = () => {
      isHovering = false;
      target_.rotX = 0;
      target_.rotY = 0;
      target_.tx = 0;
      target_.ty = 0;
      startAnimation();
    };

    // Use passive event listeners for better scroll performance
    hero.addEventListener("mousemove", onMove, { passive: true });
    hero.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Tagline rotation
  useEffect(() => {
    if (taglines.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [taglines.length]);

  // Lightweight stat count-up (0 -> target), repeats every 10s while hero is in view
  useEffect(() => {
    if (typeof window === "undefined") return;
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const format = new Intl.NumberFormat("en-IN");
    const statEls = Array.from(heroEl.querySelectorAll(".stat-number"));
    if (statEls.length === 0) return;

    const setFinalValues = () => {
      statEls.forEach((el) => {
        const target = Number(el.getAttribute("data-value") || 0);
        el.textContent = format.format(target);
      });
    };

    if (prefersReducedMotion) {
      setFinalValues();
      return;
    }

    let intervalId = null;
    const rafIds = new Set();

    const animateOnce = () => {
      statEls.forEach((el) => {
        const target = Number(el.getAttribute("data-value") || 0);
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3);
          const value = Math.round(target * eased);
          el.textContent = format.format(value);
          if (t < 1) {
            const id = requestAnimationFrame(tick);
            rafIds.add(id);
          }
        };

        // reset to 0 before each run for the "fluctuating" effect you wanted
        el.textContent = "0";
        const id = requestAnimationFrame(tick);
        rafIds.add(id);
      });
    };

    const stop = () => {
      if (intervalId) window.clearInterval(intervalId);
      intervalId = null;
      rafIds.forEach((id) => cancelAnimationFrame(id));
      rafIds.clear();
    };

    const start = () => {
      stop();
      animateOnce();
      intervalId = window.setInterval(animateOnce, 10000);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) start();
          else stop();
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -15% 0px" },
    );

    observer.observe(heroEl);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [stats.length]);


  return (
    <>
      {/* Base Background */}
      <div id="hero-bg-base" />

      {/* Background Reveal Layer */}
      <div id="hero-bg-reveal" />

      <section id="hero" ref={heroRef}>
        {/* Hero Neon Particles */}
        <div className="hero-neon-particles">
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
        </div>

        {/* NAVBAR */}
        <nav id="navbar" ref={navbarRef}>
          <Link href="/" className="nav-brand">
            <div className="nav-logo-wrapper hero-logo-heartbeat">
              <Image 
                src="/assets/logo-navbar.jpg" 
                alt="YNM Mega Industries logo" 
                width={50}
                height={50}
                className="nav-logo-new"
                priority 
              />
            </div>
            <div className="nav-brand-text-wrapper">
              <span className="nav-brand-text">YNM MEGA INDUSTRIES</span>
              <span id="nav-since">Since 2013</span>
            </div>
          </Link>

          <div className="nav-links">
            {navigationLinks.map((link, index) => {
              const isExternal = link.href && (link.href.startsWith("http://") || link.href.startsWith("https://"));
              const target = link.target || (isExternal ? "_blank" : undefined);
              const isHashLink = link.href && link.href.startsWith("#");
              const isPageLink = link.href && link.href.startsWith("/") && !link.href.startsWith("/#");
              const sep = index > 0 ? <span className="nav-sep" aria-hidden="true" /> : null;

              // Links with dropdown
              if (link.hasDropdown && link.dropdownItems) {
                return (
                  <Fragment key={link.id || index}>
                    {sep}
                    <div className="nav-dropdown-wrapper">
                      <a
                        href={link.href || "#"}
                        className="nav-link nav-link-dropdown"
                      >
                        {link.label}
                        <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                      <div className="nav-dropdown">
                        {link.dropdownItems.map((item, idx) => (
                          <Link key={idx} href={item.href} className="nav-dropdown-item">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </Fragment>
                );
              }

              if (isExternal || target === "_blank") {
                return (
                  <Fragment key={link.id || index}>
                    {sep}
                    <a
                      href={link.href || "#"}
                      className="nav-link"
                      target={target}
                      rel={target === "_blank" ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  </Fragment>
                );
              }

              if (isPageLink) {
                return (
                  <Fragment key={link.id || index}>
                    {sep}
                    <Link href={link.href} className="nav-link">
                      {link.label}
                    </Link>
                  </Fragment>
                );
              }

              return (
                <Fragment key={link.id || index}>
                  {sep}
                  <a href={link.href || "#"} className="nav-link">
                    {link.label}
                  </a>
                </Fragment>
              );
            })}
          </div>

          <div id="scroll-progress" />
        </nav>

        {/* HERO IMAGE */}
        <div id="hero-image-wrapper" ref={heroImageWrapperRef}>
          <div id="hero-image-safe">
            <Image 
              src={heroImageUrl || heroImage} 
              alt="YNM Mega Industries - Global Logistics & Manufacturing Excellence" 
              fill 
              id="hero-image" 
              priority 
              quality={90}
              style={{ objectFit: 'cover', objectPosition: 'center center' }}
              unoptimized={heroImageUrl && (heroImageUrl.startsWith('http') || heroImageUrl.startsWith('//'))}
            />
          </div>

          {/* Cinematic Vignette */}
          <div className="inset-vignette" />
          <div className="hero-vignette" />

          {/* Subtle Gold Sweep */}
          <div id="glass-sweep" />
        </div>

        {/* HUD Ring */}
        <div id="hero-hud-ring" />

        {/* Premium Center Glow (replaces ugly box) */}
        <div id="hero-glow" className="hero-center-glow" />

        {/* HERO TEXT */}
        <div id="hero-text" ref={heroTextRef} className="hero-text-float">
          <h1 className="hero-title">
            YNM MEGA INDUSTRIES
            <span className="hero-gold-sweep" />
          </h1>

          <div id="hero-since">Since 2013 • Manufacturing & Export Excellence</div>

          <p ref={subtitleRef} id="hero-subtitle" className="hero-subtitle">
            {taglines[currentTagline]}
          </p>

          <div id="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="stat">
                <span className="stat-number" data-value={stat.value}>0</span>
                <span className="stat-label">{stat.suffix} {stat.label}</span>
              </div>
            ))}
          </div>

          <div id="hero-buttons">
            {ctaButtons && ctaButtons.length > 0 ? (
              ctaButtons.map((btn, index) => (
                <a
                  key={index}
                  href={btn.href || "#"}
                  className={`hero-btn ${btn.variant === "secondary" ? "secondary" : "primary"}`}
                  onClick={!btn.href || btn.href === "#" ? handleComingSoon : undefined}
                >
                  {btn.text}
                </a>
              ))
            ) : (
              <>
                <Link href="/products" className="hero-btn primary">
                  Explore Products
                </Link>
                <Link href="/contact" className="hero-btn secondary">
                  Contact Us
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Scroll Mouse Icon */}
        <div id="scroll-mouse" onClick={handleScrollClick}>
          <div className="mouse-wheel" />
        </div>
      </section>
    </>
  );
}
