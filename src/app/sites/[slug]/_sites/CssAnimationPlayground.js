"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function CssAnimationPlayground() {
  const [anim, setAnim] = useState("bounce");
  const [duration, setDuration] = useState(1);
  const [timing, setTiming] = useState("ease-in-out");
  const [delay, setDelay] = useState(0);
  const [iterCount, setIterCount] = useState("infinite");
  const [color, setColor] = useState("#6366f1");
  const [shape, setShape] = useState("circle");
  const [playing, setPlaying] = useState(true);
  const [key, setKey] = useState(0);

  const ANIMS = {
    bounce:"bounce",spin:"spin",pulse:"pulse",shake:"shake",
    swing:"swing",flip:"flip",tada:"tada",jello:"jello"
  };
  const TIMINGS = ["ease","ease-in","ease-out","ease-in-out","linear","cubic-bezier(0.68,-0.55,0.265,1.55)"];

  const css = `animation: ${anim} ${duration}s ${timing} ${delay}s ${iterCount};`;
  const [copied, setCopied] = useState(false);
  const copy = ()=>{ navigator.clipboard.writeText(css); setCopied(true); setTimeout(()=>setCopied(false),1500); };

  const replay = ()=>{ setKey(k=>k+1); setPlaying(true); };

  const shapeStyle = {
    circle:{borderRadius:"50%"},
    square:{borderRadius:8},
    rounded:{borderRadius:20},
    diamond:{borderRadius:0,transform:"rotate(45deg)"},
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🎬 CSS Animation Playground</h1>
        <p className={styles.pageSub}>Experiment with CSS animations visually</p>
      </div>
      <div className={styles.container} style={{maxWidth:900}}>
        <div className={styles.splitGrid}>
          {/* Controls */}
          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Animation</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {Object.keys(ANIMS).map(a=>(
                  <button key={a} onClick={()=>{setAnim(a);replay();}} className={`${styles.harmonyBtn} ${anim===a?styles.harmonyActive:""}`} style={{textTransform:"capitalize"}}>{a}</button>
                ))}
              </div>
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Duration: {duration}s</label>
              <input type="range" min={0.1} max={5} step={0.1} value={duration} onChange={e=>setDuration(Number(e.target.value))} className={styles.slider} />
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Delay: {delay}s</label>
              <input type="range" min={0} max={3} step={0.1} value={delay} onChange={e=>setDelay(Number(e.target.value))} className={styles.slider} />
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Timing Function</label>
              <select value={timing} onChange={e=>setTiming(e.target.value)} className={styles.select}>
                {TIMINGS.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Iterations</label>
              <div className={styles.harmonyRow}>
                {["1","2","3","infinite"].map(i=>(
                  <button key={i} onClick={()=>setIterCount(i)} className={`${styles.harmonyBtn} ${iterCount===i?styles.harmonyActive:""}`}>{i}</button>
                ))}
              </div>
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Shape & Color</label>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                {Object.keys(shapeStyle).map(s=>(
                  <button key={s} onClick={()=>setShape(s)} style={{padding:"6px 12px",borderRadius:8,background:shape===s?"rgba(99,102,241,0.2)":"rgba(255,255,255,0.04)",border:`1px solid ${shape===s?"rgba(99,102,241,0.4)":"rgba(255,255,255,0.08)"}`,color:shape===s?"#a5b4fc":"#64748b",fontSize:"0.8rem",textTransform:"capitalize"}}>{s}</button>
                ))}
                <input type="color" value={color} onChange={e=>setColor(e.target.value)} className={styles.colorPicker} />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,minHeight:240,position:"relative"}}>
              <style>{`
                @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-40px)}}
                @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
                @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.4)}}
                @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-20px)}75%{transform:translateX(20px)}}
                @keyframes swing{0%,100%{transform:rotate(0)}25%{transform:rotate(15deg)}75%{transform:rotate(-15deg)}}
                @keyframes flip{0%{transform:perspective(400px) rotateY(0)}100%{transform:perspective(400px) rotateY(360deg)}}
                @keyframes tada{0%{transform:scale(1)}10%{transform:scale(0.9) rotate(-3deg)}20%{transform:scale(1.1) rotate(3deg)}30%{transform:scale(1.1) rotate(-3deg)}40%{transform:scale(1.1) rotate(3deg)}50%{transform:scale(1.1) rotate(-3deg)}60%{transform:scale(1.1) rotate(3deg)}70%{transform:scale(1.1) rotate(-3deg)}80%{transform:scale(1.1) rotate(3deg)}90%{transform:scale(1.1) rotate(-3deg)}100%{transform:scale(1) rotate(0)}}
                @keyframes jello{0%,11.1%,100%{transform:none}22.2%{transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{transform:skewX(6.25deg) skewY(6.25deg)}44.4%{transform:skewX(-3.125deg) skewY(-3.125deg)}55.5%{transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{transform:skewX(-0.78125deg) skewY(-0.78125deg)}77.7%{transform:skewX(0.390625deg) skewY(0.390625deg)}88.8%{transform:skewX(-0.1953125deg) skewY(-0.1953125deg)}}
              `}</style>
              <div key={key} style={{
                width:80,height:80,background:color,
                ...shapeStyle[shape],
                animation:playing?`${anim} ${duration}s ${timing} ${delay}s ${iterCount}`:"none",
                boxShadow:`0 0 40px ${color}66`
              }}/>
            </div>

            <div className={styles.codeBox}>
              <pre style={{wordBreak:"break-all",whiteSpace:"pre-wrap"}}>{css}</pre>
            </div>
            <div className={styles.btnRow}>
              <button onClick={replay} className={styles.btn}>▶ Replay</button>
              <button onClick={copy} style={{padding:"12px 20px",borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",fontWeight:600}}>{copied?"✓ Copied!":"📋 Copy CSS"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
