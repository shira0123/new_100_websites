"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function ColorBlindnessChecker({ site }) {
  const [color, setColor] = useState("#6366f1");
  const filters = [
    { name: "Normal Vision", filter: "none" },
    { name: "Protanopia (Red-Blind)", filter: "url(#protanopia)" },
    { name: "Deuteranopia (Green-Blind)", filter: "url(#deuteranopia)" },
    { name: "Tritanopia (Blue-Blind)", filter: "url(#tritanopia)" },
    { name: "Achromatopsia (Total)", filter: "grayscale(100%)" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="protanopia"><feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"/></filter>
          <filter id="deuteranopia"><feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"/></filter>
          <filter id="tritanopia"><feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"/></filter>
        </defs>
      </svg>
      <div className={styles.card} style={{ maxWidth: 500, margin: "0 auto 20px" }}>
        <label style={{ fontSize: "0.9rem", opacity: 0.7 }}>Pick a color to simulate:</label>
        <div style={{ display: "flex", gap: 15, alignItems: "center", marginTop: 10 }}>
          <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 60, height: 40, border: "none", borderRadius: 8, cursor: "pointer" }} />
          <input className={styles.input} value={color} onChange={e => setColor(e.target.value)} style={{ margin: 0, flex: 1, fontFamily: "monospace" }} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 15, maxWidth: 900, margin: "0 auto" }}>
        {filters.map(f => (
          <div key={f.name} className={styles.card} style={{ textAlign: "center" }}>
            <div style={{ width: "100%", height: 80, borderRadius: 10, marginBottom: 12, background: color, filter: f.filter }} />
            <p style={{ fontSize: "0.85rem", fontWeight: "bold" }}>{f.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
