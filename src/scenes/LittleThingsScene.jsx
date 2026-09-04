import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavButton from "../components/NavButton";
import { birthdayData } from "../data/birthdayData";
import "./LittleThingsScene.css";

export default function LittleThingsScene({ onNext }) {
  const [open, setOpen] = useState(false);
  const notes = birthdayData.littleThings || [
    "WRITE A LITTLE THING HERE",
    "WRITE A LITTLE THING HERE",
    "WRITE A LITTLE THING HERE",
    "WRITE A LITTLE THING HERE",
  ];

  return (
    <div className="scene-inner little-things-scene">
      <motion.div className="little-things-copy" initial={{opacity:0,y:-14}} animate={{opacity:1,y:0}}>
        <p className="eyebrow">a tiny page just for you</p>
        <h2 className="heading-section">little things I hope you remember ♡</h2>
      </motion.div>

      <button className={`little-heart-box${open ? " little-heart-box--open" : ""}`} onClick={()=>setOpen(true)} aria-label="Open little notes">
        <span>♥</span>
        {!open && <small>tap me</small>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div className="little-notes" initial={{opacity:0,scale:.88}} animate={{opacity:1,scale:1}} transition={{duration:.55}}>
            {notes.map((note,i)=>(
              <motion.div className="little-note" key={i} initial={{opacity:0,y:22,rotate:(i%2?3:-3)}} animate={{opacity:1,y:0}} transition={{delay:.12*i,duration:.45}}>
                <span>♡</span><p>{note}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {open && <NavButton onClick={onNext} delay={.65}>{birthdayData.buttons.oneMoreThing}</NavButton>}
    </div>
  );
}
