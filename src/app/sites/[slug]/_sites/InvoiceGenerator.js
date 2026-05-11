"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function InvoiceGenerator({ site }) {
  const [items, setItems] = useState([{ desc: "Web Development", qty: 1, rate: 500 }, { desc: "UI Design", qty: 2, rate: 300 }]);
  const [info, setInfo] = useState({ from: "Your Company", to: "Client Corp", invoice: "INV-001", date: new Date().toISOString().split("T")[0] });
  const addItem = () => setItems([...items, { desc: "", qty: 1, rate: 0 }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i, field, val) => { const n = [...items]; n[i][field] = field === "desc" ? val : Number(val); setItems(n); };
  const total = items.reduce((s, it) => s + it.qty * it.rate, 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      <div className={styles.card} style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginBottom: 25 }}>
          <div><label style={{ fontSize: "0.8rem", opacity: 0.5 }}>From</label><input className={styles.input} value={info.from} onChange={e => setInfo({...info, from: e.target.value})} /></div>
          <div><label style={{ fontSize: "0.8rem", opacity: 0.5 }}>To</label><input className={styles.input} value={info.to} onChange={e => setInfo({...info, to: e.target.value})} /></div>
          <div><label style={{ fontSize: "0.8rem", opacity: 0.5 }}>Invoice #</label><input className={styles.input} value={info.invoice} onChange={e => setInfo({...info, invoice: e.target.value})} /></div>
          <div><label style={{ fontSize: "0.8rem", opacity: 0.5 }}>Date</label><input className={styles.input} type="date" value={info.date} onChange={e => setInfo({...info, date: e.target.value})} /></div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
          <thead><tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", fontSize: "0.8rem", opacity: 0.6 }}>
            <th style={{ textAlign: "left", padding: 8 }}>Description</th><th style={{ padding: 8 }}>Qty</th><th style={{ padding: 8 }}>Rate</th><th style={{ padding: 8 }}>Amount</th><th></th>
          </tr></thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: 8 }}><input className={styles.input} value={it.desc} onChange={e => updateItem(i, "desc", e.target.value)} style={{ margin: 0 }} /></td>
                <td style={{ padding: 8, width: 70 }}><input className={styles.input} type="number" value={it.qty} onChange={e => updateItem(i, "qty", e.target.value)} style={{ margin: 0, textAlign: "center" }} /></td>
                <td style={{ padding: 8, width: 90 }}><input className={styles.input} type="number" value={it.rate} onChange={e => updateItem(i, "rate", e.target.value)} style={{ margin: 0, textAlign: "center" }} /></td>
                <td style={{ padding: 8, textAlign: "center", fontWeight: "bold" }}>${(it.qty * it.rate).toFixed(2)}</td>
                <td style={{ padding: 8 }}><button onClick={() => removeItem(i)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "1rem" }}>✕</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addItem} className={styles.button} style={{ marginBottom: 20 }}>+ Add Item</button>
        <div style={{ textAlign: "right", borderTop: "2px solid " + site.color, paddingTop: 15 }}>
          <span style={{ fontSize: "0.9rem", opacity: 0.6 }}>Total: </span>
          <span style={{ fontSize: "2rem", fontWeight: "bold", color: site.color }}>${total.toFixed(2)}</span>
        </div>
        <button onClick={() => window.print()} className={styles.button} style={{ background: site.color, width: "100%", marginTop: 20 }}>🖨️ Print Invoice</button>
      </div>
    </div>
  );
}
