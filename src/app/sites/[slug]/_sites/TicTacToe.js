"use client";
import { useState, useCallback } from "react";
import styles from "./site.module.css";

const WIN = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function checkWin(board, player) {
  return WIN.some(combo => combo.every(i => board[i] === player));
}

function minimax(board, isMax) {
  if(checkWin(board,"O")) return 1;
  if(checkWin(board,"X")) return -1;
  const empty = board.map((v,i)=>v?null:i).filter(v=>v!==null);
  if(!empty.length) return 0;
  let best = isMax ? -Infinity : Infinity;
  for(const i of empty) {
    board[i] = isMax ? "O" : "X";
    const score = minimax(board, !isMax);
    board[i] = null;
    best = isMax ? Math.max(best,score) : Math.min(best,score);
  }
  return best;
}

function bestMove(board) {
  let best=-Infinity, move=-1;
  board.forEach((_,i)=>{ if(!board[i]){ board[i]="O"; const s=minimax(board,false); board[i]=null; if(s>best){best=s;move=i;} }});
  return move;
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [mode, setMode] = useState("vs-ai");
  const [scores, setScores] = useState({X:0,O:0,D:0});

  const winner = WIN.find(c=>board[c[0]]&&board[c[0]]===board[c[1]]&&board[c[1]]===board[c[2]]);
  const winPlayer = winner ? board[winner[0]] : null;
  const draw = !winPlayer && board.every(Boolean);
  const over = !!winPlayer || draw;

  const click = useCallback((i) => {
    if(board[i]||over) return;
    const nb=[...board]; nb[i]=xTurn?"X":"O";
    setBoard(nb);
    const w=WIN.find(c=>nb[c[0]]&&nb[c[0]]===nb[c[1]]&&nb[c[1]]===nb[c[2]]);
    if(w){setScores(s=>({...s,[nb[w[0]]]:s[nb[w[0]]]+1}));return;}
    if(nb.every(Boolean)){setScores(s=>({...s,D:s.D+1}));return;}
    if(mode==="vs-ai") {
      const m=bestMove(nb);
      nb[m]="O";
      const w2=WIN.find(c=>nb[c[0]]&&nb[c[0]]===nb[c[1]]&&nb[c[1]]===nb[c[2]]);
      if(w2) setScores(s=>({...s,[nb[w2[0]]]:s[nb[w2[0]]]+1}));
      else if(nb.every(Boolean)) setScores(s=>({...s,D:s.D+1}));
      setBoard(nb);
    } else setXTurn(t=>!t);
  },[board,over,xTurn,mode]);

  const reset = ()=>{setBoard(Array(9).fill(null));setXTurn(true);};

  const status = winPlayer?`${winPlayer} wins! 🎉`:draw?"It's a draw! 🤝":mode==="vs-ai"?`Your turn (X)`:`${xTurn?"X":"O"}'s turn`;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>❌ Tic Tac Toe</h1>
        <p className={styles.pageSub}>Play against a friend or the unbeatable AI</p>
      </div>
      <div className={styles.container} style={{maxWidth:420,textAlign:"center"}}>
        <div className={styles.harmonyRow} style={{justifyContent:"center",marginBottom:20}}>
          <button onClick={()=>{setMode("vs-ai");reset();}} className={`${styles.harmonyBtn} ${mode==="vs-ai"?styles.harmonyActive:""}`}>vs AI 🤖</button>
          <button onClick={()=>{setMode("vs-human");reset();}} className={`${styles.harmonyBtn} ${mode==="vs-human"?styles.harmonyActive:""}`}>vs Friend 👥</button>
        </div>

        <div style={{display:"flex",justifyContent:"center",gap:32,marginBottom:20}}>
          {[["X","You","#a5b4fc"],["D","Draw","#64748b"],["O",mode==="vs-ai"?"AI":"O","#fb7185"]].map(([k,l,c])=>(
            <div key={k}><div style={{fontSize:"1.6rem",fontWeight:800,color:c}}>{scores[k]}</div><div style={{fontSize:"0.72rem",color:"#64748b"}}>{l}</div></div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20}}>
          {board.map((cell,i)=>{
            const isWin=winner?.includes(i);
            return (
              <button key={i} onClick={()=>click(i)} style={{
                height:100,borderRadius:12,fontSize:"2.5rem",fontWeight:900,
                background:isWin?"rgba(99,102,241,0.2)":"rgba(255,255,255,0.04)",
                border:`1px solid ${isWin?"#6366f1":"rgba(255,255,255,0.08)"}`,
                color:cell==="X"?"#a5b4fc":"#fb7185",transition:"all 0.2s",
                cursor:cell||over?"default":"pointer"
              }}>{cell||""}</button>
            );
          })}
        </div>

        <p style={{color: winPlayer?"#a5b4fc":draw?"#fbbf24":"#94a3b8",fontWeight:600,fontSize:"1rem",marginBottom:16}}>{status}</p>
        <button onClick={reset} className={styles.btn}>↺ New Game</button>
      </div>
    </div>
  );
}
