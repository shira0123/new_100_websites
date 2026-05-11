"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";
export default function CatFacts({ site }) {
  const [fact, setFact] = useState(""); const [history, setHistory] = useState([]); const [loading, setLoading] = useState(false);
  const getFact = async () => { setLoading(true); try { const r = await fetch("https://catfact.ninja/fact"); const d = await r.json(); setFact(d.fact); setHistory(h => [d.fact, ...h].slice(0, 10)); } catch { setFact("Cats sleep 12-16 hours per day."); } setLoading(false); };
  useEffect(() => { getFact(); }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div className={styles.card} style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: 15 }}>🐱</div>
        <p style={{ fontSize: "1.2rem", lineHeight: 1.6, marginBottom: 25, minHeight: 60 }}>{fact}</p>
        <button onClick={getFact} className={styles.button} style={{ background: site.color }} disabled={loading}>{loading ? "Loading..." : "🐾 New Fact"}</button>
      </div>
      {history.length > 1 && (
        <div className={styles.card} style={{ maxWidth: 500, margin: "20px auto 0" }}>
          <h3 style={{ marginBottom: 10, fontSize: "0.9rem", opacity: 0.6 }}>Previous Facts</h3>
          {history.slice(1).map((f, i) => <p key={i} style={{ fontSize: "0.85rem", opacity: 0.5, marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{f}</p>)}
        </div>
      )}
    </div>
  );
}
