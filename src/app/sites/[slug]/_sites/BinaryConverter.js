"use client";
import { useState } from "react";
import styles from "./site.module.css";

const BASES = [
  { label: "Decimal", base: 10, prefix: "" },
  { label: "Binary", base: 2, prefix: "0b" },
  { label: "Octal", base: 8, prefix: "0o" },
  { label: "Hexadecimal", base: 16, prefix: "0x" },
];

export default function BinaryConverter() {
  const [inputs, setInputs] = useState({ "10": "255", "2": "", "8": "", "16": "" });
  const [activeBase, setActiveBase] = useState("10");
  const [copied, setCopied] = useState(null);

  const handleChange = (base, value) => {
    const cleaned = value.replace(/\s/g,"");
    const num = parseInt(cleaned, parseInt(base));
    if (cleaned === "" || isNaN(num)) {
      setInputs({ "10":"","2":"","8":"","16":"" });
      setInputs(prev=>({...prev,[base]:cleaned}));
      return;
    }
    setInputs({
      "10": num.toString(10),
      "2":  num.toString(2),
      "8":  num.toString(8),
      "16": num.toString(16).toUpperCase(),
    });
    setActiveBase(base);
  };

  const copy = (text) => { navigator.clipboard.writeText(text); setCopied(text); setTimeout(()=>setCopied(null),1500); };

  const decimal = parseInt(inputs["10"],10);
  const bits = !isNaN(decimal) ? inputs["2"].length : 0;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>01 Binary Converter</h1>
        <p className={styles.pageSub}>Convert between decimal, binary, octal and hexadecimal</p>
      </div>
      <div className={styles.container} style={{maxWidth:640}}>
        <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
          {BASES.map(({label,base})=>{
            const b = String(base);
            const val = inputs[b];
            return (
              <div key={b} style={{
                display:"flex",alignItems:"center",gap:12,padding:"16px 18px",
                background:"rgba(255,255,255,0.04)",border:`1px solid ${activeBase===b?"rgba(99,102,241,0.4)":"rgba(255,255,255,0.08)"}`,
                borderRadius:14,transition:"border-color 0.2s"
              }}>
                <div style={{width:110,flexShrink:0}}>
                  <div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</div>
                  <div style={{fontSize:"0.8rem",color:"#475569",fontFamily:"monospace"}}>Base {base}</div>
                </div>
                <input
                  value={val}
                  onChange={e=>handleChange(b,e.target.value)}
                  onFocus={()=>setActiveBase(b)}
                  className={styles.input}
                  style={{fontFamily:"monospace",fontSize:"1.1rem",flex:1}}
                  placeholder={`Enter ${label.toLowerCase()}…`}
                />
                {val && <button onClick={()=>copy(val)} className={styles.copyBtn}>{copied===val?"✓":"Copy"}</button>}
              </div>
            );
          })}
        </div>

        {!isNaN(decimal) && inputs["10"] && (
          <>
            <div style={{padding:"16px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,marginBottom:12}}>
              <div style={{fontSize:"0.72rem",color:"#64748b",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>Binary Visualization ({bits} bits)</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {inputs["2"].split("").map((bit,i)=>(
                  <div key={i} style={{
                    width:32,height:32,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",
                    background:bit==="1"?"rgba(99,102,241,0.3)":"rgba(255,255,255,0.04)",
                    border:`1px solid ${bit==="1"?"rgba(99,102,241,0.5)":"rgba(255,255,255,0.08)"}`,
                    fontFamily:"monospace",fontWeight:700,color:bit==="1"?"#a5b4fc":"#475569"
                  }}>{bit}</div>
                ))}
              </div>
            </div>
            <div style={{fontSize:"0.82rem",color:"#475569",textAlign:"center"}}>
              Value: {decimal.toLocaleString()} · {bits} bits · {Math.ceil(bits/8)} byte{Math.ceil(bits/8)!==1?"s":""}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
