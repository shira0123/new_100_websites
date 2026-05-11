"use client";
import { useState } from "react";
import styles from "./site.module.css";

const SHORTCUTS = {
  "Windows": [
    { keys: ["Ctrl","C"], desc: "Copy" },
    { keys: ["Ctrl","V"], desc: "Paste" },
    { keys: ["Ctrl","X"], desc: "Cut" },
    { keys: ["Ctrl","Z"], desc: "Undo" },
    { keys: ["Ctrl","Y"], desc: "Redo" },
    { keys: ["Ctrl","A"], desc: "Select All" },
    { keys: ["Ctrl","S"], desc: "Save" },
    { keys: ["Ctrl","F"], desc: "Find" },
    { keys: ["Ctrl","P"], desc: "Print" },
    { keys: ["Ctrl","N"], desc: "New" },
    { keys: ["Ctrl","O"], desc: "Open" },
    { keys: ["Ctrl","W"], desc: "Close Tab" },
    { keys: ["Alt","F4"], desc: "Close App" },
    { keys: ["Win","D"], desc: "Show Desktop" },
    { keys: ["Win","L"], desc: "Lock Screen" },
    { keys: ["Win","E"], desc: "File Explorer" },
    { keys: ["Win","R"], desc: "Run Dialog" },
    { keys: ["Ctrl","Shift","Esc"], desc: "Task Manager" },
    { keys: ["Alt","Tab"], desc: "Switch Apps" },
    { keys: ["Ctrl","Shift","T"], desc: "Reopen Tab" },
  ],
  "Mac": [
    { keys: ["⌘","C"], desc: "Copy" },
    { keys: ["⌘","V"], desc: "Paste" },
    { keys: ["⌘","X"], desc: "Cut" },
    { keys: ["⌘","Z"], desc: "Undo" },
    { keys: ["⌘","Shift","Z"], desc: "Redo" },
    { keys: ["⌘","A"], desc: "Select All" },
    { keys: ["⌘","S"], desc: "Save" },
    { keys: ["⌘","F"], desc: "Find" },
    { keys: ["⌘","P"], desc: "Print" },
    { keys: ["⌘","N"], desc: "New" },
    { keys: ["⌘","O"], desc: "Open" },
    { keys: ["⌘","W"], desc: "Close Tab" },
    { keys: ["⌘","Q"], desc: "Quit App" },
    { keys: ["⌘","Space"], desc: "Spotlight" },
    { keys: ["⌘","Tab"], desc: "Switch Apps" },
    { keys: ["⌘","Shift","3"], desc: "Screenshot" },
    { keys: ["⌘","Shift","4"], desc: "Screenshot Selection" },
    { keys: ["⌃","⌘","Space"], desc: "Emoji Picker" },
    { keys: ["⌘","H"], desc: "Hide Window" },
    { keys: ["⌘","M"], desc: "Minimize" },
  ],
  "VS Code": [
    { keys: ["Ctrl","P"], desc: "Quick Open" },
    { keys: ["Ctrl","Shift","P"], desc: "Command Palette" },
    { keys: ["Ctrl","`"], desc: "Toggle Terminal" },
    { keys: ["Ctrl","B"], desc: "Toggle Sidebar" },
    { keys: ["Ctrl","Shift","E"], desc: "Explorer" },
    { keys: ["Ctrl","Shift","F"], desc: "Search" },
    { keys: ["Ctrl","Shift","G"], desc: "Source Control" },
    { keys: ["Ctrl","Shift","X"], desc: "Extensions" },
    { keys: ["Ctrl","D"], desc: "Select Next Match" },
    { keys: ["Alt","↑/↓"], desc: "Move Line" },
    { keys: ["Ctrl","/"], desc: "Toggle Comment" },
    { keys: ["Ctrl","Shift","K"], desc: "Delete Line" },
    { keys: ["F2"], desc: "Rename Symbol" },
    { keys: ["F12"], desc: "Go to Definition" },
    { keys: ["Ctrl","Shift","I"], desc: "Format Document" },
    { keys: ["Ctrl","K Z"], desc: "Zen Mode" },
    { keys: ["Ctrl","Tab"], desc: "Switch Editors" },
    { keys: ["Ctrl","W"], desc: "Close Editor" },
    { keys: ["Ctrl","Shift","`"], desc: "New Terminal" },
    { keys: ["Ctrl","G"], desc: "Go to Line" },
  ],
  "Chrome": [
    { keys: ["Ctrl","T"], desc: "New Tab" },
    { keys: ["Ctrl","W"], desc: "Close Tab" },
    { keys: ["Ctrl","Shift","T"], desc: "Reopen Closed Tab" },
    { keys: ["Ctrl","Tab"], desc: "Next Tab" },
    { keys: ["Ctrl","L"], desc: "Focus Address Bar" },
    { keys: ["Ctrl","R"], desc: "Reload" },
    { keys: ["Ctrl","Shift","R"], desc: "Hard Reload" },
    { keys: ["Ctrl","F"], desc: "Find in Page" },
    { keys: ["Ctrl","H"], desc: "History" },
    { keys: ["Ctrl","J"], desc: "Downloads" },
    { keys: ["Ctrl","Shift","J"], desc: "DevTools Console" },
    { keys: ["F12"], desc: "DevTools" },
    { keys: ["Ctrl","Shift","I"], desc: "Inspect Element" },
    { keys: ["Ctrl","Shift","N"], desc: "Incognito Window" },
    { keys: ["Ctrl","1-9"], desc: "Switch to Tab #" },
    { keys: ["Alt","←"], desc: "Go Back" },
    { keys: ["Alt","→"], desc: "Go Forward" },
    { keys: ["Ctrl","+"], desc: "Zoom In" },
    { keys: ["Ctrl","-"], desc: "Zoom Out" },
    { keys: ["Ctrl","0"], desc: "Reset Zoom" },
  ],
};

