"use client";
import { useState } from "react";
import styles from "./site.module.css";

const DEFAULT_MD = `# Hello, Markdown!

## Features
- **Bold** and *italic* text
- \`Inline code\` and code blocks
- [Links](https://example.com)

## Code Example
\`\`\`js
const greet = name => \`Hello, \${name}!\`;
console.log(greet("World"));
\`\`\`

> Blockquotes look great too!

1. First item
2. Second item
3. Third item
`;

function parseMarkdown(md) {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/```[\w]*\n([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    .replace(/\n\n/g, "<br/>");
}

export default function MarkdownPreviewer() {
  const [md, setMd] = useState(DEFAULT_MD);
  const html = parseMarkdown(md);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>📝 Markdown Previewer</h1>
        <p className={styles.pageSub}>Write Markdown on the left, see the preview on the right</p>
      </div>
      <div style={{padding:"24px"}}>
        <div className={styles.mdGrid}>
          <div className={styles.mdPanel}>
            <div className={styles.mdHeader}>✏️ Editor</div>
            <textarea className={styles.mdTextArea} value={md} onChange={e=>setMd(e.target.value)} spellCheck={false} />
          </div>
          <div className={styles.mdPanel}>
            <div className={styles.mdHeader}>👁 Preview</div>
            <div className={styles.mdPreview} dangerouslySetInnerHTML={{__html: html}} />
          </div>
        </div>
        <p style={{marginTop:12,fontSize:"0.78rem",color:"#334155",textAlign:"center"}}>
          Words: {md.split(/\s+/).filter(Boolean).length} · Characters: {md.length}
        </p>
      </div>
    </div>
  );
}
