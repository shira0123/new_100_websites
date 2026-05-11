"use client";
import { useState, useCallback } from "react";
import styles from "./site.module.css";

const WORDS_LIST = ["PYTHON","JAVASCRIPT","NEXTJS","REACT","CODING","KEYBOARD","BROWSER","ALGORITHM","DATABASE","FRONTEND","BACKEND","NETWORK","MONITOR","LAPTOP","PROGRAMMER","FUNCTION","VARIABLE","CONSTANT","LIBRARY","FRAMEWORK","COMPONENT","INTERFACE","TERMINAL","DEBUGGER","COMPILER","RUNTIME","SERVER","CLIENT","PACKAGE","MODULE"];

function scramble(word) {
  let s;
  do { s = word.split("").sort(()=>Math.random()-0.5).join(""); } while(s===word&&word.length>1);
  return s;
}

export default function WordScramble() {
  const getNew = useCallback(()=>{
    const w = WORDS_LIST[Math.floor(Math.random()*WORDS_LIST.length)];
    return { word:w, scrambled:scramble(w), hint:false };
  },[]);

  const [game, setGame] = useState(getNew);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const check = () => {
    if(input.toUpperCase()===game.word){
      setFeedback("correct");
      setScore(s=>s+10+(game.hint?0:5));
      setStreak(s=>s+1);
      setTimeout(()=>{ setGame(getNew()); setInput(""); setFeedback(null); },800);
    } else { setFeedback("wrong"); setStreak(0); setTimeout(()=>setFeedback(null),500); }
  };

  const skip = () => { setGame(getNew()); setInput(""); setFeedback(null); };
  const hint = () => setGame(g=>({...g,hint:true}));

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🔤 Word Scramble</h1>
        <p className={styles.pageSub}>Unscramble the letters to find the hidden word</p>
      </div>
      <div className={styles.container} style={{maxWidth:500,textAlign:"center"}}>
        <div style={{display:"flex",gap:32,justifyContent:"center",marginBottom:24}}>
          {[["Score",score,"#a5b4fc"],["Streak",streak,"🔥" +" "+streak,"#fbbf24"]].map(([l,v,c])=>(
            <div key={l}><div style={{fontSize:"1.8rem",fontWeight:800,color:"#a5b4fc"}}>{v}</div><div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div></div>
          ))}
          {streak>0&&<div><div style={{fontSize:"1.8rem",fontWeight:800,color:"#fbbf24"}}>🔥{streak}</div><div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em"}}>Streak</div></div>}
        </div>

        {/* Scrambled word */}
        <div style={{padding:"28px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,marginBottom:20}}>
          <div style={{fontSize:"0.8rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:12}}>Unscramble this word</div>
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            {game.scrambled.split("").map((l,i)=>(
              <div key={i} style={{width:44,height:52,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(99,102,241,0.15)",border:"1px solid rgba(99,102,241,0.3)",borderRadius:10,fontSize:"1.5rem",fontWeight:700,color:"#a5b4fc",letterSpacing:0}}>{l}</div>
            ))}
          </div>
          {game.hint&&<div style={{marginTop:12,fontSize:"0.85rem",color:"#fbbf24"}}>💡 Hint: {game.word.length} letter word · Starts with "{game.word[0]}"</div>}
        </div>

        <input
          value={input} onChange={e=>setInput(e.target.value.toUpperCase())}
          onKeyDown={e=>e.key==="Enter"&&check()}
          className={styles.input}
          style={{textAlign:"center",fontSize:"1.3rem",letterSpacing:6,marginBottom:12,
            borderColor:feedback==="correct"?"rgba(34,197,94,0.5)":feedback==="wrong"?"rgba(239,68,68,0.5)":"rgba(255,255,255,0.1)"
          }}
          placeholder="Type your answer…"
          maxLength={game.word.length}
          autoFocus
        />

        <div className={styles.btnRow} style={{justifyContent:"center"}}>
          <button onClick={check} className={styles.btn}>✓ Check</button>
          <button onClick={hint} style={{padding:"12px 20px",borderRadius:12,background:"rgba(251,191,36,0.1)",border:"1px solid rgba(251,191,36,0.3)",color:"#fbbf24",fontWeight:600}}>💡 Hint</button>
          <button onClick={skip} style={{padding:"12px 20px",borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",fontWeight:600}}>⏭ Skip</button>
        </div>
      </div>
    </div>
  );
}
