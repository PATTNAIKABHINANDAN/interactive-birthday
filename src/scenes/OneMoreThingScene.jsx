import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavButton from "../components/NavButton";
import FloatingHearts from "../components/FloatingHearts";
import { birthdayData } from "../data/birthdayData";

export default function OneMoreThingScene({ onNext }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="scene-inner" style={{ background: "var(--gradient-warm)" }}>
      <FloatingHearts count={3} variant="sparkles" />
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <NavButton onClick={() => setRevealed(true)}>
              {birthdayData.oneMoreThingPrompt}
            </NavButton>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)" }}
          >
            <div className="gold-rule" />
            <p className="heading-display" style={{ fontSize: "var(--fs-heading)" }}>
              {birthdayData.oneMoreThingMessage}
            </p>
            <NavButton onClick={onNext} delay={0.4}>
              {birthdayData.buttons.continue}
            </NavButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
