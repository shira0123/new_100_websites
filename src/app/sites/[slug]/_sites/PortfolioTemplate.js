"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function PortfolioTemplate({ site }) {
  const [activeSection, setActiveSection] = useState("about");
  const sections = ["about", "skills", "projects", "contact"];
  const skills = [
    { name: "React", level: 90 }, { name: "JavaScript", level: 95 },
    { name: "CSS/SCSS", level: 85 }, { name: "Node.js", level: 80 },
    { name: "Python", level: 75 }, { name: "TypeScript", level: 88 },
  ];
  const projects = [
    { title: "E-Commerce Platform", desc: "Full-stack shopping app with payments", tech: "React, Node, Stripe" },
    { title: "Task Manager Pro", desc: "Collaborative project management tool", tech: "Next.js, PostgreSQL" },
    { title: "Weather Dashboard", desc: "Real-time weather with beautiful charts", tech: "Vue.js, Chart.js" },
    { title: "Social Media API", desc: "RESTful API with auth and rate limiting", tech: "Express, MongoDB" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      <div className={styles.card} style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${site.color}, ${site.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 15px" }}>👨‍💻</div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 5 }}>John Developer</h2>
          <p style={{ opacity: 0.6 }}>Full-Stack Engineer · Open Source Contributor</p>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 30, flexWrap: "wrap" }}>
          {sections.map(s => (
            <button key={s} onClick={() => setActiveSection(s)} className={styles.button}
              style={{ background: activeSection === s ? site.color : "rgba(255,255,255,0.05)", textTransform: "capitalize" }}>{s}</button>
          ))}
        </div>
        {activeSection === "about" && (
          <div style={{ lineHeight: 1.8, opacity: 0.85 }}>
            <p>Passionate developer with 5+ years of experience building scalable web applications. I specialize in React ecosystems and cloud-native architectures. When I'm not coding, I contribute to open-source projects and write technical blogs.</p>
          </div>
        )}
        {activeSection === "skills" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {skills.map(s => (
              <div key={s.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontWeight: "bold" }}>{s.name}</span><span style={{ opacity: 0.5 }}>{s.level}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)" }}>
                  <div style={{ height: "100%", borderRadius: 3, width: `${s.level}%`, background: site.color, transition: "width 0.8s ease" }} />
                </div>
              </div>
            ))}
          </div>
        )}
        {activeSection === "projects" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 15 }}>
            {projects.map(p => (
              <div key={p.title} style={{ padding: 20, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: "1rem", marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: "0.85rem", opacity: 0.6, marginBottom: 10 }}>{p.desc}</p>
                <span style={{ fontSize: "0.7rem", padding: "3px 8px", borderRadius: 8, background: site.color + "22", color: site.color }}>{p.tech}</span>
              </div>
            ))}
          </div>
        )}
        {activeSection === "contact" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <input className={styles.input} placeholder="Your Name" />
            <input className={styles.input} placeholder="Your Email" />
            <textarea className={styles.input} placeholder="Your Message" rows={4} style={{ resize: "vertical" }} />
            <button className={styles.button} style={{ background: site.color }}>Send Message</button>
          </div>
        )}
      </div>
    </div>
  );
}
