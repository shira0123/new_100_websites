"use client";
import { useState } from "react";
import styles from "./site.module.css";

const BUTTONS = [
  ["C","±","%","÷"],
  ["7","8","9","×"],
  ["4","5","6","−"],
  ["1","2","3","+"],
  ["0",".","="],
];

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [expr, setExpr] = useState("");
  const [newNum, setNewNum] = useState(true);

  const press = (btn) => {
    if(btn==="C"){ setDisplay("0"); setExpr(""); setNewNum(true); return; }
    if(btn==="="){ 
      try {
        const e = expr+(newNum?display:display);
        const result = Function('"use strict";return ('+e.replace("×","*").replace("÷","/").replace("−","-")+")")();
        setDisplay(String(parseFloat(result.toFixed(10))));
        setExpr("");
        setNewNum(true);
      } catch { setDisplay("Error"); setExpr(""); setNewNum(true); }
      return;
    }
    if(["÷","×","−","+"].includes(btn)){
      setExpr(e=>e+(newNum?display:display)+btn);
      setNewNum(true); return;
    }
    if(btn==="±"){ setDisplay(d=>d.startsWith("-")?d.slice(1):"-"+d); return; }
    if(btn==="%"){ setDisplay(d=>String(parseFloat(d)/100)); return; }
    if(btn==="."){ 
      if(newNum){setDisplay("0.");setNewNum(false);}
      else if(!display.includes("."))setDisplay(d=>d+".");
      return;
    }
    if(newNum){ setDisplay(btn); setNewNum(false); }
    else setDisplay(d=>d==="0"?btn:d+btn);
  };

  const isOp = (b) => ["÷","×","−","+"].includes(b);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🔢 Scientific Calculator</h1>
        <p className={styles.pageSub}>Full-featured calculator with expression preview</p>
      </div>
      <div className={styles.container} style={{maxWidth:340}}>
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,overflow:"hidden"}}>
          {/* Display */}
          <div style={{padding:"20px 20px 10px",textAlign:"right"}}>
            <div style={{fontSize:"0.82rem",color:"#475569",minHeight:20,fontFamily:"monospace"}}>{expr}&nbsp;</div>
            <div style={{fontSize:"3rem",fontWeight:700,color:"#f1f5f9",fontFamily:"monospace",lineHeight:1.1,overflow:"hidden",textOverflow:"ellipsis"}}>{display}</div>
          </div>
          {/* Buttons */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2,padding:8}}>
            {BUTTONS.flat().map((btn,i)=>{
              const wide = btn==="0";
              const isEq = btn==="=";
              const isOper = isOp(btn);
              return (
                <button key={i} onClick={()=>press(btn)} style={{
                  gridColumn:wide?"span 2":"auto",
                  padding:"18px 0",borderRadius:12,fontSize:"1.2rem",fontWeight:600,
                  background:isEq?"linear-gradient(135deg,#6366f1,#8b5cf6)":isOper?"rgba(99,102,241,0.2)":btn==="C"||btn==="±"||btn==="%"?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.07)",
                  border:`1px solid ${isEq?"transparent":isOper?"rgba(99,102,241,0.3)":"rgba(255,255,255,0.08)"}`,
                  color:isOper?"#a5b4fc":"#f1f5f9",
                  cursor:"pointer",transition:"all 0.15s"
                }}
                onMouseOver={e=>e.currentTarget.style.opacity="0.8"}
                onMouseOut={e=>e.currentTarget.style.opacity="1"}
                >{btn}</button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
