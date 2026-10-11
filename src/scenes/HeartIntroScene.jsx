import { useState } from "react";
import { motion } from "framer-motion";
import "./HeartIntroScene.css";

export default function HeartIntroScene({ onNext, musicRef }) {
  const [opened, setOpened] = useState(false);

  const openHeart = () => {
    if (opened) return;
    setOpened(true);
    musicRef?.current?.start();
    window.setTimeout(onNext, 880);
  };

  return (
    <div className="scene-inner heart-intro-scene">
      <motion.p
        className="heart-intro-whisper"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: opened ? 0 : 0.8, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        tap the heart ♡
      </motion.p>

      <motion.button
        type="button"
        className="heart-intro-button"
        aria-label="Open the birthday surprise"
        onClick={openHeart}
        whileTap={{ scale: 0.92 }}
        animate={opened ? { scale: 30, rotate: 3 } : { scale: [1, 1.06, 1] }}
        transition={opened ? { duration: 0.82, ease: [0.76, 0, 0.24, 1] } : { duration: 1.9, repeat: Infinity }}
      >
        ♥
      </motion.button>

      <motion.div
        className="heart-intro-ring"
        animate={opened ? { scale: 7, opacity: 0 } : { scale: [1, 1.35], opacity: [0.45, 0] }}
        transition={{ duration: opened ? 0.7 : 1.8, repeat: opened ? 0 : Infinity }}
      />
    </div>
  );
}
