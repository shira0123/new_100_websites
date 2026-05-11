"use client";
import { useState } from "react";
import styles from "./site.module.css";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const now = new Date();

  let result = null;
  if (dob) {
    const birth = new Date(dob);
    if (!isNaN(birth) && birth <= now) {
      let years = now.getFullYear() - birth.getFullYear();
      let months = now.getMonth() - birth.getMonth();
      let days = now.getDate() - birth.getDate();
      if (days < 0) { months--; const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); days += prevMonth.getDate(); }
      if (months < 0) { years--; months += 12; }
      const totalDays = Math.floor((now - birth) / 86400000);
      const totalHours = Math.floor((now - birth) / 3600000);
      const totalMins = Math.floor((now - birth) / 60000);
      const nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
      if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
      const daysToNext = Math.ceil((nextBday - now) / 86400000);
      result = { years, months, days, totalDays, totalHours, totalMins, daysToNext };
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🎂 Age Calculator</h1>
        <p className={styles.pageSub}>Find your exact age down to the minute</p>
      </div>
      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label} htmlFor="dob">Date of Birth</label>
            <input id="dob" type="date" value={dob} onChange={e=>setDob(e.target.value)} className={styles.input} max={now.toISOString().split("T")[0]} />
          </div>
        </div>

        {result && (
          <>
            <div className={styles.resultCard}>
              <div className={styles.resultBig}>{result.years}</div>
              <div className={styles.resultLabel}>Years Old</div>
              <p style={{color:"#64748b",fontSize:"0.9rem",marginTop:8}}>
                {result.months} month{result.months!==1?"s":""} and {result.days} day{result.days!==1?"s":""}
              </p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:16}}>
              {[
                ["📅", result.totalDays.toLocaleString(), "Total Days"],
                ["⏰", result.totalHours.toLocaleString(), "Total Hours"],
                ["⏱️", result.totalMins.toLocaleString(), "Total Minutes"],
              ].map(([icon,val,label])=>(
                <div key={label} style={{padding:"16px 8px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,textAlign:"center"}}>
                  <div style={{fontSize:"1.4rem"}}>{icon}</div>
                  <div style={{fontSize:"1.1rem",fontWeight:700,color:"#a5b4fc",marginTop:4}}>{val}</div>
                  <div style={{fontSize:"0.7rem",color:"#64748b",marginTop:2}}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{textAlign:"center",marginTop:16,padding:"12px",background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:12}}>
              <span style={{color:"#a5b4fc",fontSize:"0.9rem"}}>🎉 Next birthday in <strong>{result.daysToNext}</strong> day{result.daysToNext!==1?"s":""}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
