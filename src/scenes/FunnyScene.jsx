import { motion } from "framer-motion";
import PhotoCard from "../components/PhotoCard";
import NavButton from "../components/NavButton";
import FloatingHearts from "../components/FloatingHearts";
import { birthdayData, photos } from "../data/birthdayData";

export default function FunnyScene({onNext}){
 return <div className="scene-inner" style={{background:"var(--gradient-warm)"}}>
  <FloatingHearts count={4} variant="sparkles"/>
  <motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} style={{display:"flex",flexDirection:"column",gap:8,alignItems:"center"}}>
   <p className="eyebrow">{birthdayData.funnyEyebrow}</p>
   <h2 className="heading-section">{birthdayData.funnyHeading}</h2>
  </motion.div>
  <motion.div initial={{opacity:0,scale:.75,rotate:-8}} animate={{opacity:1,scale:1,rotate:-2}} transition={{type:"spring",stiffness:150,damping:13,delay:.2}}>
   <PhotoCard src={photos.funny.src} alt={photos.funny.alt} caption={birthdayData.funnyCaption} size="md" rotation={-2}/>
  </motion.div>
  <NavButton onClick={onNext} delay={.45}>{birthdayData.buttons.oneMoreThing}</NavButton>
 </div>
}
