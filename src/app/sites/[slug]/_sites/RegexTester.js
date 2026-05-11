"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("gi");
  const [testStr, setTestStr] = useState("Contact us at hello@example.com or support@test.org for help!");
  const [copied, setCopied] = useState(false);

  let matches = [];
  let error = "";
  try {
    if (pattern) {
      const re = new RegExp(pattern, flags);
      matches = [...testStr.matchAll(new RegExp(pattern, flags.includes("g") ? flags : flags+"g"))];
    }
  } catch(e) { error = e.message; }

  const highlighted = (() => {
    if (!pattern || error || !matches.length) return testStr;
    try {
      return testStr.replace(new RegExp(pattern, flags.includes("g")?flags:flags+"g"), m =>
        `<mark style="background:rgba(99,102,241,0.35);color:#c7d2fe;border-radius:3px;padding:0 2px">${m}</mark>`
      );
    } catch { return testStr; }
  })();

  const copy = () => { navigator.clipboard.writeText(`/${pattern}/${flags}`); setCopied(true); setTimeout(()=>setCopied(false),1500); };

  const PRESET_FLAGS = ["g","i","m","s"];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🔍 Regex Tester</h1>
        <p className={styles.pageSub}>Test regular expressions with live highlighting</p>
      </div>
      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.gradientControls}>
            <div className={styles.controlGroup} style={{flex:3}}>
              <label className={styles.label}>Pattern</label>
              <div style={{display:"flex",alignItems:"center",gap:0}}>
                <span style={{padding:"12px 12px",background:"rgba(255,255,255,0.04)",borderRadius:"12px 0 0 12px",border:"1px solid rgba(255,255,255,0.1)",borderRight:"none",color:"#64748b",fontFamily:"monospace",fontSize:"1.1rem"}}>/</span>
                <input value={pattern} onChange={e=>setPattern(e.target.value)} style={{flex:1,padding:"12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderLeft:"none",borderRight:"none",color:"#a5b4fc",fontFamily:"monospace",fontSize:"0.95rem",outline:"none"}} placeholder="your pattern…" />
                <span style={{padding:"12px 8px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderLeft:"none",color:"#64748b",fontFamily:"monospace"}}>/</span>
                <input value={flags} onChange={e=>setFlags(e.target.value)} style={{width:60,padding:"12px 8px",background:"rgba(255,255,255,0.04)",borderRadius:"0 12px 12px 0",border:"1px solid rgba(255,255,255,0.1)",borderLeft:"none",color:"#f59e0b",fontFamily:"monospace",outline:"none"}} />
              </div>
            </div>
            <div className={styles.controlGroup} style={{flex:1}}>
              <label className={styles.label}>Flags</label>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {PRESET_FLAGS.map(f=>(
                  <button key={f} onClick={()=>setFlags(fl=>fl.includes(f)?fl.replace(f,""):fl+f)} style={{
                    width:36,height:36,borderRadius:8,fontFamily:"monospace",fontWeight:700,
                    background:flags.includes(f)?"rgba(99,102,241,0.2)":"rgba(255,255,255,0.04)",
                    border:`1px solid ${flags.includes(f)?"rgba(99,102,241,0.4)":"rgba(255,255,255,0.08)"}`,
                    color:flags.includes(f)?"#a5b4fc":"#64748b"
                  }}>{f}</button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Test String</label>
            <textarea className={styles.textArea} value={testStr} onChange={e=>setTestStr(e.target.value)} style={{minHeight:120}} />
          </div>
        </div>

        {error ? (
          <div style={{color:"#fca5a5",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)",padding:"12px 16px",borderRadius:10,fontFamily:"monospace"}}>{error}</div>
        ) : (
          <>
            <div style={{padding:"16px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,marginBottom:16,fontFamily:"monospace",fontSize:"0.9rem",lineHeight:1.7}} dangerouslySetInnerHTML={{__html:highlighted}} />
            <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
              <div style={{padding:"8px 16px",background:"rgba(99,102,241,0.12)",border:"1px solid rgba(99,102,241,0.25)",borderRadius:99}}>
                <span style={{color:"#a5b4fc",fontWeight:700}}>{matches.length}</span>
                <span style={{color:"#64748b",marginLeft:6,fontSize:"0.85rem"}}>match{matches.length!==1?"es":""}</span>
              </div>
              <button onClick={copy} className={styles.copyBtn}>{copied?"✓ Copied!":"Copy regex"}</button>
            </div>
            {matches.length>0 && (
              <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:4}}>
                {matches.map((m,i)=>(
                  <code key={i} style={{padding:"4px 10px",background:"rgba(99,102,241,0.08)",borderRadius:6,fontSize:"0.85rem",color:"#c7d2fe"}}>
                    [{i}] "{m[0]}" at index {m.index}
                  </code>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
