import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { transitions } from "./SceneTransition";


export default function SceneManager({ scenes, sharedProps = {} }) {
  const [index, setIndex] = useState(0);

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, scenes.length - 1));
  }, [scenes.length]);

  const restart = useCallback(() => setIndex(0), []);

  const current = scenes[index];
  const variants = transitions[current.transition] || transitions.fade;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current.id}
        className="scene"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <current.Component onNext={goNext} onRestart={restart} {...sharedProps} />
      </motion.div>
    </AnimatePresence>
  );
}
