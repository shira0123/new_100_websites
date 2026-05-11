"use client";
import { useState } from "react";
import styles from "./site.module.css";

const RECIPES = [
  { name: "Pasta Carbonara", time: "25 min", difficulty: "Easy", ingredients: ["Pasta","Eggs","Parmesan","Bacon","Pepper"], emoji: "🍝" },
  { name: "Chicken Tikka", time: "40 min", difficulty: "Medium", ingredients: ["Chicken","Yogurt","Spices","Lemon","Ginger"], emoji: "🍗" },
  { name: "Caesar Salad", time: "15 min", difficulty: "Easy", ingredients: ["Romaine","Croutons","Parmesan","Dressing","Lemon"], emoji: "🥗" },
  { name: "Sushi Roll", time: "45 min", difficulty: "Hard", ingredients: ["Rice","Nori","Fish","Avocado","Soy Sauce"], emoji: "🍣" },
  { name: "Chocolate Cake", time: "60 min", difficulty: "Medium", ingredients: ["Flour","Cocoa","Eggs","Sugar","Butter"], emoji: "🎂" },
  { name: "Tacos", time: "20 min", difficulty: "Easy", ingredients: ["Tortillas","Beef","Salsa","Cheese","Lettuce"], emoji: "🌮" },
];

export default function RecipeFinder({ site }) {
  const [search, setSearch] = useState("");
  const filtered = RECIPES.filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.ingredients.some(i => i.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto 25px" }}>
        <input className={styles.input} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by recipe or ingredient..." />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
        {filtered.map(r => (
          <div key={r.name} className={styles.card}>
            <div style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: 10 }}>{r.emoji}</div>
            <h3 style={{ textAlign: "center", marginBottom: 10 }}>{r.name}</h3>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 15 }}>
              <span style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: 8, background: "rgba(255,255,255,0.06)" }}>⏱️ {r.time}</span>
              <span style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: 8, background: r.difficulty === "Easy" ? "#22c55e22" : r.difficulty === "Medium" ? "#f59e0b22" : "#ef444422", color: r.difficulty === "Easy" ? "#22c55e" : r.difficulty === "Medium" ? "#f59e0b" : "#ef4444" }}>{r.difficulty}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center" }}>
              {r.ingredients.map(i => <span key={i} style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 6, background: site.color + "15", color: site.color }}>{i}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
