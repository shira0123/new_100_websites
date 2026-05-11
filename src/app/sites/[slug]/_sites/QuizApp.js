"use client";
import { useState, useCallback } from "react";
import styles from "./site.module.css";

const QUESTIONS = [
  {q:"What is the capital of Australia?",opts:["Sydney","Melbourne","Canberra","Perth"],ans:2},
  {q:"Which planet is the largest in our solar system?",opts:["Saturn","Jupiter","Uranus","Neptune"],ans:1},
  {q:"What year did World War II end?",opts:["1943","1944","1945","1946"],ans:2},
  {q:"Which element has the chemical symbol 'Au'?",opts:["Silver","Platinum","Gold","Aluminum"],ans:2},
  {q:"How many bones are in the adult human body?",opts:["196","206","216","226"],ans:1},
  {q:"What is the square root of 144?",opts:["10","11","12","13"],ans:2},
  {q:"Who painted the Mona Lisa?",opts:["Michelangelo","Raphael","Leonardo da Vinci","Donatello"],ans:2},
  {q:"What is the world's largest ocean?",opts:["Atlantic","Indian","Arctic","Pacific"],ans:3},
  {q:"Which programming language was created by Guido van Rossum?",opts:["Ruby","Python","Perl","Go"],ans:1},
  {q:"What is the speed of light (approx)?",opts:["200,000 km/s","299,792 km/s","350,000 km/s","150,000 km/s"],ans:1},
  {q:"Which country has the most natural lakes?",opts:["Russia","Brazil","USA","Canada"],ans:3},
  {q:"What is the smallest prime number?",opts:["0","1","2","3"],ans:2},
  {q:"In what year was the World Wide Web invented?",opts:["1985","1989","1991","1994"],ans:1},
  {q:"Which gas is most abundant in Earth's atmosphere?",opts:["Oxygen","Carbon Dioxide","Nitrogen","Argon"],ans:2},
  {q:"What is the largest continent by area?",opts:["Africa","North America","Asia","Antarctica"],ans:2},
];

export default function QuizApp() {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = QUESTIONS[qIdx];

  const pick = (i) => {
    if(selected!==null)return;
    setSelected(i);
    const correct = i===q.ans;
    if(correct) setScore(s=>s+1);
    setAnswers(a=>[...a,{correct,chosen:i,answer:q.ans}]);
    setTimeout(()=>{
      if(qIdx+1>=QUESTIONS.length){ setDone(true); }
      else { setQIdx(qi=>qi+1); setSelected(null); }
    },800);
  };

  const reset = () => { setQIdx(0);setSelected(null);setScore(0);setDone(false);setAnswers([]); };
  const pct = Math.round(score/QUESTIONS.length*100);

  if(done) return (
    <div className={styles.page}>
      <div className={styles.hero}><h1 className={styles.pageTitle}>🧪 Quiz Results</h1></div>
      <div className={styles.container} style={{maxWidth:500,textAlign:"center"}}>
        <div style={{fontSize:"5rem",marginBottom:12}}>{pct>=80?"🏆":pct>=60?"👏":"📚"}</div>
        <div style={{fontSize:"3rem",fontWeight:900,color:"#a5b4fc"}}>{score}/{QUESTIONS.length}</div>
        <div style={{fontSize:"1.1rem",color:"#64748b",marginBottom:24}}>{pct}% correct</div>
        <div style={{marginBottom:24,display:"flex",flexDirection:"column",gap:4}}>
          {answers.map((a,i)=>(
            <div key={i} style={{display:"flex",gap:10,padding:"8px 14px",background:"rgba(255,255,255,0.03)",borderRadius:8,fontSize:"0.85rem"}}>
              <span style={{color:a.correct?"#4ade80":"#fca5a5"}}>{a.correct?"✓":"✗"}</span>
              <span style={{color:"#64748b",flex:1,textAlign:"left"}}>{QUESTIONS[i].q.slice(0,40)}…</span>
              <span style={{color:a.correct?"#4ade80":"#fca5a5"}}>{QUESTIONS[i].opts[a.answer]}</span>
            </div>
          ))}
        </div>
        <button onClick={reset} className={styles.btn}>🔄 Play Again</button>
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🧪 Quiz App</h1>
        <p className={styles.pageSub}>Test your general knowledge</p>
      </div>
      <div className={styles.container} style={{maxWidth:580}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:"0.82rem",color:"#64748b"}}>
          <span>Question {qIdx+1} of {QUESTIONS.length}</span>
          <span>Score: {score}</span>
        </div>
        <div style={{height:4,background:"rgba(255,255,255,0.08)",borderRadius:99,marginBottom:20}}>
          <div style={{height:"100%",background:"linear-gradient(90deg,#6366f1,#8b5cf6)",borderRadius:99,width:`${(qIdx)/QUESTIONS.length*100}%`,transition:"width 0.3s"}} />
        </div>

        <div style={{padding:"24px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,marginBottom:20,fontSize:"1.05rem",color:"#e2e8f0",lineHeight:1.5}}>
          {q.q}
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {q.opts.map((opt,i)=>{
            let bg="rgba(255,255,255,0.04)",border="rgba(255,255,255,0.08)",color="#e2e8f0";
            if(selected!==null){
              if(i===q.ans){bg="rgba(34,197,94,0.15)";border="rgba(34,197,94,0.4)";color="#4ade80";}
              else if(i===selected&&selected!==q.ans){bg="rgba(239,68,68,0.15)";border="rgba(239,68,68,0.4)";color="#fca5a5";}
            }
            return (
              <button key={i} onClick={()=>pick(i)} style={{
                padding:"14px 18px",background:bg,border:`1px solid ${border}`,borderRadius:12,
                color,fontSize:"0.95rem",textAlign:"left",cursor:selected!==null?"default":"pointer",
                transition:"all 0.2s",fontFamily:"inherit"
              }}>
                <span style={{opacity:0.5,marginRight:10,fontWeight:600}}>{String.fromCharCode(65+i)}.</span>{opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
