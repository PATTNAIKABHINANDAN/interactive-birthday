import { useState } from "react";
import { motion } from "framer-motion";
import NavButton from "../components/NavButton";
import FloatingHearts from "../components/FloatingHearts";
import { birthdayData,photos } from "../data/birthdayData";
import "./GalleryScene.css";

const finalTransforms = [
  {x:-92,y:-82,r:-10},{x:72,y:-86,r:8},{x:-104,y:62,r:7},
  {x:88,y:58,r:-7},{x:-28,y:-8,r:-3},{x:38,y:16,r:5}
];

export default function GalleryScene({onNext}){
  const [revealed,setRevealed]=useState(1);
  const total=photos.gallery.length;
  const complete=revealed>=total;
  const revealNext=()=>setRevealed(v=>Math.min(total,v+1));

  return <div className="scene-inner gallery-deck-scene">
    <FloatingHearts count={5}/>
    <div className="gallery-deck-copy">
      <p className="eyebrow">a tiny photo pile just for you</p>
      <h2 className="heading-section">{birthdayData.galleryHeading}</h2>
      <p className="body-text">{birthdayData.gallerySubheading}</p>
    </div>

    <div className={`gallery-deck${complete?" gallery-deck--complete":""}`}>
      {photos.gallery.map((photo,index)=>{
        const visible=index<revealed;
        const isTop=index===revealed-1 && !complete;
        const final=finalTransforms[index]||{x:0,y:0,r:0};
        return <motion.button
          key={photo.src}
          type="button"
          className={`gallery-polaroid${isTop?" gallery-polaroid--top":""}`}
          onClick={isTop?revealNext:undefined}
          aria-label={isTop?"Reveal the next picture":`Gallery picture ${index+1}`}
          initial={false}
          animate={visible ? (complete ? {opacity:1,x:final.x,y:final.y,rotate:final.r,scale:.72,zIndex:index+1} : {opacity:1,x:0,y:0,rotate:(index%2?3:-3),scale:1,zIndex:index+1}) : {opacity:0,x:0,y:40,rotate:0,scale:.76,zIndex:0}}
          transition={{type:"spring",stiffness:130,damping:16,delay:complete?index*.055:0}}
          disabled={!isTop}
        >
          <div className="gallery-polaroid__photo"><img src={photo.src} alt={photo.alt}/><div className="gallery-polaroid__fallback">add photo {index+1}</div></div>
          <p>{birthdayData.galleryCaptions[index]}</p>
          {isTop && <span className="gallery-polaroid__tap">tap me ♡</span>}
        </motion.button>;
      })}
    </div>

    {!complete && <p className="eyebrow gallery-deck-hint">tap the top photo · {revealed} / {total}</p>}
    {complete && <motion.div className="gallery-deck-finished" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.45}}><p className="eyebrow">all six, because one was never enough ♡</p><NavButton onClick={onNext}>{birthdayData.buttons.oneMoreThing}</NavButton></motion.div>}
  </div>;
}
