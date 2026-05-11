"use client";
import { useState } from "react";
import styles from "./site.module.css";
const STOCKS = [
  { symbol: "AAPL", name: "Apple Inc.", price: 189.84, change: 2.15, pct: 1.15 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 141.80, change: -0.55, pct: -0.39 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.91, change: 4.22, pct: 1.13 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.25, change: 1.89, pct: 1.07 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.42, change: -3.18, pct: -1.26 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 495.22, change: 12.50, pct: 2.59 },
  { symbol: "META", name: "Meta Platforms", price: 326.49, change: 5.33, pct: 1.66 },
  { symbol: "NFLX", name: "Netflix Inc.", price: 449.67, change: -2.10, pct: -0.46 },
];
export default function StockTicker({ site }) {
  const [search, setSearch] = useState("");
  const filtered = STOCKS.filter(s => !search || s.symbol.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div style={{ maxWidth: 500, margin: "0 auto 25px" }}><input className={styles.input} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search stocks..." /></div>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {filtered.map(s => (
          <div key={s.symbol} className={styles.card} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: "15px 20px" }}>
            <div><div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{s.symbol}</div><div style={{ fontSize: "0.8rem", opacity: 0.5 }}>{s.name}</div></div>
            <div style={{ textAlign: "right" }}><div style={{ fontWeight: "bold" }}>${s.price.toFixed(2)}</div><div style={{ fontSize: "0.85rem", color: s.change >= 0 ? "#22c55e" : "#ef4444" }}>{s.change >= 0 ? "+" : ""}{s.change.toFixed(2)} ({s.pct >= 0 ? "+" : ""}{s.pct.toFixed(2)}%)</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
