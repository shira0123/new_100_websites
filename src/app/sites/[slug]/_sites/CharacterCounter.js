"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.split(/[.!?]+/).filter(s=>s.trim()).length;
  const paragraphs = text.split(/\n\n+/).filter(p=>p.trim()).length;
  const lines = text.split("\n").length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const stats = [
    { label: "Characters", value: chars, icon: "🔡" },
    { label: "No Spaces", value: charsNoSpaces, icon: "🚫" },
    { label: "Words", value: words, icon: "📝" },
    { label: "Sentences", value: sentences, icon: "💬" },
    { label: "Paragraphs", value: paragraphs, icon: "📄" },
    { label: "Lines", value: lines, icon: "〰️" },
    { label: "Read Time", value: `${readingTime} min`, icon: "⏱️" },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🔢 Character Counter</h1>
        <p className={styles.pageSub}>Count characters, words and sentences live</p>
      </div>
      <div className={styles.container}>
        <textarea
          className={styles.textArea}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Start typing or paste your text here…"
          style={{ minHeight: 220, marginBottom: 20 }}
          autoFocus
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
          {stats.map(s => (
            <div key={s.label} style={{
              padding: "18px 14px", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, textAlign: "center"
            }}>
              <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#a5b4fc" }}>{s.value.toLocaleString()}</div>
              <div style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
        {text && (
          <button onClick={() => setText("")} style={{
            marginTop: 16, padding: "8px 20px", borderRadius: 99,
            background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)",
            color: "#fca5a5", fontSize: "0.85rem"
          }}>🗑️ Clear</button>
        )}
      </div>
    </div>
  );
}
