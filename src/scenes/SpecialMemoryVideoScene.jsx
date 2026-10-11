import { useRef, useState } from "react";
import { motion } from "framer-motion";
import NavButton from "../components/NavButton";
import FloatingHearts from "../components/FloatingHearts";
import { birthdayData, specialMemoryVideoSrc } from "../data/birthdayData";
import "./SpecialMemoryVideoScene.css";

export default function SpecialMemoryVideoScene({ onRestart, musicRef }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [missing, setMissing] = useState(false);

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    musicRef?.current?.pauseForVideo?.();
    try {
      await video.play();
      setStarted(true);
    } catch {
      setStarted(false);
    }
  };

  const resumeMusic = () => musicRef?.current?.resumeAfterVideo?.();

  return (
    <div className="scene-inner special-video-scene">
      <FloatingHearts count={4} />
      <motion.div className="special-video-copy" initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}}>
        <p className="eyebrow">{birthdayData.specialVideoEyebrow}</p>
        <h2 className="heading-section">{birthdayData.specialVideoHeading}</h2>
        <p className="body-text">{birthdayData.specialVideoCaption}</p>
      </motion.div>

      <motion.div className="special-video-frame" initial={{opacity:0,scale:.9,rotate:-2}} animate={{opacity:1,scale:1,rotate:0}} transition={{delay:.15,type:"spring",stiffness:130,damping:16}}>
        <video
          ref={videoRef}
          src={specialMemoryVideoSrc}
          playsInline
          controls={started}
          preload="metadata"
          onPlay={()=>{setStarted(true); musicRef?.current?.pauseForVideo?.();}}
          onPause={()=>{if(!videoRef.current?.ended) resumeMusic();}}
          onEnded={()=>{setFinished(true);resumeMusic();}}
          onError={()=>setMissing(true)}
        />
        {!started && !missing && <button className="special-video-play" onClick={playVideo} aria-label="Play special memory video"><span>▶</span><small>play this memory</small></button>}
        {missing && <div className="special-video-placeholder"><span>♥</span><p>Add your video at</p><code>public/assets/videos/special-memory.mp4</code></div>}
      </motion.div>

      {(finished || missing) && <NavButton onClick={()=>{resumeMusic();onRestart();}} delay={.2}>restart the little story ↻</NavButton>}
    </div>
  );
}
