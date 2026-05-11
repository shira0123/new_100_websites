"use client";
import { useState } from "react";
import styles from "./site.module.css";
export default function LanguageTranslator({ site }) {
  const [text, setText] = useState("");
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("es");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const langs = [["en","English"],["es","Spanish"],["fr","French"],["de","German"],["it","Italian"],["pt","Portuguese"],["ja","Japanese"],["ko","Korean"],["zh","Chinese"],["ar","Arabic"],["hi","Hindi"],["ru","Russian"]];
  const translate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`);
      const d = await r.json();
      setResult(d.responseData?.translatedText || "Translation failed");
    } catch { setResult("Translation service unavailable"); }
    setLoading(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div className={styles.card} style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 15, alignItems: "center" }}>
          <select className={styles.input} value={from} onChange={e => setFrom(e.target.value)} style={{ flex: 1 }}>{langs.map(([c,n]) => <option key={c} value={c}>{n}</option>)}</select>
          <button onClick={() => { setFrom(to); setTo(from); }} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer" }}>🔄</button>
          <select className={styles.input} value={to} onChange={e => setTo(e.target.value)} style={{ flex: 1 }}>{langs.map(([c,n]) => <option key={c} value={c}>{n}</option>)}</select>
        </div>
        <textarea className={styles.input} value={text} onChange={e => setText(e.target.value)} placeholder="Enter text to translate..." rows={4} style={{ resize: "vertical", marginBottom: 10 }} />
        <button onClick={translate} className={styles.button} style={{ background: site.color, width: "100%", marginBottom: 15 }} disabled={loading}>{loading ? "Translating..." : "Translate"}</button>
        {result && <div style={{ padding: 20, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", minHeight: 80 }}><p style={{ lineHeight: 1.6 }}>{result}</p></div>}
      </div>
    </div>
  );
}
