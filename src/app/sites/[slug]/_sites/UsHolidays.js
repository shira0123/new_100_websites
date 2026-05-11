"use client";
import { useState } from "react";
import styles from "./site.module.css";
const HOLIDAYS = {
  2025: [
    { date: "Jan 1", name: "New Year's Day", emoji: "🎆" },
    { date: "Jan 20", name: "Martin Luther King Jr. Day", emoji: "✊" },
    { date: "Feb 17", name: "Presidents' Day", emoji: "🇺🇸" },
    { date: "May 26", name: "Memorial Day", emoji: "🪖" },
    { date: "Jun 19", name: "Juneteenth", emoji: "✊" },
    { date: "Jul 4", name: "Independence Day", emoji: "🎇" },
    { date: "Sep 1", name: "Labor Day", emoji: "👷" },
    { date: "Oct 13", name: "Columbus Day", emoji: "⛵" },
    { date: "Nov 11", name: "Veterans Day", emoji: "🎖️" },
    { date: "Nov 27", name: "Thanksgiving", emoji: "🦃" },
    { date: "Dec 25", name: "Christmas Day", emoji: "🎄" },
  ],
  2026: [
    { date: "Jan 1", name: "New Year's Day", emoji: "🎆" },
    { date: "Jan 19", name: "Martin Luther King Jr. Day", emoji: "✊" },
    { date: "Feb 16", name: "Presidents' Day", emoji: "🇺🇸" },
    { date: "May 25", name: "Memorial Day", emoji: "🪖" },
    { date: "Jun 19", name: "Juneteenth", emoji: "✊" },
    { date: "Jul 4", name: "Independence Day", emoji: "🎇" },
    { date: "Sep 7", name: "Labor Day", emoji: "👷" },
    { date: "Oct 12", name: "Columbus Day", emoji: "⛵" },
    { date: "Nov 11", name: "Veterans Day", emoji: "🎖️" },
    { date: "Nov 26", name: "Thanksgiving", emoji: "🦃" },
    { date: "Dec 25", name: "Christmas Day", emoji: "🎄" },
  ],
};
export default function UsHolidays({ site }) {
  const [year, setYear] = useState(2026);
  const holidays = HOLIDAYS[year] || HOLIDAYS[2026];
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 25 }}>
        {[2025, 2026].map(y => <button key={y} onClick={() => setYear(y)} className={styles.button} style={{ background: year === y ? site.color : "rgba(255,255,255,0.05)" }}>{y}</button>)}
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        {holidays.map(h => (
          <div key={h.name} className={styles.card} style={{ display: "flex", gap: 15, alignItems: "center", marginBottom: 8, padding: "12px 20px" }}>
            <div style={{ fontSize: "1.5rem" }}>{h.emoji}</div>
            <div style={{ flex: 1 }}><div style={{ fontWeight: "bold" }}>{h.name}</div><div style={{ fontSize: "0.8rem", opacity: 0.5 }}>{h.date}, {year}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
