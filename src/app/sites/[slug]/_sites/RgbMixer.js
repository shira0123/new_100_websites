"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function RgbMixer() {
  const [r, setR] = useState(99);
  const [g, setG] = useState(102);
  const [b, setB] = useState(241);
  const [copied, setCopied] = useState(null);

  const toHex = (v) => v.toString(16).padStart(2, "0");
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  const rgb = `rgb(${r}, ${g}, ${b})`;
  const hsl = (() => {
    const rr = r / 255, gg = g / 255, bb = b / 255;
    const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rr: h = ((gg - bb) / d + (gg < bb ? 6 : 0)) / 6; break;
        case gg: h = ((bb - rr) / d + 2) / 6; break;
        case bb: h = ((rr - gg) / d + 4) / 6; break;
      }
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  })();

  const copy = (text) => { navigator.clipboard.writeText(text); setCopied(text); setTimeout(() => setCopied(null), 1500); };

  const SLIDERS = [
    { label: "Red", val: r, set: setR, color: "#ef4444", track: `linear-gradient(to right, #000, #ef4444)` },
    { label: "Green", val: g, set: setG, color: "#22c55e", track: `linear-gradient(to right, #000, #22c55e)` },
    { label: "Blue", val: b, set: setB, color: "#3b82f6", track: `linear-gradient(to right, #000, #3b82f6)` },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🎛️ RGB Color Mixer</h1>
        <p className={styles.pageSub}>Mix RGB channels and see the resulting color live</p>
      </div>
      <div className={styles.container} style={{ maxWidth: 560 }}>
        {/* Color preview */}
        <div style={{ height: 160, borderRadius: 20, background: rgb, marginBottom: 28, border: "1px solid rgba(255,255,255,0.1)", transition: "background 0.1s", boxShadow: `0 20px 60px ${hex}66` }} />

        {/* RGB sliders */}
        <div className={styles.controls}>
          {SLIDERS.map(({ label, val, set, color }) => (
            <div key={label} className={styles.controlGroup}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label className={styles.label} style={{ margin: 0, color }}>{label}</label>
                <input type="number" min={0} max={255} value={val} onChange={e => set(Math.max(0, Math.min(255, Number(e.target.value))))} style={{ width: 60, padding: "4px 8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f1f5f9", textAlign: "center", fontFamily: "monospace" }} />
              </div>
              <input type="range" min={0} max={255} value={val} onChange={e => set(Number(e.target.value))} className={styles.slider} style={{ accentColor: color }} />
            </div>
          ))}
        </div>

        {/* Color formats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {[["HEX", hex], ["RGB", rgb], ["HSL", hsl], ["RGBA", `rgba(${r}, ${g}, ${b}, 1)`]].map(([label, value]) => (
            <div key={label} onClick={() => copy(value)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${copied === value ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius: 12, cursor: "pointer", transition: "all 0.2s" }}>
              <span style={{ width: 44, fontSize: "0.72rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", flexShrink: 0 }}>{label}</span>
              <code style={{ flex: 1, color: "#a5b4fc", fontFamily: "monospace" }}>{value}</code>
              <span style={{ fontSize: "0.75rem", color: copied === value ? "#86efac" : "#334155", flexShrink: 0 }}>{copied === value ? "✓ Copied" : "Click"}</span>
            </div>
          ))}
        </div>

        {/* Color swatch history using complementary */}
        <div style={{ marginTop: 20 }}>
          <div className={styles.label} style={{ marginBottom: 8 }}>Color Variations</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[10, 25, 50, 75, 90, 100].map(l => {
              const bg = `rgba(${r}, ${g}, ${b}, ${l / 100})`;
              return <div key={l} style={{ width: 44, height: 44, borderRadius: 10, background: bg, border: "1px solid rgba(255,255,255,0.1)", title: `${l}%`, cursor: "pointer", position: "relative" }} onClick={() => copy(bg)} title={`${l}% opacity`} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
