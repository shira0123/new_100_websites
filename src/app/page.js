"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { sites, CATEGORIES, TAGS } from "./_data/sites";
import styles from "./page.module.css";

const ALL_TAGS = ["All", ...Object.values(TAGS)];
const ALL_TYPES = ["All", CATEGORIES.STATIC, CATEGORIES.DYNAMIC];

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [activeType, setActiveType] = useState("All");

  const filtered = useMemo(() => {
    return sites.filter((s) => {
      const matchSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchTag = activeTag === "All" || s.tag === activeTag;
      const matchType = activeType === "All" || s.type === activeType;
      return matchSearch && matchTag && matchType;
    });
  }, [search, activeTag, activeType]);

  const staticCount = sites.filter((s) => s.type === CATEGORIES.STATIC).length;
  const dynamicCount = sites.filter((s) => s.type === CATEGORIES.DYNAMIC).length;

  return (
    <div className={styles.root}>
      {/* ── Animated background ── */}
      <div className={styles.bgOrbs} aria-hidden="true">
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.badge}>100 Sites</div>
          <h1 className={styles.heroTitle}>
            One Hundred<br />
            <span className={styles.gradient}>Web Experiences</span>
          </h1>
          <p className={styles.heroSub}>
            A curated collection of {sites.length} unique websites &mdash;&nbsp;
            <strong>{staticCount} static</strong> tools, games &amp; utilities,
            plus <strong>{dynamicCount} dynamic</strong> live-data apps.
          </p>

          {/* Stats row */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{sites.length}</span>
              <span className={styles.statLabel}>Total Sites</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>{staticCount}</span>
              <span className={styles.statLabel}>Static</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>{dynamicCount}</span>
              <span className={styles.statLabel}>Dynamic</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>{Object.values(TAGS).length}</span>
              <span className={styles.statLabel}>Categories</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Controls ── */}
      <section className={styles.controls}>
        <div className={styles.controlsInner}>
          {/* Search */}
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              id="site-search"
              type="search"
              placeholder="Search websites…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
              aria-label="Search websites"
            />
            {search && (
              <button className={styles.searchClear} onClick={() => setSearch("")} aria-label="Clear search">✕</button>
            )}
          </div>

          {/* Type filter */}
          <div className={styles.typeFilter} role="group" aria-label="Filter by type">
            {ALL_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`${styles.typeBtn} ${activeType === t ? styles.typeActive : ""}`}
              >
                {t === CATEGORIES.STATIC && "⚡ "}
                {t === CATEGORIES.DYNAMIC && "🔴 "}
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Tag pills */}
        <div className={styles.tagsRow} role="group" aria-label="Filter by category">
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`${styles.tagPill} ${activeTag === tag ? styles.tagActive : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>

        <p className={styles.resultCount}>
          Showing <strong>{filtered.length}</strong> of {sites.length} sites
        </p>
      </section>

      {/* ── Grid ── */}
      <main className={styles.main} id="sites-grid">
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔍</span>
            <p>No sites match your search.</p>
            <button onClick={() => { setSearch(""); setActiveTag("All"); setActiveType("All"); }} className={styles.resetBtn}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((site) => (
              <Link
                key={site.id}
                href={`/sites/${site.slug}`}
                className={styles.card}
                style={{ "--card-color": site.color }}
              >
                <div className={styles.cardGlow} />
                <div className={styles.cardTop}>
                  <span className={styles.cardIcon}>{site.icon}</span>
                  <div className={styles.cardMeta}>
                    <span className={`${styles.typeBadge} ${site.type === CATEGORIES.DYNAMIC ? styles.dynamicBadge : styles.staticBadge}`}>
                      {site.type === CATEGORIES.DYNAMIC ? "🔴 Live" : "⚡ Static"}
                    </span>
                    <span className={styles.idNum}>#{site.id}</span>
                  </div>
                </div>
                <h2 className={styles.cardTitle}>{site.title}</h2>
                <p className={styles.cardDesc}>{site.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardTag}>{site.tag}</span>
                  <span className={styles.cardArrow}>→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <p>Built with Next.js · {sites.length} websites and counting</p>
      </footer>
    </div>
  );
}
