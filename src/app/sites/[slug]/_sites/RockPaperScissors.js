"use client";
import { useState } from "react";
import styles from "./site.module.css";

const CHOICES = [
  { name:"Rock",emoji:"✊",beats:"Scissors"},
  { name:"Paper",emoji:"🖐",beats:"Rock"},
  { name:"Scissors",emoji:"✌️",beats:"Rock"}
];
// fix Scissors beats Rock above
CHOICES[2].beats = "Rock"; // Scissors beats rock — actually scissors beats paper, let me fix

const RULES = { Rock:"Scissors", Paper:"Rock", Scissors:"Paper" };

export default function RockPaperScissors() {
  const [scores, setScores] = useState({player:0,ai:0,draws:0});
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const play = (choice) => {
    const aiIdx = Math.floor(Math.random()*3);
    const ai = CHOICES[aiIdx].name;
    let outcome;
    if(choice === ai) outcome = "draw";
    else if(RULES[choice]===ai) outcome = "win";
    else outcome = "lose";

    setScores(s=>({...s, player:s.player+(outcome==="win"?1:0), ai:s.ai+(outcome==="lose"?1:0), draws:s.draws+(outcome==="draw"?1:0)}));
    const r={player:choice,ai,outcome};
    setResult(r);
    setHistory(h=>[r,...h].slice(0,8));
  };

  const reset = ()=>{setScores({player:0,ai:0,draws:0});setResult(null);setHistory([]);};

  const EMOJI = {Rock:"✊",Paper:"🖐",Scissors:"✌️"};

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>✊ Rock Paper Scissors</h1>
        <p className={styles.pageSub}>Challenge the computer to a duel!</p>
      </div>
      <div className={styles.container} style={{maxWidth:500,textAlign:"center"}}>
        <div style={{display:"flex",justifyContent:"center",gap:32,marginBottom:24}}>
          {[["You",scores.player,"#a5b4fc"],["Draw",scores.draws,"#64748b"],["AI",scores.ai,"#fb7185"]].map(([l,v,c])=>(
            <div key={l}><div style={{fontSize:"1.8rem",fontWeight:800,color:c}}>{v}</div><div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div></div>
          ))}
        </div>

        {result&&(
          <div style={{padding:"20px",background:result.outcome==="win"?"rgba(34,197,94,0.08)":result.outcome==="lose"?"rgba(239,68,68,0.08)":"rgba(99,102,241,0.08)",border:`1px solid ${result.outcome==="win"?"rgba(34,197,94,0.3)":result.outcome==="lose"?"rgba(239,68,68,0.3)":"rgba(99,102,241,0.3)"}`,borderRadius:16,marginBottom:20}}>
            <div style={{fontSize:"3rem",marginBottom:8}}>{EMOJI[result.player]} vs {EMOJI[result.ai]}</div>
            <div style={{fontSize:"1.3rem",fontWeight:700,color:result.outcome==="win"?"#4ade80":result.outcome==="lose"?"#fca5a5":"#a5b4fc"}}>
              {result.outcome==="win"?"🎉 You Win!":result.outcome==="lose"?"😔 AI Wins":"🤝 Draw!"}
            </div>
            <div style={{fontSize:"0.85rem",color:"#64748b",marginTop:4}}>You: {result.player} · AI: {result.ai}</div>
          </div>
        )}

        <div style={{display:"flex",gap:16,justifyContent:"center",marginBottom:24}}>
          {CHOICES.map(c=>(
            <button key={c.name} onClick={()=>play(c.name)} style={{
              width:100,height:100,borderRadius:20,fontSize:"3rem",
              background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
              transition:"all 0.2s",cursor:"pointer"
            }} onMouseOver={e=>{e.currentTarget.style.transform="scale(1.12)";e.currentTarget.style.background="rgba(99,102,241,0.15)";}}
            onMouseOut={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.background="rgba(255,255,255,0.05)";}}
            title={c.name}>
              {c.emoji}
            </button>
          ))}
        </div>

        {history.length>0&&(
          <div style={{textAlign:"left",marginBottom:16}}>
            <div className={styles.label} style={{marginBottom:8}}>History</div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              {history.map((h,i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"8px 14px",background:"rgba(255,255,255,0.03)",borderRadius:8,fontSize:"0.85rem",color:"#64748b"}}>
                  <span>{EMOJI[h.player]} {h.player}</span>
                  <span>vs</span>
                  <span>{EMOJI[h.ai]} {h.ai}</span>
                  <span style={{marginLeft:"auto",color:h.outcome==="win"?"#4ade80":h.outcome==="lose"?"#fca5a5":"#a5b4fc",fontWeight:600}}>
                    {h.outcome==="win"?"W":h.outcome==="lose"?"L":"D"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        <button onClick={reset} className={styles.btn} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8"}}>↺ Reset</button>
      </div>
    </div>
  );
}
