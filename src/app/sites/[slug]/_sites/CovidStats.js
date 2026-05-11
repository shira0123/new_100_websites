"use client";
import { useState } from "react";
import styles from "./site.module.css";
const COVID_DATA = [
  { country: "USA", cases: "103.8M", deaths: "1.18M", recovered: "101.2M", flag: "🇺🇸" },
  { country: "India", cases: "45.0M", deaths: "533K", recovered: "44.4M", flag: "🇮🇳" },
  { country: "France", cases: "38.9M", deaths: "167K", recovered: "38.7M", flag: "🇫🇷" },
  { country: "Germany", cases: "38.4M", deaths: "174K", recovered: "38.1M", flag: "🇩🇪" },
  { country: "Brazil", cases: "37.7M", deaths: "702K", recovered: "36.9M", flag: "🇧🇷" },
  { country: "Japan", cases: "33.8M", deaths: "74.7K", recovered: "33.5M", flag: "🇯🇵" },
  { country: "UK", cases: "24.7M", deaths: "228K", recovered: "24.4M", flag: "🇬🇧" },
  { country: "Russia", cases: "22.7M", deaths: "399K", recovered: "22.2M", flag: "🇷🇺" },
];
export default function CovidStats({ site }) {
  const [search, setSearch] = useState("");
  const filtered = COVID_DATA.filter(d => !search || d.country.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div style={{ maxWidth: 500, margin: "0 auto 25px" }}><input className={styles.input} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search country..." /></div>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[["🦠","777M","Total Cases"],["💀","7.1M","Total Deaths"],["💚","769M","Recovered"],["📊","6.96B","Vaccinated"]].map(([e,n,l]) => (
            <div key={l} className={styles.card} style={{ textAlign: "center", padding: 15 }}><div style={{ fontSize: "1.5rem" }}>{e}</div><div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{n}</div><div style={{ fontSize: "0.7rem", opacity: 0.4 }}>{l}</div></div>
          ))}
        </div>
        {filtered.map(d => (
          <div key={d.country} className={styles.card} style={{ display: "grid", gridTemplateColumns: "150px 1fr 1fr 1fr", alignItems: "center", marginBottom: 8, padding: "12px 20px" }}>
            <div><span style={{ marginRight: 8 }}>{d.flag}</span><strong>{d.country}</strong></div>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: "0.7rem", opacity: 0.4 }}>Cases</div><div style={{ fontWeight: "bold", color: "#f59e0b" }}>{d.cases}</div></div>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: "0.7rem", opacity: 0.4 }}>Deaths</div><div style={{ fontWeight: "bold", color: "#ef4444" }}>{d.deaths}</div></div>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: "0.7rem", opacity: 0.4 }}>Recovered</div><div style={{ fontWeight: "bold", color: "#22c55e" }}>{d.recovered}</div></div>
          </div>
        ))}
        <p style={{ textAlign: "center", fontSize: "0.7rem", opacity: 0.3, marginTop: 15 }}>Historical data · Last updated snapshot</p>
      </div>
    </div>
  );
}
