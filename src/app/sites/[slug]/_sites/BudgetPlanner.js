"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function BudgetPlanner() {
  const [income, setIncome] = useState(5000);
  const [items, setItems] = useState([
    {id:1,name:"Rent",amount:1500,type:"expense"},
    {id:2,name:"Food",amount:400,type:"expense"},
    {id:3,name:"Transport",amount:200,type:"expense"},
    {id:4,name:"Utilities",amount:150,type:"expense"},
    {id:5,name:"Freelance",amount:800,type:"income"},
  ]);
  const [form, setForm] = useState({name:"",amount:"",type:"expense"});

  const totalIncome = income + items.filter(i=>i.type==="income").reduce((s,i)=>s+i.amount,0);
  const totalExpenses = items.filter(i=>i.type==="expense").reduce((s,i)=>s+i.amount,0);
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.round(balance/totalIncome*100) : 0;

  const add = ()=>{
    if(!form.name||!form.amount)return;
    setItems(it=>[...it,{...form,amount:parseFloat(form.amount),id:Date.now()}]);
    setForm(f=>({...f,name:"",amount:""}));
  };
  const del=(id)=>setItems(it=>it.filter(i=>i.id!==id));

  const fmt=(n)=>`$${Math.abs(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>📊 Budget Planner</h1>
        <p className={styles.pageSub}>Plan your monthly budget with income and expenses</p>
      </div>
      <div className={styles.container} style={{maxWidth:720}}>
        {/* Summary */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:24}}>
          {[["Income",fmt(totalIncome),"#4ade80"],["Expenses",fmt(totalExpenses),"#fb7185"],["Balance",`${balance<0?"-":""}${fmt(balance)}`,balance>=0?"#a5b4fc":"#fca5a5"],["Savings",`${savingsRate}%`,savingsRate>=20?"#4ade80":savingsRate>=10?"#fbbf24":"#fb7185"]].map(([l,v,c])=>(
            <div key={l} style={{padding:"16px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,textAlign:"center"}}>
              <div style={{fontSize:"1.1rem",fontWeight:800,color:c}}>{v}</div>
              <div style={{fontSize:"0.7rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em",marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{marginBottom:20}}>
          <label className={styles.label}>Monthly Salary / Base Income</label>
          <input type="number" value={income} onChange={e=>setIncome(Number(e.target.value))} className={styles.input} />
        </div>

        {/* Add item */}
        <div style={{display:"grid",gridTemplateColumns:"1fr auto auto auto",gap:8,marginBottom:20,alignItems:"end"}}>
          <div><label className={styles.label}>Name</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} className={styles.input} placeholder="e.g. Groceries" /></div>
          <div><label className={styles.label}>Amount</label><input type="number" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} className={styles.input} style={{width:100}} /></div>
          <div><label className={styles.label}>Type</label>
            <div className={styles.harmonyRow}>
              {["expense","income"].map(t=><button key={t} onClick={()=>setForm(f=>({...f,type:t}))} className={`${styles.harmonyBtn} ${form.type===t?styles.harmonyActive:""}`} style={{textTransform:"capitalize"}}>{t}</button>)}
            </div>
          </div>
          <button onClick={add} className={styles.btn} style={{alignSelf:"flex-end"}}>+ Add</button>
        </div>

        {/* List */}
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {items.map(item=>(
            <div key={item.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12}}>
              <span style={{fontSize:"1rem"}}>{item.type==="income"?"📈":"📉"}</span>
              <span style={{flex:1,color:"#e2e8f0",fontSize:"0.92rem"}}>{item.name}</span>
              <span style={{fontWeight:700,color:item.type==="income"?"#4ade80":"#fb7185"}}>{item.type==="income"?"+":"-"}{fmt(item.amount)}</span>
              <button onClick={()=>del(item.id)} style={{color:"#334155",fontSize:"1rem"}} onMouseOver={ev=>ev.target.style.color="#fca5a5"} onMouseOut={ev=>ev.target.style.color="#334155"}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
