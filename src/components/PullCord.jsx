import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import "./PullCord.css";

const PULL_THRESHOLD = 70;
const MAX_PULL = 110;


export default function PullCord({ onPull, pulled }) {
  const y = useMotionValue(0);
  const [dragging, setDragging] = useState(false);
  const triggeredRef = useRef(false);
  const startYRef = useRef(0);

  const stretch = useTransform(y, [0, MAX_PULL], [1, 1.35]);
  const glow = useTransform(y, [0, PULL_THRESHOLD], [0, 1]);

  const handlePointerDown = (e) => {
    if (pulled) return;
    setDragging(true);
    triggeredRef.current = false;
    startYRef.current = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    e.target.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging || pulled) return;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? startYRef.current;
    const delta = Math.max(0, clientY - startYRef.current);
    const resisted = Math.min(MAX_PULL, delta * 0.6);
    y.set(resisted);
    if (resisted >= PULL_THRESHOLD && !triggeredRef.current) {
      triggeredRef.current = true;
    }
  };

  const finishPull = () => {
    setDragging(false);
    if (triggeredRef.current) {
      animate(y, MAX_PULL * 0.4, { duration: 0.15, ease: "easeOut" }).then(() => {
        animate(y, 0, { type: "spring", stiffness: 260, damping: 14 });
      });
      onPull();
    } else {
      animate(y, 0, { type: "spring", stiffness: 300, damping: 16 });
    }
  };

  const handleTap = () => {
    if (pulled || dragging) return;
    animate(y, MAX_PULL, { duration: 0.25, ease: "easeOut" }).then(() => {
      animate(y, MAX_PULL * 0.4, { duration: 0.15 }).then(() => {
        animate(y, 0, { type: "spring", stiffness: 260, damping: 14 });
      });
    });
    onPull();
  };

  return (
    <div className="pull-cord">
      <div className="pull-cord__mount" />
      <motion.div
        className="pull-cord__rope"
        style={{ scaleY: stretch, transformOrigin: "top" }}
      />
      <motion.button
        type="button"
        className="pull-cord__handle"
        style={{ y }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPull}
        onPointerCancel={finishPull}
        onClick={handleTap}
        aria-label="Pull the cord to turn on the lights"
        disabled={pulled}
      >
        <motion.span
          className="pull-cord__glow"
          style={{ opacity: glow }}
          aria-hidden="true"
        />
        <span className="pull-cord__ring" aria-hidden="true" />
      </motion.button>
    </div>
  );
}
