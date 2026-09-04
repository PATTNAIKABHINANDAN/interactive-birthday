import { useEffect } from "react";
import { motion } from "framer-motion";
import { birthdayData } from "../data/birthdayData";
import FloatingHearts from "../components/FloatingHearts";

export default function IntroScene({ onNext }) {
  useEffect(() => {
    const t = setTimeout(onNext, 2600);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <button
      type="button"
      className="scene-inner"
      onClick={onNext}
      aria-label="Continue"
      style={{ background: "var(--gradient-night)", cursor: "pointer" }}
    >
      <FloatingHearts count={4} variant="sparkles" />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "radial-gradient(circle, #ffe3ea, var(--color-rose))",
          boxShadow: "0 0 30px 10px rgba(233,166,181,0.45)",
        }}
      />
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0.6] }}
        transition={{ duration: 2.4, times: [0, 0.3, 0.75, 1], ease: "easeInOut" }}
      >
        {birthdayData.introWhisper}
      </motion.p>
    </button>
  );
}
