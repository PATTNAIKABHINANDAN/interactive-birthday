import { useState } from "react";
import { motion } from "framer-motion";
import Envelope from "../components/Envelope";
import NavButton from "../components/NavButton";
import FloatingHearts from "../components/FloatingHearts";
import { birthdayData } from "../data/birthdayData";
import "./BirthdayLetterScene.css";

export default function LetterEnvelopeScene({onNext}){
 const[open,setOpen]=useState(false);
 return <div className="scene-inner scene-scroll letter-scene" style={{background:"var(--gradient-night)",justifyContent:open?"flex-start":"center"}}>
  <FloatingHearts count={4}/>
  {!open?<motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"var(--space-3)"}}>
   <p className="eyebrow">{birthdayData.envelopeLastEyebrow}</p>
   <h2 className="heading-section">{birthdayData.letterHeading}</h2>
   <Envelope opened={false}/><p className="body-text">{birthdayData.envelopeText}</p>
   <NavButton onClick={()=>setOpen(true)}>{birthdayData.buttons.openEnvelope}</NavButton>
  </motion.div>:<motion.div initial={{opacity:0}} animate={{opacity:1}} style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:"var(--space-3)",paddingTop:"var(--space-3)"}}>
   <Envelope opened={true}/>
   <motion.article className="letter-paper" initial={{opacity:0,y:35,scale:.96}} animate={{opacity:1,y:0,scale:1}} transition={{delay:.8,duration:.7}}>
    <p style={{whiteSpace:"pre-wrap"}}>{birthdayData.birthdayLetter}</p>
   </motion.article>
   <NavButton onClick={onNext} delay={1.1}>{birthdayData.buttons.continue}</NavButton>
  </motion.div>}
 </div>
}
