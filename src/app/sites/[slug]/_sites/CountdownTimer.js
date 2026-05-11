"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./site.module.css";

export default function CountdownTimer() {
  const [targetDate, setTargetDate] = useState("");
  const [targetName, setTargetName] = useState("My Event");
  const [timeLeft, setTimeLeft] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!targetDate) return;
    const tick = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target - now;
      if (diff <= 0) { setTimeLeft({ days:0,hours:0,minutes:0,seconds:0 }); clearInterval(intervalRef.current); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => clearInterval(intervalRef.current);
  }, [targetDate]);

  const pad = n => String(n).padStart(2,"0");

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>⏳ Countdown Timer</h1>
        <p className={styles.pageSub}>Count down to any date and time</p>
      </div>
      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label} htmlFor="event-name">Event Name</label>
            <input id="event-name" type="text" value={targetName} onChange={e=>setTargetName(e.target.value)} className={styles.input} placeholder="e.g. New Year 2027" />
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.label} htmlFor="event-date">Target Date & Time</label>
            <input id="event-date" type="datetime-local" value={targetDate} onChange={e=>setTargetDate(e.target.value)} className={styles.input} />
          </div>
        </div>

        {timeLeft ? (
          <div>
            <p style={{textAlign:"center",color:"#94a3b8",marginBottom:24,fontSize:"1.1rem",fontWeight:600}}>{targetName}</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
              {[["Days",timeLeft.days],["Hours",timeLeft.hours],["Minutes",timeLeft.minutes],["Seconds",timeLeft.seconds]].map(([label,val])=>(
                <div key={label} style={{textAlign:"center",padding:"24px 8px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16}}>
                  <div style={{fontSize:"clamp(2rem,6vw,3.5rem)",fontWeight:800,color:"#a5b4fc",fontVariantNumeric:"tabular-nums"}}>{pad(val)}</div>
                  <div style={{fontSize:"0.75rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.08em",marginTop:6}}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.resultCard}>
            <div style={{fontSize:"3rem"}}>📅</div>
            <p style={{color:"#64748b",marginTop:12}}>Pick a date and time above to start the countdown</p>
          </div>
        )}
      </div>
    </div>
  );
}
