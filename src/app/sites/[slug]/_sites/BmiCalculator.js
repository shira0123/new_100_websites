"use client";
import { useState } from "react";
import styles from "./site.module.css";

function getBmiCategory(bmi) {
  if (bmi < 18.5) return { label: "Underweight", color: "#0ea5e9", pct: 10 };
  if (bmi < 25)   return { label: "Normal weight", color: "#22c55e", pct: 40 };
  if (bmi < 30)   return { label: "Overweight", color: "#f59e0b", pct: 70 };
  return { label: "Obese", color: "#ef4444", pct: 92 };
}

export default function BmiCalculator() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  let bmi = null;
  if (unit === "metric" && weight && height) {
    const hm = Number(height) / 100;
    bmi = Number(weight) / (hm * hm);
  } else if (unit === "imperial" && weight && (feet || inches)) {
    const totalInches = Number(feet) * 12 + Number(inches || 0);
    bmi = (703 * Number(weight)) / (totalInches * totalInches);
  }

  const cat = bmi ? getBmiCategory(bmi) : null;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>💪 BMI Calculator</h1>
        <p className={styles.pageSub}>Calculate your Body Mass Index easily</p>
      </div>
      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Unit System</label>
            <div className={styles.harmonyRow}>
              {["metric","imperial"].map(u=>(
                <button key={u} onClick={()=>setUnit(u)} className={`${styles.harmonyBtn} ${unit===u?styles.harmonyActive:""}`} style={{textTransform:"capitalize"}}>{u}</button>
              ))}
            </div>
          </div>

          {unit === "metric" ? (
            <div className={styles.gradientControls}>
              <div className={styles.controlGroup}>
                <label className={styles.label}>Weight (kg)</label>
                <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} className={styles.input} placeholder="e.g. 70" min="1" />
              </div>
              <div className={styles.controlGroup}>
                <label className={styles.label}>Height (cm)</label>
                <input type="number" value={height} onChange={e=>setHeight(e.target.value)} className={styles.input} placeholder="e.g. 175" min="1" />
              </div>
            </div>
          ) : (
            <div className={styles.gradientControls}>
              <div className={styles.controlGroup}>
                <label className={styles.label}>Weight (lbs)</label>
                <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} className={styles.input} placeholder="e.g. 155" />
              </div>
              <div className={styles.controlGroup}>
                <label className={styles.label}>Height</label>
                <div style={{display:"flex",gap:8}}>
                  <input type="number" value={feet} onChange={e=>setFeet(e.target.value)} className={styles.input} placeholder="ft" />
                  <input type="number" value={inches} onChange={e=>setInches(e.target.value)} className={styles.input} placeholder="in" />
                </div>
              </div>
            </div>
          )}
        </div>

        {bmi && cat && (
          <div className={styles.resultCard}>
            <div className={styles.resultBig} style={{color:cat.color}}>{bmi.toFixed(1)}</div>
            <div className={styles.resultLabel} style={{color:cat.color,fontSize:"1rem",fontWeight:700,marginBottom:8}}>{cat.label}</div>
            <div className={styles.bmiMeter}>
              <div className={styles.bmiNeedle} style={{left:`${Math.min(cat.pct,98)}%`}} />
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.7rem",color:"#475569",marginTop:4}}>
              <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
