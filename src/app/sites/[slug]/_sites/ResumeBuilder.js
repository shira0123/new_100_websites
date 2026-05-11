"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function ResumeBuilder({ site }) {
  const [data, setData] = useState({ name: "John Doe", title: "Software Engineer", email: "john@example.com", phone: "+1 234 567 890", summary: "Experienced developer with a passion for building scalable applications.", experience: [{ company: "Tech Corp", role: "Senior Developer", years: "2021-Present", desc: "Led team of 5 engineers on cloud platform migration." }, { company: "StartupXYZ", role: "Full-Stack Developer", years: "2018-2021", desc: "Built core product features serving 50K+ users." }], education: [{ school: "MIT", degree: "B.S. Computer Science", year: "2018" }], skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"] });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 900, margin: "0 auto" }}>
        <div className={styles.card}>
          <h3 style={{ marginBottom: 15 }}>✏️ Edit Resume</h3>
          <input className={styles.input} value={data.name} onChange={e => setData({...data, name: e.target.value})} placeholder="Full Name" style={{ marginBottom: 10 }} />
          <input className={styles.input} value={data.title} onChange={e => setData({...data, title: e.target.value})} placeholder="Job Title" style={{ marginBottom: 10 }} />
          <input className={styles.input} value={data.email} onChange={e => setData({...data, email: e.target.value})} placeholder="Email" style={{ marginBottom: 10 }} />
          <textarea className={styles.input} value={data.summary} onChange={e => setData({...data, summary: e.target.value})} rows={3} style={{ marginBottom: 10, resize: "vertical" }} />
          <button className={styles.button} onClick={() => window.print()} style={{ background: site.color, width: "100%" }}>🖨️ Print / Save PDF</button>
        </div>
        <div className={styles.card} style={{ background: "rgba(255,255,255,0.08)", fontFamily: "serif" }}>
          <h2 style={{ fontSize: "1.5rem", borderBottom: `2px solid ${site.color}`, paddingBottom: 10, marginBottom: 10 }}>{data.name}</h2>
          <p style={{ opacity: 0.7, marginBottom: 5 }}>{data.title}</p>
          <p style={{ fontSize: "0.8rem", opacity: 0.5, marginBottom: 15 }}>{data.email} · {data.phone}</p>
          <h4 style={{ color: site.color, marginBottom: 5 }}>SUMMARY</h4>
          <p style={{ fontSize: "0.85rem", opacity: 0.8, marginBottom: 15 }}>{data.summary}</p>
          <h4 style={{ color: site.color, marginBottom: 5 }}>EXPERIENCE</h4>
          {data.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: "0.9rem" }}>{e.role}</strong><span style={{ fontSize: "0.75rem", opacity: 0.5 }}>{e.years}</span></div>
              <p style={{ fontSize: "0.8rem", opacity: 0.6 }}>{e.company}</p>
              <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>{e.desc}</p>
            </div>
          ))}
          <h4 style={{ color: site.color, marginBottom: 5 }}>SKILLS</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {data.skills.map(s => <span key={s} style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: 8, background: site.color + "22", color: site.color }}>{s}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
