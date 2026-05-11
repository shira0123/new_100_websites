"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function NumberGuesser() {
  const [secret, setSecret] = useState(()=>Math.floor(Math.random()*100)+1);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [won, setWon] = useState(false);
  const [best, setBest] = useState(null);

  const submit = ()=>{
    const g=parseInt(guess,10);
    if(isNaN(g)||g<1||g>100)return;
    const hint = g<secret?"Too low 📉":g>secret?"Too high 📈":"Correct! 🎉";
    const newAttempts=[...attempts,{guess:g,hint}];
    setAttempts(newAttempts);
    if(g===secret){
      setWon(true);
      const n=newAttempts.length;
      setBest(b=>b===null||n<b?n:b);
    }
    setGuess("");
  };

  const reset=()=>{setSecret(Math.floor(Math.random()*100)+1);setAttempts([]);setWon(false);setGuess("");};

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🔮 Number Guesser</h1>
        <p className={styles.pageSub}>Guess the secret number between 1 and 100</p>
      </div>
      <div className={styles.container} style={{maxWidth:460,textAlign:"center"}}>
        <div style={{display:"flex",gap:32,justifyContent:"center",marginBottom:24}}>
          <div><div style={{fontSize:"1.8rem",fontWeight:800,color:"#a5b4fc"}}>{attempts.length}</div><div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em"}}>Attempts</div></div>
          {best&&<div><div style={{fontSize:"1.8rem",fontWeight:800,color:"#fbbf24"}}>{best}</div><div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em"}}>Best</div></div>}
        </div>

        {!won ? (
          <>
            <div style={{padding:"20px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,marginBottom:20}}>
              <p style={{color:"#94a3b8",marginBottom:12}}>I'm thinking of a number between 1 and 100…</p>
              {attempts.length>0&&(
                <div style={{marginBottom:12,padding:"10px",background:"rgba(99,102,241,0.08)",borderRadius:10,fontSize:"1rem",fontWeight:600,color:attempts[attempts.length-1].hint.includes("low")?"#38bdf8":attempts[attempts.length-1].hint.includes("high")?"#fb7185":"#4ade80"}}>
                  {attempts[attempts.length-1].hint}
                </div>
              )}
              <div style={{display:"flex",gap:8,justifyContent:"center"}}>
                <input type="number" value={guess} onChange={e=>setGuess(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} className={styles.input} style={{width:120,textAlign:"center",fontSize:"1.5rem"}} min={1} max={100} placeholder="?" autoFocus />
                <button onClick={submit} className={styles.btn} style={{flexShrink:0}}>Guess!</button>
              </div>
            </div>

            {/* Range hints */}
            {attempts.length>0&&(
              <div style={{marginBottom:16}}>
                <div style={{height:10,background:"rgba(255,255,255,0.06)",borderRadius:99,position:"relative",marginBottom:8}}>
                  {(() => {
                    const low=Math.max(...attempts.filter(a=>a.hint.includes("low")).map(a=>a.guess),0);
                    const high=Math.min(...attempts.filter(a=>a.hint.includes("high")).map(a=>a.guess),101);
                    return <div style={{position:"absolute",left:`${low}%`,width:`${high-low}%`,height:"100%",background:"linear-gradient(90deg,#6366f1,#8b5cf6)",borderRadius:99}} />;
                  })()}
                </div>
                <div style={{fontSize:"0.78rem",color:"#64748b"}}>Guesses: {attempts.map(a=>a.guess).join(", ")}</div>
              </div>
            )}
          </>
        ) : (
          <div style={{padding:"32px",background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:20,marginBottom:20}}>
            <div style={{fontSize:"3rem",marginBottom:8}}>🎉</div>
            <div style={{fontSize:"2rem",fontWeight:800,color:"#4ade80",marginBottom:8}}>You got it!</div>
            <div style={{color:"#94a3b8"}}>The number was <strong>{secret}</strong> — found in <strong>{attempts.length} guess{attempts.length!==1?"es":""}</strong></div>
          </div>
        )}

        <button onClick={reset} className={styles.btn} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8"}}>↺ New Game</button>
      </div>
    </div>
  );
}
