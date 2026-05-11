"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";
export default function AdviceGenerator({ site }) {
  const [advice, setAdvice] = useState(""); const [loading, setLoading] = useState(false); const [id, setId] = useState(0);
  const getAdvice = async () => { setLoading(true); try { const r = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" }); const d = await r.json(); setAdvice(d.slip.advice); setId(d.slip.id); } catch { setAdvice("Stay positive and keep learning!"); } setLoading(false); };
  useEffect(() => { getAdvice(); }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div className={styles.card} style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", opacity: 0.4, marginBottom: 15 }}>ADVICE #{id}</p>
        <p style={{ fontSize: "1.4rem", fontWeight: "bold", lineHeight: 1.6, marginBottom: 25, minHeight: 80 }}>&ldquo;{advice}&rdquo;</p>
        <div style={{ width: "100%", height: 1, background: `linear-gradient(90deg, transparent, ${site.color}, transparent)`, marginBottom: 25 }} />
        <button onClick={getAdvice} className={styles.button} style={{ background: site.color }} disabled={loading}>{loading ? "Loading..." : "🎲 Get New Advice"}</button>
      </div>
    </div>
  );
}
