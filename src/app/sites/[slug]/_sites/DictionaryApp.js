"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function DictionaryApp() {
  const [word, setWord] = useState("");
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lookup = async (w) => {
    if (!w.trim()) return;
    setLoading(true); setError(""); setData(null);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w.trim())}`);
      if (!res.ok) throw new Error("Word not found");
      const json = await res.json();
      setData(json[0]); setWord(w.trim());
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const submit = (e) => { e.preventDefault(); lookup(input); };

  const play = (url) => { if (url) new Audio(url).play(); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>📚 Dictionary App</h1>
        <p className={styles.pageSub}>Look up word definitions, pronunciations and examples</p>
      </div>
      <div className={styles.container} style={{ maxWidth: 680 }}>
        <form onSubmit={submit} style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <input value={input} onChange={e => setInput(e.target.value)} className={styles.input} placeholder="Search a word…" style={{ flex: 1 }} />
          <button type="submit" className={styles.btn} style={{ flexShrink: 0 }}>Look up</button>
        </form>

        {loading && <div style={{ textAlign: "center", padding: 40, color: "#64748b" }}>📖 Looking up…</div>}
        {error && <div style={{ padding: "14px 18px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 12, color: "#fca5a5" }}>"{input}" — {error}</div>}

        {data && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, padding: "16px 20px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 16 }}>
              <div>
                <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#f1f5f9", margin: 0 }}>{data.word}</h2>
                {data.phonetics?.find(p => p.text) && <span style={{ color: "#a5b4fc", fontSize: "1rem" }}>{data.phonetics.find(p => p.text)?.text}</span>}
              </div>
              {data.phonetics?.find(p => p.audio) && (
                <button onClick={() => play(data.phonetics.find(p => p.audio)?.audio)} style={{ padding: "10px 16px", borderRadius: 12, background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.4)", color: "#a5b4fc", fontWeight: 700, marginLeft: "auto" }}>
                  🔊 Play
                </button>
              )}
            </div>

            {data.meanings?.map((meaning, i) => (
              <div key={i} style={{ marginBottom: 20, padding: "16px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16 }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, padding: "4px 10px", background: "rgba(99,102,241,0.15)", borderRadius: 99, display: "inline-block" }}>{meaning.partOfSpeech}</div>
                {meaning.definitions?.slice(0, 3).map((def, di) => (
                  <div key={di} style={{ marginBottom: 12 }}>
                    <div style={{ color: "#e2e8f0", lineHeight: 1.6, marginBottom: 4 }}>{di + 1}. {def.definition}</div>
                    {def.example && <div style={{ color: "#64748b", fontStyle: "italic", fontSize: "0.88rem", paddingLeft: 16, borderLeft: "2px solid rgba(99,102,241,0.3)" }}>"{def.example}"</div>}
                  </div>
                ))}
                {meaning.synonyms?.length > 0 && (
                  <div style={{ marginTop: 10 }}>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Synonyms: </span>
                    {meaning.synonyms.slice(0, 6).map(s => <span key={s} onClick={() => { setInput(s); lookup(s); }} style={{ marginLeft: 6, padding: "2px 8px", borderRadius: 99, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", fontSize: "0.82rem", color: "#a5b4fc", cursor: "pointer" }}>{s}</span>)}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {!data && !loading && !error && (
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>📖</div>
            <p style={{ color: "#64748b" }}>Search for any English word to see its definition</p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
              {["serendipity", "ephemeral", "eloquent", "luminous", "melancholy"].map(w => (
                <button key={w} onClick={() => { setInput(w); lookup(w); }} style={{ padding: "6px 14px", borderRadius: 99, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "#a5b4fc", fontSize: "0.85rem" }}>{w}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
