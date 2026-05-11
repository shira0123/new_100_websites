"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

export default function MemeGenerator({ site }) {
  const [memes, setMemes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [top, setTop] = useState("TOP TEXT");
  const [bottom, setBottom] = useState("BOTTOM TEXT");

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(r => r.json()).then(d => { setMemes(d.data.memes.slice(0, 20)); setSelected(d.data.memes[0]); }).catch(() => {});
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, maxWidth: 800, margin: "0 auto" }}>
        <div className={styles.card} style={{ textAlign: "center" }}>
          {selected && (
            <div style={{ position: "relative", display: "inline-block" }}>
              <img src={selected.url} alt={selected.name} style={{ maxWidth: "100%", maxHeight: 400, borderRadius: 12 }} />
              <div style={{ position: "absolute", top: 10, left: 0, right: 0, textAlign: "center", color: "white", fontWeight: 900, fontSize: "1.5rem", textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000", textTransform: "uppercase" }}>{top}</div>
              <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center", color: "white", fontWeight: 900, fontSize: "1.5rem", textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000", textTransform: "uppercase" }}>{bottom}</div>
            </div>
          )}
        </div>
        <div className={styles.card}>
          <h3 style={{ marginBottom: 15 }}>Customize</h3>
          <label style={{ fontSize: "0.8rem", opacity: 0.5 }}>Top Text</label>
          <input className={styles.input} value={top} onChange={e => setTop(e.target.value)} style={{ marginBottom: 10 }} />
          <label style={{ fontSize: "0.8rem", opacity: 0.5 }}>Bottom Text</label>
          <input className={styles.input} value={bottom} onChange={e => setBottom(e.target.value)} style={{ marginBottom: 15 }} />
          <label style={{ fontSize: "0.8rem", opacity: 0.5 }}>Template</label>
          <div style={{ maxHeight: 250, overflowY: "auto" }}>
            {memes.map(m => (
              <button key={m.id} onClick={() => setSelected(m)} className={styles.button} style={{ width: "100%", marginBottom: 5, textAlign: "left", fontSize: "0.8rem", background: selected?.id === m.id ? site.color : "rgba(255,255,255,0.05)" }}>{m.name}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
