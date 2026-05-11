"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./site.module.css";

export default function Stopwatch() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (running) {
      startRef.current = performance.now() - ms;
      const tick = () => { setMs(performance.now() - startRef.current); rafRef.current = requestAnimationFrame(tick); };
      rafRef.current = requestAnimationFrame(tick);
    } else cancelAnimationFrame(rafRef.current);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  const fmt = (t) => {
    const m = Math.floor(t / 60000);
    const s = Math.floor((t % 60000) / 1000);
    const cs = Math.floor((t % 1000) / 10);
    return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(cs).padStart(2,"0")}`;
  };

  const lapTime = () => setLaps(l => [...l, ms]);
  const reset = () => { setRunning(false); setMs(0); setLaps([]); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>⏱️ Stopwatch</h1>
        <p className={styles.pageSub}>Precision stopwatch with lap tracking</p>
      </div>
      <div className={styles.container} style={{maxWidth:560,textAlign:"center"}}>
        <div style={{
          fontSize:"5rem",fontWeight:800,fontVariantNumeric:"tabular-nums",
          color:running?"#a5b4fc":"#f1f5f9",fontFamily:"monospace",
          padding:"40px 20px",background:"rgba(255,255,255,0.03)",
          border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,marginBottom:24,
          letterSpacing:2,transition:"color 0.3s"
        }}>
          {fmt(ms)}
        </div>

        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:28}}>
          <button onClick={()=>setRunning(r=>!r)} className={styles.btn} style={{minWidth:120}}>
            {running?"⏸ Pause":"▶ Start"}
          </button>
          {running && <button onClick={lapTime} style={{padding:"12px 24px",borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",fontWeight:600}}>🏁 Lap</button>}
          <button onClick={reset} style={{padding:"12px 24px",borderRadius:12,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.25)",color:"#fca5a5",fontWeight:600}}>↺ Reset</button>
        </div>

        {laps.length > 0 && (
          <div style={{textAlign:"left"}}>
            <div className={styles.label} style={{marginBottom:10}}>Laps</div>
            <div style={{maxHeight:280,overflowY:"auto",display:"flex",flexDirection:"column",gap:6}}>
              {[...laps].reverse().map((l,i)=>(
                <div key={i} style={{
                  display:"flex",justifyContent:"space-between",
                  padding:"10px 16px",background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.07)",borderRadius:10
                }}>
                  <span style={{color:"#64748b",fontSize:"0.85rem"}}>Lap {laps.length-i}</span>
                  <code style={{color:"#a5b4fc",fontFamily:"monospace"}}>{fmt(l)}</code>
                  {i < laps.length-1 && <code style={{color:"#475569",fontFamily:"monospace",fontSize:"0.8rem"}}>+{fmt(l - laps[laps.length-i-2])}</code>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
