"use client";
import { useState } from "react";
import styles from "./site.module.css";

const ROMAN_VALS = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];

function toRoman(n) {
  if (n < 1 || n > 3999) return "Out of range (1–3999)";
  let result = "";
  for (const [val, sym] of ROMAN_VALS) { while (n >= val) { result += sym; n -= val; } }
  return result;
}

function fromRoman(s) {
  const map = {M:1000,D:500,C:100,L:50,X:10,V:5,I:1};
  const str = s.toUpperCase();
  let result = 0;
  for (let i=0; i<str.length; i++) {
    const curr = map[str[i]], next = map[str[i+1]];
    if (!curr) return NaN;
    result += next && next > curr ? -curr : curr;
  }
  return result;
}

export default function RomanNumeralConverter() {
  const [mode, setMode] = useState("toRoman");
  const [input, setInput] = useState("2024");
  const [copied, setCopied] = useState(false);

  let output = "";
  if (mode === "toRoman") {
    const n = parseInt(input, 10);
    output = !isNaN(n) ? toRoman(n) : "Enter a valid integer";
  } else {
    const n = fromRoman(input);
    output = !isNaN(n) && n > 0 ? String(n) : "Enter valid Roman numerals";
  }

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>Ⅻ Roman Numeral Converter</h1>
        <p className={styles.pageSub}>Convert between Arabic numbers and Roman numerals</p>
      </div>
      <div className={styles.container} style={{maxWidth:560}}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Direction</label>
            <div className={styles.harmonyRow}>
              <button onClick={()=>{setMode("toRoman");setInput("2024");}} className={`${styles.harmonyBtn} ${mode==="toRoman"?styles.harmonyActive:""}`}>Arabic → Roman</button>
              <button onClick={()=>{setMode("fromRoman");setInput("MMXXIV");}} className={`${styles.harmonyBtn} ${mode==="fromRoman"?styles.harmonyActive:""}`}>Roman → Arabic</button>
            </div>
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.label}>{mode==="toRoman"?"Arabic Number (1–3999)":"Roman Numeral"}</label>
            <input type="text" value={input} onChange={e=>setInput(e.target.value)} className={styles.input} style={{fontSize:"1.5rem",textAlign:"center",letterSpacing:4}} />
          </div>
        </div>

        <div style={{
          textAlign:"center",padding:"32px",background:"rgba(255,255,255,0.04)",
          border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,marginBottom:16
        }}>
          <div style={{fontSize:"0.8rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12}}>Result</div>
          <div style={{fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:800,color:"#a5b4fc",letterSpacing:4}}>{output}</div>
        </div>

        <button onClick={copy} className={styles.btn}>{copied?"✓ Copied!":"📋 Copy Result"}</button>

        <div style={{marginTop:24}}>
          <div className={styles.label} style={{marginBottom:8}}>Quick Reference</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {[[1,"I"],[4,"IV"],[5,"V"],[9,"IX"],[10,"X"],[40,"XL"],[50,"L"],[90,"XC"],[100,"C"],[400,"CD"],[500,"D"],[900,"CM"],[1000,"M"]].map(([n,r])=>(
              <div key={n} onClick={()=>{setMode("toRoman");setInput(String(n));}} style={{padding:"6px 12px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,cursor:"pointer",textAlign:"center"}}>
                <div style={{fontSize:"0.7rem",color:"#64748b"}}>{n}</div>
                <div style={{fontFamily:"serif",fontWeight:700,color:"#a5b4fc"}}>{r}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
