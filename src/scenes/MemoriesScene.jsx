import { useState,useRef } from "react";
import { motion,AnimatePresence } from "framer-motion";
import PhotoCard from "../components/PhotoCard";
import NavButton from "../components/NavButton";
import FloatingHearts from "../components/FloatingHearts";
import { birthdayData,photos } from "../data/birthdayData";
import "./SwipeGallery.css";

export default function MemoriesScene({onNext}){
  return <SwipeGallery title={birthdayData.memoriesHeading} subtitle={birthdayData.memoriesSubheading} images={photos.memories} captions={birthdayData.memoryCaptions} dates={birthdayData.memoryDates} onNext={onNext}/>;
}

function SwipeGallery({title,subtitle,images,captions,dates,onNext}){
  const[i,setI]=useState(0),start=useRef(null);
  const move=d=>setI(v=>Math.max(0,Math.min(images.length-1,v+d)));
  return <div className="scene-inner swipe-gallery">
    <FloatingHearts count={3}/>
    <div><h2 className="heading-section">{title}</h2><p className="body-text">{subtitle}</p></div>
    <div className="swipe-gallery__stage" onPointerDown={e=>{start.current=e.clientX;e.currentTarget.setPointerCapture?.(e.pointerId)}} onPointerUp={e=>{if(start.current==null)return;const dx=e.clientX-start.current;if(Math.abs(dx)>50)move(dx<0?1:-1);start.current=null}}>
      <AnimatePresence mode="wait"><motion.div key={i} initial={{opacity:0,x:85,rotate:4,scale:.94}} animate={{opacity:1,x:0,rotate:0,scale:1}} exit={{opacity:0,x:-85,rotate:-4,scale:.94}} transition={{duration:.42}}><PhotoCard src={images[i].src} alt={images[i].alt} caption={captions[i]} date={dates?.[i]} size="lg" rotation={0}/></motion.div></AnimatePresence>
    </div>
    <div className="swipe-gallery__dots">{images.map((_,n)=><button key={n} className={n===i?"active":""} onClick={()=>setI(n)} aria-label={`photo ${n+1}`}/>)}</div>
    <p className="eyebrow">{i+1} / {images.length} · swipe to see more</p>
    {i===images.length-1&&<NavButton onClick={onNext} delay={.15}>watch one special memory ♡</NavButton>}
  </div>;
}
