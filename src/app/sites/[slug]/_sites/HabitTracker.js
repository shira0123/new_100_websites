"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const STORAGE_KEY = "habit-tracker-v1";
const today = () => new Date().toISOString().split("T")[0];
const weekDates = () => {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day===0?6:day-1));
  return Array.from({length:7},(_,i)=>{ const d=new Date(monday); d.setDate(monday.getDate()+i); return d.toISOString().split("T")[0]; });
};

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [input, setInput] = useState("");
  const week = weekDates();

  useEffect(()=>{
    try{const s=localStorage.getItem(STORAGE_KEY);if(s)setHabits(JSON.parse(s));}catch{}
  },[]);
  useEffect(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(habits));}catch{}},[ habits]);

  const addHabit = ()=>{
    if(!input.trim())return;
    setHabits(h=>[...h,{id:Date.now(),name:input.trim(),completions:{},streak:0,color:["#6366f1","#22c55e","#f59e0b","#ec4899","#0ea5e9","#8b5cf6"][Math.floor(Math.random()*6)]}]);
    setInput("");
  };
  const toggle = (habitId,date)=>{
    setHabits(hs=>hs.map(h=>{
      if(h.id!==habitId)return h;
      const c={...h.completions,[date]:!h.completions[date]};
      // calculate streak
      let streak=0,d=new Date();
      while(true){
        const key=d.toISOString().split("T")[0];
        if(!c[key])break;
        streak++;
        d.setDate(d.getDate()-1);
      }
      return{...h,completions:c,streak};
    }));
  };
  const del = (id)=>setHabits(h=>h.filter(x=>x.id!==id));

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>📈 Habit Tracker</h1>
        <p className={styles.pageSub}>Track daily habits and build streaks</p>
      </div>
      <div className={styles.container} style={{maxWidth:700}}>
        <div style={{display:"flex",gap:8,marginBottom:24}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addHabit()} className={styles.input} placeholder="New habit (e.g. Read 30 min)…" style={{flex:1}} />
          <button onClick={addHabit} className={styles.btn} style={{flexShrink:0}}>+ Add</button>
        </div>

        {/* Header row */}
        {habits.length>0&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr repeat(7,40px) 60px",gap:4,marginBottom:8,paddingLeft:8}}>
            <div/>
            {DAYS.map((d,i)=>(
              <div key={d} style={{textAlign:"center",fontSize:"0.72rem",fontWeight:600,color:week[i]===today()?"#a5b4fc":"#64748b",textTransform:"uppercase"}}>{d}</div>
            ))}
            <div style={{textAlign:"center",fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase"}}>Streak</div>
          </div>
        )}

        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {habits.length===0&&<div style={{textAlign:"center",padding:"40px",color:"#475569"}}>Add your first habit above to start tracking!</div>}
          {habits.map(habit=>(
            <div key={habit.id} style={{display:"grid",gridTemplateColumns:"1fr repeat(7,40px) 60px",gap:4,alignItems:"center",padding:"10px 8px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,minWidth:0}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:habit.color,flexShrink:0}}/>
                <span style={{fontSize:"0.9rem",color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{habit.name}</span>
                <button onClick={()=>del(habit.id)} style={{color:"#334155",fontSize:"0.85rem",marginLeft:"auto",flexShrink:0}} onMouseOver={e=>e.target.style.color="#fca5a5"} onMouseOut={e=>e.target.style.color="#334155"}>×</button>
              </div>
              {week.map(date=>(
                <button key={date} onClick={()=>toggle(habit.id,date)} style={{
                  width:34,height:34,borderRadius:8,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",
                  background:habit.completions[date]?habit.color+"44":"rgba(255,255,255,0.04)",
                  border:`1px solid ${habit.completions[date]?habit.color+"66":"rgba(255,255,255,0.08)"}`,
                  fontSize:"1rem",transition:"all 0.15s",cursor:"pointer"
                }}>
                  {habit.completions[date]?"✓":""}
                </button>
              ))}
              <div style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
                <span style={{fontSize:"1.1rem",fontWeight:800,color:habit.color}}>{habit.streak}</span>
                <span style={{fontSize:"0.6rem",color:"#64748b"}}>🔥 days</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
