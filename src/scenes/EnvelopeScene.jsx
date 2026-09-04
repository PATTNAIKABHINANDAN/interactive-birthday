import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "../components/Envelope";
import PhotoCard from "../components/PhotoCard";
import NavButton from "../components/NavButton";
import FloatingHearts from "../components/FloatingHearts";
import { birthdayData, photos } from "../data/birthdayData";

export default function EnvelopeScene({ onNext }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="scene-inner" style={{ background: "var(--gradient-night)" }}>
      <FloatingHearts count={5} />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)" }}
          >
            <p
              className="heading-display"
              style={{ fontSize: "var(--fs-subheading)", lineHeight: 1.3, maxWidth: 260 }}
            >
              {birthdayData.openingName}
            </p>
            <Envelope opened={false} />
            <p className="body-text">{birthdayData.envelopeText}</p>
            <NavButton onClick={() => setOpened(true)} delay={0.2}>
              {birthdayData.buttons.openEnvelope}
            </NavButton>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)" }}
          >
            <Envelope opened={true} />
            <motion.p
              className="heading-display"
              style={{ fontSize: "var(--fs-heading)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
            >
              {birthdayData.birthdayHeading}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.7 }}
            >
              <PhotoCard
                src={photos.funny.src}
                alt={photos.funny.alt}
                size="md"
                rotation={-3}
              />
            </motion.div>
            <NavButton onClick={onNext} delay={2.3}>
              {birthdayData.buttons.continue}
            </NavButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
