"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";
export default function CocktailFinder({ site }) {
  const [query, setQuery] = useState(""); const [drinks, setDrinks] = useState([]); const [loading, setLoading] = useState(false);
  const search = async (q) => { setLoading(true); try { const r = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${q || "margarita"}`); const d = await r.json(); setDrinks(d.drinks || []); } catch {} setLoading(false); };
  useEffect(() => { search(""); }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div style={{ maxWidth: 500, margin: "0 auto 25px", display: "flex", gap: 10 }}><input className={styles.input} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search cocktails..." style={{ margin: 0, flex: 1 }} onKeyDown={e => e.key === "Enter" && search(query)} /><button onClick={() => search(query)} className={styles.button} style={{ background: site.color }}>Search</button></div>
      {loading ? <div style={{ textAlign: "center", padding: 60 }}><div className={styles.spinner} /></div> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 15, maxWidth: 900, margin: "0 auto" }}>
          {drinks.map(d => (
            <div key={d.idDrink} className={styles.card}>
              <img src={d.strDrinkThumb} alt={d.strDrink} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 10, marginBottom: 10 }} />
              <h3 style={{ fontSize: "1rem", marginBottom: 5 }}>{d.strDrink}</h3>
              <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
                <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 8, background: site.color+"22", color: site.color }}>{d.strCategory}</span>
                {d.strAlcoholic && <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 8, background: "rgba(255,255,255,0.06)" }}>{d.strAlcoholic}</span>}
              </div>
              <p style={{ fontSize: "0.8rem", opacity: 0.6, lineHeight: 1.5 }}>{d.strInstructions?.slice(0, 120)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
