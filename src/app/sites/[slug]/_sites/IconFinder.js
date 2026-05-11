"use client";
import { useState } from "react";
import styles from "./site.module.css";

const SYMBOLS = [
  { name: "Arrows", items: ["←","→","↑","↓","↔","↕","↖","↗","↘","↙","⇐","⇒","⇑","⇓","⇔","⇕","➡","⬅","⬆","⬇","↩","↪","↺","↻","⟵","⟶","⟷","⤴","⤵","⬱","⇄","⇅","⇆","⇇","⇈","⇉","⇊","⇋","⇌","⇍","⇎","⇏","⟰","⟱"] },
  { name: "Math", items: ["±","×","÷","=","≠","≈","≡","<",">","≤","≥","∞","∑","∏","√","∛","∜","∂","∫","∬","∭","∮","∯","∰","∇","∆","%","‰","‱","°","′","″","∈","∉","∋","∌","⊂","⊃","⊄","⊅","⊆","⊇","∪","∩","∅","∀","∃","∄","∧","∨","¬","⊕","⊗","⊙","⊞","⊟","⊠"] },
  { name: "Punctuation", items: ["—","–","-","…","•","·","·","\"","\"","'","'","«","»","‹","›","¡","¿","§","¶","†","‡","※","‼","⁉","♦","♣","♥","♠","★","☆","✓","✗","✘","✔","☑","☐","☒","✈","☎","✉","☞","☜","☝","☟","✍"] },
  { name: "Currency", items: ["$","€","£","¥","¢","₹","₩","₿","₽","₺","₫","₱","₦","₴","₸","₼","₾","฿","₪","₵","₡","₢","₣","₤","₥","₧","₨","₭","₮","₯","₰"] },
  { name: "Greek", items: ["α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω","Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω"] },
  { name: "Box Drawing", items: ["─","│","┌","┐","└","┘","├","┤","┬","┴","┼","═","║","╔","╗","╚","╝","╠","╣","╦","╩","╬","░","▒","▓","█","▀","▄","▌","▐","■","□","▪","▫","▬","▭","▮","▯"] },
  { name: "Misc", items: ["©","®","™","℠","℗","°","µ","Ω","Å","℃","℉","℅","℆","№","℞","℟","℣","ℤ","ℬ","ℰ","ℱ","ℊ","ℋ","ℌ","ℍ","ℎ","ℏ","ℐ","ℑ","ℒ","ℓ","ℕ","℘","ℝ","ℤ","∞"] },
];

export default function IconFinder() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Math");
  const [copied, setCopied] = useState(null);

  const copy = (s) => { navigator.clipboard.writeText(s); setCopied(s); setTimeout(() => setCopied(null), 1000); };

  const filtered = search
    ? SYMBOLS.flatMap(g => g.items).filter(s => s.includes(search))
    : SYMBOLS.find(g => g.name === cat)?.items || [];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🔣 Icon / Symbol Finder</h1>
        <p className={styles.pageSub}>Search and copy Unicode icons, symbols and special characters</p>
      </div>
      <div className={styles.container} style={{ maxWidth: 640 }}>
        <input type="search" value={search} onChange={e => setSearch(e.target.value)} className={styles.input} placeholder="Search symbols…" style={{ marginBottom: 14 }} />

        {!search && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {SYMBOLS.map(g => (
              <button key={g.name} onClick={() => setCat(g.name)} className={`${styles.harmonyBtn} ${cat === g.name ? styles.harmonyActive : ""}`} style={{ fontSize: "0.8rem" }}>{g.name}</button>
            ))}
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, maxHeight: 400, overflowY: "auto" }}>
          {filtered.map((sym, i) => (
            <button key={i} onClick={() => copy(sym)} style={{
              width: 52, height: 52, borderRadius: 10, fontSize: "1.4rem",
              background: copied === sym ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${copied === sym ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"}`,
              color: "#f1f5f9", cursor: "pointer", transition: "all 0.15s",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
              onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              onMouseOut={e => e.currentTarget.style.background = copied === sym ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)"}>
              {sym}
            </button>
          ))}
        </div>

        {copied && (
          <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "rgba(15,23,42,0.95)", border: "1px solid rgba(99,102,241,0.4)", padding: "10px 20px", borderRadius: 99, color: "#a5b4fc", fontWeight: 600, zIndex: 999 }}>
            "{copied}" copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}
