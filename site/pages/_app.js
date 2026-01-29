import "@/styles/globals.css";
import { useEffect, useCallback, useRef } from "react";
import Mascot from "@/components/Mascot";
import FloatingSocialMedia from "@/components/FloatingSocialMedia";
import Chatbot from "@/components/Chatbot";

// Fast smooth scroll function (500ms with easeOutQuart)
const smoothScrollTo = (targetY, duration = 500) => {
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

// Throttle function for scroll performance
const throttle = (func, limit) => {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export default function App({ Component, pageProps }) {
  const scrollTimeoutRef = useRef(null);
  const tickingRef = useRef(false);
  const rafIdRef = useRef(null);

  // Optimized scroll handler using RAF for smooth performance
  const handleScroll = useCallback(() => {
    // Use RAF to batch DOM updates
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      if (!tickingRef.current) {
        document.body.classList.add("is-scrolling");
        tickingRef.current = true;
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
        tickingRef.current = false;
      }, 100); // Reduced from 150ms for snappier response
    });
  }, []);

  // Scroll performance optimization + Global anchor handler
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Throttled scroll handler for better performance
    const throttledScroll = throttle(handleScroll, 16); // ~60fps

    // Global anchor click handler for fast smooth scroll
    const onAnchorClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Handle hash links (but not just "#")
      if (href.startsWith("#") && href.length > 1) {
        try {
          const el = document.querySelector(href);
          if (el) {
            e.preventDefault();
            const targetY = el.getBoundingClientRect().top + window.scrollY - 80;
            smoothScrollTo(targetY, 500);
          }
        } catch (err) {
          // Invalid selector, ignore
        }
      }
    };

    // Add scroll listener with passive flag for better scroll performance
    window.addEventListener("scroll", throttledScroll, { passive: true });
    document.addEventListener("click", onAnchorClick);

    // Detect platform for specific optimizations
    const isWindows = navigator.platform.indexOf('Win') > -1;
    const isMac = navigator.platform.indexOf('Mac') > -1;
    
    if (isWindows) {
      document.documentElement.classList.add('platform-windows');
    } else if (isMac) {
      document.documentElement.classList.add('platform-mac');
    }

    // Cleanup
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      document.removeEventListener("click", onAnchorClick);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [handleScroll]);

  return (
    <>
      <Component {...pageProps} />
      <Mascot />
      <FloatingSocialMedia />
      <Chatbot />
    </>
  );
}
