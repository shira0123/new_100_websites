"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";
export default function AgeInSeconds({ site }) {
  const [dob, setDob] = useState("2000-01-01"); const [age, setAge] = useState(null);
  useEffect(() => { if (!dob) return; const i = setInterval(() => { const diff = Date.now() - new Date(dob).getTime(); setAge({ seconds: Math.floor(diff / 1000), minutes: Math.floor(diff / 60000), hours: Math.floor(diff / 3600000), days: Math.floor(diff / 86400000), weeks: Math.floor(diff / 604800000), months: Math.floor(diff / 2629746000), years: (diff / 31556952000).toFixed(2) }); }, 100); return () => clearInterval(i); }, [dob]);
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div className={styles.card} style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
        <label style={{ fontSize: "0.8rem", opacity: 0.5 }}>Your Date of Birth</label>
        <input className={styles.input} type="date" value={dob} onChange={e => setDob(e.target.value)} style={{ textAlign: "center", marginBottom: 25 }} />
        {age && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 15, borderRadius: 10, background: site.color + "11" }}><div style={{ fontSize: "1.8rem", fontWeight: "bold", color: site.color }}>{age.seconds.toLocaleString()}</div><div style={{ fontSize: "0.75rem", opacity: 0.5 }}>Seconds</div></div>
            <div style={{ padding: 15, borderRadius: 10, background: "rgba(255,255,255,0.03)" }}><div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{age.minutes.toLocaleString()}</div><div style={{ fontSize: "0.75rem", opacity: 0.5 }}>Minutes</div></div>
            <div style={{ padding: 15, borderRadius: 10, background: "rgba(255,255,255,0.03)" }}><div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{age.hours.toLocaleString()}</div><div style={{ fontSize: "0.75rem", opacity: 0.5 }}>Hours</div></div>
            <div style={{ padding: 15, borderRadius: 10, background: "rgba(255,255,255,0.03)" }}><div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{age.days.toLocaleString()}</div><div style={{ fontSize: "0.75rem", opacity: 0.5 }}>Days</div></div>
            <div style={{ padding: 15, borderRadius: 10, background: "rgba(255,255,255,0.03)" }}><div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{age.weeks.toLocaleString()}</div><div style={{ fontSize: "0.75rem", opacity: 0.5 }}>Weeks</div></div>
            <div style={{ padding: 15, borderRadius: 10, background: "rgba(255,255,255,0.03)" }}><div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{age.years}</div><div style={{ fontSize: "0.75rem", opacity: 0.5 }}>Years</div></div>
          </div>
        )}
      </div>
    </div>
  );
}
