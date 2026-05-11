"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

export default function CountryExplorer() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,subregion,languages,currencies,area,cca3,timezones,continents")
      .then(r => r.json())
      .then(d => { setCountries(d.sort((a, b) => a.name.common.localeCompare(b.name.common))); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const REGIONS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
  const filtered = countries.filter(c => {
    const matchSearch = c.name.common.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === "All" || c.region === region;
    return matchSearch && matchRegion;
  }).slice(0, 48);

  const fmt = (n) => n?.toLocaleString() || "—";

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🌍 Country Explorer</h1>
        <p className={styles.pageSub}>Explore facts and flags of every country</p>
      </div>
      <div className={styles.container} style={{ maxWidth: 1000 }}>
        {selected ? (
          <>
            <button onClick={() => setSelected(null)} style={{ marginBottom: 20, padding: "10px 20px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}>← Back</button>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "start" }}>
              <img src={selected.flags?.svg} alt={selected.name?.common} style={{ width: 200, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)" }} />
              <div>
                <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#f1f5f9", marginBottom: 4 }}>{selected.name?.common}</h2>
                <p style={{ color: "#64748b", marginBottom: 16 }}>{selected.name?.official}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    ["🏛 Capital", selected.capital?.[0] || "—"],
                    ["🌍 Region", `${selected.region} / ${selected.subregion || "—"}`],
                    ["👥 Population", fmt(selected.population)],
                    ["📐 Area", `${fmt(selected.area)} km²`],
                    ["🗣 Languages", Object.values(selected.languages || {}).slice(0, 3).join(", ") || "—"],
                    ["💰 Currency", Object.values(selected.currencies || {}).map(c => `${c.name} (${c.symbol || ""})`).join(", ") || "—"],
                    ["🕐 Timezone", selected.timezones?.[0] || "—"],
                    ["🌐 Continent", selected.continents?.[0] || "—"],
                  ].map(([l, v]) => (
                    <div key={l} style={{ padding: "12px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10 }}>
                      <div style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: 3 }}>{l}</div>
                      <div style={{ fontSize: "0.9rem", color: "#e2e8f0", fontWeight: 500 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
              <input type="search" value={search} onChange={e => setSearch(e.target.value)} className={styles.input} placeholder="Search country…" style={{ flex: 1, minWidth: 200 }} />
              <div className={styles.harmonyRow} style={{ flexWrap: "wrap" }}>
                {REGIONS.map(r => <button key={r} onClick={() => setRegion(r)} className={`${styles.harmonyBtn} ${region === r ? styles.harmonyActive : ""}`}>{r}</button>)}
              </div>
            </div>
            {loading && <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>🌍 Loading countries…</div>}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 10 }}>
              {filtered.map(c => (
                <div key={c.cca3} onClick={() => setSelected(c)} style={{ padding: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"} onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}>
                  <img src={c.flags?.svg} alt={c.name?.common} style={{ width: "100%", height: 70, objectFit: "cover", borderRadius: 6, marginBottom: 8 }} />
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#e2e8f0", marginBottom: 2 }}>{c.name?.common}</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b" }}>{c.region}</div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", marginTop: 12, fontSize: "0.78rem", color: "#334155" }}>Showing {filtered.length} of {countries.length} countries</p>
          </>
        )}
      </div>
    </div>
  );
}
