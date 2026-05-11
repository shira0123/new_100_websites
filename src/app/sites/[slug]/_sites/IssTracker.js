"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";
export default function IssTracker({ site }) {
  const [pos, setPos] = useState(null); const [loading, setLoading] = useState(true);
  const fetchPos = async () => { try { const r = await fetch("https://api.wheretheiss.at/v1/satellites/25544"); const d = await r.json(); setPos(d); } catch {} setLoading(false); };
  useEffect(() => { fetchPos(); const i = setInterval(fetchPos, 5000); return () => clearInterval(i); }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div className={styles.card} style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: 15 }}>🛰️</div>
        {loading ? <div className={styles.spinner} /> : pos ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginBottom: 20 }}>
              <div style={{ padding: 15, borderRadius: 10, background: "rgba(255,255,255,0.03)" }}><div style={{ fontSize: "0.75rem", opacity: 0.4 }}>Latitude</div><div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>{Number(pos.latitude).toFixed(4)}°</div></div>
              <div style={{ padding: 15, borderRadius: 10, background: "rgba(255,255,255,0.03)" }}><div style={{ fontSize: "0.75rem", opacity: 0.4 }}>Longitude</div><div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>{Number(pos.longitude).toFixed(4)}°</div></div>
              <div style={{ padding: 15, borderRadius: 10, background: "rgba(255,255,255,0.03)" }}><div style={{ fontSize: "0.75rem", opacity: 0.4 }}>Altitude</div><div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>{Number(pos.altitude).toFixed(1)} km</div></div>
              <div style={{ padding: 15, borderRadius: 10, background: "rgba(255,255,255,0.03)" }}><div style={{ fontSize: "0.75rem", opacity: 0.4 }}>Velocity</div><div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>{Number(pos.velocity).toFixed(0)} km/h</div></div>
            </div>
            <p style={{ fontSize: "0.75rem", opacity: 0.3 }}>Updates every 5 seconds</p>
          </>
        ) : <p style={{ opacity: 0.5 }}>Failed to load ISS position.</p>}
      </div>
    </div>
  );
}
