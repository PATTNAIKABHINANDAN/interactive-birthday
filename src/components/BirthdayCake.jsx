import { motion } from "framer-motion";
import "./BirthdayCake.css";

export default function BirthdayCake() {
  return (
    <motion.div
      className="cake"
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="cake__sparkle cake__sparkle--1">✦</div>
      <div className="cake__sparkle cake__sparkle--2">✦</div>
      <div className="cake__candles">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className="cake__flame">
            🕯️
          </span>
        ))}
      </div>
      <div className="cake__tier cake__tier--top" />
      <div className="cake__tier cake__tier--bottom" />
      <div className="cake__plate" />
    </motion.div>
  );
}
