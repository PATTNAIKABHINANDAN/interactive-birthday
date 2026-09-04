import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeartTree from "../components/HeartTree";
import FloatingHearts from "../components/FloatingHearts";
import { birthdayData } from "../data/birthdayData";
import "./FinalTreeScene.css";
const TOTAL_HEARTS=12;
export default function HeartTreeScene({onRestart}){
 const[heartsShown,setHeartsShown]=useState(0);
 useEffect(()=>{if(heartsShown>=TOTAL_HEARTS)return;const t=setTimeout(()=>setHeartsShown(n=>n+1),220);return()=>clearTimeout(t)},[heartsShown]);
 return <div className="scene-inner final-tree-scene">
  <FloatingHearts count={5}/>
  <div className="final-tree-layout">
   <motion.div initial={{opacity:0,scale:.85,y:25}} animate={{opacity:1,scale:1,y:0}} transition={{duration:1}}><HeartTree heartsShown={heartsShown}/></motion.div>
   <motion.div className="final-tree-copy" initial={{opacity:0,y:20}} animate={{opacity:heartsShown>=TOTAL_HEARTS?1:0,y:heartsShown>=TOTAL_HEARTS?0:20}} transition={{duration:.8}}>
    <p className="eyebrow">{birthdayData.finalTreeEyebrow}</p><div className="gold-rule"/><h2 className="heading-section">{birthdayData.treeHeading}</h2><p className="body-text" style={{whiteSpace:"pre-wrap"}}>{birthdayData.treeMessage}</p><p className="final-signoff">♥</p>
    <motion.button className="restart-button" onClick={onRestart} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:.6}}>↻ restart the little story</motion.button>
   </motion.div>
  </div>
 </div>
}
