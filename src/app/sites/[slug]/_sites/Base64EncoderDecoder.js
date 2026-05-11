"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function Base64EncoderDecoder() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("encode");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError("");
    try {
      if (mode === "encode") setOutput(btoa(unescape(encodeURIComponent(input))));
      else setOutput(decodeURIComponent(escape(atob(input))));
    } catch {
      setError("Invalid input for decoding. Make sure it is valid Base64.");
      setOutput("");
    }
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500); };
  const swap = () => { setInput(output); setOutput(""); setMode(m => m === "encode" ? "decode" : "encode"); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🔀 Base64 Encoder / Decoder</h1>
        <p className={styles.pageSub}>Encode and decode Base64 strings instantly</p>
      </div>
      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Mode</label>
            <div className={styles.harmonyRow}>
              {["encode","decode"].map(m=>(
                <button key={m} onClick={()=>setMode(m)} className={`${styles.harmonyBtn} ${mode===m?styles.harmonyActive:""}`} style={{textTransform:"capitalize"}}>{m}</button>
              ))}
            </div>
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.label}>{mode === "encode" ? "Plain Text Input" : "Base64 Input"}</label>
            <textarea className={styles.textArea} value={input} onChange={e=>setInput(e.target.value)} placeholder={mode==="encode"?"Enter text to encode…":"Enter Base64 to decode…"} style={{minHeight:140}} />
          </div>
          <div className={styles.btnRow}>
            <button onClick={convert} className={styles.btn}>⚡ {mode === "encode" ? "Encode" : "Decode"}</button>
            <button onClick={swap} style={{padding:"12px 20px",borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",fontWeight:600}}>⇅ Swap</button>
          </div>
        </div>

        {error && <p style={{color:"#fca5a5",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)",padding:"12px 16px",borderRadius:10,marginBottom:12}}>{error}</p>}

        {output && (
          <>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Output</label>
              <textarea readOnly value={output} className={styles.textArea} style={{minHeight:140}} />
            </div>
            <button onClick={copy} className={styles.btn} style={{marginTop:10}}>{copied?"✓ Copied!":"📋 Copy Output"}</button>
          </>
        )}
      </div>
    </div>
  );
}
