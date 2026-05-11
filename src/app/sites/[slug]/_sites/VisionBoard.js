"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function VisionBoard({ site }) {
  const [items, setItems] = useState([
    { id: 1, text: "Launch my startup 🚀", color: "#6366f1" },
    { id: 2, text: "Travel to Japan 🗾", color: "#ec4899" },
    { id: 3, text: "Learn piano 🎹", color: "#f59e0b" },
    { id: 4, text: "Run a marathon 🏃", color: "#22c55e" },
  ]);
  const [newItem, setNewItem] = useState("");
  const colors = ["#6366f1", "#ec4899", "#f59e0b", "#22c55e", "#0ea5e9", "#8b5cf6", "#ef4444", "#14b8a6"];
  const [selColor, setSelColor] = useState(colors[0]);
  const addItem = () => { if (!newItem.trim()) return; setItems([...items, { id: Date.now(), text: newItem, color: selColor }]); setNewItem(""); };
  const removeItem = (id) => setItems(items.filter(i => i.id !== id));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      <div className={styles.card} style={{ maxWidth: 500, margin: "0 auto 20px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <input className={styles.input} value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="Add a dream or goal..." style={{ margin: 0, flex: 1 }} onKeyDown={e => e.key === "Enter" && addItem()} />
          <button onClick={addItem} className={styles.button} style={{ background: selColor }}>Add</button>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {colors.map(c => (
            <button key={c} onClick={() => setSelColor(c)}
              style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: selColor === c ? "2px solid white" : "2px solid transparent", cursor: "pointer" }} />
          ))}
        </div>
      </div>
      <div style={{ columns: "250px 3", gap: 15, maxWidth: 900, margin: "0 auto" }}>
        {items.map(item => (
          <div key={item.id} style={{ breakInside: "avoid", marginBottom: 15, padding: 20, borderRadius: 12, background: item.color + "15", border: `1px solid ${item.color}33`, position: "relative" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{item.text}</p>
            <button onClick={() => removeItem(item.id)} style={{ position: "absolute", top: 8, right: 8, background: "none", border: "none", color: "#ef4444", cursor: "pointer", opacity: 0.5 }}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
