"use client";
import { useState } from "react";
import styles from "./site.module.css";

const WORDS = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum","cras","maecenas","viverra","aliquet","eget","sit","amet","diam","in","arcu","cursus","euismod","quis","viverra","nibh","cras","pulvinar","mattis","nunc","sed","blandit","libero","volutpat","sed","cras","ornare","arcu","dui","vivamus","arcu","felis","bibendum","ut","tristique","et","egestas","quis","ipsum","suspendisse","ultrices","gravida","risus","commodo","viverra","maecenas","accumsan","lacus","vel","facilisis"];

function word() { return WORDS[Math.floor(Math.random() * WORDS.length)]; }
function sentence() {
  const len = 8 + Math.floor(Math.random() * 10);
  const words = Array.from({length:len}, word);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}
function paragraph() {
  return Array.from({length: 4 + Math.floor(Math.random() * 4)}, sentence).join(" ");
}

export default function LoremIpsumGenerator() {
  const [type, setType] = useState("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let result = "";
    if (type === "words") result = Array.from({length:count}, word).join(" ");
    else if (type === "sentences") result = Array.from({length:count}, sentence).join(" ");
    else result = Array.from({length:count}, paragraph).join("\n\n");
    setOutput(result);
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>📄 Lorem Ipsum Generator</h1>
        <p className={styles.pageSub}>Generate placeholder text on demand</p>
      </div>
      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.gradientControls}>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Type</label>
              <select value={type} onChange={e=>setType(e.target.value)} className={styles.select}>
                <option value="words">Words</option>
                <option value="sentences">Sentences</option>
                <option value="paragraphs">Paragraphs</option>
              </select>
            </div>
            <div className={styles.controlGroup}>
              <label className={styles.label}>Count</label>
              <input type="number" value={count} min={1} max={50} onChange={e=>setCount(Math.max(1,Number(e.target.value)))} className={styles.input} />
            </div>
          </div>
          <button onClick={generate} className={styles.btn}>✨ Generate</button>
        </div>

        {output && (
          <>
            <textarea readOnly value={output} className={styles.textArea} style={{minHeight:280}} />
            <div className={styles.btnRow}>
              <button onClick={copy} className={styles.btn}>{copied?"✓ Copied!":"📋 Copy Text"}</button>
              <span style={{color:"#475569",fontSize:"0.82rem",alignSelf:"center"}}>{output.split(/\s+/).filter(Boolean).length} words · {output.length} chars</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
