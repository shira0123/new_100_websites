"use client";
import { useState } from "react";
import styles from "./site.module.css";

const MORSE = {
  A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--..",
  "0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----."," ":"/"
};
const MORSE_REV = Object.fromEntries(Object.entries(MORSE).map(([k,v])=>[v,k]));

function textToMorse(text) {
  return text.toUpperCase().split("").map(c=>MORSE[c]||"?").join(" ");
}
function morseToText(morse) {
  return morse.split(" / ").map(word=>
    word.split(" ").map(code=>MORSE_REV[code]||"?").join("")
  ).join(" ");
}

export default function MorseCodeTranslator() {
  const [mode, setMode] = useState("toMorse");
  const [input, setInput] = useState("HELLO WORLD");
  const [copied, setCopied] = useState(false);

  const output = mode === "toMorse" ? textToMorse(input) : morseToText(input);
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>•− Morse Code Translator</h1>
        <p className={styles.pageSub}>Translate text to and from Morse code instantly</p>
      </div>
      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Direction</label>
            <div className={styles.harmonyRow}>
              <button onClick={()=>{setMode("toMorse");setInput("HELLO WORLD");}} className={`${styles.harmonyBtn} ${mode==="toMorse"?styles.harmonyActive:""}`}>Text → Morse</button>
              <button onClick={()=>{setMode("fromMorse");setInput(".... . .-.. .-.. --- / .-- --- .-. .-.. -..");}} className={`${styles.harmonyBtn} ${mode==="fromMorse"?styles.harmonyActive:""}`}>Morse → Text</button>
            </div>
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.label}>{mode==="toMorse"?"Input Text":"Morse Code (use dots, dashes, spaces, / for word break)"}</label>
            <textarea className={styles.textArea} value={input} onChange={e=>setInput(e.target.value)} style={{minHeight:100}} />
          </div>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.label}>Output</label>
          <div style={{
            padding:"20px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:12,fontFamily:"monospace",fontSize:"1.1rem",
            color:"#a5b4fc",lineHeight:2,wordBreak:"break-all",minHeight:80,letterSpacing:3
          }}>
            {output || "—"}
          </div>
        </div>
        <div className={styles.btnRow}>
          <button onClick={copy} className={styles.btn}>{copied?"✓ Copied!":"📋 Copy Output"}</button>
        </div>

        <div style={{marginTop:24}}>
          <div className={styles.label} style={{marginBottom:10}}>Morse Reference</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {Object.entries(MORSE).filter(([k])=>k!==" ").map(([k,v])=>(
              <div key={k} style={{padding:"6px 10px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,textAlign:"center",minWidth:52}}>
                <div style={{fontWeight:700,color:"#e2e8f0",fontSize:"0.9rem"}}>{k}</div>
                <div style={{fontFamily:"monospace",color:"#a5b4fc",fontSize:"0.75rem",letterSpacing:2}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
