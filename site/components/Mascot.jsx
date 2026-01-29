"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

// Company facts and prompts the mascot will share
const mascotPrompts = [
  "🌍 Leading manufacturer & exporter of road marking paints to 15+ countries across Asia, Africa & the Middle East!",
  "🛣️ We manufacture hot thermoplastic paints, cold plastic paints & water-based road marking paints for highways!",
  "🛡️ Trusted road safety products manufacturer - crash barriers, retro reflective signages & gantry systems!",
  "🏗️ In-house metal fabrication for W beam, double W beam, thrie beam & roller crash barriers!",
  "⭐ Premium raw materials used in manufacturing road marking paints & highway safety products!",
];

export default function Mascot() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollYRef = useRef(0);
  const rafIdRef = useRef(null);
  const containerRef = useRef(null);

  // Get random prompt
  const getRandomPrompt = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * mascotPrompts.length);
    return mascotPrompts[randomIndex];
  }, []);

  // Optimized scroll tracking using RAF - updates transform directly without state
  useEffect(() => {
    let ticking = false;
    
    const updatePosition = () => {
      if (containerRef.current) {
        const bounceOffset = Math.sin(scrollYRef.current * 0.01) * 3;
        containerRef.current.style.transform = `translateY(${bounceOffset}px)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      
      if (!ticking) {
        rafIdRef.current = requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Show mascot after page loads with pop-in animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show first prompt after mascot appears
      setTimeout(() => {
        setCurrentPrompt(getRandomPrompt());
        setShowBubble(true);
      }, 600); // Delay bubble to appear after mascot pops in
    }, 1500);

    return () => clearTimeout(timer);
  }, [getRandomPrompt]);

  // Auto-rotate prompts every 5 seconds
  useEffect(() => {
    if (!isVisible || isMinimized) return;

    const interval = setInterval(() => {
      setShowBubble(false);
      setTimeout(() => {
        setCurrentPrompt(getRandomPrompt());
        setShowBubble(true);
      }, 300);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [isVisible, isMinimized, getRandomPrompt]);

  // Handle mascot click - show new prompt
  const handleMascotClick = () => {
    if (isMinimized) {
      setIsMinimized(false);
      setTimeout(() => {
        setCurrentPrompt(getRandomPrompt());
        setShowBubble(true);
      }, 200);
    } else {
      setShowBubble(false);
      setTimeout(() => {
        setCurrentPrompt(getRandomPrompt());
        setShowBubble(true);
      }, 200);
    }
  };

  // Minimize mascot
  const handleMinimize = (e) => {
    e.stopPropagation();
    setShowBubble(false);
    setIsMinimized(true);
  };

  // Always render container so animation can work
  return (
    <div 
      ref={containerRef}
      className={`mascot-container ${isVisible ? "visible" : ""} ${isMinimized ? "minimized" : ""}`}
    >
      {/* Mascot Character */}
      <div className="mascot-character" onClick={handleMascotClick}>
        <div className="mascot-glow" />
        <Image
          src="/assets/mascot.png"
          alt="YNM Safety Mascot"
          width={140}
          height={140}
          className="mascot-image"
          priority
        />
        {isMinimized && (
          <div className="mascot-badge">
            <span>💬</span>
          </div>
        )}
      </div>

      {/* Speech Bubble - Beside the mascot */}
      {showBubble && !isMinimized && (
        <div className="mascot-bubble">
          <button className="mascot-bubble-close" onClick={handleMinimize} aria-label="Close">
            ×
          </button>
          <p>{currentPrompt}</p>
          <div className="mascot-bubble-tip" />
        </div>
      )}
    </div>
  );
}
