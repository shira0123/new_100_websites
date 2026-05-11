"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./site.module.css";

const PHASES = [
  { name: "Inhale", duration: 4, color: "#0ea5e9", instruction: "Breathe in slowly…" },
  { name: "Hold", duration: 4, color: "#a855f7", instruction: "Hold your breath…" },
  { name: "Exhale", duration: 4, color: "#22c55e", instruction: "Breathe out slowly…" },
  { name: "Hold", duration: 4, color: "#f59e0b", instruction: "Rest…" },
];

const TECHNIQUES = {
  "Box (4-4-4-4)": [4,4,4,4],
  "4-7-8": [4,7,8,0],
  "Calm (5-5-5)": [5,0,5,0],
  "Energize (2-1-4-1)": [2,1,4,1],
};

export default function BreathingExercise() {
  const [technique, setTechnique] = useState("Box (4-4-4-4)");
  const [active, setActive] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef(null);
  const startRef = useRef(null);

  const durations = TECHNIQUES[technique];
  const phases = PHASES.map((p,i)=>({...p,duration:durations[i]})).filter(p=>p.duration>0);
  const phase = phases[phaseIdx % phases.length];

  useEffect(()=>{
    if(!active) { clearInterval(timerRef.current); setProgress(0); return; }
    startRef.current = Date.now();
    const tick = () => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      const pct = Math.min(elapsed / phase.duration, 1);
      setProgress(pct);
      if(pct >= 1) {
        const nextIdx = (phaseIdx + 1) % phases.length;
        if(nextIdx === 0) setCycles(c=>c+1);
        setPhaseIdx(nextIdx);
        startRef.current = Date.now();
        setProgress(0);
      }
    };
    timerRef.current = setInterval(tick, 50);
    return ()=>clearInterval(timerRef.current);
  },[active,phaseIdx,phase?.duration,phases.length]);

  const reset = () => { setActive(false); setPhaseIdx(0); setProgress(0); setCycles(0); };

  const size = 220, cx = 110, cy = 110, r = 85;
  const circ = 2*Math.PI*r;
  const scale = 0.7 + (phase?.name==="Inhale"||phase?.name==="Hold" ? progress*0.5 : (1-progress)*0.5);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🧘 Breathing Exercise</h1>
        <p className={styles.pageSub}>Guided breathing exercises for calm and focus</p>
      </div>
      <div className={styles.container} style={{maxWidth:520,textAlign:"center"}}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Technique</label>
            <div className={styles.harmonyRow} style={{justifyContent:"center"}}>
              {Object.keys(TECHNIQUES).map(t=>(
                <button key={t} onClick={()=>{setTechnique(t);reset();}} className={`${styles.harmonyBtn} ${technique===t?styles.harmonyActive:""}`}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{margin:"20px auto",position:"relative",width:size,height:size}}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{position:"absolute",inset:0}}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8}/>
            {active && <circle cx={cx} cy={cy} r={r} fill="none" stroke={phase?.color||"#6366f1"} strokeWidth={8}
              strokeDasharray={circ} strokeDashoffset={circ*(1-progress)}
              strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}
              style={{transition:"stroke-dashoffset 0.1s linear"}}/>}
          </svg>
          <div style={{
            position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
            transform:`scale(${active?scale:1})`,transition:"transform 0.5s ease-in-out"
          }}>
            <div style={{
              width:110,height:110,borderRadius:"50%",
              background:`radial-gradient(circle, ${active?(phase?.color||"#6366f1")+"44":"rgba(255,255,255,0.04)"}, transparent)`,
              border:`2px solid ${active?(phase?.color||"#6366f1")+"66":"rgba(255,255,255,0.1)"}`,
              display:"flex",alignItems:"center",justifyContent:"center",
              transition:"all 0.5s ease-in-out"
            }}>
              <span style={{fontSize:"2rem"}}>{active?"🫁":"😌"}</span>
            </div>
          </div>
        </div>

        <div style={{marginBottom:20}}>
          <div style={{fontSize:"1.5rem",fontWeight:700,color:active?(phase?.color||"#a5b4fc"):"#94a3b8",marginBottom:4}}>
            {active ? phase?.name : "Ready"}
          </div>
          <div style={{color:"#64748b",fontSize:"0.9rem"}}>{active ? phase?.instruction : "Press Start to begin"}</div>
          {active && <div style={{fontSize:"2.5rem",fontWeight:800,color:"#f1f5f9",fontVariantNumeric:"tabular-nums",marginTop:8}}>
            {Math.max(0,Math.ceil(phase.duration*(1-progress)))}
          </div>}
        </div>

        <div style={{display:"flex",gap:12,justifyContent:"center",marginBottom:20}}>
          <button onClick={()=>setActive(a=>!a)} className={styles.btn} style={{background:active?"linear-gradient(135deg,#ef4444,#dc2626)":"linear-gradient(135deg,#6366f1,#8b5cf6)",minWidth:120}}>
            {active?"⏸ Pause":"▶ Start"}
          </button>
          <button onClick={reset} style={{padding:"12px 24px",borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",fontWeight:600}}>↺ Reset</button>
        </div>

        <div style={{display:"flex",gap:32,justifyContent:"center"}}>
          <div><div style={{fontSize:"1.8rem",fontWeight:800,color:"#a5b4fc"}}>{cycles}</div><div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.08em"}}>Cycles</div></div>
        </div>
      </div>
    </div>
  );
}
