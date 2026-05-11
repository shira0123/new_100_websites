"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function SvgWaveGenerator() {
  const [amplitude, setAmplitude] = useState(40);
  const [frequency, setFrequency] = useState(2);
  const [color, setColor] = useState("#6366f1");
  const [opacity, setOpacity] = useState(100);
  const [style, setStyle] = useState("wave"); // wave | zigzag | smooth
  const [flipped, setFlipped] = useState(false);
  const [layers, setLayers] = useState(1);
  const [copied, setCopied] = useState(false);

  const W = 1200, H = 120;

  const buildPath = (amp, freq, offset = 0) => {
    if (style === "zigzag") {
      const seg = W / (freq * 2);
      let d = `M 0 ${H}`;
      for (let i = 0; i <= freq * 2; i++) {
        const x = i * seg;
        const y = i % 2 === 0 ? H - amp + offset : H + offset;
        d += ` L ${x} ${y}`;
      }
      return d + ` L ${W} ${H} Z`;
    }
    // smooth wave
    const seg = W / freq;
    let d = `M 0 ${H}`;
    for (let i = 0; i < freq; i++) {
      const x0 = i * seg, x1 = (i + 0.5) * seg, x2 = (i + 1) * seg;
      d += ` Q ${x1} ${H - amp * 2 + offset} ${x2} ${H + offset}`;
    }
    return d + ` L ${W} ${H} Z`;
  };

  const colors2 = ["#6366f1", "#8b5cf6", "#0ea5e9", "#10b981", "#f59e0b", "#ec4899", "#ef4444", "#14b8a6"];

  const svgContent = Array.from({ length: layers }, (_, i) => {
    const layerOpacity = (opacity / 100) * (1 - i * 0.2);
    const layerAmp = amplitude * (1 - i * 0.15);
    const layerOffset = i * 10;
    return `<path d="${buildPath(layerAmp, frequency, layerOffset)}" fill="${color}" opacity="${layerOpacity.toFixed(2)}"/>`;
  }).join("\n  ");

  const fullSvg = `<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">\n  ${svgContent}\n</svg>`;

  const copy = () => { navigator.clipboard.writeText(fullSvg); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>〰️ SVG Wave Generator</h1>
        <p className={styles.pageSub}>Create beautiful SVG wave dividers for websites</p>
      </div>
      <div className={styles.container} style={{ maxWidth: 900 }}>
        {/* Preview */}
        <div style={{ background: "#0f172a", borderRadius: 16, overflow: "hidden", marginBottom: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ height: 80, background: "linear-gradient(135deg,#1e1b4b,#0f172a)" }} />
          <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", transform: flipped ? "scaleY(-1)" : "none" }}>
            {Array.from({ length: layers }, (_, i) => {
              const layerOpacity = (opacity / 100) * (1 - i * 0.2);
              const layerAmp = amplitude * (1 - i * 0.15);
              const layerOffset = i * 10;
              return <path key={i} d={buildPath(layerAmp, frequency, layerOffset)} fill={color} opacity={layerOpacity} />;
            })}
          </svg>
          <div style={{ height: 50, background: color }} />
        </div>

        <div className={styles.splitGrid}>
          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Wave Style</label>
              <div className={styles.harmonyRow}>
                {["wave", "zigzag"].map(s => <button key={s} onClick={() => setStyle(s)} className={`${styles.harmonyBtn} ${style === s ? styles.harmonyActive : ""}`} style={{ textTransform: "capitalize" }}>{s}</button>)}
              </div>
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Amplitude: {amplitude}px</label>
              <input type="range" min={5} max={100} value={amplitude} onChange={e => setAmplitude(Number(e.target.value))} className={styles.slider} />
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Frequency: {frequency}</label>
              <input type="range" min={1} max={8} value={frequency} onChange={e => setFrequency(Number(e.target.value))} className={styles.slider} />
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Layers: {layers}</label>
              <input type="range" min={1} max={3} value={layers} onChange={e => setLayers(Number(e.target.value))} className={styles.slider} />
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Opacity: {opacity}%</label>
              <input type="range" min={10} max={100} value={opacity} onChange={e => setOpacity(Number(e.target.value))} className={styles.slider} />
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Color</label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                {colors2.map(c => <button key={c} onClick={() => setColor(c)} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: `2px solid ${color === c ? "#fff" : "transparent"}`, cursor: "pointer" }} />)}
              </div>
              <div className={styles.colorInputRow}>
                <input type="color" value={color} onChange={e => setColor(e.target.value)} className={styles.colorPicker} />
                <code style={{ color: "#94a3b8" }}>{color}</code>
              </div>
            </div>
            <label className={styles.checkRow} style={{ cursor: "pointer" }}>
              <input type="checkbox" checked={flipped} onChange={e => setFlipped(e.target.checked)} className={styles.checkbox} />
              <span style={{ color: "#cbd5e1" }}>Flip vertically</span>
            </label>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className={styles.codeBox} style={{ flex: 1, overflow: "auto", maxHeight: 280 }}>
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", fontSize: "0.78rem" }}>{fullSvg}</pre>
            </div>
            <button onClick={copy} className={styles.btn}>{copied ? "✓ Copied SVG!" : "📋 Copy SVG"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
