"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

function useTime() {
  const [now, setNow] = useState(new Date());
  useEffect(()=>{ const t=setInterval(()=>setNow(new Date()),1000); return()=>clearInterval(t); },[]);
  return now;
}

export default function DigitalClock() {
  const now = useTime();
  const [hour12, setHour12] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);
  const [theme, setTheme] = useState("indigo");

  const THEMES = {
    indigo: { main:"#818cf8", glow:"rgba(99,102,241,0.3)" },
    emerald: { main:"#34d399", glow:"rgba(16,185,129,0.3)" },
    rose: { main:"#fb7185", glow:"rgba(244,63,94,0.3)" },
    amber: { main:"#fbbf24", glow:"rgba(245,158,11,0.3)" },
    cyan: { main:"#22d3ee", glow:"rgba(6,182,212,0.3)" },
  };

  const t = THEMES[theme];
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const ampm = h >= 12 ? "PM" : "AM";
  const displayH = hour12 ? (h % 12 || 12) : h;
  const timeStr = `${String(displayH).padStart(2,"0")}:${String(m).padStart(2,"0")}${showSeconds?":"+String(s).padStart(2,"0"):""}`;
  const dateStr = now.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"});

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🕐 Digital Clock</h1>
        <p className={styles.pageSub}>A beautiful real-time digital clock</p>
      </div>
      <div className={styles.container} style={{maxWidth:680,textAlign:"center"}}>
        {/* Main clock display */}
        <div style={{
          padding:"60px 40px",background:"rgba(255,255,255,0.02)",
          border:`1px solid ${t.main}33`,borderRadius:24,marginBottom:28,
          boxShadow:`0 0 80px ${t.glow}`,transition:"all 0.5s"
        }}>
          <div style={{
            fontSize:"clamp(4rem,15vw,8rem)",fontWeight:900,letterSpacing:4,
            color:t.main,fontFamily:"monospace",fontVariantNumeric:"tabular-nums",
            textShadow:`0 0 40px ${t.glow}`,lineHeight:1,transition:"color 0.5s"
          }}>
            {timeStr}
          </div>
          {hour12 && <div style={{fontSize:"1.5rem",fontWeight:700,color:t.main,opacity:0.7,marginTop:8}}>{ampm}</div>}
          <div style={{marginTop:16,fontSize:"1rem",color:"#64748b"}}>{dateStr}</div>
        </div>

        {/* Controls */}
        <div style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center",marginBottom:20}}>
          <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",color:"#94a3b8",fontSize:"0.9rem"}}>
            <input type="checkbox" checked={hour12} onChange={e=>setHour12(e.target.checked)} className={styles.checkbox} />
            12-hour format
          </label>
          <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",color:"#94a3b8",fontSize:"0.9rem"}}>
            <input type="checkbox" checked={showSeconds} onChange={e=>setShowSeconds(e.target.checked)} className={styles.checkbox} />
            Show seconds
          </label>
        </div>

        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          {Object.entries(THEMES).map(([name,val])=>(
            <button key={name} onClick={()=>setTheme(name)} style={{
              width:36,height:36,borderRadius:"50%",border:`3px solid ${theme===name?"#fff":"transparent"}`,
              background:val.main,cursor:"pointer",transition:"border 0.2s"
            }} title={name} />
          ))}
        </div>
      </div>
    </div>
  );
}
