"use client";
import { useState, useCallback } from "react";
import styles from "./site.module.css";

const EMOJIS = ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🦁","🐯","🦄"];

function shuffle(arr) { return [...arr].sort(()=>Math.random()-0.5); }

export default function MemoryCardGame() {
  const [cards, setCards] = useState(()=>shuffle([...EMOJIS,...EMOJIS].map((e,i)=>({id:i,emoji:e,flipped:false,matched:false}))));
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [locked, setLocked] = useState(false);

  const flip = useCallback((id)=>{
    if(locked)return;
    const card=cards.find(c=>c.id===id);
    if(!card||card.flipped||card.matched)return;
    const newFlipped=[...flipped,id];
    setCards(cs=>cs.map(c=>c.id===id?{...c,flipped:true}:c));
    if(newFlipped.length===2){
      setMoves(m=>m+1);
      setLocked(true);
      const [a,b]=newFlipped.map(fid=>cards.find(c=>c.id===fid));
      if(a.emoji===b.emoji){
        setCards(cs=>cs.map(c=>newFlipped.includes(c.id)?{...c,matched:true}:c));
        setMatches(m=>m+1);
        setFlipped([]); setLocked(false);
      } else {
        setTimeout(()=>{
          setCards(cs=>cs.map(c=>newFlipped.includes(c.id)?{...c,flipped:false}:c));
          setFlipped([]); setLocked(false);
        },900);
      }
    } else setFlipped(newFlipped);
  },[cards,flipped,locked]);

  const reset = ()=>{setCards(shuffle([...EMOJIS,...EMOJIS].map((e,i)=>({id:i,emoji:e,flipped:false,matched:false}))));setFlipped([]);setMoves(0);setMatches(0);setLocked(false);};
  const done = matches===EMOJIS.length;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🧠 Memory Card Game</h1>
        <p className={styles.pageSub}>Flip cards and match pairs to win!</p>
      </div>
      <div className={styles.container} style={{maxWidth:500,textAlign:"center"}}>
        <div style={{display:"flex",gap:24,justifyContent:"center",marginBottom:20}}>
          {[["Moves",moves,"#a5b4fc"],["Pairs",`${matches}/${EMOJIS.length}`,"#4ade80"]].map(([l,v,c])=>(
            <div key={l}><div style={{fontSize:"1.8rem",fontWeight:800,color:c}}>{v}</div><div style={{fontSize:"0.72rem",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div></div>
          ))}
        </div>

        {done&&<div style={{padding:"14px",background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:12,marginBottom:16,color:"#4ade80",fontWeight:700,fontSize:"1.1rem"}}>🎉 You won in {moves} moves!</div>}

        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,marginBottom:16}}>
          {cards.map(card=>(
            <button key={card.id} onClick={()=>flip(card.id)} style={{
              aspectRatio:"1",borderRadius:10,fontSize:"1.5rem",
              background:card.flipped||card.matched?"rgba(99,102,241,0.15)":"rgba(255,255,255,0.06)",
              border:`1px solid ${card.matched?"rgba(34,197,94,0.4)":card.flipped?"rgba(99,102,241,0.4)":"rgba(255,255,255,0.08)"}`,
              transition:"all 0.2s",cursor:card.flipped||card.matched?"default":"pointer",
              transform:card.flipped||card.matched?"rotateY(0)":"",
            }}>
              {card.flipped||card.matched?card.emoji:"?"}
            </button>
          ))}
        </div>
        <button onClick={reset} className={styles.btn}>🔀 New Game</button>
      </div>
    </div>
  );
}
