"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

export default function GithubProfileViewer() {
  const [username, setUsername] = useState("torvalds");
  const [input, setInput] = useState("torvalds");
  const [data, setData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = async (u) => {
    setLoading(true); setError(""); setData(null); setRepos([]);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${u}`),
        fetch(`https://api.github.com/users/${u}/repos?sort=stars&per_page=6`)
      ]);
      if (!userRes.ok) throw new Error("User not found");
      const user = await userRes.json();
      const reposData = await reposRes.json();
      setData(user); setRepos(Array.isArray(reposData) ? reposData : []);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUser(username); }, []);

  const submit = (e) => { e.preventDefault(); setUsername(input); fetchUser(input); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🐙 GitHub Profile Viewer</h1>
        <p className={styles.pageSub}>View any GitHub profile with stats and repos</p>
      </div>
      <div className={styles.container} style={{ maxWidth: 720 }}>
        <form onSubmit={submit} style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <input value={input} onChange={e => setInput(e.target.value)} className={styles.input} placeholder="GitHub username…" style={{ flex: 1 }} />
          <button type="submit" className={styles.btn} style={{ flexShrink: 0 }}>Search</button>
        </form>

        {loading && <div style={{ textAlign: "center", padding: 40, color: "#64748b" }}>🐙 Loading profile…</div>}
        {error && <div style={{ padding: "14px 18px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 12, color: "#fca5a5" }}>{error}</div>}

        {data && (
          <>
            <div style={{ display: "flex", gap: 20, marginBottom: 24, flexWrap: "wrap", alignItems: "center", padding: "20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.avatar_url} alt={data.login} width={80} height={80} style={{ borderRadius: "50%", border: "3px solid rgba(99,102,241,0.4)" }} />
              <div>
                <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9" }}>{data.name || data.login}</div>
                <div style={{ color: "#64748b", fontSize: "0.9rem" }}>@{data.login}</div>
                {data.bio && <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: 4, maxWidth: 400 }}>{data.bio}</div>}
                {data.location && <div style={{ color: "#64748b", fontSize: "0.82rem", marginTop: 4 }}>📍 {data.location}</div>}
                {data.blog && <a href={data.blog} target="_blank" rel="noreferrer" style={{ color: "#a5b4fc", fontSize: "0.82rem" }}>🔗 {data.blog}</a>}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
              {[["Repos", data.public_repos], ["Followers", data.followers], ["Following", data.following], ["Gists", data.public_gists]].map(([l, v]) => (
                <div key={l} style={{ padding: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, textAlign: "center" }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#a5b4fc" }}>{v?.toLocaleString()}</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
                </div>
              ))}
            </div>

            <div className={styles.label} style={{ marginBottom: 10 }}>Top Repositories</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 10 }}>
              {repos.map(repo => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" style={{ padding: "16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, textDecoration: "none", display: "block", transition: "border-color 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"} onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}>
                  <div style={{ fontWeight: 600, color: "#a5b4fc", marginBottom: 4, fontSize: "0.9rem" }}>{repo.name}</div>
                  <div style={{ color: "#64748b", fontSize: "0.8rem", marginBottom: 8, lineHeight: 1.4 }}>{repo.description || "No description"}</div>
                  <div style={{ display: "flex", gap: 12, fontSize: "0.75rem", color: "#475569" }}>
                    {repo.language && <span>● {repo.language}</span>}
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
