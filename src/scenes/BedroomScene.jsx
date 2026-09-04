import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PullCord from "../components/PullCord";
import FloatingHearts from "../components/FloatingHearts";
import { birthdayData } from "../data/birthdayData";
import "./BedroomScene.css";

export default function BedroomScene({ onNext, musicRef }) {
  const [litUp, setLitUp] = useState(false);

  const handlePull = () => {
    if (litUp) return;
    setLitUp(true);
    musicRef?.current?.start();
  };

  useEffect(() => {
    if (!litUp) return;
    const t = setTimeout(onNext, 2600);
    return () => clearTimeout(t);
  }, [litUp, onNext]);

  return (
    <div className={`bedroom${litUp ? " bedroom--lit" : ""}`}>
      <div className="bedroom__sky">
        <div className="bedroom__window">
          <div className="bedroom__moon" />
        </div>
      </div>

      <PullCord onPull={handlePull} pulled={litUp} />

      {!litUp && (
        <motion.p
          className="bedroom__hint eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {birthdayData.bedroomHint}
        </motion.p>
      )}

      <div className="bedroom__lamp">
        <div className="bedroom__lamp-shade" />
        <div className="bedroom__lamp-glow" />
        <div className="bedroom__lamp-stand" />
      </div>

      <div className="bedroom__fairy-lights">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="bedroom__bulb" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </div>

      <div className="bedroom__floor">
        <div className="bedroom__bed">
          <div className="bedroom__blanket" />
          <div className="bedroom__pillow" />
          <div className="bedroom__pillow bedroom__pillow--two" />
        </div>
        <div className="bedroom__table">
          <div className="bedroom__plant">🌿</div>
        </div>
        <div className="bedroom__teddy">🧸</div>
        <div className="bedroom__balloons">
          <span className="bedroom__balloon bedroom__balloon--rose" />
          <span className="bedroom__balloon bedroom__balloon--pink" />
        </div>
      </div>

      {litUp && <FloatingHearts count={7} variant="sparkles" />}

      <motion.div
        className="bedroom__caption"
        initial={{ opacity: 0 }}
        animate={{ opacity: litUp ? 1 : 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <p className="eyebrow">the lights are on now...</p>
      </motion.div>
    </div>
  );
}
