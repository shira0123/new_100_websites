"use client";
import { useState } from "react";
import styles from "./site.module.css";
export default function MusicExplorer({ site }) {
  const [query, setQuery] = useState(""); const [results, setResults] = useState([]); const [loading, setLoading] = useState(false);
  const search = async () => { if (!query.trim()) return; setLoading(true); try { const r = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=12`); const d = await r.json(); setResults(d.results || []); } catch {} setLoading(false); };
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div style={{ maxWidth: 500, margin: "0 auto 25px", display: "flex", gap: 10 }}><input className={styles.input} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search artists or songs..." style={{ margin: 0, flex: 1 }} onKeyDown={e => e.key === "Enter" && search()} /><button onClick={search} className={styles.button} style={{ background: site.color }}>Search</button></div>
      {loading ? <div style={{ textAlign: "center", padding: 60 }}><div className={styles.spinner} /></div> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 15, maxWidth: 900, margin: "0 auto" }}>
          {results.map((r, i) => (
            <div key={i} className={styles.card} style={{ textAlign: "center" }}>
              <img src={r.artworkUrl100} alt={r.trackName} style={{ width: 100, height: 100, borderRadius: 12, marginBottom: 10 }} />
              <h4 style={{ fontSize: "0.85rem", marginBottom: 3 }}>{r.trackName}</h4>
              <p style={{ fontSize: "0.75rem", opacity: 0.5, marginBottom: 8 }}>{r.artistName}</p>
              {r.previewUrl && <audio controls src={r.previewUrl} style={{ width: "100%", height: 30 }} />}
            </div>
          ))}
        </div>
      )}
      {!loading && results.length === 0 && <p style={{ textAlign: "center", opacity: 0.4, padding: 40 }}>Search to discover music.</p>}
    </div>
  );
}
