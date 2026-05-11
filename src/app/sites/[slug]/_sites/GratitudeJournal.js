"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

const STORAGE_KEY = "gratitude-journal-v1";
const PROMPTS = [
  "What are 3 things you're grateful for today?",
  "Who made you smile recently?",
  "What's a small win you had this week?",
  "What's something beautiful you noticed today?",
  "What's a challenge that helped you grow?",
  "What's something you take for granted that you appreciate?",
  "Who in your life are you most thankful for, and why?",
  "What's a recent experience that brought you joy?",
];

export default function GratitudeJournal() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");
  const [mood, setMood] = useState("😊");
  const [prompt] = useState(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);

  useEffect(() => { try { const s = localStorage.getItem(STORAGE_KEY); if (s) setEntries(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); } catch {} }, [entries]);

  const MOODS = ["😊", "🥰", "😌", "😄", "🤩", "🙏", "💪", "😢", "😤"];

  const add = () => {
    if (!text.trim()) return;
    const entry = { id: Date.now(), text: text.trim(), mood, date: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }), time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) };
    setEntries(e => [entry, ...e]);
    setText("");
  };

  const del = (id) => setEntries(e => e.filter(x => x.id !== id));
  const streak = (() => {
    const dates = [...new Set(entries.map(e => e.date))];
    return dates.length;
  })();

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🙏 Gratitude Journal</h1>
        <p className={styles.pageSub}>Daily gratitude entries saved in your browser</p>
      </div>
      <div className={styles.container} style={{ maxWidth: 640 }}>
        {/* Stats */}
        <div style={{ display: "flex", gap: 20, marginBottom: 24, justifyContent: "center" }}>
          {[["📝", entries.length, "Entries"], ["📅", streak, "Days"]].map(([i, v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.9rem" }}>{i}</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#a5b4fc" }}>{v}</div>
              <div style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className={styles.controls} style={{ marginBottom: 24 }}>
          <div style={{ padding: "14px 16px", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 12, marginBottom: 12, fontSize: "0.9rem", color: "#c4b5fd", fontStyle: "italic" }}>
            💭 {prompt}
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.label}>How are you feeling?</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              {MOODS.map(m => <button key={m} onClick={() => setMood(m)} style={{ fontSize: "1.5rem", padding: "4px 8px", borderRadius: 8, background: mood === m ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)", border: `1px solid ${mood === m ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"}` }}>{m}</button>)}
            </div>
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Today's gratitude entry</label>
            <textarea value={text} onChange={e => setText(e.target.value)} className={styles.textArea} placeholder="I'm grateful for…" style={{ minHeight: 120 }} />
          </div>
          <button onClick={add} className={styles.btn} style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}>+ Save Entry</button>
        </div>

        {/* Entries */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {entries.length === 0 && <p style={{ color: "#475569", textAlign: "center", padding: 40 }}>No entries yet — start your gratitude journey!</p>}
          {entries.map(entry => (
            <div key={entry.id} style={{ padding: "16px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: "1.4rem" }}>{entry.mood}</span>
                <div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8" }}>{entry.date}</div>
                  <div style={{ fontSize: "0.7rem", color: "#475569" }}>{entry.time}</div>
                </div>
                <button onClick={() => del(entry.id)} style={{ marginLeft: "auto", color: "#334155", fontSize: "1rem" }} onMouseOver={e => e.target.style.color = "#fca5a5"} onMouseOut={e => e.target.style.color = "#334155"}>×</button>
              </div>
              <p style={{ color: "#cbd5e1", lineHeight: 1.6, margin: 0 }}>{entry.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
