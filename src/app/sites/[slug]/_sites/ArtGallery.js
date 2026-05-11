"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";
export default function ArtGallery({ site }) {
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=painting")
      .then(r => r.json()).then(async d => {
        const ids = d.objectIDs?.slice(0, 12) || [];
        const items = await Promise.all(ids.map(id => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(r => r.json()).catch(() => null)));
        setArt(items.filter(Boolean)); setLoading(false);
      }).catch(() => setLoading(false));
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      {loading ? <div style={{ textAlign: "center", padding: 60 }}><div className={styles.spinner} /><p>Loading artwork...</p></div> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 15, maxWidth: 1000, margin: "0 auto" }}>
          {art.map(a => (
            <div key={a.objectID} className={styles.card} style={{ textAlign: "center" }}>
              {a.primaryImageSmall ? <img src={a.primaryImageSmall} alt={a.title} style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8, marginBottom: 10 }} /> : <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.03)", borderRadius: 8, marginBottom: 10, fontSize: "3rem" }}>🖼️</div>}
              <h4 style={{ fontSize: "0.9rem", marginBottom: 5 }}>{a.title}</h4>
              <p style={{ fontSize: "0.75rem", opacity: 0.5 }}>{a.artistDisplayName || "Unknown"} · {a.objectDate || "N/A"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
