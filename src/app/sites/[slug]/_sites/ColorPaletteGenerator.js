"use client";
import { useState, useCallback } from "react";
import styles from "./site.module.css";

const HARMONIES = ["Analogous", "Complementary", "Triadic", "Tetradic", "Monochromatic"];

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex) {
  let r = parseInt(hex.slice(1,3),16)/255;
  let g = parseInt(hex.slice(3,5),16)/255;
  let b = parseInt(hex.slice(5,7),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h, s, l = (max+min)/2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d/(2-max-min) : d/(max+min);
    switch(max){
      case r: h = ((g-b)/d + (g<b?6:0))/6; break;
      case g: h = ((b-r)/d + 2)/6; break;
      case b: h = ((r-g)/d + 4)/6; break;
    }
  }
  return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
}

function generatePalette(baseHex, harmony) {
  const [h,s,l] = hexToHsl(baseHex);
  switch(harmony) {
    case "Analogous": return [0,-30,30,-60,60].map(d => hslToHex((h+d+360)%360, s, l));
    case "Complementary": return [0,180,30,210,60].map(d => hslToHex((h+d+360)%360, s, l));
    case "Triadic": return [0,120,240,60,180].map(d => hslToHex((h+d+360)%360, s, l));
    case "Tetradic": return [0,90,180,270,45].map(d => hslToHex((h+d+360)%360, s, l));
    case "Monochromatic": return [l-30,l-15,l,l+15,l+30].map(tl => hslToHex(h, s, Math.max(5,Math.min(95,tl))));
    default: return [0,60,120,180,240].map(d => hslToHex((h+d)%360, s, l));
  }
}

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [harmony, setHarmony] = useState("Analogous");
  const [copied, setCopied] = useState(null);
  const palette = generatePalette(baseColor, harmony);

  const copyColor = useCallback((hex) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  }, []);

  const randomBase = () => {
    const hex = "#" + Math.floor(Math.random()*0xffffff).toString(16).padStart(6,"0");
    setBaseColor(hex);
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero} style={{ background: `linear-gradient(135deg, ${palette[0]}22, ${palette[4]}22)` }}>
        <h1 className={styles.pageTitle}>🎨 Color Palette Generator</h1>
        <p className={styles.pageSub}>Pick a base color and harmony to generate beautiful palettes</p>
      </div>

      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label} htmlFor="base-color">Base Color</label>
            <div className={styles.colorInputRow}>
              <input id="base-color" type="color" value={baseColor} onChange={e => setBaseColor(e.target.value)} className={styles.colorPicker} />
              <input type="text" value={baseColor} onChange={e => { if(/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setBaseColor(e.target.value); }} className={styles.hexInput} maxLength={7} />
              <button onClick={randomBase} className={styles.randomBtn} title="Random color">🎲 Random</button>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Harmony</label>
            <div className={styles.harmonyRow}>
              {HARMONIES.map(h => (
                <button key={h} onClick={() => setHarmony(h)} className={`${styles.harmonyBtn} ${harmony===h ? styles.harmonyActive : ""}`}>{h}</button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.paletteRow}>
          {palette.map((hex, i) => (
            <button key={i} className={styles.swatch} style={{ background: hex }} onClick={() => copyColor(hex)} title={`Copy ${hex}`}>
              <div className={styles.swatchOverlay}>
                <span className={styles.swatchHex}>{hex}</span>
                <span className={styles.swatchCopy}>{copied===hex ? "✓ Copied!" : "Click to copy"}</span>
              </div>
            </button>
          ))}
        </div>

        <div className={styles.paletteList}>
          {palette.map((hex, i) => (
            <div key={i} className={styles.colorRow}>
              <div className={styles.colorDot} style={{ background: hex }} />
              <code className={styles.colorHex}>{hex}</code>
              <code className={styles.colorHsl}>{hexToHsl(hex).join(", ")}</code>
              <button onClick={() => copyColor(hex)} className={styles.copyBtn}>{copied===hex ? "✓" : "Copy"}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
