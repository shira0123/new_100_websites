"use client";
import { useState } from "react";
import styles from "./site.module.css";

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return {r,g,b};
}
function rgbToHex(r,g,b) {
  return "#" + [r,g,b].map(v=>Math.max(0,Math.min(255,v)).toString(16).padStart(2,"0")).join("");
}

export default function HexRgbConverter() {
  const [hex, setHex] = useState("#6366f1");
  const [r, setR] = useState(99);
  const [g, setG] = useState(102);
  const [b, setB] = useState(241);
  const [copied, setCopied] = useState(null);

  const fromHex = (val) => {
    setHex(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      const rgb = hexToRgb(val);
      setR(rgb.r); setG(rgb.g); setB(rgb.b);
    }
  };
  const fromRgb = (rr,gg,bb) => {
    setR(rr); setG(gg); setB(bb);
    setHex(rgbToHex(rr,gg,bb));
  };

  const copy = (text) => { navigator.clipboard.writeText(text); setCopied(text); setTimeout(()=>setCopied(null),1500); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🎨 HEX ↔ RGB Converter</h1>
        <p className={styles.pageSub}>Convert between HEX and RGB color codes instantly</p>
      </div>
      <div className={styles.container} style={{maxWidth:600}}>
        <div style={{width:"100%",height:160,borderRadius:16,background:hex,marginBottom:28,border:"1px solid rgba(255,255,255,0.1)",transition:"background 0.3s"}} />

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>HEX Color</label>
            <div className={styles.colorInputRow}>
              <input type="color" value={hex} onChange={e=>fromHex(e.target.value)} className={styles.colorPicker} />
              <input type="text" value={hex} onChange={e=>fromHex(e.target.value)} className={styles.hexInput} maxLength={7} style={{flex:1}} />
              <button onClick={()=>copy(hex)} className={styles.copyBtn}>{copied===hex?"✓":"Copy"}</button>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>RGB Color</label>
            {[["R",r,setR,0],["G",g,setG,1],["B",b,setB,2]].map(([label,val,setter])=>(
              <div key={label} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                <span style={{width:20,fontWeight:700,color:"#a5b4fc"}}>{label}</span>
                <input type="range" min={0} max={255} value={val} onChange={e=>fromRgb(label==="R"?Number(e.target.value):r, label==="G"?Number(e.target.value):g, label==="B"?Number(e.target.value):b)} className={styles.slider} style={{flex:1}} />
                <input type="number" min={0} max={255} value={val} onChange={e=>fromRgb(label==="R"?Number(e.target.value):r, label==="G"?Number(e.target.value):g, label==="B"?Number(e.target.value):b)} style={{width:60,padding:"6px 8px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#f1f5f9",textAlign:"center",fontFamily:"monospace"}} />
              </div>
            ))}
            <button onClick={()=>copy(`rgb(${r}, ${g}, ${b})`)} className={styles.copyBtn} style={{marginTop:6}}>
              {copied===`rgb(${r}, ${g}, ${b})`?"✓ Copied!":"📋 Copy rgb()"}
            </button>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:8}}>
          {[
            ["HEX", hex],
            ["RGB", `rgb(${r}, ${g}, ${b})`],
            ["RGBA", `rgba(${r}, ${g}, ${b}, 1)`],
            ["CSS var", `--color: ${hex};`],
          ].map(([label,val])=>(
            <div key={label} onClick={()=>copy(val)} style={{
              padding:"14px 16px",background:"rgba(255,255,255,0.04)",
              border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,cursor:"pointer",
              transition:"border-color 0.2s"
            }}>
              <div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>{label}</div>
              <code style={{fontSize:"0.85rem",color:"#a5b4fc"}}>{val}</code>
              {copied===val && <span style={{fontSize:"0.72rem",color:"#86efac",marginLeft:8}}>✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
