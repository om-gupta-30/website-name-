import { useState, useRef, useEffect } from "react";
import { INDIA_MAP_PATHS } from "@/lib/indiaMapPaths";
import indiaContacts from "@/lib/indiaContacts";

const TRANSITION = "fill 0.2s ease, transform 0.2s ease, stroke 0.2s ease";

/*
 * SVG coordinate system (viewBox="-90 -120 680 810")
 *   minX: -90    minY: -120
 *   width: 680   height: 810
 *   X range: -90 to 590   Y range: -120 to 690
 * All state paths in INDIA_MAP_PATHS use these user coordinates.
 */

// Heat colors by contact count: 0 = light gray; 1–2 = light red; 3–5 = medium red; 6+ = dark red
const HEAT_0 = "#e8e4dc";
const HEAT_1_2 = "#f5c6c6";
const HEAT_3_5 = "#d96969";
const HEAT_6_PLUS = "#a52a2a";

const STROKE_DEFAULT = "#555";
const STROKE_ACTIVE = "#1a1a1a";
const STROKE_WIDTH_DEFAULT = 1;
const STROKE_WIDTH_ACTIVE = 1.5;

function getBaseFill(id) {
  const n = indiaContacts[id]?.contacts?.length ?? 0;
  if (n === 0) return HEAT_0;
  if (n <= 2) return HEAT_1_2;
  if (n <= 5) return HEAT_3_5;
  return HEAT_6_PLUS;
}

function darken(hex, factor = 0.88) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.floor(((n >> 16) & 0xff) * factor));
  const g = Math.max(0, Math.floor(((n >> 8) & 0xff) * factor));
  const b = Math.max(0, Math.floor((n & 0xff) * factor));
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function getFill(id, selectedState) {
  const base = getBaseFill(id);
  return selectedState === id ? darken(base) : base;
}

const STATE_NAMES = {
  AN: "Andaman and Nicobar Islands", AP: "Andhra Pradesh", AR: "Arunachal Pradesh", AS: "Assam",
  BR: "Bihar", CH: "Chandigarh", CT: "Chhattisgarh", DD: "Daman and Diu", DL: "Delhi",
  DN: "Dadra and Nagar Haveli", GA: "Goa", GJ: "Gujarat", HP: "Himachal Pradesh", HR: "Haryana",
  JH: "Jharkhand", JK: "Jammu and Kashmir", KA: "Karnataka", KL: "Kerala", LD: "Lakshadweep",
  MH: "Maharashtra", ML: "Meghalaya", MN: "Manipur", MP: "Madhya Pradesh", MZ: "Mizoram",
  NL: "Nagaland", OR: "Odisha", PB: "Punjab", PY: "Puducherry", RJ: "Rajasthan", SK: "Sikkim",
  TG: "Telangana", TN: "Tamil Nadu", TR: "Tripura", UP: "Uttar Pradesh", UT: "Uttarakhand",
  WB: "West Bengal",
};

export default function IndiaPresenceMap() {
  const containerRef = useRef(null);
  const [selectedState, setSelectedState] = useState(null);

  // Click outside map area → clear selection (only one state can be active; toggling same state also clears)
  useEffect(() => {
    const onDocumentClick = (e) => {
      if (selectedState && !containerRef.current?.contains(e.target)) {
        setSelectedState(null);
      }
    };
    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, [selectedState]);

  const handleStateClick = (id, e) => {
    e.stopPropagation();
    setSelectedState((prev) => (prev === id ? null : id));
  };

  const handleSvgBackgroundClick = (e) => {
    if (selectedState && e.target === e.currentTarget) {
      setSelectedState(null);
    }
  };

  const stateName = selectedState ? (indiaContacts[selectedState]?.stateName ?? STATE_NAMES[selectedState] ?? selectedState) : "";
  const contacts = selectedState ? (indiaContacts[selectedState]?.contacts ?? []) : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: "100%" }}>
      <div ref={containerRef} style={{ position: "relative" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-90 -120 680 810"
          width="100%"
          height={500}
          style={{ background: "#f5f5f5", display: "block" }}
          aria-label="Map of India"
          role="img"
          onClick={handleSvgBackgroundClick}
        >
          {INDIA_MAP_PATHS.map(({ id, d }) => {
            const isActive = selectedState === id;
            return (
              <path
                key={id}
                id={id}
                d={d}
                fill={getFill(id, selectedState)}
                stroke={isActive ? STROKE_ACTIVE : STROKE_DEFAULT}
                strokeWidth={isActive ? STROKE_WIDTH_ACTIVE : STROKE_WIDTH_DEFAULT}
                style={{
                  transition: TRANSITION,
                  cursor: "default",
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                  transformOrigin: "center",
                  transformBox: "fill-box",
                }}
                onClick={(e) => handleStateClick(id, e)}
              />
            );
          })}
        </svg>

        <div
          role="group"
          aria-label="State presence scale"
          style={{
            marginTop: 12,
            padding: "8px 0",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px 16px",
            alignItems: "center",
            fontSize: 12,
            color: "#444",
            borderTop: "1px solid #e8e8e8",
          }}
        >
          {[
            [HEAT_0, "No presence"],
            [HEAT_1_2, "1–2 contacts"],
            [HEAT_3_5, "3–5 contacts"],
            [HEAT_6_PLUS, "6+ contacts"],
          ].map(([color, label]) => (
            <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: color, border: "1px solid #ccc", flexShrink: 0 }} />
              <span>{label}</span>
            </span>
          ))}
        </div>

        <p style={{ margin: "8px 0 0", fontSize: 11, color: "#777", lineHeight: 1.5, maxWidth: "100%" }}>
          This map shows YNM Mega Industries' operational presence across India. Click on a state to view the respective regional contacts.
        </p>

        {selectedState && (
          <div
            role="region"
            aria-label={`Contact details for ${stateName}`}
            style={{
              marginTop: 12,
              padding: "16px 20px",
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              maxHeight: 320,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3 }}>
              {stateName}
            </div>
            <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
              {contacts.length > 0 ? (
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                  {contacts.map((c, i) => (
                    <li key={i} style={{ paddingTop: i > 0 ? 16 : 0, borderTop: i > 0 ? "1px solid #eee" : "none" }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 }}>{c?.name ?? ""}</div>
                      <div style={{ fontSize: 13, color: "#555", marginBottom: 2 }}>{c?.role ?? ""}</div>
                      <div style={{ fontSize: 13, color: "#444" }}>
                        <span style={{ color: "#888", marginRight: 4 }}>Phone:</span>
                        {c?.phone ?? "—"}
                      </div>
                      <div style={{ fontSize: 13, color: "#444" }}>
                        <span style={{ color: "#888", marginRight: 4 }}>Email:</span>
                        {c?.email ?? "—"}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ fontSize: 14, color: "#666" }}>No contacts</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
