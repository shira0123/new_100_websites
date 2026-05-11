"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./site.module.css";

const PHASES = [
  { label: "Focus", duration: 25 * 60, color: "#6366f1" },
  { label: "Short Break", duration: 5 * 60, color: "#22c55e" },
  { label: "Long Break", duration: 15 * 60, color: "#0ea5e9" },
];

export default function PomodoroClock() {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PHASES[0].duration);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  const phase = PHASES[phaseIdx];
  const pct = 1 - timeLeft / phase.duration;
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (phaseIdx === 0) setSessions(s => s + 1);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [running, phaseIdx]);

  const selectPhase = (i) => { setPhaseIdx(i); setTimeLeft(PHASES[i].duration); setRunning(false); };
  const reset = () => { setTimeLeft(phase.duration); setRunning(false); };

  const circumference = 2 * Math.PI * 90;

  return (
    <div className={styles.page}>
      <div className={styles.hero} style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        <h1 className={styles.pageTitle}>🍅 Pomodoro Clock</h1>
        <p className={styles.pageSub}>Stay focused with the Pomodoro technique</p>
      </div>
      <div className={styles.container}>
        <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:36}}>
          {PHASES.map((p,i)=>(
            <button key={p.label} onClick={()=>selectPhase(i)}
              style={{padding:"8px 20px",borderRadius:99,fontSize:"0.85rem",fontWeight:600,
                background:phaseIdx===i?`${p.color}22`:"rgba(255,255,255,0.04)",
                border:`1px solid ${phaseIdx===i?p.color:"rgba(255,255,255,0.08)"}`,
                color:phaseIdx===i?p.color:"#64748b",transition:"all 0.2s"}}>
              {p.label}
            </button>
          ))}
        </div>

        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:28}}>
          <svg width="220" height="220" viewBox="0 0 220 220">
            <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
            <circle cx="110" cy="110" r="90" fill="none" stroke={phase.color} strokeWidth="8"
              strokeDasharray={circumference} strokeDashoffset={circumference*(1-pct)}
              strokeLinecap="round" transform="rotate(-90 110 110)" style={{transition:"stroke-dashoffset 1s linear"}}/>
            <text x="110" y="108" textAnchor="middle" dominantBaseline="middle" fontSize="44" fontWeight="800" fill="#f1f5f9" fontFamily="monospace">{mins}:{secs}</text>
            <text x="110" y="148" textAnchor="middle" fontSize="13" fill="#64748b">{phase.label}</text>
          </svg>

          <div style={{display:"flex",gap:12}}>
            <button onClick={()=>setRunning(r=>!r)} className={styles.btn} style={{background:`linear-gradient(135deg, ${phase.color}, ${phase.color}aa)`,minWidth:120}}>
              {running ? "⏸ Pause" : "▶ Start"}
            </button>
            <button onClick={reset} style={{padding:"12px 24px",borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",fontWeight:600}}>
              ↺ Reset
            </button>
          </div>

          <div style={{display:"flex",gap:24,textAlign:"center"}}>
            <div><div style={{fontSize:"2rem",fontWeight:800,color:"#a5b4fc"}}>{sessions}</div><div style={{fontSize:"0.75rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.08em"}}>Sessions</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
