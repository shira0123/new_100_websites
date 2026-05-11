"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function BoxShadowGenerator() {
  const [hOff, setHOff] = useState(4);
  const [vOff, setVOff] = useState(4);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#6366f1");
  const [opacity, setOpacity] = useState(50);
  const [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);

  const hex = color;
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  const rgba = `rgba(${r},${g},${b},${(opacity/100).toFixed(2)})`;
  const shadow = `${inset?"inset ":""}${hOff}px ${vOff}px ${blur}px ${spread}px ${rgba}`;
  const css = `box-shadow: ${shadow};`;

  const copy = () => { navigator.clipboard.writeText(css); setCopied(true); setTimeout(()=>setCopied(false),1500); };

  const sliders = [
    ["Horizontal Offset", hOff, setHOff, -50, 50, "px"],
    ["Vertical Offset", vOff, setVOff, -50, 50, "px"],
    ["Blur Radius", blur, setBlur, 0, 100, "px"],
    ["Spread Radius", spread, setSpread, -50, 50, "px"],
    ["Opacity", opacity, setOpacity, 0, 100, "%"],
  ];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🪟 Box Shadow Generator</h1>
        <p className={styles.pageSub}>Visually create CSS box shadows with live preview</p>
      </div>
      <div className={styles.container} style={{maxWidth:900}}>
        <div className={styles.splitGrid}>
          <div className={styles.controls}>
            {sliders.map(([label,val,setter,min,max,unit])=>(
              <div key={label} className={styles.controlGroup}>
                <label className={styles.label}>{label}: {val}{unit}</label>
                <input type="range" min={min} max={max} value={val} onChange={e=>setter(Number(e.target.value))} className={styles.slider} />
              </div>
            ))}
            <div className={styles.controlGroup}>
              <label className={styles.label}>Shadow Color</label>
              <div className={styles.colorInputRow}>
                <input type="color" value={color} onChange={e=>setColor(e.target.value)} className={styles.colorPicker} />
                <code style={{color:"#94a3b8",fontFamily:"monospace"}}>{rgba}</code>
              </div>
            </div>
            <label className={styles.checkRow} style={{cursor:"pointer"}}>
              <input type="checkbox" checked={inset} onChange={e=>setInset(e.target.checked)} className={styles.checkbox} />
              <span style={{color:"#cbd5e1"}}>Inset Shadow</span>
            </label>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            <div style={{
              flex:1,display:"flex",alignItems:"center",justifyContent:"center",
              background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:16,minHeight:220
            }}>
              <div style={{
                width:160,height:100,background:"rgba(255,255,255,0.08)",
                borderRadius:12,boxShadow:shadow,transition:"box-shadow 0.2s"
              }} />
            </div>
            <div className={styles.codeBox}>
              <pre>{css}</pre>
            </div>
            <button onClick={copy} className={styles.btn}>{copied?"✓ Copied!":"📋 Copy CSS"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
