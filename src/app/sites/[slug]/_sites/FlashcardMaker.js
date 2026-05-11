"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

const STORAGE_KEY = "flashcards-v1";

export default function FlashcardMaker() {
  const [decks, setDecks] = useState([]);
  const [activeDeck, setActiveDeck] = useState(null);
  const [studyMode, setStudyMode] = useState(false);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");
  const [view, setView] = useState("home"); // home | deck | study

  useEffect(() => { try { const s = localStorage.getItem(STORAGE_KEY); if (s) setDecks(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(decks)); } catch {} }, [decks]);

  const addDeck = () => {
    if (!newDeckName.trim()) return;
    setDecks(d => [...d, { id: Date.now(), name: newDeckName.trim(), cards: [] }]);
    setNewDeckName("");
  };

  const addCard = (deckId) => {
    if (!newFront.trim() || !newBack.trim()) return;
    setDecks(d => d.map(deck => deck.id === deckId ? { ...deck, cards: [...deck.cards, { id: Date.now(), front: newFront.trim(), back: newBack.trim() }] } : deck));
    setNewFront(""); setNewBack("");
  };

  const delCard = (deckId, cardId) => setDecks(d => d.map(dk => dk.id === deckId ? { ...dk, cards: dk.cards.filter(c => c.id !== cardId) } : dk));
  const delDeck = (deckId) => { setDecks(d => d.filter(dk => dk.id !== deckId)); setView("home"); };

  const deck = decks.find(d => d.id === activeDeck);
  const card = deck?.cards[cardIdx];

  if (view === "study" && deck) {
    return (
      <div className={styles.page}>
        <div className={styles.hero}>
          <h1 className={styles.pageTitle}>🃏 Studying: {deck.name}</h1>
          <p className={styles.pageSub}>{cardIdx + 1} / {deck.cards.length}</p>
        </div>
        <div className={styles.container} style={{ maxWidth: 560, textAlign: "center" }}>
          <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 99, marginBottom: 28 }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg,#6366f1,#22c55e)", width: `${(cardIdx + 1) / deck.cards.length * 100}%`, borderRadius: 99, transition: "width 0.3s" }} />
          </div>

          {card ? (
            <>
              <div onClick={() => setFlipped(f => !f)} style={{
                minHeight: 240, padding: "40px 32px", background: flipped ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${flipped ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column", gap: 12, transition: "all 0.3s", marginBottom: 24
              }}>
                <div style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>{flipped ? "Answer" : "Question"}</div>
                <div style={{ fontSize: "1.2rem", color: flipped ? "#a5b4fc" : "#f1f5f9", lineHeight: 1.5, textAlign: "center" }}>
                  {flipped ? card.back : card.front}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#334155", marginTop: 8 }}>Click to {flipped ? "see question" : "reveal answer"}</div>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button onClick={() => { setCardIdx(i => Math.max(0, i - 1)); setFlipped(false); }} style={{ padding: "12px 20px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", fontWeight: 600 }}>← Prev</button>
                <button onClick={() => { setFlipped(f => !f); }} className={styles.btn}>Flip</button>
                {cardIdx < deck.cards.length - 1
                  ? <button onClick={() => { setCardIdx(i => i + 1); setFlipped(false); }} style={{ padding: "12px 20px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", fontWeight: 600 }}>Next →</button>
                  : <button onClick={() => { setCardIdx(0); setFlipped(false); }} className={styles.btn} style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)" }}>🔄 Restart</button>}
              </div>
            </>
          ) : <p style={{ color: "#64748b" }}>No cards in this deck.</p>}

          <button onClick={() => { setView("deck"); setFlipped(false); setCardIdx(0); }} style={{ marginTop: 20, padding: "10px 20px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}>← Back to Deck</button>
        </div>
      </div>
    );
  }

  if (view === "deck" && deck) {
    return (
      <div className={styles.page}>
        <div className={styles.hero}>
          <h1 className={styles.pageTitle}>🃏 {deck.name}</h1>
          <p className={styles.pageSub}>{deck.cards.length} card{deck.cards.length !== 1 ? "s" : ""}</p>
        </div>
        <div className={styles.container} style={{ maxWidth: 620 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            <button onClick={() => { setCardIdx(0); setFlipped(false); setView("study"); }} className={styles.btn} disabled={deck.cards.length === 0}>📖 Study Now</button>
            <button onClick={() => delDeck(deck.id)} style={{ padding: "12px 20px", borderRadius: 12, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5", fontWeight: 600 }}>🗑️ Delete Deck</button>
            <button onClick={() => setView("home")} style={{ padding: "12px 20px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", fontWeight: 600 }}>← Back</button>
          </div>
          <div className={styles.controls}>
            <div className={styles.gradientControls}>
              <div className={styles.controlGroup}><label className={styles.label}>Front (Question)</label><input value={newFront} onChange={e => setNewFront(e.target.value)} className={styles.input} placeholder="e.g. What is React?" /></div>
              <div className={styles.controlGroup}><label className={styles.label}>Back (Answer)</label><input value={newBack} onChange={e => setNewBack(e.target.value)} className={styles.input} placeholder="e.g. A JavaScript UI library" /></div>
            </div>
            <button onClick={() => addCard(deck.id)} className={styles.btn}>+ Add Card</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            {deck.cards.map(card => (
              <div key={card.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 12, padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }}>
                <div style={{ fontSize: "0.9rem", color: "#e2e8f0" }}>{card.front}</div>
                <div style={{ fontSize: "0.9rem", color: "#a5b4fc" }}>{card.back}</div>
                <button onClick={() => delCard(deck.id, card.id)} style={{ color: "#475569", fontSize: "1.1rem" }} onMouseOver={e => e.target.style.color = "#fca5a5"} onMouseOut={e => e.target.style.color = "#475569"}>×</button>
              </div>
            ))}
            {deck.cards.length === 0 && <p style={{ color: "#475569", textAlign: "center", padding: 20 }}>No cards yet — add some above!</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🃏 Flashcard Maker</h1>
        <p className={styles.pageSub}>Create and study flashcard decks in your browser</p>
      </div>
      <div className={styles.container} style={{ maxWidth: 620 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <input value={newDeckName} onChange={e => setNewDeckName(e.target.value)} onKeyDown={e => e.key === "Enter" && addDeck()} className={styles.input} placeholder="New deck name (e.g. JavaScript Basics)…" style={{ flex: 1 }} />
          <button onClick={addDeck} className={styles.btn} style={{ flexShrink: 0 }}>+ Create Deck</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
          {decks.length === 0 && <p style={{ color: "#475569", gridColumn: "1/-1", textAlign: "center", padding: 40 }}>No decks yet — create one above!</p>}
          {decks.map(dk => (
            <div key={dk.id} onClick={() => { setActiveDeck(dk.id); setView("deck"); }} style={{ padding: "20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, cursor: "pointer", transition: "all 0.2s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"} onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>🃏</div>
              <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{dk.name}</div>
              <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{dk.cards.length} card{dk.cards.length !== 1 ? "s" : ""}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
