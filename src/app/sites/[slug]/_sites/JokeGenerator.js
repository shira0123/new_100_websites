"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

export default function JokeGenerator() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Any");
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  const CATS = ["Any", "Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"];

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const cat = category === "Any" ? "Any" : category;
      const res = await fetch(`https://v2.jokeapi.dev/joke/${cat}?safe-mode`);
      const data = await res.json();
      if (data.error) throw new Error("No joke found");
      setJoke(data);
      setHistory(h => [data, ...h].slice(0, 5));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchJoke(); }, []);

  const jokeText = joke ? (joke.type === "twopart" ? `${joke.setup}\n\n${joke.delivery}` : joke.joke) : "";
  const copy = () => { navigator.clipboard.writeText(jokeText); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>😂 Joke Generator</h1>
        <p className={styles.pageSub}>Random jokes fetched from the JokeAPI</p>
      </div>
      <div className={styles.container} style={{ maxWidth: 600, textAlign: "center" }}>
        <div className={styles.harmonyRow} style={{ justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
          {CATS.map(c => <button key={c} onClick={() => setCategory(c)} className={`${styles.harmonyBtn} ${category === c ? styles.harmonyActive : ""}`}>{c}</button>)}
        </div>

        {joke && !loading && (
          <div style={{ padding: "32px 28px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, marginBottom: 20, minHeight: 160 }}>
            <div style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>{joke.category} · {joke.type}</div>
            {joke.type === "twopart" ? (
              <>
                <p style={{ fontSize: "1.1rem", color: "#f1f5f9", lineHeight: 1.7, marginBottom: 16 }}>{joke.setup}</p>
                <p style={{ fontSize: "1.15rem", color: "#fbbf24", fontWeight: 700, lineHeight: 1.7 }}>🥁 {joke.delivery}</p>
              </>
            ) : (
              <p style={{ fontSize: "1.05rem", color: "#f1f5f9", lineHeight: 1.7 }}>{joke.joke}</p>
            )}
          </div>
        )}
        {loading && <div style={{ padding: "60px", color: "#64748b" }}>😄 Finding a joke…</div>}

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 28 }}>
          <button onClick={fetchJoke} className={styles.btn} style={{ minWidth: 140 }}>🎲 Next Joke</button>
          <button onClick={copy} style={{ padding: "12px 20px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", fontWeight: 600 }}>{copied ? "✓" : "📋 Copy"}</button>
        </div>

        {history.length > 1 && (
          <div style={{ textAlign: "left" }}>
            <div className={styles.label} style={{ marginBottom: 8 }}>Recent Jokes</div>
            {history.slice(1).map((j, i) => (
              <div key={i} style={{ padding: "10px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, marginBottom: 6, fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5 }}>
                {j.type === "twopart" ? j.setup : j.joke?.slice(0, 80) + "…"}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
