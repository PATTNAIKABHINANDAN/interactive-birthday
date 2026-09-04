import { motion } from "framer-motion";


export default function NavButton({ children, onClick, ghost = false, delay = 0, style }) {
  return (
    <motion.button
      type="button"
      className={`nav-button${ghost ? " nav-button--ghost" : ""}`}
      onClick={onClick}
      style={style}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
