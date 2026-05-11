"use client";
import { useState } from "react";
import styles from "./site.module.css";
const MISSIONS = [
  { name: "Apollo 11", date: "1969-07-20", agency: "NASA", status: "Success", desc: "First humans on the Moon", emoji: "🌕" },
  { name: "Voyager 1", date: "1977-09-05", agency: "NASA", status: "Active", desc: "Farthest human-made object from Earth", emoji: "🛸" },
  { name: "Curiosity Rover", date: "2011-11-26", agency: "NASA", status: "Active", desc: "Mars exploration rover in Gale Crater", emoji: "🔴" },
  { name: "James Webb Telescope", date: "2021-12-25", agency: "NASA/ESA", status: "Active", desc: "Most powerful space telescope ever", emoji: "🔭" },
  { name: "Chandrayaan-3", date: "2023-07-14", agency: "ISRO", status: "Success", desc: "India's lunar south pole landing", emoji: "🇮🇳" },
  { name: "SpaceX Starship", date: "2024-06-06", agency: "SpaceX", status: "Testing", desc: "Fully reusable super heavy-lift launch vehicle", emoji: "🚀" },
  { name: "Artemis II", date: "2025-09-01", agency: "NASA", status: "Planned", desc: "First crewed mission around the Moon since Apollo", emoji: "🌙" },
];
export default function SpaceMissions({ site }) {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Success", "Active", "Testing", "Planned"];
  const filtered = MISSIONS.filter(m => filter === "All" || m.status === filter);
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 25, flexWrap: "wrap" }}>
        {statuses.map(s => <button key={s} onClick={() => setFilter(s)} className={styles.button} style={{ background: filter === s ? site.color : "rgba(255,255,255,0.05)" }}>{s}</button>)}
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {filtered.map(m => (
          <div key={m.name} className={styles.card} style={{ display: "flex", gap: 15, alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: "2rem" }}>{m.emoji}</div>
            <div style={{ flex: 1 }}><h3 style={{ fontSize: "1rem" }}>{m.name}</h3><p style={{ fontSize: "0.8rem", opacity: 0.6 }}>{m.desc}</p><div style={{ display: "flex", gap: 10, marginTop: 5, fontSize: "0.75rem" }}><span style={{ opacity: 0.4 }}>{m.date}</span><span style={{ opacity: 0.4 }}>{m.agency}</span></div></div>
            <span style={{ fontSize: "0.7rem", padding: "3px 10px", borderRadius: 10, background: m.status === "Success" ? "#22c55e22" : m.status === "Active" ? "#3b82f622" : "#f59e0b22", color: m.status === "Success" ? "#22c55e" : m.status === "Active" ? "#3b82f6" : "#f59e0b" }}>{m.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
