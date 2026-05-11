"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function DiceRoller() {
  const [numDice, setNumDice] = useState(2);
  const [sides, setSides] = useState(6);
  const [results, setResults] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState([]);

  const DICE_TYPES = [4,6,8,10,12,20,100];
  const DICE_EMOJI = {4:"🔺",6:"🎲",8:"🔷",10:"🔟",12:"🔘",20:"🟩",100:"💯"};

  const roll = () => {
    setRolling(true);
    setTimeout(()=>{
      const r = Array.from({length:numDice},()=>Math.floor(Math.random()*sides)+1);
      setResults(r);
      const total=r.reduce((s,v)=>s+v,0);
      setHistory(h=>[{dice:numDice,sides,results:r,total,ts:new Date().toLocaleTimeString()},...h].slice(0,10));
      setRolling(false);
    },600);
  };

  const total = results.reduce((s,v)=>s+v,0);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🎲 Dice Roller</h1>
        <p className={styles.pageSub}>Roll any number of dice in any configuration</p>
      </div>
      <div className={styles.container} style={{maxWidth:560,textAlign:"center"}}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Dice Type</label>
            <div className={styles.harmonyRow} style={{justifyContent:"center"}}>
              {DICE_TYPES.map(s=>(
                <button key={s} onClick={()=>setSides(s)} className={`${styles.harmonyBtn} ${sides===s?styles.harmonyActive:""}`}>d{s}</button>
              ))}
            </div>
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Number of Dice: {numDice}</label>
            <input type="range" min={1} max={10} value={numDice} onChange={e=>setNumDice(Number(e.target.value))} className={styles.slider} />
          </div>
        </div>

        <div style={{padding:"32px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,marginBottom:20,minHeight:120}}>
          {results.length>0 ? (
            <>
              <div style={{display:"flex",flexWrap:"wrap",gap:16,justifyContent:"center",marginBottom:16}}>
                {results.map((r,i)=>(
                  <div key={i} style={{
                    width:64,height:64,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:"1.8rem",fontWeight:900,
                    background:"rgba(99,102,241,0.2)",border:"2px solid rgba(99,102,241,0.4)",color:"#a5b4fc",
                    animation:rolling?"none":"",
                    boxShadow:"0 4px 20px rgba(99,102,241,0.2)"
                  }}>{rolling?"?":r}</div>
                ))}
              </div>
              {!rolling&&<div style={{fontSize:"1rem",color:"#64748b"}}>Total: <strong style={{color:"#a5b4fc",fontSize:"1.3rem"}}>{total}</strong> · Avg: {(total/results.length).toFixed(1)}</div>}
            </>
          ) : (
            <div style={{color:"#475569",fontSize:"1rem"}}>Press Roll to throw the dice!</div>
          )}
        </div>

        <button onClick={roll} className={styles.btn} style={{marginBottom:24,fontSize:"1.1rem",padding:"14px 36px"}}>
          {rolling?`${DICE_EMOJI[sides]||"🎲"} Rolling…`:`🎲 Roll ${numDice}d${sides}`}
        </button>

        {history.length>0&&(
          <div style={{textAlign:"left"}}>
            <div className={styles.label} style={{marginBottom:8}}>History</div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              {history.map((h,i)=>(
                <div key={i} style={{display:"flex",gap:12,padding:"8px 14px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:8,fontSize:"0.82rem",color:"#64748b"}}>
                  <span>{h.dice}d{h.sides}</span>
                  <span style={{flex:1,color:"#94a3b8"}}>[{h.results.join(", ")}]</span>
                  <span style={{color:"#a5b4fc",fontWeight:600}}>={h.total}</span>
                  <span style={{color:"#334155"}}>{h.ts}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
