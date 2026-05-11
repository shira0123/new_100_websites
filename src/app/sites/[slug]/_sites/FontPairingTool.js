"use client";
import { useState } from "react";
import styles from "./site.module.css";

const FONTS = ["Inter","Roboto","Poppins","Playfair Display","Merriweather","Lora","Montserrat","Raleway","Open Sans","Oswald","Nunito","Quicksand","Crimson Text","Source Serif Pro","Space Grotesk","DM Sans","Outfit","Work Sans"];
const PAIRINGS = [
  { heading: "Playfair Display", body: "Source Serif Pro" },
  { heading: "Montserrat", body: "Merriweather" },
  { heading: "Oswald", body: "Lora" },
  { heading: "Space Grotesk", body: "DM Sans" },
  { heading: "Poppins", body: "Inter" },
  { heading: "Raleway", body: "Roboto" },
];

export default function FontPairingTool({ site }) {
  const [heading, setHeading] = useState("Playfair Display");
  const [body, setBody] = useState("Inter");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20, maxWidth: 900, margin: "0 auto" }}>
        <div className={styles.card}>
          <h3 style={{ marginBottom: 15 }}>Choose Fonts</h3>
          <label style={{ fontSize: "0.8rem", opacity: 0.5 }}>Heading Font</label>
          <select className={styles.input} value={heading} onChange={e => setHeading(e.target.value)} style={{ marginBottom: 15 }}>
            {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <label style={{ fontSize: "0.8rem", opacity: 0.5 }}>Body Font</label>
          <select className={styles.input} value={body} onChange={e => setBody(e.target.value)} style={{ marginBottom: 20 }}>
            {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <h4 style={{ marginBottom: 10, opacity: 0.7 }}>Suggested Pairings</h4>
          {PAIRINGS.map((p, i) => (
            <button key={i} onClick={() => { setHeading(p.heading); setBody(p.body); }} className={styles.button}
              style={{ width: "100%", marginBottom: 8, textAlign: "left", fontSize: "0.8rem" }}>
              <strong>{p.heading}</strong> + {p.body}
            </button>
          ))}
        </div>
        <div className={styles.card}>
          <h3 style={{ marginBottom: 20 }}>Preview</h3>
          <div style={{ padding: 30, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h1 style={{ fontFamily: heading, fontSize: "2.2rem", marginBottom: 10 }}>The Art of Typography</h1>
            <h2 style={{ fontFamily: heading, fontSize: "1.4rem", opacity: 0.7, marginBottom: 20 }}>Subtitle in {heading}</h2>
            <p style={{ fontFamily: body, fontSize: "1rem", lineHeight: 1.8, opacity: 0.8, marginBottom: 15 }}>
              Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. Good typography creates visual hierarchy and establishes the overall tone of the design.
            </p>
            <p style={{ fontFamily: body, fontSize: "0.9rem", lineHeight: 1.8, opacity: 0.6 }}>
              This paragraph uses <strong>{body}</strong> as the body font, paired with <strong>{heading}</strong> for headings. A great pairing balances contrast with harmony.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
