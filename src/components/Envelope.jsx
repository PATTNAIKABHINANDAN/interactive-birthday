import { motion } from "framer-motion";
import "./Envelope.css";

export default function Envelope({ opened }) {
  return (
    <motion.div
      className="envelope"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="envelope__body">
        <motion.div
          className="envelope__paper"
          initial={{ y: 16, opacity: 0 }}
          animate={opened ? { y: -46, opacity: 1 } : { y: 16, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="envelope__flap"
          style={{ transformOrigin: "top" }}
          initial={{ rotateX: 0 }}
          animate={opened ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {opened &&
          Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              className="envelope__heart"
              style={{ left: `${20 + i * 15}%` }}
              initial={{ opacity: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 0], y: -50, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.5 + i * 0.08, ease: "easeOut" }}
            >
              ♡
            </motion.span>
          ))}
      </div>
    </motion.div>
  );
}
