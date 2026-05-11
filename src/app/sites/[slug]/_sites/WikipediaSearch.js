"use client";
import { useState } from "react";
import styles from "./site.module.css";
export default function WikipediaSearch({ site }) {
  const [query, setQuery] = useState(""); const [results, setResults] = useState([]); const [loading, setLoading] = useState(false); const [preview, setPreview] = useState(null);
  const search = async () => { if (!query.trim()) return; setLoading(true); setPreview(null); try { const r = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=10`); const d = await r.json(); setResults(d.query?.search || []); } catch {} setLoading(false); };
  const loadPreview = async (title) => { try { const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`); const d = await r.json(); setPreview(d); } catch {} };
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div style={{ maxWidth: 500, margin: "0 auto 25px", display: "flex", gap: 10 }}><input className={styles.input} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Wikipedia..." style={{ margin: 0, flex: 1 }} onKeyDown={e => e.key === "Enter" && search()} /><button onClick={search} className={styles.button} style={{ background: site.color }}>Search</button></div>
      {loading ? <div style={{ textAlign: "center", padding: 60 }}><div className={styles.spinner} /></div> : (
        <div style={{ display: "grid", gridTemplateColumns: preview ? "1fr 350px" : "1fr", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          <div>
            {results.map(r => (
              <div key={r.pageid} onClick={() => loadPreview(r.title)} className={styles.card} style={{ cursor: "pointer", marginBottom: 10, border: preview?.title === r.title ? `1px solid ${site.color}` : "1px solid transparent" }}>
                <h3 style={{ fontSize: "1rem", marginBottom: 5 }}>{r.title}</h3>
                <p style={{ fontSize: "0.85rem", opacity: 0.6 }} dangerouslySetInnerHTML={{ __html: r.snippet + "..." }} />
              </div>
            ))}
            {results.length === 0 && <p style={{ textAlign: "center", opacity: 0.4, padding: 40 }}>Search for any topic to begin.</p>}
          </div>
          {preview && (
            <div className={styles.card} style={{ position: "sticky", top: 20, alignSelf: "start" }}>
              {preview.thumbnail && <img src={preview.thumbnail.source} alt={preview.title} style={{ width: "100%", borderRadius: 8, marginBottom: 15, objectFit: "cover" }} />}
              <h2 style={{ fontSize: "1.2rem", marginBottom: 10 }}>{preview.title}</h2>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7, opacity: 0.8, marginBottom: 15 }}>{preview.extract}</p>
              <a href={preview.content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer" className={styles.button} style={{ display: "block", textAlign: "center", background: site.color, textDecoration: "none" }}>Read on Wikipedia →</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
