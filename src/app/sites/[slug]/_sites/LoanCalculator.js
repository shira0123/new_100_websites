"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [type, setType] = useState("years");

  const months = type === "years" ? tenure * 12 : tenure;
  const monthlyRate = rate / 12 / 100;
  const emi = monthlyRate > 0
    ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    : principal / months;
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  const interestPct = Math.round(totalInterest / totalPayment * 100);

  const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🏦 Loan Calculator</h1>
        <p className={styles.pageSub}>Calculate EMI, total interest and repayment schedule</p>
      </div>
      <div className={styles.container} style={{maxWidth:680}}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Loan Amount: {fmt(principal)}</label>
            <input type="range" min={1000} max={1000000} step={1000} value={principal} onChange={e=>setPrincipal(Number(e.target.value))} className={styles.slider} />
            <input type="number" value={principal} onChange={e=>setPrincipal(Number(e.target.value))} className={styles.input} style={{marginTop:6}} />
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Annual Interest Rate: {rate}%</label>
            <input type="range" min={0.1} max={30} step={0.1} value={rate} onChange={e=>setRate(Number(e.target.value))} className={styles.slider} />
          </div>
          <div className={styles.gradientControls}>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Tenure</label>
              <input type="number" value={tenure} min={1} max={type==="years"?50:600} onChange={e=>setTenure(Number(e.target.value))} className={styles.input} />
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Unit</label>
              <div className={styles.harmonyRow}>
                {["years","months"].map(t=><button key={t} onClick={()=>setType(t)} className={`${styles.harmonyBtn} ${type===t?styles.harmonyActive:""}`} style={{textTransform:"capitalize"}}>{t}</button>)}
              </div>
            </div>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
          {[["Monthly EMI",fmt(emi),"#a5b4fc"],["Total Interest",fmt(totalInterest),"#fb7185"],["Total Payment",fmt(totalPayment),"#4ade80"]].map(([l,v,c])=>(
            <div key={l} style={{padding:"20px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,textAlign:"center"}}>
              <div style={{fontSize:"1.2rem",fontWeight:800,color:c,marginBottom:4}}>{v}</div>
              <div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Pie-like bar */}
        <div style={{marginBottom:8}}>
          <div style={{height:16,borderRadius:99,overflow:"hidden",background:"rgba(255,255,255,0.08)"}}>
            <div style={{height:"100%",width:`${100-interestPct}%`,background:"#4ade80",borderRadius:"99px 0 0 99px",display:"inline-block"}} />
            <div style={{height:"100%",width:`${interestPct}%`,background:"#fb7185",display:"inline-block"}} />
          </div>
          <div style={{display:"flex",gap:20,marginTop:6,fontSize:"0.78rem"}}>
            <span style={{color:"#4ade80"}}>■ Principal {100-interestPct}%</span>
            <span style={{color:"#fb7185"}}>■ Interest {interestPct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
