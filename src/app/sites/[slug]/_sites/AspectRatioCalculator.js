"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function AspectRatioCalculator() {
  const [mode, setMode] = useState("find");
  const [w1, setW1] = useState(1920);
  const [h1, setH1] = useState(1080);
  const [newW, setNewW] = useState(1280);
  const [newH, setNewH] = useState("");

  const gcd=(a,b)=>b===0?a:gcd(b,a%b);
  const g=gcd(w1,h1);
  const ratio=`${w1/g}:${h1/g}`;
  const decimalRatio=(w1/h1).toFixed(4);

  const scaledH = newW ? Math.round(h1/w1*newW) : "";
  const scaledW = newH ? Math.round(w1/h1*newH) : "";

  const COMMON = [
    {label:"16:9",w:16,h:9},{label:"4:3",w:4,h:3},{label:"21:9",w:21,h:9},
    {label:"1:1",w:1,h:1},{label:"3:2",w:3,h:2},{label:"4:5",w:4,h:5},
  ];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>⬜ Aspect Ratio Calculator</h1>
        <p className={styles.pageSub}>Calculate and maintain image aspect ratios</p>
      </div>
      <div className={styles.container} style={{maxWidth:680}}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Original Dimensions</label>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input type="number" value={w1} onChange={e=>setW1(Number(e.target.value))} className={styles.input} placeholder="Width" />
              <span style={{color:"#64748b",fontWeight:700}}>×</span>
              <input type="number" value={h1} onChange={e=>setH1(Number(e.target.value))} className={styles.input} placeholder="Height" />
            </div>
          </div>
        </div>

        {/* Ratio result */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
          <div style={{padding:"20px",background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.25)",borderRadius:14,textAlign:"center"}}>
            <div style={{fontSize:"2.5rem",fontWeight:900,color:"#a5b4fc"}}>{ratio}</div>
            <div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em",marginTop:4}}>Aspect Ratio</div>
          </div>
          <div style={{padding:"20px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,textAlign:"center"}}>
            <div style={{fontSize:"2.5rem",fontWeight:900,color:"#4ade80"}}>{decimalRatio}</div>
            <div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em",marginTop:4}}>Decimal Ratio</div>
          </div>
        </div>

        {/* Scale */}
        <div className={styles.controls} style={{marginBottom:16}}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Scale by Width</label>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input type="number" value={newW} onChange={e=>setNewW(Number(e.target.value))} className={styles.input} placeholder="New width" />
              <span style={{color:"#64748b"}}>→</span>
              <div style={{padding:"12px 16px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,color:"#a5b4fc",fontWeight:600,minWidth:80,textAlign:"center"}}>{scaledH}px</div>
            </div>
          </div>
        </div>

        {/* Common ratios */}
        <div className={styles.controlGroup}>
          <label className={styles.label}>Common Ratios (click to apply)</label>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {COMMON.map(c=>{
              const cW=w1,cH=Math.round(w1*c.h/c.w);
              return <button key={c.label} onClick={()=>{setH1(cH);}} style={{padding:"8px 16px",borderRadius:99,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"#94a3b8",fontSize:"0.85rem"}}>{c.label} <span style={{color:"#475569"}}>{cW}×{cH}</span></button>;
            })}
          </div>
        </div>

        {/* Visual preview */}
        <div style={{marginTop:20,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:20,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{
            width:Math.min(w1/Math.max(w1,h1)*300,300),
            height:Math.min(h1/Math.max(w1,h1)*200,200),
            background:"rgba(99,102,241,0.15)",
            border:"2px solid rgba(99,102,241,0.3)",
            borderRadius:4,
            display:"flex",alignItems:"center",justifyContent:"center",
            color:"#64748b",fontSize:"0.8rem"
          }}>
            {w1}×{h1}
          </div>
        </div>
      </div>
    </div>
  );
}
