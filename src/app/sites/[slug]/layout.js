import Link from "next/link";
import { getSiteBySlug, CATEGORIES } from "../../_data/sites";
import { notFound } from "next/navigation";
import styles from "./layout.module.css";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const site = getSiteBySlug(slug);
  if (!site) return { title: "Not Found" };
  return {
    title: `${site.title} | 100 Websites`,
    description: site.description,
  };
}

export default async function SiteLayout({ children, params }) {
  const { slug } = await params;
  const site = getSiteBySlug(slug);
  if (!site) notFound();

  return (
    <div className={styles.root} style={{ "--site-color": site.color }}>
      {/* Nav bar */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.backBtn} aria-label="Back to hub">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          All Sites
        </Link>
        <div className={styles.navCenter}>
          <span className={styles.navIcon}>{site.icon}</span>
          <span className={styles.navTitle}>{site.title}</span>
        </div>
        <div className={styles.navMeta}>
          <span className={`${styles.typeBadge} ${site.type === CATEGORIES.DYNAMIC ? styles.dynamicBadge : styles.staticBadge}`}>
            {site.type === CATEGORIES.DYNAMIC ? "🔴 Live" : "⚡ Static"}
          </span>
          <span className={styles.siteId}>#{site.id}</span>
        </div>
      </nav>

      {/* Page content */}
      <main className={styles.main}>{children}</main>

      {/* Footer */}
      <footer className={styles.footer}>
        <Link href="/" className={styles.footerLink}>← Back to all 100 websites</Link>
        <span className={styles.footerDot}>·</span>
        <span className={styles.footerTag}>{site.tag}</span>
      </footer>
    </div>
  );
}
