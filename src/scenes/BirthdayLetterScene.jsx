import { useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "../components/Typewriter";
import NavButton from "../components/NavButton";
import FloatingHearts from "../components/FloatingHearts";
import { birthdayData } from "../data/birthdayData";
import "./BirthdayLetterScene.css";

export default function BirthdayLetterScene({ onNext }) {
  const [firstLineDone, setFirstLineDone] = useState(false);
  const paragraphs = birthdayData.birthdayLetter.split("\n\n");
  const firstLine = paragraphs[0];
  const rest = paragraphs.slice(1);

  return (
    <div className="scene-inner scene-scroll letter-scene" style={{ background: "var(--gradient-night)" }}>
      <FloatingHearts count={3} />
      <motion.h2
        className="heading-section"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {birthdayData.letterHeading}
      </motion.h2>

      <motion.div
        className="letter-paper"
        initial={{ opacity: 0, y: 24, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="letter-paper__text">
          <Typewriter text={firstLine} onDone={() => setFirstLineDone(true)} />
        </p>
        {firstLineDone &&
          rest.map((p, i) => (
            <motion.p
              key={i}
              className="letter-paper__text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
            >
              {p}
            </motion.p>
          ))}
      </motion.div>

      {firstLineDone && (
        <NavButton onClick={onNext} delay={0.4}>
          {birthdayData.buttons.continue}
        </NavButton>
      )}
    </div>
  );
}
