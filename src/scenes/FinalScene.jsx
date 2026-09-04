import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhotoCard from "../components/PhotoCard";
import NavButton from "../components/NavButton";
import FloatingHearts from "../components/FloatingHearts";
import { birthdayData, photos } from "../data/birthdayData";

export default function FinalScene() {
  const [hiddenRevealed, setHiddenRevealed] = useState(false);

  return (
    <div className="scene-inner scene-scroll" style={{ background: "var(--gradient-warm)", gap: "var(--space-3)" }}>
      <FloatingHearts count={5} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <PhotoCard src={photos.final.src} alt={photos.final.alt} size="lg" />
      </motion.div>

      <motion.h1
        className="heading-display"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9 }}
      >
        {birthdayData.finalHeading}
      </motion.h1>

      <motion.p
        className="body-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.9 }}
      >
        {birthdayData.finalMessage}
      </motion.p>

      <AnimatePresence mode="wait">
        {!hiddenRevealed ? (
          <motion.div
            key="btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <NavButton onClick={() => setHiddenRevealed(true)}>
              {birthdayData.finalHiddenPrompt}
            </NavButton>
          </motion.div>
        ) : (
          <motion.p
            key="hidden"
            className="heading-display"
            style={{ fontSize: "var(--fs-subheading)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {birthdayData.finalHiddenMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
