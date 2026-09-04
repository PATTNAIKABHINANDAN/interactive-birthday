import { useMemo } from "react";
import { motion } from "framer-motion";
import "./FloatingHearts.css";


export default function FloatingHearts({ count = 6, variant = "hearts", className = "" }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: 8 + Math.random() * 84,
        delay: Math.random() * 6,
        duration: 7 + Math.random() * 6,
        size: 10 + Math.random() * 14,
        drift: (Math.random() - 0.5) * 40,
      })),
    [count]
  );

  return (
    <div className={`floating-hearts ${className}`} aria-hidden="true">
      {items.map((item) => (
        <motion.span
          key={item.id}
          className={`floating-particle floating-particle--${variant}`}
          style={{
            left: `${item.left}%`,
            width: item.size,
            height: item.size,
            fontSize: item.size,
          }}
          initial={{ y: "10%", opacity: 0, x: 0 }}
          animate={{
            y: "-120%",
            opacity: [0, 1, 1, 0],
            x: item.drift,
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {variant === "hearts" ? "♡" : "✦"}
        </motion.span>
      ))}
    </div>
  );
}
