"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function JsonFormatter() {
  const [input, setInput] = useState('{\n  "name": "100 Websites",\n  "sites": 100,\n  "stack": ["Next.js", "React"],\n  "awesome": true\n}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const format = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch(e) { setError(e.message); setOutput(""); }
  };

  const minify = () => {
    setError("");
    try { setOutput(JSON.stringify(JSON.parse(input))); }
    catch(e) { setError(e.message); }
  };

  const copy = () => { navigator.clipboard.writeText(output||input); setCopied(true); setTimeout(()=>setCopied(false),1500); };

  const highlight = (json) => {
    return json
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
        let cls = "color:#a5b4fc"; // string
        if (/^"/.test(match)) { if (/:$/.test(match)) cls = "color:#7dd3fc"; }
        else if (/true|false/.test(match)) cls = "color:#86efac";
        else if (/null/.test(match)) cls = "color:#fca5a5";
        else cls = "color:#fcd34d"; // number
        return `<span style="${cls}">${match}</span>`;
      });
  };

  const displayJson = output || input;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>{"{ } JSON Formatter"}</h1>
        <p className={styles.pageSub}>Format, validate and highlight JSON with ease</p>
      </div>
      <div className={styles.container} style={{maxWidth:1000}}>
        <div className={styles.controls}>
          <div className={styles.gradientControls}>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Indent Size</label>
              <select value={indent} onChange={e=>setIndent(Number(e.target.value))} className={styles.select}>
                {[2,4,6,8].map(n=><option key={n} value={n}>{n} spaces</option>)}
              </select>
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Actions</label>
              <div className={styles.btnRow}>
                <button onClick={format} className={styles.btn}>✨ Format</button>
                <button onClick={minify} style={{padding:"12px 20px",borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",fontWeight:600}}>⬛ Minify</button>
                <button onClick={copy} style={{padding:"12px 20px",borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",fontWeight:600}}>{copied?"✓":"📋 Copy"}</button>
              </div>
            </div>
          </div>
        </div>

        {error && <p style={{color:"#fca5a5",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)",padding:"12px 16px",borderRadius:10,marginBottom:16}}>{error}</p>}

        <div className={styles.splitGrid}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Input</label>
            <textarea className={styles.textArea} value={input} onChange={e=>setInput(e.target.value)} style={{minHeight:380,fontFamily:"monospace",fontSize:"0.85rem"}} />
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Output (Highlighted)</label>
            <div style={{
              minHeight:380, padding:"14px 16px",
              background:"rgba(255,255,255,0.03)",
              border:"1px solid rgba(255,255,255,0.1)",
              borderRadius:12, fontFamily:"monospace", fontSize:"0.85rem",
              overflow:"auto", whiteSpace:"pre-wrap", wordBreak:"break-all",
              color:"#94a3b8", lineHeight:1.6
            }} dangerouslySetInnerHTML={{__html: highlight(output || "")}} />
          </div>
        </div>
      </div>
    </div>
  );
}
