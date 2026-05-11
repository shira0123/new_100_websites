"use client";
import { useState } from "react";
import styles from "./site.module.css";
export default function ColorNameFinder({ site }) {
  const [hex, setHex] = useState("#6366f1");
  const [name, setName] = useState("");
  const lookup = async (h) => { setHex(h); try { const c = h.replace("#",""); const r = await fetch(`https://www.thecolorapi.com/id?hex=${c}`); const d = await r.json(); setName(d.name?.value || "Unknown"); } catch { setName("Lookup failed"); }};
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div className={styles.card} style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
        <div style={{ width: "100%", height: 120, borderRadius: 12, background: hex, marginBottom: 20 }} />
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 15 }}>
          <input type="color" value={hex} onChange={e => lookup(e.target.value)} style={{ width: 50, height: 40, border: "none", borderRadius: 8, cursor: "pointer" }} />
          <input className={styles.input} value={hex} onChange={e => setHex(e.target.value)} onBlur={() => lookup(hex)} style={{ margin: 0, flex: 1, fontFamily: "monospace" }} />
          <button onClick={() => lookup(hex)} className={styles.button} style={{ background: site.color }}>Find</button>
        </div>
        {name && <h2 style={{ fontSize: "1.5rem", color: hex }}>{name}</h2>}
      </div>
    </div>
  );
}
