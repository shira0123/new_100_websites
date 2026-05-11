"use client";
import { useState, useCallback } from "react";
import styles from "./site.module.css";

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(length, opts) {
  let pool = "";
  if (opts.uppercase) pool += CHARS.uppercase;
  if (opts.lowercase) pool += CHARS.lowercase;
  if (opts.numbers) pool += CHARS.numbers;
  if (opts.symbols) pool += CHARS.symbols;
  if (!pool) return "";
  return Array.from({ length }, () => pool[Math.floor(Math.random() * pool.length)]).join("");
}

function getStrength(pw) {
  let score = 0;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (score <= 2) return { label: "Weak", pct: 25, color: "#ef4444" };
  if (score <= 4) return { label: "Fair", pct: 55, color: "#f59e0b" };
  if (score <= 5) return { label: "Strong", pct: 80, color: "#22c55e" };
  return { label: "Very Strong", pct: 100, color: "#10b981" };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ uppercase:true, lowercase:true, numbers:true, symbols:false });
  const [password, setPassword] = useState(() => generatePassword(16, { uppercase:true,lowercase:true,numbers:true,symbols:false }));
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => setPassword(generatePassword(length, opts)), [length, opts]);
  const copy = () => { navigator.clipboard.writeText(password); setCopied(true); setTimeout(()=>setCopied(false),1500); };

  const strength = getStrength(password);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🔐 Password Generator</h1>
        <p className={styles.pageSub}>Generate strong, secure passwords instantly</p>
      </div>
      <div className={styles.container}>
        <div className={styles.pwDisplay}>
          <span className={styles.pwText}>{password || "—"}</span>
          <button onClick={copy} className={styles.copyBtn}>{copied ? "✓" : "Copy"}</button>
        </div>

        <div className={styles.strengthBar}>
          <div className={styles.strengthFill} style={{width:`${strength.pct}%`, background: strength.color}} />
        </div>
        <p style={{fontSize:"0.8rem",color:strength.color,marginBottom:20}}>Strength: {strength.label}</p>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Length: {length}</label>
            <input type="range" min="6" max="64" value={length} onChange={e=>{setLength(Number(e.target.value));}} className={styles.slider} />
          </div>

          {Object.keys(CHARS).map(k=>(
            <label key={k} className={styles.checkRow} style={{cursor:"pointer"}}>
              <input type="checkbox" checked={opts[k]} onChange={e=>setOpts(o=>({...o,[k]:e.target.checked}))} className={styles.checkbox} />
              <span style={{color:"#cbd5e1",fontSize:"0.95rem",textTransform:"capitalize"}}>{k}</span>
            </label>
          ))}

          <div className={styles.btnRow}>
            <button onClick={generate} className={styles.btn}>🔄 Generate New</button>
          </div>
        </div>
      </div>
    </div>
  );
}
