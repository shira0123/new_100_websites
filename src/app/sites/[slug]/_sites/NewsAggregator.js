"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

const CATEGORIES = ["General", "Technology", "Business", "Science", "Health", "Entertainment"];

const MOCK_NEWS = [
  { id: 1, category: "Technology", title: "New Quantum Processor Reaches Record Stability", summary: "Researchers have achieved a breakthrough in quantum coherence, paving the way for more reliable quantum computers.", date: "2 hours ago", source: "TechDaily" },
  { id: 2, category: "Business", title: "Global Markets Rally Amid Inflation Ease", summary: "Stock indices across Asia and Europe saw significant gains today as new economic data suggests inflation is cooling faster than expected.", date: "4 hours ago", source: "FinTimes" },
  { id: 3, category: "Science", title: "Mars Rover Discovers Ancient Organic Molecules", summary: "The latest samples collected from the Jezero Crater contain complex carbon-based molecules, suggesting a habitable past for the Red Planet.", date: "6 hours ago", source: "SpaceExplorer" },
  { id: 4, category: "Health", title: "Universal Flu Vaccine Enters Phase 3 Trials", summary: "A revolutionary vaccine designed to protect against all known strains of influenza has moved into final testing stages with promising results.", date: "8 hours ago", source: "HealthLine" },
  { id: 5, category: "Technology", title: "AI-Powered Coding Assistants Reach New Heights", summary: "The latest generation of large language models is now capable of architecting entire enterprise systems from simple natural language prompts.", date: "10 hours ago", source: "DevWorld" },
  { id: 6, category: "General", title: "Renewable Energy Surpasses Coal in Global Power Mix", summary: "For the first time in history, wind and solar combined have generated more electricity than coal-fired power plants worldwide.", date: "12 hours ago", source: "GlobalNews" },
];

export default function NewsAggregator({ site }) {
  const [activeCategory, setActiveCategory] = useState("General");
  const [news, setNews] = useState(MOCK_NEWS);
  const [loading, setLoading] = useState(false);

  const filterNews = (category) => {
    setLoading(true);
    setActiveCategory(category);
    // Simulate API fetch
    setTimeout(() => {
      if (category === "General") {
        setNews(MOCK_NEWS);
      } else {
        setNews(MOCK_NEWS.filter(n => n.category === category));
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div>
          <h1 className={styles.title}>{site.title}</h1>
          <p className={styles.description}>{site.description}</p>
        </div>
      </div>

      <div className={styles.controls} style={{ marginBottom: "30px", justifyContent: "center" }}>
        <div className={styles.typeFilter} style={{ overflowX: "auto", paddingBottom: "10px" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => filterNews(cat)}
              className={`${styles.typeBtn} ${activeCategory === cat ? styles.typeActive : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "100px" }}>
          <div className={styles.spinner}></div>
          <p>Fetching latest headlines...</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {news.length > 0 ? (
            news.map(item => (
              <div key={item.id} className={styles.card} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                    <span style={{ 
                      fontSize: "0.7rem", 
                      background: site.color + "22", 
                      color: site.color, 
                      padding: "2px 8px", 
                      borderRadius: "10px",
                      fontWeight: "bold"
                    }}>
                      {item.category.toUpperCase()}
                    </span>
                    <span style={{ fontSize: "0.7rem", opacity: 0.5 }}>{item.date}</span>
                  </div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "10px", lineHeight: "1.4" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "20px" }}>{item.summary}</p>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>{item.source}</span>
                  <button className={styles.button} style={{ padding: "5px 12px", fontSize: "0.8rem" }}>Read More</button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px", opacity: 0.5 }}>
              <p>No news found in this category.</p>
              <button onClick={() => filterNews("General")} className={styles.button} style={{ marginTop: "15px" }}>Back to General</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
