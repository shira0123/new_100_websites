"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

const TIMEZONES = [
  { city: "New York", tz: "America/New_York", flag: "🇺🇸" },
  { city: "London", tz: "Europe/London", flag: "🇬🇧" },
  { city: "Paris", tz: "Europe/Paris", flag: "🇫🇷" },
  { city: "Dubai", tz: "Asia/Dubai", flag: "🇦🇪" },
  { city: "Mumbai", tz: "Asia/Kolkata", flag: "🇮🇳" },
  { city: "Singapore", tz: "Asia/Singapore", flag: "🇸🇬" },
  { city: "Tokyo", tz: "Asia/Tokyo", flag: "🇯🇵" },
  { city: "Sydney", tz: "Australia/Sydney", flag: "🇦🇺" },
  { city: "Los Angeles", tz: "America/Los_Angeles", flag: "🇺🇸" },
  { city: "Chicago", tz: "America/Chicago", flag: "🇺🇸" },
  { city: "São Paulo", tz: "America/Sao_Paulo", flag: "🇧🇷" },
  { city: "Moscow", tz: "Europe/Moscow", flag: "🇷🇺" },
];

function useTime() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(()=>setNow(new Date()),1000); return ()=>clearInterval(t); },[]);
  return now;
}

function fmtTime(date, tz) {
  return date.toLocaleTimeString("en-US", { timeZone:tz, hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:true });
}
function fmtDate(date, tz) {
  return date.toLocaleDateString("en-US", { timeZone:tz, weekday:"short", month:"short", day:"numeric" });
}

export default function WorldClock() {
  const now = useTime();
  const [search, setSearch] = useState("");

  // Big local clock
  const localTime = now.toLocaleTimeString("en-US", {hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:true});
  const localDate = now.toLocaleDateString("en-US", {weekday:"long",year:"numeric",month:"long",day:"numeric"});

  const filtered = TIMEZONES.filter(z => z.city.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🌍 World Clock</h1>
        <p className={styles.pageSub}>Current time in major cities worldwide</p>
      </div>
      <div className={styles.container}>
        {/* Local big clock */}
        <div style={{textAlign:"center",marginBottom:32,padding:"28px",background:"rgba(99,102,241,0.07)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:20}}>
          <div style={{fontSize:"0.8rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Your Local Time</div>
          <div style={{fontSize:"clamp(2.5rem,8vw,4rem)",fontWeight:800,color:"#a5b4fc",fontVariantNumeric:"tabular-nums",fontFamily:"monospace"}}>{localTime}</div>
          <div style={{color:"#64748b",fontSize:"0.9rem",marginTop:4}}>{localDate}</div>
        </div>

        <input type="search" value={search} onChange={e=>setSearch(e.target.value)} className={styles.input} placeholder="Search city…" style={{marginBottom:16}} />

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12}}>
          {filtered.map(z=>{
            const t = fmtTime(now,z.tz);
            const d = fmtDate(now,z.tz);
            const hr = parseInt(t.split(":")[0]);
            const ampm = t.slice(-2);
            const isDaytime = ampm==="AM" ? hr>=6 : hr<8;
            return (
              <div key={z.city} style={{padding:"16px 18px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <span style={{fontSize:"1.3rem"}}>{z.flag}</span>
                  <span style={{fontSize:"0.9rem",fontWeight:600,color:"#e2e8f0"}}>{z.city}</span>
                  <span style={{marginLeft:"auto",fontSize:"1rem"}}>{isDaytime?"☀️":"🌙"}</span>
                </div>
                <div style={{fontFamily:"monospace",fontSize:"1.3rem",fontWeight:700,color:"#a5b4fc",fontVariantNumeric:"tabular-nums"}}>{t}</div>
                <div style={{fontSize:"0.75rem",color:"#64748b",marginTop:2}}>{d}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
