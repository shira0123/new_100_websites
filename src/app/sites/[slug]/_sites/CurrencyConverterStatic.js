"use client";
import { useState } from "react";
import styles from "./site.module.css";

// Static rates relative to USD (approximate)
const RATES = {
  USD:1, EUR:0.92, GBP:0.79, JPY:149.5, CAD:1.36, AUD:1.53, CHF:0.9, CNY:7.24,
  INR:83.4, MXN:17.1, BRL:4.97, KRW:1325, SGD:1.34, HKD:7.82, SEK:10.5,
  NOK:10.6, NZD:1.63, ZAR:18.8, AED:3.67, SAR:3.75
};

const FLAGS = {
  USD:"🇺🇸",EUR:"🇪🇺",GBP:"🇬🇧",JPY:"🇯🇵",CAD:"🇨🇦",AUD:"🇦🇺",CHF:"🇨🇭",CNY:"🇨🇳",
  INR:"🇮🇳",MXN:"🇲🇽",BRL:"🇧🇷",KRW:"🇰🇷",SGD:"🇸🇬",HKD:"🇭🇰",SEK:"🇸🇪",
  NOK:"🇳🇴",NZD:"🇳🇿",ZAR:"🇿🇦",AED:"🇦🇪",SAR:"🇸🇦"
};

export default function CurrencyConverterStatic() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const currencies = Object.keys(RATES);
  const base = Number(amount) / RATES[from];
  const result = base * RATES[to];

  const swap = () => { const tmp=from; setFrom(to); setTo(tmp); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>💱 Currency Converter</h1>
        <p className={styles.pageSub}>Convert between 20 major world currencies</p>
      </div>
      <div className={styles.container} style={{maxWidth:560}}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Amount</label>
            <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className={styles.input} style={{fontSize:"1.3rem"}} min="0" />
          </div>

          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div className={styles.controlGroup} style={{flex:1}}>
              <label className={styles.label}>From</label>
              <select value={from} onChange={e=>setFrom(e.target.value)} className={styles.select}>
                {currencies.map(c=><option key={c} value={c}>{FLAGS[c]} {c}</option>)}
              </select>
            </div>
            <button onClick={swap} style={{marginTop:22,padding:"12px 14px",borderRadius:12,background:"rgba(99,102,241,0.15)",border:"1px solid rgba(99,102,241,0.3)",color:"#a5b4fc",fontSize:"1.1rem"}}>⇄</button>
            <div className={styles.controlGroup} style={{flex:1}}>
              <label className={styles.label}>To</label>
              <select value={to} onChange={e=>setTo(e.target.value)} className={styles.select}>
                {currencies.map(c=><option key={c} value={c}>{FLAGS[c]} {c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{textAlign:"center",padding:"32px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20}}>
          <div style={{fontSize:"0.85rem",color:"#64748b",marginBottom:8}}>{amount} {FLAGS[from]} {from} =</div>
          <div style={{fontSize:"3rem",fontWeight:900,color:"#a5b4fc"}}>{result.toLocaleString("en-US",{maximumFractionDigits:4})}</div>
          <div style={{fontSize:"1.1rem",fontWeight:600,color:"#e2e8f0",marginTop:4}}>{FLAGS[to]} {to}</div>
          <div style={{fontSize:"0.78rem",color:"#475569",marginTop:12}}>
            1 {from} = {(RATES[to]/RATES[from]).toFixed(6)} {to} · Static rates (not live)
          </div>
        </div>

        {/* Quick compare */}
        <div style={{marginTop:20}}>
          <div className={styles.label} style={{marginBottom:10}}>Compare {from} against all</div>
          <div style={{display:"flex",flexDirection:"column",gap:4,maxHeight:200,overflowY:"auto"}}>
            {currencies.filter(c=>c!==from).map(c=>{
              const val=(Number(amount)/RATES[from])*RATES[c];
              return (
                <div key={c} onClick={()=>setTo(c)} style={{display:"flex",justifyContent:"space-between",padding:"8px 14px",background:"rgba(255,255,255,0.03)",border:`1px solid ${to===c?"rgba(99,102,241,0.4)":"rgba(255,255,255,0.06)"}`,borderRadius:9,cursor:"pointer"}}>
                  <span>{FLAGS[c]} {c}</span>
                  <code style={{color:"#a5b4fc"}}>{val.toLocaleString("en-US",{maximumFractionDigits:2})}</code>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
