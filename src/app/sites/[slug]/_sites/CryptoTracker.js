"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

export default function CryptoTracker({ site }) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h"
      );
      if (!res.ok) throw new Error("Failed to fetch price data");
      const data = await res.json();
      setCoins(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div>
          <h1 className={styles.title}>{site.title}</h1>
          <p className={styles.description}>{site.description}</p>
        </div>
      </div>

      <div className={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", gap: "15px", flexWrap: "wrap" }}>
          <div className={styles.searchWrap} style={{ margin: 0, flex: 1, minWidth: "200px" }}>
            <input
              type="text"
              placeholder="Search coins (e.g. BTC, Ethereum)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button onClick={fetchPrices} className={styles.button} disabled={loading}>
            {loading ? "Updating..." : "Refresh Prices"}
          </button>
        </div>

        {loading && coins.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <div className={styles.spinner}></div>
            <p>Loading market data...</p>
          </div>
        ) : error ? (
          <div style={{ color: "#ef4444", textAlign: "center", padding: "40px" }}>
            <p>❌ {error}</p>
            <button onClick={fetchPrices} className={styles.button} style={{ marginTop: "15px" }}>Try Again</button>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", opacity: 0.6, fontSize: "0.8rem" }}>
                  <th style={{ padding: "10px" }}>#</th>
                  <th style={{ padding: "10px" }}>Coin</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Price</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>24h Change</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoins.map((coin) => (
                  <tr key={coin.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "15px 10px", opacity: 0.5 }}>{coin.market_cap_rank}</td>
                    <td style={{ padding: "15px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img src={coin.image} alt={coin.name} style={{ width: "24px", height: "24px" }} />
                        <span style={{ fontWeight: "bold" }}>{coin.name}</span>
                        <span style={{ fontSize: "0.7rem", opacity: 0.5, textTransform: "uppercase" }}>{coin.symbol}</span>
                      </div>
                    </td>
                    <td style={{ padding: "15px 10px", textAlign: "right", fontWeight: "bold" }}>
                      ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ 
                      padding: "15px 10px", 
                      textAlign: "right", 
                      fontWeight: "bold",
                      color: coin.price_change_percentage_24h >= 0 ? "#22c55e" : "#ef4444"
                    }}>
                      {coin.price_change_percentage_24h >= 0 ? "+" : ""}{coin.price_change_percentage_24h?.toFixed(2)}%
                    </td>
                    <td style={{ padding: "15px 10px", textAlign: "right", opacity: 0.8, fontSize: "0.9rem" }}>
                      ${(coin.market_cap / 1000000000).toFixed(2)}B
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCoins.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px", opacity: 0.5 }}>No results found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
