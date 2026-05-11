"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function BorderRadiusPreview() {
  const [tl, setTl] = useState(12);
  const [tr, setTr] = useState(12);
  const [br, setBr] = useState(12);
  const [bl, setBl] = useState(12);
  const [linked, setLinked] = useState(true);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(120);
  const [color, setColor] = useState("#6366f1");
  const [copied, setCopied] = useState(false);

  const setAll = (v) => { setTl(v); setTr(v); setBr(v); setBl(v); };

  const css = `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;
  const copy = () => { navigator.clipboard.writeText(css); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  const corners = [
    ["Top Left", tl, linked ? setAll : setTl],
    ["Top Right", tr, linked ? setAll : setTr],
    ["Bottom Right", br, linked ? setAll : setBr],
    ["Bottom Left", bl, linked ? setAll : setBl],
  ];

  const PRESETS = [
    { label: "Square", v: [0, 0, 0, 0] },
    { label: "Rounded", v: [12, 12, 12, 12] },
    { label: "Pill", v: [999, 999, 999, 999] },
    { label: "Circle", v: [50, 50, 50, 50] },
    { label: "Leaf", v: [0, 80, 0, 80] },
    { label: "Ticket", v: [12, 0, 0, 12] },
    { label: "Blob", v: [60, 30, 60, 30] },
    { label: "Squircle", v: [30, 30, 30, 30] },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>⬛ Border Radius Preview</h1>
        <p className={styles.pageSub}>Visually generate CSS border-radius values</p>
      </div>
      <div className={styles.container} style={{ maxWidth: 900 }}>
        <div className={styles.splitGrid}>
          {/* Controls */}
          <div className={styles.controls}>
            <label className={styles.checkRow} style={{ cursor: "pointer", marginBottom: 16 }}>
              <input type="checkbox" checked={linked} onChange={e => setLinked(e.target.checked)} className={styles.checkbox} />
              <span style={{ color: "#cbd5e1" }}>Link all corners</span>
            </label>
            {corners.map(([label, val, setter]) => (
              <div key={label} className={styles.controlGroup}>
                <label className={styles.label}>{label}: {val}px</label>
                <input type="range" min={0} max={200} value={val} onChange={e => setter(Number(e.target.value))} className={styles.slider} />
              </div>
            ))}
            <div className={styles.gradientControls}>
              <div className={styles.controlGroup}>
                <label className={styles.label}>Width: {width}px</label>
                <input type="range" min={60} max={320} value={width} onChange={e => setWidth(Number(e.target.value))} className={styles.slider} />
              </div>
              <div className={styles.controlGroup}>
                <label className={styles.label}>Height: {height}px</label>
                <input type="range" min={40} max={320} value={height} onChange={e => setHeight(Number(e.target.value))} className={styles.slider} />
              </div>
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Fill Color</label>
              <div className={styles.colorInputRow}>
                <input type="color" value={color} onChange={e => setColor(e.target.value)} className={styles.colorPicker} />
                <code style={{ color: "#94a3b8" }}>{color}</code>
              </div>
            </div>
          </div>
          {/* Preview */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, minHeight: 260 }}>
              <div style={{ width, height, background: `${color}cc`, border: `2px solid ${color}`, borderRadius: `${tl}px ${tr}px ${br}px ${bl}px`, transition: "all 0.2s", boxShadow: `0 8px 40px ${color}44` }} />
            </div>
            {/* Presets */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {PRESETS.map(p => (
                <button key={p.label} onClick={() => { setLinked(false); setTl(p.v[0]); setTr(p.v[1]); setBr(p.v[2]); setBl(p.v[3]); }} style={{ padding: "6px 14px", borderRadius: 99, fontSize: "0.82rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}>{p.label}</button>
              ))}
            </div>
            <div className={styles.codeBox}><pre>{css}</pre></div>
            <button onClick={copy} className={styles.btn}>{copied ? "✓ Copied!" : "📋 Copy CSS"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
