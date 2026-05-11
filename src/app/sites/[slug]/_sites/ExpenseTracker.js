"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([
    {id:1,desc:"Netflix",amount:15.99,cat:"Entertainment",date:"2026-04-20"},
    {id:2,desc:"Groceries",amount:87.50,cat:"Food",date:"2026-04-21"},
    {id:3,desc:"Gym",amount:39,cat:"Health",date:"2026-04-22"},
  ]);
  const [form, setForm] = useState({desc:"",amount:"",cat:"Food",date:new Date().toISOString().split("T")[0]});
  const CATS = ["Food","Transport","Entertainment","Health","Shopping","Utilities","Education","Other"];
  const CAT_COLORS = {Food:"#22c55e",Transport:"#0ea5e9",Entertainment:"#8b5cf6",Health:"#ec4899",Shopping:"#f59e0b",Utilities:"#6366f1",Education:"#14b8a6",Other:"#64748b"};

  const add = () => {
    if(!form.desc||!form.amount)return;
    setExpenses(e=>[...e,{...form,amount:parseFloat(form.amount),id:Date.now()}]);
    setForm(f=>({...f,desc:"",amount:""}));
  };
  const del = (id)=>setExpenses(e=>e.filter(x=>x.id!==id));

  const total = expenses.reduce((s,e)=>s+e.amount,0);
  const byCat = CATS.map(c=>({cat:c,total:expenses.filter(e=>e.cat===c).reduce((s,e)=>s+e.amount,0)})).filter(c=>c.total>0);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>💸 Expense Tracker</h1>
        <p className={styles.pageSub}>Log and visualize your daily expenses</p>
      </div>
      <div className={styles.container} style={{maxWidth:800}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto",gap:8,marginBottom:20,alignItems:"end"}}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Description</label>
            <input value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} className={styles.input} placeholder="e.g. Coffee" onKeyDown={e=>e.key==="Enter"&&add()} />
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Amount ($)</label>
            <input type="number" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} className={styles.input} placeholder="0.00" min="0" step="0.01" />
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Category</label>
            <select value={form.cat} onChange={e=>setForm(f=>({...f,cat:e.target.value}))} className={styles.select}>
              {CATS.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={add} className={styles.btn} style={{alignSelf:"flex-end"}}>+ Add</button>
        </div>

        {/* Total + breakdown */}
        <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:16,marginBottom:20}}>
          <div style={{padding:"20px 24px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,textAlign:"center"}}>
            <div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>Total</div>
            <div style={{fontSize:"2rem",fontWeight:800,color:"#a5b4fc"}}>${total.toFixed(2)}</div>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,alignContent:"center"}}>
            {byCat.map(b=>(
              <div key={b.cat} style={{padding:"6px 12px",background:`${CAT_COLORS[b.cat]}22`,border:`1px solid ${CAT_COLORS[b.cat]}44`,borderRadius:99,fontSize:"0.8rem",display:"flex",gap:6}}>
                <span style={{color:CAT_COLORS[b.cat],fontWeight:600}}>{b.cat}</span>
                <span style={{color:"#94a3b8"}}>${b.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* List */}
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {expenses.sort((a,b)=>new Date(b.date)-new Date(a.date)).map(e=>(
            <div key={e.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12}}>
              <div style={{width:36,height:36,borderRadius:10,background:`${CAT_COLORS[e.cat]}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.7rem",fontWeight:700,color:CAT_COLORS[e.cat],flexShrink:0}}>{e.cat.slice(0,3)}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:"0.92rem",color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.desc}</div>
                <div style={{fontSize:"0.72rem",color:"#64748b"}}>{e.date}</div>
              </div>
              <span style={{fontWeight:700,color:"#fca5a5",flexShrink:0}}>-${e.amount.toFixed(2)}</span>
              <button onClick={()=>del(e.id)} style={{color:"#334155",fontSize:"1rem",flexShrink:0}} onMouseOver={ev=>ev.target.style.color="#fca5a5"} onMouseOut={ev=>ev.target.style.color="#334155"}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
