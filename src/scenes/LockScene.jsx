import { useState } from "react";
import { motion } from "framer-motion";
import { birthdayData } from "../data/birthdayData";
import "./LockScene.css";

export default function LockScene({ onNext }) {
  const [value,setValue]=useState("");
  const [error,setError]=useState(false);
  const [open,setOpen]=useState(false);
  const press=(n)=>{if(open||value.length>=4)return;setValue(v=>v+n);setError(false)};
  const unlock=()=>{
    if(value===birthdayData.lockCode){setOpen(true);setTimeout(onNext,1150)}
    else{setError(true);setValue("");setTimeout(()=>setError(false),650)}
  };
  return <div className="scene-inner lock-scene">
    <motion.div className="lock-shell" initial={{opacity:0,y:24,scale:.96}} animate={{opacity:1,y:0,scale:1}}>
      <motion.div className={`lock-visual${open?" lock-visual--open":""}`} animate={error?{x:[0,-10,9,-7,5,0]}:{}} transition={{duration:.42}}>
        <div className="lock-shackle"/><div className="lock-body"><span>♡</span></div>
      </motion.div>
      <p className="eyebrow">a tiny secret first...</p>
      <h1 className="heading-section lock-heading">{birthdayData.lockPrompt}</h1>
      <div className={`pin-dots${error?" pin-dots--error":""}`}>{[0,1,2,3].map(i=><span key={i} className={i<value.length?"filled":""}/>)}</div>
      {error&&<motion.p className="lock-error" initial={{opacity:0}} animate={{opacity:1}}>{birthdayData.lockError}</motion.p>}
      <div className="lock-keypad">
        {[1,2,3,4,5,6,7,8,9].map(n=><button key={n} onClick={()=>press(String(n))}>{n}</button>)}
        <button onClick={()=>setValue(v=>v.slice(0,-1))} aria-label="delete">⌫</button><button onClick={()=>press("0")}>0</button><button className="lock-enter" onClick={unlock} aria-label="unlock">♡</button>
      </div>
    </motion.div>
  </div>
}
