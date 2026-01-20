import "@/styles/globals.css";
import { useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import FirstTimeLanguageModal from "@/components/FirstTimeLanguageModal";
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

export default function App({ Component, pageProps }) {
  // Scroll performance optimization + Global anchor handler
  useEffect(() => {
    if (typeof window === "undefined") return;

    let scrollTimeout = null;
    let ticking = false;

    // Scroll class for performance
    const onScroll = () => {
      if (!ticking) {
        document.body.classList.add("is-scrolling");
        ticking = true;
      }

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
        ticking = false;
      }, 150);
    };

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

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onAnchorClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onAnchorClick);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <LanguageProvider>
      <FirstTimeLanguageModal />
      <Component {...pageProps} />
      <Mascot />
      <FloatingSocialMedia />
      <Chatbot />
    </LanguageProvider>
  );
}
