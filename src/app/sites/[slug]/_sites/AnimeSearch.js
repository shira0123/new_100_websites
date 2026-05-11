"use client";
import { useState } from "react";
import styles from "./site.module.css";
export default function AnimeSearch({ site }) {
  const [query, setQuery] = useState(""); const [results, setResults] = useState([]); const [loading, setLoading] = useState(false);
  const search = async () => { if (!query.trim()) return; setLoading(true); try { const r = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=12`); const d = await r.json(); setResults(d.data || []); } catch {} setLoading(false); };
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div style={{ maxWidth: 500, margin: "0 auto 25px", display: "flex", gap: 10 }}><input className={styles.input} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search anime..." style={{ margin: 0, flex: 1 }} onKeyDown={e => e.key === "Enter" && search()} /><button onClick={search} className={styles.button} style={{ background: site.color }}>Search</button></div>
      {loading ? <div style={{ textAlign: "center", padding: 60 }}><div className={styles.spinner} /></div> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 15, maxWidth: 900, margin: "0 auto" }}>
          {results.map(a => (
            <div key={a.mal_id} className={styles.card} style={{ textAlign: "center" }}>
              <img src={a.images?.jpg?.image_url} alt={a.title} style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 8, marginBottom: 10 }} />
              <h4 style={{ fontSize: "0.85rem", marginBottom: 3 }}>{a.title}</h4>
              <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
                {a.score && <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 8, background: "#fbbf2422", color: "#fbbf24" }}>⭐ {a.score}</span>}
                <span style={{ fontSize: "0.7rem", opacity: 0.4 }}>{a.episodes ? `${a.episodes} eps` : a.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && results.length === 0 && <p style={{ textAlign: "center", opacity: 0.4, padding: 40 }}>Search for your favorite anime.</p>}
    </div>
  );
}
