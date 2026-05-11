"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./site.module.css";

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(200);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const canvasRef = useRef(null);
  const [qrUrl, setQrUrl] = useState("");

  // Use a free QR API
  useEffect(() => {
    if (!text.trim()) return;
    const encoded = encodeURIComponent(text);
    const fg = fgColor.replace("#","");
    const bg = bgColor.replace("#","");
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&color=${fg}&bgcolor=${bg}`);
  }, [text, size, fgColor, bgColor]);

  const download = () => {
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>📱 QR Code Generator</h1>
        <p className={styles.pageSub}>Generate QR codes for any URL or text</p>
      </div>
      <div className={styles.container} style={{maxWidth:600}}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>URL or Text</label>
            <input type="text" value={text} onChange={e=>setText(e.target.value)} className={styles.input} placeholder="https://example.com" />
          </div>
          <div className={styles.gradientControls}>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Foreground</label>
              <div className={styles.colorInputRow}>
                <input type="color" value={fgColor} onChange={e=>setFgColor(e.target.value)} className={styles.colorPicker} />
                <span style={{color:"#94a3b8",fontFamily:"monospace"}}>{fgColor}</span>
              </div>
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Background</label>
              <div className={styles.colorInputRow}>
                <input type="color" value={bgColor} onChange={e=>setBgColor(e.target.value)} className={styles.colorPicker} />
                <span style={{color:"#94a3b8",fontFamily:"monospace"}}>{bgColor}</span>
              </div>
            </div>
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Size: {size}×{size}px</label>
            <input type="range" min={100} max={400} step={50} value={size} onChange={e=>setSize(Number(e.target.value))} className={styles.slider} />
          </div>
        </div>

        {text.trim() && (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:20,marginTop:8}}>
            <div style={{padding:16,background:"#fff",borderRadius:16,display:"inline-block"}}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt="QR Code" width={size} height={size} style={{display:"block"}} />
            </div>
            <button onClick={download} className={styles.btn}>⬇️ Download PNG</button>
          </div>
        )}
      </div>
    </div>
  );
}
