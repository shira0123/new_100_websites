"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function PixelRuler() {
  const [w, setW] = useState(800);
  const [h, setH] = useState(600);
  const [unit, setUnit] = useState("px");
  const PPI = 96;

  const convert = (px) => {
    if(unit==="px") return px;
    if(unit==="rem") return parseFloat((px/16).toFixed(4));
    if(unit==="em") return parseFloat((px/16).toFixed(4));
    if(unit==="%") return null;
    if(unit==="in") return parseFloat((px/PPI).toFixed(4));
    if(unit==="cm") return parseFloat((px/PPI*2.54).toFixed(4));
    if(unit==="pt") return parseFloat((px*0.75).toFixed(2));
    return px;
  };

  const diag = parseFloat(Math.sqrt(w*w+h*h).toFixed(1));
  const aspect = (() => {
    const gcd=(a,b)=>b===0?a:gcd(b,a%b);
    const g=gcd(w,h);
    return `${w/g}:${h/g}`;
  })();

  const UNITS = ["px","rem","em","in","cm","pt"];
  const PRESETS = [
    {label:"HD",w:1280,h:720},{label:"FHD",w:1920,h:1080},{label:"4K",w:3840,h:2160},
    {label:"iPhone 14",w:390,h:844},{label:"iPad",w:768,h:1024},{label:"MacBook 13\"",w:2560,h:1600},
  ];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>📏 Pixel Ruler</h1>
        <p className={styles.pageSub}>Convert screen measurements and explore common resolutions</p>
      </div>
      <div className={styles.container} style={{maxWidth:680}}>
        <div className={styles.controls}>
          <div className={styles.gradientControls}>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Width (px)</label>
              <input type="number" value={w} onChange={e=>setW(Number(e.target.value))} className={styles.input} min={1} />
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Height (px)</label>
              <input type="number" value={h} onChange={e=>setH(Number(e.target.value))} className={styles.input} min={1} />
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Presets</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {PRESETS.map(p=>(
                <button key={p.label} onClick={()=>{setW(p.w);setH(p.h);}} style={{padding:"6px 14px",borderRadius:99,fontSize:"0.8rem",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"#94a3b8"}}>{p.label} <span style={{color:"#475569"}}>{p.w}×{p.h}</span></button>
              ))}
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Convert to unit</label>
            <div className={styles.harmonyRow}>
              {UNITS.map(u=><button key={u} onClick={()=>setUnit(u)} className={`${styles.harmonyBtn} ${unit===u?styles.harmonyActive:""}`}>{u}</button>)}
            </div>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12}}>
          {[
            ["Width",`${w}px`,convert(w)],
            ["Height",`${h}px`,convert(h)],
            ["Diagonal",`${diag}px`,convert(diag)],
            ["Total Pixels",(w*h).toLocaleString(),"—"],
            ["Aspect Ratio",aspect,aspect],
            ["PPI Estimate",`${PPI}`,PPI],
          ].map(([l,raw,conv])=>(
            <div key={l} style={{padding:"16px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14}}>
              <div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>{l}</div>
              <div style={{fontSize:"1.1rem",fontWeight:700,color:"#a5b4fc"}}>{conv !== null && unit!=="px" && typeof conv==="number"?`${conv} ${unit}`:raw}</div>
              {unit!=="px"&&typeof conv==="number"&&<div style={{fontSize:"0.75rem",color:"#475569",marginTop:2}}>{raw}</div>}
            </div>
          ))}
        </div>

        {/* Visual aspect ratio */}
        <div style={{marginTop:20,padding:"20px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14}}>
          <div style={{fontSize:"0.72rem",color:"#64748b",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.06em"}}>Visual Proportion</div>
          <div style={{height:6,background:"rgba(255,255,255,0.08)",borderRadius:99}}>
            <div style={{height:"100%",background:"linear-gradient(90deg,#6366f1,#8b5cf6)",width:`${Math.min(w/Math.max(w,h)*100,100)}%`,borderRadius:99}} />
          </div>
        </div>
      </div>
    </div>
  );
}
