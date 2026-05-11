"use client";
import { useState } from "react";
import styles from "./site.module.css";
const TEMPLATES = {
  Success: { emoji: "🏆", lines: ["Success is not final, failure is not fatal.", "The only way to do great work is to love what you do.", "Believe you can and you're halfway there.", "Your limitation—it's only your imagination."] },
  Motivation: { emoji: "🔥", lines: ["Push yourself because no one else is going to do it for you.", "Great things never come from comfort zones.", "The harder you work, the luckier you get.", "Dream it. Wish it. Do it."] },
  Resilience: { emoji: "💪", lines: ["Fall seven times, stand up eight.", "Tough times never last, but tough people do.", "The comeback is always stronger than the setback.", "What doesn't kill you makes you stronger."] },
};
export default function MotivationalSpeech({ site }) {
  const [topic, setTopic] = useState("Success"); const [custom, setCustom] = useState("");
  const t = TEMPLATES[topic] || TEMPLATES.Success;
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 25 }}>
        {Object.keys(TEMPLATES).map(k => <button key={k} onClick={() => setTopic(k)} className={styles.button} style={{ background: topic === k ? site.color : "rgba(255,255,255,0.05)" }}>{k}</button>)}
      </div>
      <div className={styles.card} style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: 15 }}>{t.emoji}</div>
        <h2 style={{ marginBottom: 20, color: site.color }}>On {topic}</h2>
        {t.lines.map((l, i) => <p key={i} style={{ fontSize: "1.1rem", lineHeight: 1.8, opacity: 0.85, marginBottom: 12, fontStyle: "italic" }}>&ldquo;{l}&rdquo;</p>)}
      </div>
    </div>
  );
}
