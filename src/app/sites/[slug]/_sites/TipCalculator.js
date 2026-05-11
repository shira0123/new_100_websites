"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState(18);
  const [people, setPeople] = useState(1);
  const PRESETS = [10, 15, 18, 20, 25];

  const billNum = Number(bill) || 0;
  const tipAmt = billNum * tipPct / 100;
  const total = billNum + tipAmt;
  const perPerson = people > 0 ? total / people : total;
  const tipPerPerson = people > 0 ? tipAmt / people : tipAmt;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>💰 Tip Calculator</h1>
        <p className={styles.pageSub}>Split bills and calculate tips effortlessly</p>
      </div>
      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Bill Amount ($)</label>
            <input type="number" value={bill} onChange={e=>setBill(e.target.value)} className={styles.input} placeholder="0.00" min="0" step="0.01" />
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Tip Percentage: {tipPct}%</label>
            <div className={styles.harmonyRow}>
              {PRESETS.map(p=>(
                <button key={p} onClick={()=>setTipPct(p)} className={`${styles.harmonyBtn} ${tipPct===p?styles.harmonyActive:""}`}>{p}%</button>
              ))}
            </div>
            <input type="range" min="0" max="50" value={tipPct} onChange={e=>setTipPct(Number(e.target.value))} className={styles.slider} style={{marginTop:8}} />
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Number of People</label>
            <input type="number" value={people} onChange={e=>setPeople(Math.max(1,Number(e.target.value)))} className={styles.input} min="1" />
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:8}}>
          {[
            ["Tip Amount", `$${tipAmt.toFixed(2)}`],
            ["Total Bill", `$${total.toFixed(2)}`],
            ["Tip/Person", `$${tipPerPerson.toFixed(2)}`],
            ["Total/Person", `$${perPerson.toFixed(2)}`],
          ].map(([label, value])=>(
            <div key={label} style={{padding:"20px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,textAlign:"center"}}>
              <div style={{fontSize:"1.8rem",fontWeight:800,color:"#a5b4fc"}}>{value}</div>
              <div style={{fontSize:"0.78rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.08em",marginTop:4}}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
