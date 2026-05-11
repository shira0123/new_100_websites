"use client";
import { useState } from "react";
import styles from "./site.module.css";
const TRENDING = [
  { name: "llm.c", author: "karpathy", lang: "C", stars: "12.4k", desc: "LLM training in simple, raw C/CUDA", emoji: "🧠" },
  { name: "gpt-engineer", author: "gpt-engineer-org", lang: "Python", stars: "48.2k", desc: "Specify what you want it to build", emoji: "🤖" },
  { name: "deno", author: "denoland", lang: "Rust", stars: "91.5k", desc: "A modern runtime for JavaScript and TypeScript", emoji: "🦕" },
  { name: "next.js", author: "vercel", lang: "JavaScript", stars: "117k", desc: "The React Framework", emoji: "▲" },
  { name: "shadcn-ui", author: "shadcn", lang: "TypeScript", stars: "52.3k", desc: "Beautifully designed components", emoji: "🎨" },
  { name: "ollama", author: "ollama", lang: "Go", stars: "56.8k", desc: "Get up and running with local LLMs", emoji: "🦙" },
];
export default function GithubTrending({ site }) {
  const [period, setPeriod] = useState("daily");
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 25 }}>
        {["daily","weekly","monthly"].map(p => <button key={p} onClick={() => setPeriod(p)} className={styles.button} style={{ background: period === p ? site.color : "rgba(255,255,255,0.05)", textTransform: "capitalize" }}>{p}</button>)}
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {TRENDING.map((r, i) => (
          <div key={r.name} className={styles.card} style={{ display: "flex", gap: 15, alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: "1.5rem", width: 30, textAlign: "center", fontWeight: "bold", opacity: 0.3 }}>{i + 1}</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "1rem" }}><span style={{ opacity: 0.5 }}>{r.author}/</span>{r.name}</h3>
              <p style={{ fontSize: "0.8rem", opacity: 0.6, marginTop: 3 }}>{r.desc}</p>
              <div style={{ display: "flex", gap: 10, marginTop: 5, fontSize: "0.75rem" }}>
                <span style={{ color: site.color }}>⭐ {r.stars}</span>
                <span style={{ opacity: 0.4 }}>{r.lang}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
