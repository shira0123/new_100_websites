"use client";
import { useState } from "react";
import styles from "./site.module.css";

const QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "An unexamined life is not worth living.", author: "Socrates" },
  { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
  { text: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead" },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
  { text: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
  { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas Edison" },
  { text: "You have brains in your head. You have feet in your shoes. You can steer yourself in any direction you choose.", author: "Dr. Seuss" },
  { text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
  { text: "If you look at what you have in life, you'll always have more.", author: "Oprah Winfrey" },
  { text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
  { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { text: "Money and success don't change people; they merely amplify what is already there.", author: "Will Smith" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "Not how long, but how well you have lived is the main thing.", author: "Seneca" },
  { text: "If life were predictable it would cease to be life.", author: "Eleanor Roosevelt" },
  { text: "The whole secret of a successful life is to find out what is one's destiny to do, and then do it.", author: "Henry Ford" },
];

const COLORS = ["#6366f1","#8b5cf6","#ec4899","#0ea5e9","#10b981","#f59e0b","#ef4444","#14b8a6"];

export default function RandomQuote() {
  const [idx, setIdx] = useState(0);
  const [color, setColor] = useState(COLORS[0]);
  const [copied, setCopied] = useState(false);
  const quote = QUOTES[idx];

  const next = () => {
    const newIdx = Math.floor(Math.random() * QUOTES.length);
    setIdx(newIdx);
    setColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
  };

  const copy = () => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>💬 Random Quote Generator</h1>
        <p className={styles.pageSub}>Get inspired with curated random quotes</p>
      </div>
      <div className={styles.container} style={{ maxWidth: 680 }}>
        <div style={{
          padding: "40px 36px", borderRadius: 20,
          background: `linear-gradient(135deg, ${color}18, transparent)`,
          border: `1px solid ${color}44`,
          textAlign: "center", marginBottom: 24, minHeight: 220,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20
        }}>
          <div style={{ fontSize: "3rem", color, lineHeight: 1 }}>"</div>
          <blockquote style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)", color: "#e2e8f0", lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>
            {quote.text}
          </blockquote>
          <cite style={{ fontSize: "0.9rem", color, fontStyle: "normal", fontWeight: 600 }}>
            — {quote.author}
          </cite>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={next} className={styles.btn} style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)` }}>
            🎲 New Quote
          </button>
          <button onClick={copy} style={{
            padding: "12px 24px", borderRadius: 12,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#94a3b8", fontWeight: 600
          }}>
            {copied ? "✓ Copied!" : "📋 Copy"}
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: "0.78rem", color: "#334155" }}>
          Quote {idx + 1} of {QUOTES.length}
        </p>
      </div>
    </div>
  );
}
