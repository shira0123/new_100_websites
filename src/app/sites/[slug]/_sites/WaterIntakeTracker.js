"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

const GOAL = 8; // glasses
const STORAGE_KEY = "water-intake-v1";

export default function WaterIntakeTracker() {
  const [glasses, setGlasses] = useState(0);
  const [goal, setGoal] = useState(GOAL);
  const [history, setHistory] = useState([]);

  const todayKey = new Date().toLocaleDateString();

  useEffect(()=>{
    try{
      const s=localStorage.getItem(STORAGE_KEY);
      if(s){const d=JSON.parse(s);if(d.date===todayKey){setGlasses(d.glasses);setGoal(d.goal||GOAL);}else{localStorage.removeItem(STORAGE_KEY);}}
    }catch{}
  },[]);

  const save = (g,gl) => {
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify({date:todayKey,glasses:g,goal:gl}));}catch{}
  };

  const add = (n=1)=>{ const ng=Math.min(glasses+n,20); setGlasses(ng); save(ng,goal); };
  const remove = ()=>{ const ng=Math.max(glasses-1,0); setGlasses(ng); save(ng,goal); };
  const reset = ()=>{ setGlasses(0); save(0,goal); };

  const pct = Math.min(glasses/goal*100,100);
  const ml = glasses*250;
  const goalMl = goal*250;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>💧 Water Intake Tracker</h1>
        <p className={styles.pageSub}>Stay hydrated! Track your daily water intake</p>
      </div>
      <div className={styles.container} style={{maxWidth:460,textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,justifyContent:"center",marginBottom:20}}>
          <label className={styles.label} style={{margin:0}}>Daily goal:</label>
          <input type="number" value={goal} min={1} max={20} onChange={e=>{const g=Number(e.target.value);setGoal(g);save(glasses,g);}} style={{width:70,padding:"8px 10px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"#f1f5f9",textAlign:"center",fontFamily:"inherit",fontSize:"1rem"}} />
          <span style={{color:"#64748b"}}>glasses</span>
        </div>

        {/* Big bottle display */}
        <div style={{position:"relative",width:120,height:200,margin:"0 auto 28px",borderRadius:"0 0 20px 20px",border:"3px solid rgba(14,165,233,0.3)",overflow:"hidden",background:"rgba(255,255,255,0.03)"}}>
          <div style={{
            position:"absolute",bottom:0,left:0,right:0,
            height:`${pct}%`,
            background:`linear-gradient(180deg, rgba(56,189,248,0.6), rgba(14,165,233,0.9))`,
            transition:"height 0.5s cubic-bezier(0.4,0,0.2,1)"
          }} />
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.5rem",zIndex:1}}>
            {pct>=100?"🎉":"💧"}
          </div>
        </div>

        <div style={{fontSize:"3rem",fontWeight:900,color:"#38bdf8",marginBottom:4}}>{glasses}<span style={{fontSize:"1.2rem",fontWeight:500,color:"#64748b",marginLeft:4}}>/ {goal}</span></div>
        <div style={{fontSize:"0.9rem",color:"#64748b",marginBottom:24}}>{ml} ml / {goalMl} ml</div>

        {pct>=100&&<div style={{padding:"10px",background:"rgba(14,165,233,0.12)",border:"1px solid rgba(14,165,233,0.3)",borderRadius:12,marginBottom:16,color:"#38bdf8",fontWeight:600}}>🎉 Daily goal reached! Great job!</div>}

        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:20}}>
          <button onClick={()=>add(1)} className={styles.btn} style={{background:"linear-gradient(135deg,#0ea5e9,#38bdf8)"}}>+ 1 Glass</button>
          <button onClick={()=>add(2)} style={{padding:"12px 20px",borderRadius:12,background:"rgba(14,165,233,0.12)",border:"1px solid rgba(14,165,233,0.3)",color:"#38bdf8",fontWeight:600}}>+ 2 Glasses</button>
          <button onClick={remove} style={{padding:"12px 16px",borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",fontWeight:600}}>- 1</button>
          <button onClick={reset} style={{padding:"12px 16px",borderRadius:12,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.25)",color:"#fca5a5",fontWeight:600}}>↺</button>
        </div>

        {/* Visual glasses */}
        <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
          {Array.from({length:goal},(_,i)=>(
            <div key={i} onClick={()=>i<glasses?remove():add(1)} style={{
              width:40,height:44,borderRadius:"0 0 8px 8px",
              background:i<glasses?"rgba(14,165,233,0.3)":"rgba(255,255,255,0.04)",
              border:`1px solid ${i<glasses?"rgba(56,189,248,0.5)":"rgba(255,255,255,0.1)"}`,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:"1.2rem",cursor:"pointer",transition:"all 0.2s"
            }}>
              {i<glasses?"💧":"○"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
