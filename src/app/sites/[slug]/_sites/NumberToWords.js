"use client";
import { useState } from "react";
import styles from "./site.module.css";

const ones = ["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
const tens = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];

function numberToWords(n) {
  if (n === 0) return "zero";
  if (n < 0) return "negative " + numberToWords(-n);
  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? "-" + ones[n%10] : "");
  if (n < 1000) return ones[Math.floor(n/100)] + " hundred" + (n%100 ? " " + numberToWords(n%100) : "");
  if (n < 1000000) return numberToWords(Math.floor(n/1000)) + " thousand" + (n%1000 ? " " + numberToWords(n%1000) : "");
  if (n < 1000000000) return numberToWords(Math.floor(n/1000000)) + " million" + (n%1000000 ? " " + numberToWords(n%1000000) : "");
  return numberToWords(Math.floor(n/1000000000)) + " billion" + (n%1000000000 ? " " + numberToWords(n%1000000000) : "");
}

export default function NumberToWords() {
  const [input, setInput] = useState("1234567");
  const [copied, setCopied] = useState(false);

  const num = parseInt(input.replace(/,/g,""), 10);
  const valid = !isNaN(num) && Math.abs(num) < 999999999999;
  const words = valid ? numberToWords(num) : "";
  const formatted = valid ? Math.abs(num).toLocaleString() : "";

  const copy = () => { navigator.clipboard.writeText(words); setCopied(true); setTimeout(()=>setCopied(false),1500); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🔤 Number to Words</h1>
        <p className={styles.pageSub}>Convert any number into its English word form</p>
      </div>
      <div className={styles.container} style={{maxWidth:640}}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Enter a Number</label>
            <input type="text" value={input} onChange={e=>setInput(e.target.value)} className={styles.input} placeholder="e.g. 1234567" style={{fontSize:"1.2rem"}} />
          </div>
        </div>

        {valid ? (
          <>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:"1.4rem",fontWeight:700,color:"#64748b",marginBottom:4,fontVariantNumeric:"tabular-nums"}}>{num < 0 ? "-" : ""}{formatted}</div>
            </div>
            <div style={{
              padding:"28px 24px",background:"rgba(99,102,241,0.06)",
              border:"1px solid rgba(99,102,241,0.2)",borderRadius:16,
              fontSize:"clamp(1rem,2.5vw,1.3rem)",color:"#e2e8f0",
              lineHeight:1.7,textAlign:"center",textTransform:"capitalize",marginBottom:16
            }}>
              {words || "—"}
            </div>
            <button onClick={copy} className={styles.btn}>{copied?"✓ Copied!":"📋 Copy Words"}</button>
          </>
        ) : (
          input && <p style={{color:"#fca5a5",textAlign:"center"}}>Please enter a valid number (up to 999 billion)</p>
        )}
      </div>
    </div>
  );
}
