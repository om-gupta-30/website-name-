"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Company facts and prompts the mascot will share
const mascotPrompts = [
  "🏭 YNM has been manufacturing quality products since 2013!",
  "🌍 We export to 15+ countries across Asia, Africa & Middle East!",
  "🎨 Our premium paints come with a 10+ year warranty!",
  "🔧 Custom fabrication? We've got precision engineering!",
  "📚 We've furnished 500+ schools with ergonomic furniture!",
  "✅ All products are ISO 9001:2015 certified!",
  "🚀 We offer competitive FOB & CIF pricing!",
  "💼 From design to delivery - we handle everything!",
  "🛡️ Quality is our priority - stringent QC at every stage!",
  "🤝 Trusted by leading companies across India!",
  "🏗️ Our structural steel is load-certified!",
  "🎯 Custom color matching available!",
  "📦 Reliable shipping with documentation support!",
  "⭐ 100% customer satisfaction is our mission!",
  "🔬 We use only premium raw materials!",
  "💪 YNM Safety - Your trusted partner!",
  "🌟 Excellence in manufacturing since 2013!",
  "🎖️ Award-winning quality standards!",
];

export default function Mascot() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Get random prompt
  const getRandomPrompt = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * mascotPrompts.length);
    return mascotPrompts[randomIndex];
  }, []);

  // Track scroll position for mascot animation
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  // Calculate a subtle bounce based on scroll (optional, can remove if animation handles it)
  const bounceOffset = Math.sin(scrollY * 0.01) * 3;
  const transformStyle = `translateY(${bounceOffset}px)`;

  // Always render container so animation can work
  return (
    <div 
      className={`mascot-container ${isVisible ? "visible" : ""} ${isMinimized ? "minimized" : ""}`}
      style={{ transform: transformStyle }}
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
