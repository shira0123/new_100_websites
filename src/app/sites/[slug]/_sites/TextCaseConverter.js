"use client";
import { useState } from "react";
import styles from "./site.module.css";

const CASES = [
  { label: "UPPERCASE", fn: s => s.toUpperCase() },
  { label: "lowercase", fn: s => s.toLowerCase() },
  { label: "Title Case", fn: s => s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) },
  { label: "camelCase", fn: s => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
  { label: "PascalCase", fn: s => { const cc = s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()); return cc.charAt(0).toUpperCase() + cc.slice(1); }},
  { label: "snake_case", fn: s => s.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "") },
  { label: "kebab-case", fn: s => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") },
  { label: "CONSTANT_CASE", fn: s => s.toUpperCase().replace(/\s+/g, "_").replace(/[^A-Z0-9_]/g, "") },
  { label: "iNVERT cASE", fn: s => s.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("") },
  { label: "Sentence case", fn: s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() },
];

export default function TextCaseConverter() {
  const [input, setInput] = useState("the quick brown fox jumps over the lazy dog");
  const [copied, setCopied] = useState(null);

  const copy = (text) => { navigator.clipboard.writeText(text); setCopied(text); setTimeout(()=>setCopied(null),1500); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>Aa Text Case Converter</h1>
        <p className={styles.pageSub}>Convert text between all popular case formats instantly</p>
      </div>
      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Input Text</label>
            <textarea className={styles.textArea} value={input} onChange={e=>setInput(e.target.value)} style={{minHeight:100}} placeholder="Type your text here…" />
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {CASES.map(({ label, fn }) => {
            const result = fn(input);
            return (
              <div key={label} onClick={()=>copy(result)} style={{
                display:"flex",alignItems:"center",gap:16,
                padding:"14px 18px",background:"rgba(255,255,255,0.04)",
                border:`1px solid ${copied===result?"rgba(99,102,241,0.4)":"rgba(255,255,255,0.07)"}`,
                borderRadius:12,cursor:"pointer",transition:"all 0.2s"
              }}>
                <span style={{width:140,fontSize:"0.72rem",fontWeight:600,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em",flexShrink:0}}>{label}</span>
                <code style={{flex:1,fontSize:"0.9rem",color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{result}</code>
                <span style={{fontSize:"0.75rem",color:copied===result?"#86efac":"#475569",flexShrink:0}}>
                  {copied===result?"✓ Copied":"Click to copy"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
