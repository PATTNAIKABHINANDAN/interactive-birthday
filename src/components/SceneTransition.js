
export const transitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  },
  warmLight: {
    initial: { opacity: 0, filter: "brightness(0.4)" },
    animate: {
      opacity: 1,
      filter: "brightness(1)",
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, transition: { duration: 0.6 } },
  },
  particles: {
    initial: { opacity: 0, scale: 1.06, filter: "blur(10px)" },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      filter: "blur(8px)",
      transition: { duration: 0.6 },
    },
  },
  heart: {
    initial: { opacity: 0, scale: 0.9, y: 24 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, scale: 1.03, y: -18, transition: { duration: 0.55 } },
  },
  scrapbook: {
    initial: { opacity: 0, rotateY: -8, x: 40 },
    animate: {
      opacity: 1,
      rotateY: 0,
      x: 0,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, rotateY: 8, x: -30, transition: { duration: 0.5 } },
  },
  slowFade: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, transition: { duration: 1.1 } },
  },
};
