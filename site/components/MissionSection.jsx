"use client";

import { memo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Fallback data (used when database is not available)
const getFallbackMission = (language) => ({
  title: language === 'hi' ? "निर्माण उत्कृष्टता" : "Manufacturing Excellence",
  text: language === 'hi'
    ? "हम उन्नत निर्माण प्रक्रियाओं और कड़े गुणवत्ता नियंत्रण के माध्यम से विश्व स्तरीय पेंट, निर्माण और स्कूल फर्नीचर प्रदान करने के लिए प्रतिबद्ध हैं। हमारा मिशन नवाचारी, टिकाऊ उत्पाद प्रदान करना है जो हमारे घरेलू और अंतर्राष्ट्रीय ग्राहकों की विकसित होती जरूरतों को पूरा करते हैं।"
    : "We are committed to delivering world-class paints, fabrications, and school furniture through advanced manufacturing processes and stringent quality control. Our mission is to provide innovative, durable products that meet the evolving needs of our domestic and international clients.",
});

const getFallbackVision = (language) => ({
  title: language === 'hi' ? "वैश्विक उद्योग नेता" : "Global Industry Leader",
  text: language === 'hi'
    ? "उत्पाद उत्कृष्टता, नवाचार और विश्वसनीयता के लिए जानी जाने वाली एक वैश्विक रूप से मान्यता प्राप्त निर्माण और निर्यात कंपनी बनना। हम महाद्वीपों में अपनी उपस्थिति का विस्तार करते हुए गुणवत्ता और ग्राहक संतुष्टि के उच्चतम मानकों को बनाए रखने की कल्पना करते हैं।"
    : "To become a globally recognized manufacturing and export company, known for product excellence, innovation, and reliability. We envision expanding our presence across continents while maintaining the highest standards of quality and customer satisfaction.",
});

function MissionSection({ missionData: propMissionData }) {
  const { t, language } = useLanguage();
  const missionData = propMissionData || null;

  // Use missionData if available, otherwise fallback with translations
  const mission = {
    title: missionData?.missionTitle || getFallbackMission(language).title,
    text: missionData?.missionText || getFallbackMission(language).text,
  };
  
  const vision = {
    title: missionData?.visionTitle || getFallbackVision(language).title,
    text: missionData?.visionText || getFallbackVision(language).text,
  };

  return (
    <section id="mission">
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

      <h2>{t?.mission?.title || "Our Mission & Vision"}</h2>
      <div className="mv-divider"></div>
      
      <div className="mv-grid">
        {/* Mission Card */}
        <div className="mv-card">
          <div className="mv-card-inner">
            <span className="mv-label">{t?.mission?.missionLabel || "Our Mission"}</span>
            <h3>{mission.title}</h3>
            <p>{mission.text}</p>
            <div className="mv-accent"></div>
          </div>
        </div>

        {/* Vision Card */}
        <div className="mv-card">
          <div className="mv-card-inner">
            <span className="mv-label">{t?.mission?.visionLabel || "Our Vision"}</span>
            <h3>{vision.title}</h3>
            <p>{vision.text}</p>
            <div className="mv-accent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(MissionSection);
