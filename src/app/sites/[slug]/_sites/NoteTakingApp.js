"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

const COLORS = ["#fef9c3","#dcfce7","#dbeafe","#fce7f3","#ede9fe","#fee2e2","#ffedd5","#f0fdf4"];
const STORAGE_KEY = "sticky-notes-v1";

export default function NoteTakingApp() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(()=>{
    try{const s=localStorage.getItem(STORAGE_KEY);if(s)setNotes(JSON.parse(s));}catch{}
  },[]);
  useEffect(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(notes));}catch{}},[ notes]);

  const addNote = () => {
    const note = {id:Date.now(),text:"Click to edit…",color:COLORS[Math.floor(Math.random()*COLORS.length)],createdAt:new Date().toLocaleDateString()};
    setNotes(n=>[note,...n]);
    setEditing(note.id);
  };
  const update = (id,text)=>setNotes(n=>n.map(note=>note.id===id?{...note,text}:note));
  const updateColor = (id,color)=>setNotes(n=>n.map(note=>note.id===id?{...note,color}:note));
  const del = (id)=>{setNotes(n=>n.filter(note=>note.id!==id));if(editing===id)setEditing(null);};

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>📌 Note Taking App</h1>
        <p className={styles.pageSub}>Sticky notes that persist in your browser</p>
      </div>
      <div className={styles.container} style={{maxWidth:1000}}>
        <div style={{display:"flex",gap:12,marginBottom:24,flexWrap:"wrap"}}>
          <button onClick={addNote} className={styles.btn}>+ New Note</button>
          <span style={{color:"#64748b",fontSize:"0.85rem",alignSelf:"center"}}>{notes.length} note{notes.length!==1?"s":""} saved</span>
        </div>

        {notes.length===0&&<div style={{textAlign:"center",padding:"60px",color:"#475569"}}>No notes yet — click "+ New Note" to start</div>}

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14}}>
          {notes.map(note=>(
            <div key={note.id} style={{
              background:note.color,borderRadius:12,padding:16,
              boxShadow:"0 4px 20px rgba(0,0,0,0.25)",position:"relative",
              minHeight:160,display:"flex",flexDirection:"column"
            }}>
              {/* Color picker */}
              <div style={{display:"flex",gap:4,marginBottom:8,flexWrap:"wrap"}}>
                {COLORS.map(c=>(
                  <button key={c} onClick={()=>updateColor(note.id,c)} style={{
                    width:14,height:14,borderRadius:"50%",background:c,
                    border:`2px solid ${note.color===c?"#000":"transparent"}`,cursor:"pointer"
                  }} />
                ))}
                <button onClick={()=>del(note.id)} style={{marginLeft:"auto",background:"rgba(0,0,0,0.15)",border:"none",borderRadius:4,width:18,height:18,fontSize:"0.7rem",cursor:"pointer",color:"#000",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
              </div>
              <textarea
                value={note.text}
                onFocus={()=>setEditing(note.id)}
                onChange={e=>update(note.id,e.target.value)}
                style={{
                  flex:1,background:"transparent",border:"none",resize:"none",
                  color:"#1c1917",fontFamily:"inherit",fontSize:"0.92rem",lineHeight:1.6,
                  outline:"none",width:"100%"
                }}
              />
              <div style={{fontSize:"0.68rem",color:"rgba(0,0,0,0.4)",marginTop:8,textAlign:"right"}}>{note.createdAt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
