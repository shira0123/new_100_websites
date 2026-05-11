"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./site.module.css";

const CELL = 20, COLS = 25, ROWS = 20;
const DIR = { ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0] };

function randFood(snake) {
  let pos;
  do { pos = [Math.floor(Math.random()*COLS),Math.floor(Math.random()*ROWS)]; }
  while(snake.some(s=>s[0]===pos[0]&&s[1]===pos[1]));
  return pos;
}

export default function SnakeGame() {
  const [snake, setSnake] = useState([[12,10],[11,10],[10,10]]);
  const [dir, setDir] = useState([1,0]);
  const [food, setFood] = useState([18,10]);
  const [running, setRunning] = useState(false);
  const [dead, setDead] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const dirRef = useRef([1,0]);
  const snakeRef = useRef([[12,10],[11,10],[10,10]]);
  const foodRef = useRef([18,10]);
  const gameRef = useRef(null);

  const reset = useCallback(()=>{
    const s=[[12,10],[11,10],[10,10]];
    const f=[18,10];
    snakeRef.current=s; foodRef.current=f; dirRef.current=[1,0];
    setSnake(s); setFood(f); setDir([1,0]);
    setDead(false); setScore(0); setRunning(false);
  },[]);

  useEffect(()=>{
    const onKey = e=>{
      const d=DIR[e.key];
      if(!d)return;
      e.preventDefault();
      const cur=dirRef.current;
      if(d[0]===-cur[0]&&d[1]===-cur[1])return;
      dirRef.current=d; setDir(d);
      if(!running&&!dead){setRunning(true);}
    };
    window.addEventListener("keydown",onKey);
    return()=>window.removeEventListener("keydown",onKey);
  },[running,dead]);

  useEffect(()=>{
    if(!running||dead)return;
    const interval=setInterval(()=>{
      const s=[...snakeRef.current];
      const head=[s[0][0]+dirRef.current[0],s[0][1]+dirRef.current[1]];
      if(head[0]<0||head[0]>=COLS||head[1]<0||head[1]>=ROWS||s.some(seg=>seg[0]===head[0]&&seg[1]===head[1])){
        setDead(true); setRunning(false); return;
      }
      const ate=head[0]===foodRef.current[0]&&head[1]===foodRef.current[1];
      const newSnake=[head,...(ate?s:s.slice(0,-1))];
      snakeRef.current=newSnake; setSnake([...newSnake]);
      if(ate){ const f=randFood(newSnake); foodRef.current=f; setFood(f); setScore(sc=>{const ns=sc+10;setBest(b=>Math.max(b,ns));return ns;}); }
    },150);
    return()=>clearInterval(interval);
  },[running,dead]);

  const W=COLS*CELL, H=ROWS*CELL;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🐍 Snake Game</h1>
        <p className={styles.pageSub}>Classic snake — use arrow keys to play</p>
      </div>
      <div className={styles.container} style={{maxWidth:560,textAlign:"center"}}>
        <div style={{display:"flex",gap:24,justifyContent:"center",marginBottom:16}}>
          <div><div style={{fontSize:"1.8rem",fontWeight:800,color:"#a5b4fc"}}>{score}</div><div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em"}}>Score</div></div>
          <div><div style={{fontSize:"1.8rem",fontWeight:800,color:"#fbbf24"}}>{best}</div><div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em"}}>Best</div></div>
        </div>

        <div ref={gameRef} style={{position:"relative",width:W,height:H,background:"#0f172a",border:"2px solid rgba(99,102,241,0.3)",borderRadius:12,margin:"0 auto 16px",overflow:"hidden",userSelect:"none"}}>
          {/* Grid lines subtle */}
          <svg style={{position:"absolute",inset:0,opacity:0.1}} width={W} height={H}>
            {Array.from({length:COLS+1},(_,i)=><line key={`v${i}`} x1={i*CELL} y1={0} x2={i*CELL} y2={H} stroke="#fff" strokeWidth={0.5}/>)}
            {Array.from({length:ROWS+1},(_,i)=><line key={`h${i}`} x1={0} y1={i*CELL} x2={W} y2={i*CELL} stroke="#fff" strokeWidth={0.5}/>)}
          </svg>
          {/* Snake */}
          {snake.map((seg,i)=>(
            <div key={i} style={{position:"absolute",left:seg[0]*CELL,top:seg[1]*CELL,width:CELL-1,height:CELL-1,background:i===0?"#a5b4fc":"#6366f1",borderRadius:i===0?6:3,transition:"none"}}/>
          ))}
          {/* Food */}
          <div style={{position:"absolute",left:food[0]*CELL,top:food[1]*CELL,width:CELL-1,height:CELL-1,background:"#ef4444",borderRadius:"50%",boxShadow:"0 0 8px #ef4444"}}/>
          {/* Overlay */}
          {(!running||dead)&&(
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.7)",borderRadius:12}}>
              <div style={{fontSize:"2rem",marginBottom:8}}>{dead?"💀":"🐍"}</div>
              <div style={{color:"#f1f5f9",fontWeight:700,fontSize:"1.1rem",marginBottom:16}}>{dead?`Game Over! Score: ${score}`:"Press arrow key or Start to play"}</div>
              <button onClick={()=>{if(dead)reset();setRunning(true);}} className={styles.btn}>{dead?"↺ Restart":"▶ Start"}</button>
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,width:130,margin:"0 auto"}}>
          {[["","↑","",0,-1],["←","","→"],["","↓","",0,1]].map((row,ri)=>(
            row.map((cell,ci)=>cell?(
              <button key={`${ri}${ci}`} onPointerDown={()=>{const d={["↑"]:[0,-1],["↓"]:[0,1],["←"]:[-1,0],["→"]:[1,0]}[cell];if(d&&!(d[0]===-dirRef.current[0]&&d[1]===-dirRef.current[1])){dirRef.current=d;setDir(d);if(!running&&!dead)setRunning(true);}}} style={{height:36,borderRadius:8,background:"rgba(99,102,241,0.15)",border:"1px solid rgba(99,102,241,0.3)",color:"#a5b4fc",fontWeight:700,fontSize:"1.1rem",gridColumn:ci+1,gridRow:ri+1}}>{cell}</button>
            ):<div key={`${ri}${ci}`} style={{gridColumn:ci+1,gridRow:ri+1}}/>)
          ))}
        </div>
      </div>
    </div>
  );
}
