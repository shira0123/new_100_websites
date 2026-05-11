"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function TypingSpeedTest() {
  const TEXTS = [
    "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump.",
    "In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep.",
    "To be or not to be, that is the question. Whether tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
    "Four score and seven years ago our fathers brought forth on this continent a new nation conceived in liberty and dedicated to the proposition that all men are created equal.",
  ];

  const [text] = useState(TEXTS[Math.floor(Math.random()*TEXTS.length)]);
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [started, setStarted] = useState(false);

  const handleType = (e) => {
    const val = e.target.value;
    if(!started && val.length===1) { setStartTime(Date.now()); setStarted(true); }
    setTyped(val);
    if(val === text) setEndTime(Date.now());
  };

  const elapsed = endTime ? (endTime-startTime)/1000 : started ? (Date.now()-startTime)/1000 : 0;
  const wpm = startTime && typed.length ? Math.round((typed.trim().split(/\s+/).length / (Math.max(elapsed,1)/60))) : 0;
  const accuracy = typed.length ? Math.round(typed.split("").filter((c,i)=>c===text[i]).length/typed.length*100) : 100;
  const progress = Math.min(typed.length/text.length*100,100);
  const done = typed===text;

  const reset = ()=>{ setTyped(""); setStartTime(null); setEndTime(null); setStarted(false); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>⌨️ Typing Speed Test</h1>
        <p className={styles.pageSub}>Measure your WPM and accuracy in real time</p>
      </div>
      <div className={styles.container} style={{maxWidth:760}}>
        {/* Stats row */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
          {[["WPM",wpm,"⚡"],["Accuracy",accuracy+"%","🎯"],["Progress",Math.round(progress)+"%","📊"]].map(([l,v,i])=>(
            <div key={l} style={{textAlign:"center",padding:"16px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14}}>
              <div style={{fontSize:"0.8rem",marginBottom:4}}>{i}</div>
              <div style={{fontSize:"2rem",fontWeight:800,color:"#a5b4fc"}}>{v}</div>
              <div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{height:4,background:"rgba(255,255,255,0.08)",borderRadius:99,marginBottom:20,overflow:"hidden"}}>
          <div style={{height:"100%",background:"linear-gradient(90deg,#6366f1,#22c55e)",width:`${progress}%`,transition:"width 0.1s",borderRadius:99}} />
        </div>

        {/* Text display */}
        <div style={{padding:"20px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,marginBottom:16,fontFamily:"monospace",fontSize:"1rem",lineHeight:1.9,letterSpacing:0.5}}>
          {text.split("").map((char,i)=>{
            let color = "#334155";
            if(i<typed.length) color = typed[i]===char?"#a5b4fc":"#fca5a5";
            const bg = i<typed.length&&typed[i]!==char?"rgba(239,68,68,0.15)":"transparent";
            return <span key={i} style={{color,background:bg,borderRadius:2}}>{char}</span>;
          })}
        </div>

        <textarea
          value={typed}
          onChange={handleType}
          disabled={done}
          className={styles.textArea}
          placeholder={done?"✅ Test complete! Click Reset to try again.":"Start typing to begin the test…"}
          style={{minHeight:100,fontFamily:"monospace",borderColor:done?"rgba(34,197,94,0.4)":"rgba(255,255,255,0.1)"}}
          autoFocus
        />

        {done&&(
          <div style={{textAlign:"center",padding:"16px",background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:12,marginTop:12}}>
            <div style={{fontSize:"1.5rem",fontWeight:800,color:"#4ade80"}}>🎉 {wpm} WPM with {accuracy}% accuracy!</div>
          </div>
        )}

        <div className={styles.btnRow} style={{marginTop:16}}>
          <button onClick={reset} className={styles.btn}>🔄 New Test</button>
        </div>
      </div>
    </div>
  );
}
