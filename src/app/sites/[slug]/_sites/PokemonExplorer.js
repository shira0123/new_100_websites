"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

export default function PokemonExplorer({ site }) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=30")
      .then(r => r.json())
      .then(async d => {
        const details = await Promise.all(d.results.map(p => fetch(p.url).then(r => r.json())));
        setPokemon(details); setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  const typeColors = { fire: "#ef4444", water: "#3b82f6", grass: "#22c55e", electric: "#f59e0b", psychic: "#ec4899", normal: "#94a3b8", poison: "#a855f7", ground: "#92400e", bug: "#84cc16", fairy: "#f472b6", fighting: "#b45309", rock: "#78716c", ghost: "#7c3aed", dragon: "#6366f1", ice: "#06b6d4", steel: "#64748b", dark: "#1e293b", flying: "#8b5cf6" };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      {loading ? <div style={{ textAlign: "center", padding: 60 }}><div className={styles.spinner} /><p>Loading Pokédex...</p></div> : (
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 300px" : "1fr", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 12 }}>
            {pokemon.map(p => (
              <div key={p.id} onClick={() => setSelected(p)} className={styles.card} style={{ cursor: "pointer", textAlign: "center", padding: 15, border: selected?.id === p.id ? `2px solid ${site.color}` : "2px solid transparent" }}>
                <img src={p.sprites.front_default} alt={p.name} style={{ width: 80, height: 80 }} />
                <p style={{ textTransform: "capitalize", fontWeight: "bold", fontSize: "0.85rem" }}>{p.name}</p>
                <span style={{ fontSize: "0.7rem", opacity: 0.4 }}>#{String(p.id).padStart(3, "0")}</span>
              </div>
            ))}
          </div>
          {selected && (
            <div className={styles.card} style={{ position: "sticky", top: 20, alignSelf: "start" }}>
              <div style={{ textAlign: "center" }}>
                <img src={selected.sprites.other?.["official-artwork"]?.front_default || selected.sprites.front_default} alt={selected.name} style={{ width: 150, height: 150 }} />
                <h2 style={{ textTransform: "capitalize", marginBottom: 5 }}>{selected.name}</h2>
                <p style={{ opacity: 0.4, marginBottom: 10 }}>#{String(selected.id).padStart(3, "0")}</p>
                <div style={{ display: "flex", gap: 5, justifyContent: "center", marginBottom: 15 }}>
                  {selected.types.map(t => <span key={t.type.name} style={{ fontSize: "0.7rem", padding: "3px 10px", borderRadius: 10, background: (typeColors[t.type.name] || "#666") + "33", color: typeColors[t.type.name] || "#aaa", textTransform: "capitalize" }}>{t.type.name}</span>)}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 15 }}>
                <div style={{ textAlign: "center", padding: 8, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}><div style={{ fontSize: "0.7rem", opacity: 0.5 }}>Height</div><div style={{ fontWeight: "bold" }}>{selected.height / 10}m</div></div>
                <div style={{ textAlign: "center", padding: 8, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}><div style={{ fontSize: "0.7rem", opacity: 0.5 }}>Weight</div><div style={{ fontWeight: "bold" }}>{selected.weight / 10}kg</div></div>
              </div>
              {selected.stats.map(s => (
                <div key={s.stat.name} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}><span style={{ textTransform: "capitalize" }}>{s.stat.name.replace("-", " ")}</span><span style={{ fontWeight: "bold" }}>{s.base_stat}</span></div>
                  <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.1)" }}><div style={{ height: "100%", borderRadius: 2, width: `${Math.min(s.base_stat / 150 * 100, 100)}%`, background: site.color }} /></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
