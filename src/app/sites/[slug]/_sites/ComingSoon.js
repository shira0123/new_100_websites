import Link from "next/link";
import styles from "./coming-soon.module.css";

export default function ComingSoon({ site }) {
  return (
    <div className={styles.root}>
      <div className={styles.glow} style={{ background: `radial-gradient(circle, ${site?.color || "#6366f1"}33 0%, transparent 70%)` }} />
      <div className={styles.icon}>{site?.icon || "🚀"}</div>
      <h1 className={styles.title}>{site?.title || "Coming Soon"}</h1>
      <p className={styles.desc}>{site?.description}</p>
      <div className={styles.badge}>Under Construction</div>
      <Link href="/" className={styles.back}>← Back to Hub</Link>
    </div>
  );
}
