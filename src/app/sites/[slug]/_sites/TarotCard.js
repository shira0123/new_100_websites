"use client";
import { useState } from "react";
import styles from "./site.module.css";

const CARDS = [
  {name:"The Fool",emoji:"🃏",upright:"New beginnings, innocence, adventure",reversed:"Recklessness, naïvety, risk"},
  {name:"The Magician",emoji:"🪄",upright:"Willpower, desire, creation, manifestation",reversed:"Manipulation, trickery, wasted talent"},
  {name:"The High Priestess",emoji:"🌙",upright:"Intuition, sacred knowledge, divine feminine",reversed:"Secrets, disconnected from intuition"},
  {name:"The Empress",emoji:"👑",upright:"Femininity, beauty, nature, nurturing",reversed:"Creative block, dependence, stagnation"},
  {name:"The Emperor",emoji:"⚡",upright:"Authority, establishment, structure",reversed:"Domination, excessive control, rigidity"},
  {name:"The Hierophant",emoji:"✝️",upright:"Spiritual wisdom, tradition, conformity",reversed:"Rebellion, subversiveness, new approaches"},
  {name:"The Lovers",emoji:"💕",upright:"Love, harmony, relationships, choices",reversed:"Disharmony, imbalance, misalignment"},
  {name:"The Chariot",emoji:"🏆",upright:"Control, willpower, victory, assertion",reversed:"Lack of control, opposition, aggression"},
  {name:"Strength",emoji:"🦁",upright:"Strength, courage, persuasion, patience",reversed:"Inner strength, self-doubt, low energy"},
  {name:"The Hermit",emoji:"🔦",upright:"Soul searching, introspection, inner guidance",reversed:"Isolation, loneliness, lost your way"},
  {name:"Wheel of Fortune",emoji:"🎡",upright:"Good luck, karma, life cycles, destiny",reversed:"Bad luck, lack of control, clinging"},
  {name:"Justice",emoji:"⚖️",upright:"Justice, fairness, truth, cause and effect",reversed:"Unfairness, lack of accountability"},
  {name:"The Star",emoji:"⭐",upright:"Hope, faith, purpose, renewal, spirituality",reversed:"Lack of faith, despair, discouragement"},
  {name:"The Moon",emoji:"🌕",upright:"Illusion, fear, the unconscious, intuition",reversed:"Release of fear, repressed emotion"},
  {name:"The Sun",emoji:"☀️",upright:"Positivity, fun, warmth, success, vitality",reversed:"Inner child, feeling down, overly optimistic"},
  {name:"The World",emoji:"🌍",upright:"Completion, integration, accomplishment",reversed:"Seeking closure, incomplete, no closure"},
  {name:"The Tower",emoji:"⚡",upright:"Sudden change, upheaval, revelation",reversed:"Fear of change, averting disaster"},
  {name:"Judgement",emoji:"📯",upright:"Judgement, rebirth, inner calling",reversed:"Self-doubt, inner critic, ignoring the call"},
  {name:"The Lovers",emoji:"💞",upright:"Soulmate, connection, duality",reversed:"Broken relationships, trust issues"},
  {name:"Temperance",emoji:"🌊",upright:"Balance, moderation, patience, purpose",reversed:"Imbalance, excess, self-healing"},
  {name:"The Devil",emoji:"😈",upright:"Shadow self, attachment, addiction, restriction",reversed:"Releasing limiting beliefs, exploring dark thoughts"},
  {name:"The Hanged Man",emoji:"⏸️",upright:"Pause, surrender, letting go, new perspectives",reversed:"Delays, resistance, stalling"},
];

export default function TarotCard() {
  const [card, setCard] = useState(null);
  const [reversed, setReversed] = useState(false);
  const [drawing, setDrawing] = useState(false);

  const draw = () => {
    setDrawing(true);
    setTimeout(()=>{
      setCard(CARDS[Math.floor(Math.random()*CARDS.length)]);
      setReversed(Math.random()<0.3);
      setDrawing(false);
    },600);
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🔯 Daily Tarot Card</h1>
        <p className={styles.pageSub}>Draw a daily tarot card for guidance and inspiration</p>
      </div>
      <div className={styles.container} style={{maxWidth:480,textAlign:"center"}}>
        <div style={{
          width:200,height:280,margin:"0 auto 28px",borderRadius:20,
          background:card?`linear-gradient(135deg, #2e1065, #4c1d95)`:"rgba(255,255,255,0.04)",
          border:"2px solid rgba(139,92,246,0.3)",display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",
          transform:drawing?"scale(0.9)":card&&reversed?"rotate(180deg)":"rotate(0deg)",
          transition:"all 0.5s cubic-bezier(0.4,0,0.2,1)",
          boxShadow:card?"0 20px 60px rgba(139,92,246,0.3)":"none",cursor:"pointer"
        }} onClick={card?draw:undefined}>
          {drawing ? (
            <div style={{fontSize:"3rem",animation:"spin 0.6s linear"}}>🔮</div>
          ) : card ? (
            <>
              <div style={{fontSize:"3.5rem",marginBottom:12}}>{card.emoji}</div>
              <div style={{fontSize:"0.95rem",fontWeight:700,color:"#e9d5ff",padding:"0 16px",transform:reversed?"rotate(180deg)":"none"}}>{card.name}</div>
              {reversed&&<div style={{fontSize:"0.72rem",color:"#a78bfa",marginTop:6,transform:"rotate(180deg)"}}>REVERSED</div>}
            </>
          ) : (
            <div style={{color:"#64748b"}}>Click to draw</div>
          )}
        </div>

        <button onClick={draw} className={styles.btn} style={{background:"linear-gradient(135deg,#7c3aed,#a855f7)",marginBottom:24}}>
          {drawing?"🌀 Drawing…":"🎴 Draw a Card"}
        </button>

        {card&&!drawing&&(
          <div style={{padding:"24px",background:"rgba(139,92,246,0.08)",border:"1px solid rgba(139,92,246,0.25)",borderRadius:16,textAlign:"left"}}>
            <div style={{fontSize:"1.1rem",fontWeight:700,color:"#c4b5fd",marginBottom:12}}>{card.name} {reversed?"(Reversed)":"(Upright)"}</div>
            <div style={{fontSize:"0.9rem",color:"#94a3b8",lineHeight:1.7}}>
              <strong style={{color:"#a5b4fc"}}>Meaning: </strong>
              {reversed?card.reversed:card.upright}
            </div>
            <div style={{marginTop:12,padding:"10px 14px",background:"rgba(99,102,241,0.1)",borderRadius:10,fontSize:"0.82rem",color:"#64748b"}}>
              💡 Reflect on this card's energy as you go through your day
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
