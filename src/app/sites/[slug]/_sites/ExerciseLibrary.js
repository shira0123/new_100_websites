"use client";
import { useState } from "react";
import styles from "./site.module.css";
const EXERCISES = {
  Chest: [{ name: "Bench Press", emoji: "🏋️", sets: "4x8-12" }, { name: "Push-Ups", emoji: "💪", sets: "3x15-20" }, { name: "Chest Fly", emoji: "🦅", sets: "3x12" }],
  Back: [{ name: "Pull-Ups", emoji: "🧗", sets: "4x8-10" }, { name: "Deadlift", emoji: "🏋️", sets: "4x6-8" }, { name: "Bent Over Row", emoji: "🚣", sets: "3x10" }],
  Legs: [{ name: "Squats", emoji: "🦵", sets: "4x8-12" }, { name: "Lunges", emoji: "🏃", sets: "3x12 each" }, { name: "Leg Press", emoji: "🦿", sets: "4x10" }],
  Arms: [{ name: "Bicep Curls", emoji: "💪", sets: "3x12" }, { name: "Tricep Dips", emoji: "🪑", sets: "3x10" }, { name: "Hammer Curls", emoji: "🔨", sets: "3x12" }],
  Core: [{ name: "Plank", emoji: "🧘", sets: "3x60s" }, { name: "Crunches", emoji: "🔄", sets: "3x20" }, { name: "Russian Twist", emoji: "🌀", sets: "3x15 each" }],
  Shoulders: [{ name: "Overhead Press", emoji: "🏋️", sets: "4x8-10" }, { name: "Lateral Raise", emoji: "🦅", sets: "3x12" }, { name: "Front Raise", emoji: "🤷", sets: "3x12" }],
};
export default function ExerciseLibrary({ site }) {
  const [group, setGroup] = useState("Chest");
  return (
    <div className={styles.container}>
      <div className={styles.header}><div className={styles.icon}>{site.icon}</div><div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div></div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 25, flexWrap: "wrap" }}>
        {Object.keys(EXERCISES).map(g => <button key={g} onClick={() => setGroup(g)} className={styles.button} style={{ background: group === g ? site.color : "rgba(255,255,255,0.05)" }}>{g}</button>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 15, maxWidth: 800, margin: "0 auto" }}>
        {EXERCISES[group].map(e => (
          <div key={e.name} className={styles.card} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>{e.emoji}</div>
            <h3 style={{ marginBottom: 5 }}>{e.name}</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.5 }}>{e.sets}</p>
            <p style={{ fontSize: "0.75rem", opacity: 0.4, marginTop: 5 }}>Target: {group}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
