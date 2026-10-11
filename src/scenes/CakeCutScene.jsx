import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavButton from "../components/NavButton";
import { birthdayData } from "../data/birthdayData";
import "./CakeCutScene.css";

const SWIPE_DISTANCE = 95;

function CelebrationRain() {
  return (
    <div className="celebration-rain" aria-hidden="true">
      {Array.from({ length: 58 }).map((_, i) => {
        const left = (i * 17) % 100;
        const drift = ((i % 9) - 4) * 14;
        const delay = (i % 10) * 0.055;
        const duration = 1.55 + (i % 6) * 0.12;
        const heart = i % 8 === 0;
        return (
          <motion.span
            key={i}
            className={heart ? "rain-heart" : `rain-piece rain-piece--${i % 4}`}
            style={{ left: `${left}%` }}
            initial={{ y: -90, x: 0, opacity: 0, rotate: 0, scale: heart ? 0.5 : 1 }}
            animate={{ y: "112dvh", x: drift, opacity: [0, 1, 1, 0.7], rotate: 220 + i * 18, scale: heart ? [0.5, 1.15, 0.9] : 1 }}
            transition={{ delay, duration, ease: "easeOut" }}
          >
            {heart ? "♥" : ""}
          </motion.span>
        );
      })}
      <motion.div className="celebration-heart-pop" initial={{scale:0,opacity:0}} animate={{scale:[0,1.3,1],opacity:[0,1,1]}} transition={{delay:.18,duration:.7}}>♥</motion.div>
    </div>
  );
}

function PixelCake({ cut }) {
  return (
    <div className={`pixel-cake${cut ? " pixel-cake--cut" : ""}`} aria-hidden="true">
      <div className="pixel-cake__plate" />
      <motion.div className="pixel-cake__half pixel-cake__half--left" animate={cut ? {x:-22,y:7,rotate:-4} : {}} transition={{type:"spring",stiffness:170,damping:18}}>
        <div className="pixel-cake__body" />
        <div className="pixel-cake__filling" />
        <div className="pixel-cake__icing" />
        <div className="pixel-cake__drip pixel-cake__drip--a" />
        <div className="pixel-cake__drip pixel-cake__drip--b" />
        <div className="pixel-cake__crumbs pixel-cake__crumbs--left" />
      </motion.div>
      <motion.div className="pixel-cake__half pixel-cake__half--right" animate={cut ? {x:22,y:7,rotate:4} : {}} transition={{type:"spring",stiffness:170,damping:18}}>
        <div className="pixel-cake__body" />
        <div className="pixel-cake__filling" />
        <div className="pixel-cake__icing" />
        <div className="pixel-cake__drip pixel-cake__drip--a" />
        <div className="pixel-cake__drip pixel-cake__drip--b" />
        <div className="pixel-cake__crumbs pixel-cake__crumbs--right" />
      </motion.div>
      <div className="pixel-cake__top" />
      <div className="pixel-cake__berries"><i/><i/><i/><i/><i/></div>
      <div className="pixel-cake__candles">{[0,1,2,3,4].map(i=><span key={i}><b/></span>)}</div>
      {cut && <motion.div className="pixel-cake__cut-flash" initial={{opacity:1,scaleY:.2}} animate={{opacity:0,scaleY:1.15}} transition={{duration:.8}}/>}
    </div>
  );
}

export default function CakeCutScene({ onNext }) {
  const [cut, setCut] = useState(false);
  const [swiping, setSwiping] = useState(false);
  const [progress, setProgress] = useState(0);
  const start = useRef({ x: 0, y: 0 });
  const cakeRef = useRef(null);

  const completeCut = () => {
    if (cut) return;
    setCut(true);
    setProgress(1);
    setSwiping(false);
  };

  const pointerDown = (e) => {
    if (cut) return;
    start.current = { x: e.clientX, y: e.clientY };
    setSwiping(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const pointerMove = (e) => {
    if (!swiping || cut) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    const distance = Math.hypot(dx, dy * 0.35);
    setProgress(Math.min(1, distance / SWIPE_DISTANCE));
    if (Math.abs(dx) >= SWIPE_DISTANCE && Math.abs(dy) < 120) completeCut();
  };

  const pointerUp = (e) => {
    if (!swiping || cut) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (Math.abs(dx) >= SWIPE_DISTANCE && Math.abs(dy) < 120) completeCut();
    else setProgress(0);
    setSwiping(false);
  };

  return (
    <div className="scene-inner cake-cut-scene">
      <div className="cream-confetti" aria-hidden="true">{Array.from({length:34}).map((_,i)=><i key={i} style={{"--x":`${(i*29)%100}%`,"--y":`${12+((i*37)%78)}%`,"--r":`${(i*31)%160}deg`}}/>)}</div>

      <AnimatePresence mode="wait">
        <motion.div key={cut ? "birthday" : "instruction"} className="cake-copy" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.45}}>
          <p className="cake-kicker">{cut ? "♡ make a wish ♡" : "a little birthday moment"}</p>
          <h1 className="cake-title">{cut ? birthdayData.cakeBirthdayGreeting : birthdayData.cakeSwipeText}</h1>
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="cake-interaction-zone"
        ref={cakeRef}
        initial={{ opacity: 0, y: -260, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 88, damping: 13, mass: 0.9, delay: 0.18 }}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={()=>{setSwiping(false); if(!cut)setProgress(0)}}
      >
        <PixelCake cut={cut}/>
        {!cut && <motion.div className="swipe-ribbon" style={{scaleX:.25 + progress*.75,opacity:swiping?1:.65}} animate={swiping?{}:{x:[-52,52,-52]}} transition={{duration:1.8,repeat:Infinity,ease:"easeInOut"}}><span>→</span></motion.div>}
      </motion.div>

      {!cut ? <motion.p className="cake-hint" animate={{opacity:[.5,1,.5]}} transition={{duration:1.8,repeat:Infinity}}>swipe across the cake to cut it</motion.p> : (
        <motion.div className="cake-after" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.2,duration:.65}}>
          <NavButton onClick={onNext}>{birthdayData.buttons.unlockNext}</NavButton>
        </motion.div>
      )}

      {cut && <CelebrationRain/>}
    </div>
  );
}
