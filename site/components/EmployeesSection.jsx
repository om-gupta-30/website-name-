"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const employeeNames = ["Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sneha Reddy", "Vikram Singh", "Ananya Gupta"];
const employeePhotos = ["/assets/team-member-01.png", "/assets/team-member-02.png", "/assets/team-member-03.png", "/assets/team-member-04.png", "/assets/team-member-05.png", "/assets/team-member-06.png"];

export default function EmployeesSection({ employeesData: propEmployeesData }) {
  const { t } = useLanguage();
  const [employeesData, setEmployeesData] = useState(propEmployeesData || []);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (propEmployeesData) setEmployeesData(propEmployeesData);
  }, [propEmployeesData]);

  const fallbackFromT = (t?.employees?.fallback || []).slice(0, 6).map((fb, i) => ({
    id: i + 1,
    name: employeeNames[i] || "Team Member",
    role: fb.role,
    department: fb.department,
    text: fb.text,
    photo: employeePhotos[i] || "/assets/gallery-quality-control.jpg",
  }));
  const displayData = employeesData && employeesData.length > 0
    ? employeesData
    : fallbackFromT.length >= 6 ? fallbackFromT : [{ id: 1, name: "Rajesh Kumar", role: "Chief Executive Officer (CEO)", department: "Executive Leadership", text: "At YNM Mega Industries, we're committed to manufacturing excellence and global expansion.", photo: "/assets/team-member-01.png" }];

  return (
    <section id="our-team" className="employees-section">
      {/* Neon Particles */}
      <div className="neon-particles">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="neon-particle" />
        ))}
      </div>

      {/* Header */}
      <div className="employees-header">
        <span className="employees-tag">{t?.employees?.tag || "Our Team"}</span>
        <h2>{t?.employees?.title || "What Our Employees Say"}</h2>
        <p>{t?.employees?.subtitle || "Hear from our leadership team and key employees about our mission, values, and commitment to excellence"}</p>
        <div className="employees-line" />
      </div>

      {/* Grid Layout */}
      <div className="employees-grid">
        {displayData.map((employee, index) => {
          const photoSrc = employee.photo || "/assets/gallery-quality-control.jpg";
          const isHovered = hoveredCard === employee.id;
          
          return (
            <div
              key={employee.id}
              className={`employee-card ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(employee.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Background Pattern */}
              <div className="employee-card-bg" />
              
              {/* Photo Section */}
              <div className="employee-photo-section">
                <div className="employee-photo-wrapper">
                  <div className="employee-photo-border" />
                  <div className="employee-photo">
                    <Image
                      src={photoSrc}
                      alt={employee.name}
                      fill
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                  <div className="employee-photo-glow" />
                </div>
              </div>

              {/* Content Section */}
              <div className="employee-content">
                <div className="employee-quote-icon">"</div>
                <p className="employee-text">{employee.text}</p>
                
                <div className="employee-info">
                  <h4 className="employee-name">{employee.name}</h4>
                  <p className="employee-role">{employee.role}</p>
                  <span className="employee-department">{employee.department}</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="employee-card-accent" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
