"use client";
import { useState } from "react";
import styles from "./site.module.css";

const FOODS = [
  {name:"Apple",cal:95,cat:"Fruit"},
  {name:"Banana",cal:105,cat:"Fruit"},
  {name:"Orange",cal:62,cat:"Fruit"},
  {name:"Chicken Breast (100g)",cal:165,cat:"Protein"},
  {name:"Egg (1 large)",cal:78,cat:"Protein"},
  {name:"Salmon (100g)",cal:208,cat:"Protein"},
  {name:"White Rice (1 cup)",cal:206,cat:"Grains"},
  {name:"Brown Rice (1 cup)",cal:218,cat:"Grains"},
  {name:"Bread (1 slice)",cal:79,cat:"Grains"},
  {name:"Pasta (1 cup cooked)",cal:221,cat:"Grains"},
  {name:"Broccoli (1 cup)",cal:55,cat:"Vegetable"},
  {name:"Spinach (1 cup)",cal:7,cat:"Vegetable"},
  {name:"Carrot (1 medium)",cal:25,cat:"Vegetable"},
  {name:"Milk (1 cup)",cal:149,cat:"Dairy"},
  {name:"Cheese (1 oz)",cal:113,cat:"Dairy"},
  {name:"Yogurt (1 cup)",cal:150,cat:"Dairy"},
  {name:"Almonds (1 oz)",cal:164,cat:"Nuts"},
  {name:"Peanut Butter (2 tbsp)",cal:188,cat:"Nuts"},
  {name:"Olive Oil (1 tbsp)",cal:119,cat:"Fats"},
  {name:"Avocado (half)",cal:160,cat:"Fats"},
  {name:"Coffee (black)",cal:2,cat:"Drinks"},
  {name:"Orange Juice (1 cup)",cal:112,cat:"Drinks"},
  {name:"Soda (12 oz)",cal:150,cat:"Drinks"},
];

export default function CalorieCounter() {
  const [goal, setGoal] = useState(2000);
  const [log, setLog] = useState([]);
  const [search, setSearch] = useState("");

  const filtered = FOODS.filter(f=>f.name.toLowerCase().includes(search.toLowerCase()));
  const total = log.reduce((s,e)=>s+e.cal,0);
  const remaining = goal - total;
  const pct = Math.min(total/goal*100,100);

  const add = (food) => setLog(l=>[...l,{...food,id:Date.now()}]);
  const remove = (id) => setLog(l=>l.filter(e=>e.id!==id));

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.pageTitle}>🥗 Calorie Counter</h1>
        <p className={styles.pageSub}>Track daily calorie intake and reach your goals</p>
      </div>
      <div className={styles.container} style={{maxWidth:720}}>
        <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:16,flexWrap:"wrap"}}>
          <label className={styles.label} style={{margin:0}}>Daily Goal:</label>
          <input type="number" value={goal} onChange={e=>setGoal(Number(e.target.value))} className={styles.input} style={{width:100}} />
          <span style={{color:"#64748b",fontSize:"0.85rem"}}>kcal</span>
        </div>

        {/* Progress */}
        <div style={{marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:"0.85rem"}}>
            <span style={{color:"#a5b4fc",fontWeight:600}}>{total} kcal eaten</span>
            <span style={{color:remaining<0?"#fca5a5":"#64748b"}}>{remaining<0?`${Math.abs(remaining)} over`:remaining+" remaining"}</span>
          </div>
          <div style={{height:12,background:"rgba(255,255,255,0.08)",borderRadius:99,overflow:"hidden"}}>
            <div style={{height:"100%",background:pct>=100?"linear-gradient(90deg,#ef4444,#dc2626)":"linear-gradient(90deg,#6366f1,#22c55e)",width:`${pct}%`,borderRadius:99,transition:"width 0.3s"}} />
          </div>
        </div>

        <div className={styles.splitGrid}>
          {/* Food search */}
          <div>
            <input type="search" value={search} onChange={e=>setSearch(e.target.value)} className={styles.input} placeholder="Search food…" style={{marginBottom:10}} />
            <div style={{maxHeight:340,overflowY:"auto",display:"flex",flexDirection:"column",gap:4}}>
              {filtered.map((f,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10}}>
                  <div>
                    <div style={{fontSize:"0.9rem",color:"#e2e8f0"}}>{f.name}</div>
                    <div style={{fontSize:"0.72rem",color:"#64748b"}}>{f.cat}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{color:"#a5b4fc",fontWeight:600,fontSize:"0.9rem"}}>{f.cal}</span>
                    <button onClick={()=>add(f)} style={{width:28,height:28,borderRadius:8,background:"rgba(99,102,241,0.2)",border:"1px solid rgba(99,102,241,0.4)",color:"#a5b4fc",fontWeight:700}}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Log */}
          <div>
            <div className={styles.label} style={{marginBottom:10}}>Today's Log ({log.length} items)</div>
            <div style={{maxHeight:340,overflowY:"auto",display:"flex",flexDirection:"column",gap:4}}>
              {log.length===0&&<p style={{color:"#475569",fontSize:"0.85rem"}}>No foods added yet</p>}
              {log.map(e=>(
                <div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10}}>
                  <span style={{fontSize:"0.88rem",color:"#cbd5e1"}}>{e.name}</span>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{color:"#a5b4fc",fontWeight:600}}>{e.cal}</span>
                    <button onClick={()=>remove(e.id)} style={{color:"#475569",fontSize:"1rem"}} onMouseOver={e2=>e2.target.style.color="#fca5a5"} onMouseOut={e2=>e2.target.style.color="#475569"}>×</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
