"use client";
import { useState } from "react";
import styles from "./site.module.css";
export default function ZipCodeLookup({ site }) {
  const [zip, setZip] = useState(""); const [data, setData] = useState(null); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const lookup = async () => { if (!zip.trim()) return; setLoading(true); setError(""); try { const r = await fetch(`https://api.zippopotam.us/us/${zip}`); if (!r.ok) throw new Error("Invalid ZIP"); const d = await r.json(); setData(d); } catch { setError("ZIP code not found"); setData(null); } setLoading(false); };
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div className={styles.card} style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}><input className={styles.input} value={zip} onChange={e => setZip(e.target.value)} placeholder="Enter US ZIP code..." style={{ margin: 0, flex: 1 }} onKeyDown={e => e.key === "Enter" && lookup()} /><button onClick={lookup} className={styles.button} style={{ background: site.color }}>Lookup</button></div>
        {loading && <div className={styles.spinner} />}
        {error && <p style={{ color: "#ef4444" }}>❌ {error}</p>}
        {data && (
          <div style={{ textAlign: "left" }}>
            {data.places?.map((p, i) => (
              <div key={i} style={{ padding: 15, borderRadius: 10, background: "rgba(255,255,255,0.03)", marginBottom: 10 }}>
                <h3>{p["place name"]}</h3>
                <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>{p.state} ({p["state abbreviation"]})</p>
                <p style={{ opacity: 0.4, fontSize: "0.8rem" }}>Lat: {p.latitude} · Lon: {p.longitude}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
