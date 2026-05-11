"use client";
import { useState } from "react";
import styles from "./site.module.css";

const UNITS = {
  Length: { m:1, km:0.001, cm:100, mm:1000, in:39.3701, ft:3.28084, yd:1.09361, mi:0.000621371 },
  Mass:   { kg:1, g:1000, mg:1e6, lb:2.20462, oz:35.274, t:0.001 },
  Temperature: null,
  Speed:  { "m/s":1, "km/h":3.6, mph:2.23694, knot:1.94384 },
  Area:   { "m²":1, "km²":1e-6, "cm²":1e4, "ft²":10.7639, acre:0.000247105 },
  Volume: { L:1, mL:1000, "m³":0.001, "ft³":0.0353147, gal:0.264172 },
};

function convertTemp(val, from, to) {
  let c;
  if(from==="°C") c=val;
  else if(from==="°F") c=(val-32)*5/9;
  else c=val-273.15;
  if(to==="°C") return c;
  if(to==="°F") return c*9/5+32;
  return c+273.15;
}

export default function UnitConverter() {
  const [category, setCategory] = useState("Length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("km");
  const [value, setValue] = useState("1");

  const cats = Object.keys(UNITS);
  const isTemp = category === "Temperature";
  const tempUnits = ["°C","°F","K"];
  const unitKeys = isTemp ? tempUnits : Object.keys(UNITS[category]);

  let result = "";
  if(value !== "" && !isNaN(Number(value))) {
    const v = Number(value);
    if(isTemp) {
      result = convertTemp(v, from, to).toFixed(4);
    } else {
      const base = v / UNITS[category][from];
      result = (base * UNITS[category][to]).toFixed(6);
    }
  }

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const newUnits = cat === "Temperature" ? ["°C","°F","K"] : Object.keys(UNITS[cat]);
    setFrom(newUnits[0]);
    setTo(newUnits[1]);
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>⚖️ Unit Converter</h1>
        <p className={styles.pageSub}>Convert between any units seamlessly</p>
      </div>
      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Category</label>
            <div className={styles.harmonyRow}>
              {cats.map(c=>(
                <button key={c} onClick={()=>handleCategoryChange(c)} className={`${styles.harmonyBtn} ${category===c?styles.harmonyActive:""}`}>{c}</button>
              ))}
            </div>
          </div>

          <div className={styles.gradientControls}>
            <div className={styles.controlGroup}>
              <label className={styles.label}>From</label>
              <select value={from} onChange={e=>setFrom(e.target.value)} className={styles.select}>
                {unitKeys.map(u=><option key={u}>{u}</option>)}
              </select>
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>To</label>
              <select value={to} onChange={e=>setTo(e.target.value)} className={styles.select}>
                {unitKeys.map(u=><option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Value</label>
            <input type="number" value={value} onChange={e=>setValue(e.target.value)} className={styles.input} placeholder="Enter value..." />
          </div>
        </div>

        {result !== "" && (
          <div className={styles.resultCard}>
            <div className={styles.resultBig}>{parseFloat(result).toLocaleString()}</div>
            <div className={styles.resultLabel}>{value} {from} = {parseFloat(result)} {to}</div>
          </div>
        )}
      </div>
    </div>
  );
}
