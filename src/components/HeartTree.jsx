import { useMemo } from "react";
import { motion } from "framer-motion";
import "./HeartTree.css";
const HEART_SPOTS = [
  { x: -40, y: -70 }, { x: -10, y: -90 }, { x: 22, y: -78 }, { x: 46, y: -55 },
  { x: -55, y: -40 }, { x: -20, y: -55 }, { x: 12, y: -50 }, { x: 40, y: -30 },
  { x: -35, y: -15 }, { x: 0, y: -25 }, { x: 28, y: -10 }, { x: -12, y: -5 },
];

export default function HeartTree({ heartsShown }) {
  const spots = useMemo(() => HEART_SPOTS, []);

  return (
    <div className="heart-tree">
      <div className="heart-tree__trunk" />
      <div className="heart-tree__roots" />
      {spots.map((spot, i) => (
        <motion.span
          key={i}
          className="heart-tree__heart"
          style={{ left: `calc(50% + ${spot.x}px)`, top: `calc(50% + ${spot.y}px)` }}
          initial={{ opacity: 0, scale: 0, y: -30, rotate: -20 }}
          animate={
            i < heartsShown
              ? { opacity: 1, scale: 1, y: 0, rotate: 0 }
              : { opacity: 0, scale: 0, y: -30, rotate: -20 }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
