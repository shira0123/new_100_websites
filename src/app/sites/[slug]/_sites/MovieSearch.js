"use client";
import { useState } from "react";
import styles from "./site.module.css";

const MOVIES = [
  { title: "Inception", year: 2010, rating: "8.8", genre: "Sci-Fi", poster: "🎬", plot: "A thief who steals corporate secrets through dream-sharing technology." },
  { title: "The Dark Knight", year: 2008, rating: "9.0", genre: "Action", poster: "🦇", plot: "Batman raises the stakes in his war on crime with the Joker." },
  { title: "Interstellar", year: 2014, rating: "8.7", genre: "Sci-Fi", poster: "🌌", plot: "Explorers travel through a wormhole near Saturn for humanity's future." },
  { title: "Parasite", year: 2019, rating: "8.5", genre: "Thriller", poster: "🏠", plot: "Greed and class discrimination threaten a symbiotic relationship." },
  { title: "The Matrix", year: 1999, rating: "8.7", genre: "Sci-Fi", poster: "💊", plot: "A hacker discovers reality is a simulation controlled by machines." },
  { title: "Pulp Fiction", year: 1994, rating: "8.9", genre: "Crime", poster: "💼", plot: "Interconnected stories of crime in Los Angeles." },
];

export default function MovieSearch({ site }) {
  const [query, setQuery] = useState("");
  const filtered = MOVIES.filter(m => !query || m.title.toLowerCase().includes(query.toLowerCase()) || m.genre.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto 25px" }}>
        <input className={styles.input} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search movies by title or genre..." />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
        {filtered.map(m => (
          <div key={m.title} className={styles.card}>
            <div style={{ fontSize: "3rem", textAlign: "center", marginBottom: 15 }}>{m.poster}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h3 style={{ fontSize: "1.1rem" }}>{m.title}</h3>
              <span style={{ background: "#fbbf24", color: "#000", padding: "2px 8px", borderRadius: 8, fontSize: "0.75rem", fontWeight: "bold" }}>⭐ {m.rating}</span>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: 8, background: site.color + "22", color: site.color }}>{m.genre}</span>
              <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>{m.year}</span>
            </div>
            <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>{m.plot}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
