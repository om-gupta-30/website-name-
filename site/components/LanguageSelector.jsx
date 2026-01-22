"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGUAGES } from "@/lib/translations";

export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const ref = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const onOut = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", onOut);
    return () => document.removeEventListener("click", onOut);
  }, []);

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 6,
        right: window.innerWidth - rect.right
      });
    }
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="lang-selector-wrap" ref={ref}>
      <button
        ref={triggerRef}
        type="button"
        className="lang-selector-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language: ${current.name}. Choose language`}
      >
        <span className="lang-selector-current">{current.name}</span>
        <svg className={`lang-selector-chevron ${open ? "open" : ""}`} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div 
          className="lang-selector-dropdown" 
          role="listbox"
          style={{ top: `${dropdownPosition.top}px`, right: `${dropdownPosition.right}px` }}
        >
          {LANGUAGES.map(({ code, name }) => (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={language === code}
              className={`lang-selector-option ${language === code ? "active" : ""}`}
              onClick={() => {
                changeLanguage(code);
                setOpen(false);
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
      <style jsx>{`
        .lang-selector-wrap { position: relative; z-index: 999999; }
        .lang-selector-trigger {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 13px;
          font-weight: 600;
          color: #E6D3A3;
          background: rgba(201,162,77,0.15);
          border: 1px solid rgba(201,162,77,0.45);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .lang-selector-trigger:hover { background: rgba(201,162,77,0.25); border-color: #C9A24D; }
        .lang-selector-chevron { transition: transform 0.2s; }
        .lang-selector-chevron.open { transform: rotate(180deg); }
        .lang-selector-dropdown {
          position: fixed;
          min-width: 160px;
          max-height: 280px;
          overflow-y: auto;
          background: linear-gradient(180deg, #1a0a0b 0%, #2d1518 100%);
          border: 1px solid #C9A24D;
          border-radius: 10px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          z-index: 999999;
          padding: 6px;
        }
        .lang-selector-option {
          display: block;
          width: 100%;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 500;
          color: #E6D3A3;
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s;
        }
        .lang-selector-option:hover { background: rgba(201,162,77,0.2); color: #F7F3EA; }
        .lang-selector-option.active { background: rgba(201,162,77,0.3); color: #C9A24D; }
      `}</style>
    </div>
  );
}