export default function KeyboardShortcutRef() {
  const [app, setApp] = useState("VS Code");
  const [search, setSearch] = useState("");

  const shortcuts = SHORTCUTS[app] || [];
  const filtered = search ? shortcuts.filter(s => s.desc.toLowerCase().includes(search.toLowerCase()) || s.keys.join(" ").toLowerCase().includes(search.toLowerCase())) : shortcuts;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>⌨️ Keyboard Shortcuts Reference</h1>
        <p className={styles.pageSub}>Quick reference for popular app keyboard shortcuts</p>
      </div>
      <div className={styles.container} style={{ maxWidth: 680 }}>
        <div className={styles.harmonyRow} style={{ marginBottom: 16 }}>
          {Object.keys(SHORTCUTS).map(a => <button key={a} onClick={() => setApp(a)} className={`${styles.harmonyBtn} ${app === a ? styles.harmonyActive : ""}`}>{a}</button>)}
        </div>
        <input type="search" value={search} onChange={e => setSearch(e.target.value)} className={styles.input} placeholder="Search shortcuts…" style={{ marginBottom: 16 }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {filtered.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12 }}>
              <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                {s.keys.map((k, ki) => (
                  <span key={ki}>
                    <kbd style={{ padding: "3px 8px", borderRadius: 6, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", fontSize: "0.82rem", fontFamily: "monospace", color: "#e2e8f0", boxShadow: "0 2px 0 rgba(255,255,255,0.1)" }}>{k}</kbd>
                    {ki < s.keys.length - 1 && <span style={{ color: "#475569", margin: "0 2px", fontSize: "0.75rem" }}>+</span>}
                  </span>
                ))}
              </div>
              <span style={{ flex: 1, color: "#cbd5e1", fontSize: "0.92rem" }}>{s.desc}</span>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: "0.78rem", color: "#334155" }}>{filtered.length} shortcut{filtered.length !== 1 ? "s" : ""}</p>
      </div>
    </div>
  );
}
