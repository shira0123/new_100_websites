"use client";
import { useState } from "react";
import styles from "./site.module.css";

const TYPES = ["linear-gradient", "radial-gradient"];

export default function CssGradientMaker() {
  const [color1, setColor1] = useState("#6366f1");
  const [color2, setColor2] = useState("#ec4899");
  const [type, setType] = useState("linear-gradient");
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const css = type === "linear-gradient"
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const fullCss = `background: ${css};`;

  const copy = () => {
    navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🌈 CSS Gradient Maker</h1>
        <p className={styles.pageSub}>Craft stunning CSS gradients with live preview</p>
      </div>
      <div className={styles.container}>
        <div className={styles.gradientPreview} style={{ background: css }} />

        <div className={styles.controls}>
          <div className={styles.gradientControls}>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Color 1</label>
              <div className={styles.colorInputRow}>
                <input type="color" value={color1} onChange={e=>setColor1(e.target.value)} className={styles.colorPicker} />
                <input type="text" value={color1} onChange={e=>setColor1(e.target.value)} className={styles.hexInput} />
              </div>
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Color 2</label>
              <div className={styles.colorInputRow}>
                <input type="color" value={color2} onChange={e=>setColor2(e.target.value)} className={styles.colorPicker} />
                <input type="text" value={color2} onChange={e=>setColor2(e.target.value)} className={styles.hexInput} />
              </div>
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Type</label>
              <div className={styles.harmonyRow}>
                {TYPES.map(t=>(
                  <button key={t} onClick={()=>setType(t)} className={`${styles.harmonyBtn} ${type===t?styles.harmonyActive:""}`}>{t}</button>
                ))}
              </div>
            </div>
            {type==="linear-gradient" && (
              <div className={styles.controlGroup}>
                <label className={styles.label}>Angle: {angle}°</label>
                <input type="range" min="0" max="360" value={angle} onChange={e=>setAngle(Number(e.target.value))} className={styles.slider} />
              </div>
            )}
          </div>

          <div className={styles.codeBox}>
            <pre>{fullCss}</pre>
          </div>
          <div className={styles.btnRow}>
            <button onClick={copy} className={styles.btn}>{copied ? "✓ Copied!" : "📋 Copy CSS"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
