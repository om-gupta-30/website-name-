"use client";

import { useState, useEffect } from "react";
import { useLanguage, PROMPT_SEEN_KEY } from "@/contexts/LanguageContext";
import { LANGUAGES } from "@/lib/translations";

const LANG_STORAGE = "ynm_language";

export default function FirstTimeLanguageModal() {
  const { t, changeLanguage, language, mounted } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    const seen = localStorage.getItem(PROMPT_SEEN_KEY);
    const chosen = localStorage.getItem(LANG_STORAGE);
    if (!seen && !chosen) {
      setShow(true);
    }
  }, [mounted]);

  const handleSelect = (code) => {
    changeLanguage(code);
    setShow(false);
  };

  if (!show) return null;

  const ft = t?.firstTime || {
    title: "Choose your language",
    subtitle: "Select your preferred language to browse the website",
    continue: "Continue",
  };

  return (
    <div className="lang-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="lang-modal-title">
      <div className="lang-modal">
        <div className="lang-modal-glow" />
        <h2 id="lang-modal-title" className="lang-modal-title">{ft.title}</h2>
        <p className="lang-modal-subtitle">{ft.subtitle}</p>
        <div className="lang-modal-grid">
          {LANGUAGES.map(({ code, name }) => (
            <button
              key={code}
              type="button"
              className={`lang-modal-btn ${language === code ? "active" : ""}`}
              onClick={() => handleSelect(code)}
              aria-pressed={language === code}
            >
              {name}
            </button>
          ))}
        </div>
        <p className="lang-modal-hint">{ft.continue}</p>
      </div>
      <style jsx>{`
        .lang-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 20px;
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .lang-modal {
          position: relative;
          background: linear-gradient(145deg, #1a0a0b 0%, #2d1518 50%, #1a0a0b 100%);
          border: 2px solid #C9A24D;
          border-radius: 20px;
          padding: 32px 28px;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 0 60px rgba(201,162,77,0.25), 0 20px 60px rgba(0,0,0,0.5);
        }
        .lang-modal-glow {
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #C9A24D, transparent);
          opacity: 0.8;
        }
        .lang-modal-title {
          font-size: 22px;
          font-weight: 700;
          color: #F7F3EA;
          margin: 0 0 8px;
          text-align: center;
        }
        .lang-modal-subtitle {
          font-size: 14px;
          color: #E6D3A3;
          margin: 0 0 24px;
          text-align: center;
        }
        .lang-modal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }
        .lang-modal-btn {
          padding: 12px 10px;
          font-size: 13px;
          font-weight: 600;
          color: #E6D3A3;
          background: rgba(201,162,77,0.12);
          border: 1px solid rgba(201,162,77,0.4);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .lang-modal-btn:hover {
          background: rgba(201,162,77,0.22);
          border-color: #C9A24D;
          color: #F7F3EA;
        }
        .lang-modal-btn.active {
          background: linear-gradient(135deg, #C9A24D 0%, #E6D3A3 100%);
          color: #74060D;
          border-color: #C9A24D;
        }
        .lang-modal-hint {
          font-size: 12px;
          color: rgba(230,211,163,0.7);
          text-align: center;
          margin: 0;
        }
        @media (max-width: 480px) {
          .lang-modal-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
