"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

export default function NasaApod({ site }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
      .then(r => r.json()).then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      {loading ? <div style={{ textAlign: "center", padding: 60 }}><div className={styles.spinner} /><p>Fetching from NASA...</p></div> : data ? (
        <div className={styles.card} style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ marginBottom: 5 }}>{data.title}</h2>
          <p style={{ fontSize: "0.8rem", opacity: 0.5, marginBottom: 15 }}>{data.date}</p>
          {data.media_type === "image" ? <img src={data.url} alt={data.title} style={{ width: "100%", borderRadius: 12, marginBottom: 15 }} /> : <iframe src={data.url} title={data.title} style={{ width: "100%", height: 400, borderRadius: 12, border: "none", marginBottom: 15 }} />}
          <p style={{ fontSize: "0.9rem", lineHeight: 1.8, opacity: 0.8 }}>{data.explanation}</p>
          {data.copyright && <p style={{ fontSize: "0.75rem", opacity: 0.4, marginTop: 10 }}>© {data.copyright}</p>}
        </div>
      ) : <p style={{ textAlign: "center", opacity: 0.5 }}>Failed to load. Try again later.</p>}
    </div>
  );
}
