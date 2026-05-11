"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

export default function DogBreedExplorer({ site }) {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(r => r.json())
      .then(d => { setBreeds(Object.keys(d.message).slice(0, 30)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const selectBreed = async (breed) => {
    setSelected(breed);
    try {
      const r = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      const d = await r.json();
      setImage(d.message);
    } catch { setImage(""); }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      {loading ? <div style={{ textAlign: "center", padding: 60 }}><div className={styles.spinner} /><p>Loading breeds...</p></div> : (
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20, maxWidth: 800, margin: "0 auto" }}>
          <div className={styles.card} style={{ maxHeight: 500, overflowY: "auto" }}>
            {breeds.map(b => (
              <button key={b} onClick={() => selectBreed(b)} className={styles.button} style={{ width: "100%", marginBottom: 5, textTransform: "capitalize", background: selected === b ? site.color : "rgba(255,255,255,0.05)", textAlign: "left" }}>{b}</button>
            ))}
          </div>
          <div className={styles.card} style={{ textAlign: "center" }}>
            {selected ? (<>
              <h2 style={{ textTransform: "capitalize", marginBottom: 15 }}>{selected}</h2>
              {image && <img src={image} alt={selected} style={{ maxWidth: "100%", maxHeight: 350, borderRadius: 12, objectFit: "cover" }} />}
              <button onClick={() => selectBreed(selected)} className={styles.button} style={{ marginTop: 15, background: site.color }}>🔄 New Photo</button>
            </>) : <p style={{ padding: 60, opacity: 0.5 }}>← Select a breed to view</p>}
          </div>
        </div>
      )}
    </div>
  );
}
