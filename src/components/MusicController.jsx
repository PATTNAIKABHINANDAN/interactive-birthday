import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { musicSrc } from "../data/birthdayData";
import "./MusicController.css";


const MusicController = forwardRef(function MusicController(_, ref) {
  const audioRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hasSource, setHasSource] = useState(true);
  const resumeAfterVideoRef = useRef(false);

  useImperativeHandle(ref, () => ({
    start() {
      setVisible(true);
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0.35;
      audio.play().then(
        () => setPlaying(true),
        () => {
          setPlaying(false);
        }
      );
    },
    pauseForVideo() {
      const audio = audioRef.current;
      if (!audio) return;
      resumeAfterVideoRef.current = !audio.paused;
      if (!audio.paused) audio.pause();
      setPlaying(false);
    },
    resumeAfterVideo() {
      const audio = audioRef.current;
      if (!audio || !resumeAfterVideoRef.current) return;
      audio.play().then(() => setPlaying(true), () => setPlaying(false));
      resumeAfterVideoRef.current = false;
    },
  }));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
  }, [muted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(
        () => setPlaying(true),
        () => setPlaying(false)
      );
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
        preload="none"
        onError={() => setHasSource(false)}
      />
      <AnimatePresence>
        {visible && (
          <motion.div
            className="music-controller"
            initial={{ opacity: 0, y: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="music-controller__btn"
              onClick={togglePlay}
              aria-label={playing ? "Pause music" : "Play music"}
              disabled={!hasSource}
              title={!hasSource ? "Music file not added yet" : undefined}
            >
              {playing ? "❚❚" : "▸"}
            </button>
            <button
              type="button"
              className="music-controller__btn music-controller__btn--small"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute music" : "Mute music"}
            >
              {muted ? "🔇" : "🔈"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default MusicController;
