"use client";
import { useState } from "react";
import styles from "./site.module.css";

const EMOJI_DATA = [
  { cat: "Smileys", emojis: ["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","🙃","😉","😊","😇","🥰","😍","🤩","😘","😗","😚","😙","🥲","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🤐","🥴","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤧","🥵","🥶","🥳","🤯","😎","🤓","🧐","😕","😟","🙁","☹️","😮","😯","😲","😳","🥺","😦","😧","😨","😰","😥","😢","😭","😱","😖","😣","😞","😓","😩","😫","🥱","😤","😡","😠","🤬","😈","👿","💀","☠️","💩","🤡","👹","👺","👻","👽","👾","🤖"] },
  { cat: "People", emojis: ["👋","🤚","🖐","✋","🖖","👌","🤌","🤏","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","🖕","👇","☝️","👍","👎","✊","👊","🤛","🤜","👏","🙌","👐","🤲","🙏","✍️","💪","🦵","🦶","👂","👃","👀","👁","👅","👄","🦷","💅","🦶","🫀","🫁","🦾","🦿"] },
  { cat: "Animals", emojis: ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🙈","🙉","🙊","🐒","🐔","🐧","🐦","🐤","🦆","🦅","🦉","🦇","🐺","🐗","🐴","🦄","🐝","🐛","🦋","🐌","🐞","🐜","🦟","🦗","🕷","🦂","🐢","🐍","🦎","🐊","🦖","🦕","🐙","🦑","🦐","🦞","🦀","🐡","🐟","🐠","🐬","🐳","🐋","🦈","🐊","🐅","🐆","🦓","🦍","🦧","🐘","🦛","🦏","🐪","🐫","🦒","🦘","🐃","🐂","🐄","🐎","🐖","🐏","🐑","🦙","🐐","🦌","🐕","🐩","🦮","🐕‍🦺","🐈","🐈‍⬛","🐓","🦃"] },
  { cat: "Food", emojis: ["🍎","🍊","🍋","🍇","🍓","🫐","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦","🧄","🧅","🌽","🥕","🫛","🥗","🥘","🫕","🍲","🍱","🍣","🍜","🍝","🍛","🍚","🍙","🍘","🍥","🧆","🥚","🍳","🥞","🧇","🥓","🥩","🍗","🍖","🦴","🌭","🍔","🍟","🍕","🫓","🥙","🧆","🌮","🌯","🫔","🥗","🍰","🎂","🧁","🍩","🍪","🍫","🍬","🍭","🍮","🍦","🍧","🍨","🧃","☕","🍵","🧋","🍶","🍺","🍻","🥂","🍾","🍷","🥃","🍸","🍹","🧉"] },
  { cat: "Travel", emojis: ["🚗","🚕","🚙","🚌","🚎","🏎","🚓","🚑","🚒","🚐","🛻","🚚","🚛","🚜","🏍","🛵","🚲","🛴","🛹","🛼","🚏","🛣","🛤","⛽","🚧","🚦","🚥","🚀","🛸","🚁","🛺","✈️","🛩","🛫","🛬","🪂","💺","🚢","⛵","🛥","🚤","⛴","🛳","🚂","🚃","🚄","🚅","🚆","🚇","🚈","🚉","🚊","🚝","🚞","🚋","🚌","🏔","⛰","🌋","🗻","🏕","🏖","🏜","🏝","🏞","🏟","🏛","🏗","🏘","🏚","🏠","🏡","🏢","🏣","🏤","🏥","🏦","🏨","🏩","🏪","🏫","🏬","🏭","🗼","🗽","⛪","🕌","🛕","🕍","⛩","🗾","🎌","🏳","🏴","🚩","🏁"] },
  { cat: "Objects", emojis: ["⌚","📱","💻","⌨","🖥","🖨","🖱","🖲","💽","💾","💿","📀","🎥","📷","📸","📹","📽","🎞","📞","☎","📟","📠","📺","📻","🧭","⏱","⏲","⏰","🕰","⌛","⏳","📡","🔋","🔌","💡","🔦","🕯","🪔","🧯","🛢","💸","💵","💴","💶","💷","💲","💱","💰","💳","💎","⚖","🪜","🧰","🔧","🪛","🔩","⚙","🔗","⛓","🪝","🧲","⚗","🔬","🔭","📡","💈","⚕","🩺","💊","🩹","🩻","🔑","🗝","🔐","🔒","🔓","🗝","🚪","🪑","🛋","🪞","🛏","🛁","🚿","🪠","🪣","🧹","🧺","🧻","🪣","🧼","🫧","🪥","🧽","🪒","🧴","🧷","🧹","🛒"] },
  { cat: "Symbols", emojis: ["❤","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❣","💕","💞","💓","💗","💖","💘","💝","💟","☮","✝","☪","🕉","☸","✡","🔯","🕎","☯","☦","🛐","⛎","♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓","🆔","⚛","🉑","☢","☣","📴","📳","🈶","🈚","🈸","🈺","🈷","✴","🆚","💮","🉐","㊙","㊗","🈴","🈵","🈹","🈲","🅰","🅱","🆎","🆑","🅾","🆘","❌","⭕","🛑","⛔","📛","🚫","💯","💢","♨","🚷","🚯","🚳","🚱","🔞","📵","🔕"] },
];

export default function EmojiPicker() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Smileys");
  const [copied, setCopied] = useState(null);
  const [recent, setRecent] = useState([]);

  const copy = (emoji) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji); setTimeout(() => setCopied(null), 1000);
    setRecent(r => [emoji, ...r.filter(e => e !== emoji)].slice(0, 20));
  };

  const filtered = search
    ? EMOJI_DATA.flatMap(d => d.emojis).filter(e => e.includes(search))
    : EMOJI_DATA.find(d => d.cat === cat)?.emojis || [];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>😀 Emoji Picker</h1>
        <p className={styles.pageSub}>Browse, search and copy any emoji instantly</p>
      </div>
      <div className={styles.container} style={{ maxWidth: 640 }}>
        <input type="search" value={search} onChange={e => setSearch(e.target.value)} className={styles.input} placeholder="Search emojis…" style={{ marginBottom: 14 }} />

        {!search && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {EMOJI_DATA.map(d => (
              <button key={d.cat} onClick={() => setCat(d.cat)} className={`${styles.harmonyBtn} ${cat === d.cat ? styles.harmonyActive : ""}`} style={{ fontSize: "0.8rem" }}>{d.cat}</button>
            ))}
          </div>
        )}

        {recent.length > 0 && !search && (
          <div style={{ marginBottom: 14 }}>
            <div className={styles.label} style={{ marginBottom: 6 }}>Recently Used</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {recent.map(e => (
                <button key={e} onClick={() => copy(e)} style={{ fontSize: "1.6rem", padding: "6px", borderRadius: 8, background: copied === e ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", transition: "all 0.1s" }}>{e}</button>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, maxHeight: 380, overflowY: "auto" }}>
          {filtered.map((emoji, i) => (
            <button key={i} onClick={() => copy(emoji)} title={emoji} style={{ fontSize: "1.6rem", padding: "8px", borderRadius: 8, background: copied === emoji ? "rgba(99,102,241,0.25)" : "transparent", border: "1px solid transparent", cursor: "pointer", transition: "all 0.1s", position: "relative" }}
              onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              onMouseOut={e => e.currentTarget.style.background = copied === emoji ? "rgba(99,102,241,0.25)" : "transparent"}>
              {emoji}
            </button>
          ))}
        </div>
        {copied && (
          <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "rgba(15,23,42,0.95)", border: "1px solid rgba(99,102,241,0.4)", padding: "10px 20px", borderRadius: 99, color: "#a5b4fc", fontWeight: 600, fontSize: "1rem", zIndex: 999, pointerEvents: "none" }}>
            {copied} Copied!
          </div>
        )}
      </div>
    </div>
  );
}
