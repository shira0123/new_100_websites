"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

const STORAGE_KEY = "todo-list-v1";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(()=>{
    try { const saved = localStorage.getItem(STORAGE_KEY); if(saved) setTodos(JSON.parse(saved)); } catch{}
  },[]);
  useEffect(()=>{ try{localStorage.setItem(STORAGE_KEY,JSON.stringify(todos));}catch{} },[todos]);

  const add = () => {
    const text = input.trim();
    if(!text) return;
    setTodos(t=>[...t,{id:Date.now(),text,done:false,createdAt:new Date().toLocaleDateString()}]);
    setInput("");
  };
  const toggle = (id)=>setTodos(t=>t.map(i=>i.id===id?{...i,done:!i.done}:i));
  const del = (id)=>setTodos(t=>t.filter(i=>i.id!==id));
  const clear = ()=>setTodos(t=>t.filter(i=>!i.done));

  const filtered = filter==="all"?todos:filter==="active"?todos.filter(t=>!t.done):todos.filter(t=>t.done);
  const done = todos.filter(t=>t.done).length;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>✅ Todo List</h1>
        <p className={styles.pageSub}>Clean, minimal to-do list — saved in your browser</p>
      </div>
      <div className={styles.container} style={{maxWidth:560}}>
        {/* Progress */}
        {todos.length > 0 && (
          <div style={{marginBottom:20}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:"0.82rem",color:"#64748b"}}>
              <span>{done} of {todos.length} completed</span>
              <span>{Math.round(done/todos.length*100)}%</span>
            </div>
            <div style={{height:6,background:"rgba(255,255,255,0.08)",borderRadius:99,overflow:"hidden"}}>
              <div style={{height:"100%",background:"linear-gradient(90deg,#6366f1,#22c55e)",borderRadius:99,width:`${todos.length?done/todos.length*100:0}%`,transition:"width 0.3s"}} />
            </div>
          </div>
        )}

        {/* Add */}
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} className={styles.input} placeholder="Add a new task…" style={{flex:1}} />
          <button onClick={add} className={styles.btn} style={{flexShrink:0}}>+ Add</button>
        </div>

        {/* Filter */}
        <div className={styles.harmonyRow} style={{marginBottom:16}}>
          {["all","active","done"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} className={`${styles.harmonyBtn} ${filter===f?styles.harmonyActive:""}`} style={{textTransform:"capitalize"}}>{f}</button>
          ))}
          {done>0 && <button onClick={clear} style={{padding:"8px 14px",borderRadius:99,fontSize:"0.82rem",color:"#fca5a5",background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",marginLeft:"auto"}}>Clear done</button>}
        </div>

        {/* List */}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.length===0 && <div style={{textAlign:"center",padding:"40px",color:"#475569"}}>No tasks here 🎉</div>}
          {filtered.map(todo=>(
            <div key={todo.id} style={{
              display:"flex",alignItems:"center",gap:12,padding:"14px 16px",
              background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:12,transition:"all 0.2s",opacity:todo.done?0.6:1
            }}>
              <button onClick={()=>toggle(todo.id)} style={{
                width:22,height:22,borderRadius:6,flexShrink:0,
                background:todo.done?"#22c55e":"transparent",
                border:`2px solid ${todo.done?"#22c55e":"rgba(255,255,255,0.2)"}`,
                display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"
              }}>
                {todo.done&&<span style={{color:"#fff",fontSize:"0.7rem",fontWeight:800}}>✓</span>}
              </button>
              <span style={{flex:1,color:todo.done?"#64748b":"#e2e8f0",textDecoration:todo.done?"line-through":"none",fontSize:"0.95rem"}}>{todo.text}</span>
              <span style={{fontSize:"0.72rem",color:"#334155",flexShrink:0}}>{todo.createdAt}</span>
              <button onClick={()=>del(todo.id)} style={{color:"#475569",fontSize:"1rem",flexShrink:0,transition:"color 0.2s"}} onMouseOver={e=>e.target.style.color="#fca5a5"} onMouseOut={e=>e.target.style.color="#475569"}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
