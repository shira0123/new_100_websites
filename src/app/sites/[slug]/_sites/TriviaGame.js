"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

export default function TriviaGame({ site }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true); setCurrent(0); setScore(0); setSelected(null); setDone(false);
    try {
      const r = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
      const d = await r.json();
      setQuestions(d.results.map(q => {
        const answers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
        return { ...q, answers, question: q.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">") };
      }));
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchQuestions(); }, []);

  const answer = (a) => {
    if (selected) return;
    setSelected(a);
    if (a === questions[current].correct_answer) setScore(s => s + 1);
    setTimeout(() => {
      if (current + 1 < questions.length) { setCurrent(c => c + 1); setSelected(null); }
      else setDone(true);
    }, 1500);
  };

  const q = questions[current];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      {loading ? <div style={{ textAlign: "center", padding: 60 }}><div className={styles.spinner} /><p>Loading questions...</p></div> : done ? (
        <div className={styles.card} style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: 10 }}>{score >= 7 ? "🏆" : score >= 4 ? "👍" : "😅"}</div>
          <h2>Score: {score}/{questions.length}</h2>
          <p style={{ opacity: 0.6, margin: "10px 0 20px" }}>{score >= 7 ? "Excellent!" : score >= 4 ? "Good job!" : "Keep practicing!"}</p>
          <button onClick={fetchQuestions} className={styles.button} style={{ background: site.color }}>Play Again</button>
        </div>
      ) : q && (
        <div className={styles.card} style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15, fontSize: "0.8rem", opacity: 0.5 }}>
            <span>Question {current + 1}/{questions.length}</span><span>Score: {score}</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.1)", marginBottom: 20 }}>
            <div style={{ height: "100%", borderRadius: 2, width: `${((current + 1) / questions.length) * 100}%`, background: site.color, transition: "width 0.3s" }} />
          </div>
          <h3 style={{ marginBottom: 20, lineHeight: 1.5 }}>{q.question}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.answers.map(a => {
              let bg = "rgba(255,255,255,0.05)";
              if (selected) { if (a === q.correct_answer) bg = "#22c55e33"; else if (a === selected) bg = "#ef444433"; }
              return <button key={a} onClick={() => answer(a)} className={styles.button} style={{ background: bg, textAlign: "left", padding: "12px 16px" }} disabled={!!selected}>{a.replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&amp;/g,"&")}</button>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
