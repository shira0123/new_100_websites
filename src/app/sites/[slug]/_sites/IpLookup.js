"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

export default function IpLookup({ site }) {
  const [ip, setIp] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookup = async (query) => {
    setLoading(true);
    try {
      const r = await fetch(`https://ipapi.co/${query || "json"}/json/`);
      const d = await r.json();
      setData(d);
      if (!query) setIp(d.ip);
    } catch { setData(null); }
    setLoading(false);
  };

  useEffect(() => { lookup(""); }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div><h1 className={styles.title}>{site.title}</h1><p className={styles.description}>{site.description}</p></div>
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto 25px", display: "flex", gap: 10 }}>
        <input className={styles.input} value={ip} onChange={e => setIp(e.target.value)} placeholder="Enter IP address..." style={{ margin: 0, flex: 1 }} onKeyDown={e => e.key === "Enter" && lookup(ip)} />
        <button onClick={() => lookup(ip)} className={styles.button} style={{ background: site.color }}>Lookup</button>
      </div>
      {loading ? <div style={{ textAlign: "center", padding: 60 }}><div className={styles.spinner} /></div> : data && (
        <div className={styles.card} style={{ maxWidth: 500, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
            {[["IP", data.ip], ["City", data.city], ["Region", data.region], ["Country", `${data.country_name} ${data.country_code_iso3 ? "(" + data.country_code_iso3 + ")" : ""}`], ["Latitude", data.latitude], ["Longitude", data.longitude], ["Timezone", data.timezone], ["ISP", data.org]].map(([k, v]) => (
              <div key={k}><div style={{ fontSize: "0.75rem", opacity: 0.4, marginBottom: 2 }}>{k}</div><div style={{ fontWeight: "bold" }}>{v || "N/A"}</div></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
