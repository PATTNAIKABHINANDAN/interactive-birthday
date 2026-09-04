import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AgeTransformation.css";

const PHASES = {
  SHOW_OLD: "show-old",
  BURNING: "burning",
  FORMING: "forming",
  DONE: "done",
};


export default function AgeTransformation({ from = 15, to = 16, onComplete }) {
  const [phase, setPhase] = useState(PHASES.SHOW_OLD);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(PHASES.BURNING), 1300);
    const t2 = setTimeout(() => setPhase(PHASES.FORMING), 2600);
    const t3 = setTimeout(() => setPhase(PHASES.DONE), 3800);
    const t4 = setTimeout(() => onComplete?.(), 5200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  const embers = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 140,
        delay: Math.random() * 0.6,
        size: 4 + Math.random() * 6,
      })),
    []
  );

  return (
    <div className="age-transform">
      <AnimatePresence mode="wait">
        {(phase === PHASES.SHOW_OLD || phase === PHASES.BURNING) && (
          <motion.div
            key="old"
            className="age-transform__number"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              phase === PHASES.BURNING
                ? { opacity: 0, scale: 0.9, filter: "blur(2px)" }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: phase === PHASES.BURNING ? 1.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {from}
            {phase === PHASES.BURNING && (
              <div className="age-transform__flames" aria-hidden="true">
                {["🔥", "🔥", "🔥"].map((f, i) => (
                  <motion.span
                    key={i}
                    className="age-transform__flame"
                    style={{ left: `${20 + i * 30}%` }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: [0, 1, 1, 0], y: -18 }}
                    transition={{ duration: 1.1, delay: i * 0.15, ease: "easeOut" }}
                  >
                    {f}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {phase === PHASES.BURNING &&
        embers.map((e) => (
          <motion.span
            key={e.id}
            className="age-transform__ember"
            style={{ width: e.size, height: e.size }}
            initial={{ x: e.x * 0.3, y: 10, opacity: 0 }}
            animate={{ x: e.x, y: -90, opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, delay: e.delay, ease: "easeOut" }}
          />
        ))}

      {phase === PHASES.FORMING &&
        embers.map((e) => (
          <motion.span
            key={`gather-${e.id}`}
            className="age-transform__ember age-transform__ember--gather"
            style={{ width: e.size, height: e.size }}
            initial={{ x: e.x, y: -20, opacity: 0.9 }}
            animate={{ x: 0, y: 0, opacity: 0 }}
            transition={{ duration: 1, ease: "easeIn" }}
          />
        ))}

      <AnimatePresence>
        {(phase === PHASES.FORMING || phase === PHASES.DONE) && (
          <motion.div
            key="new"
            className="age-transform__number age-transform__number--new"
            initial={{ opacity: 0, scale: 0.5, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {to}
          </motion.div>
        )}
      </AnimatePresence>

      {phase === PHASES.DONE && (
        <motion.p
          className="age-transform__caption"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          SWEET SIXTEEN ♡
        </motion.p>
      )}
    </div>
  );
}
