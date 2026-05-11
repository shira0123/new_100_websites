"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function BookSearch({ site }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const r = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`);
      const d = await r.json();
      setBooks(d.docs || []);
    } catch { setBooks([]); }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto 25px", display: "flex", gap: 10 }}>
        <input className={styles.input} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search books..." style={{ margin: 0, flex: 1 }} onKeyDown={e => e.key === "Enter" && search()} />
        <button onClick={search} className={styles.button} style={{ background: site.color }}>Search</button>
      </div>
      {loading ? <div style={{ textAlign: "center", padding: 60 }}><div className={styles.spinner} /></div> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 15, maxWidth: 900, margin: "0 auto" }}>
          {books.map((b, i) => (
            <div key={i} className={styles.card} style={{ textAlign: "center" }}>
              {b.cover_i ? <img src={`https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`} alt={b.title} style={{ height: 160, borderRadius: 8, marginBottom: 10, objectFit: "cover" }} /> : <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, marginBottom: 10 }}>📖</div>}
              <h4 style={{ fontSize: "0.9rem", marginBottom: 5 }}>{b.title}</h4>
              <p style={{ fontSize: "0.75rem", opacity: 0.5 }}>{b.author_name?.[0] || "Unknown"} · {b.first_publish_year || "N/A"}</p>
            </div>
          ))}
        </div>
      )}
      {!loading && books.length === 0 && <p style={{ textAlign: "center", opacity: 0.4, padding: 40 }}>Search for any book to get started.</p>}
    </div>
  );
}
