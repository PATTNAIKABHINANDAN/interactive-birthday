import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./GiftCatchScene.css";

const TARGET_SCORE = 15;

export default function GiftCatchScene({ onNext }) {
  const gameAreaRef = useRef(null);
  const basketPositionRef = useRef(50);
  const giftsRef = useRef([]);
  const nextGiftIdRef = useRef(0);
  const scoreRef = useRef(0);
  const wonRef = useRef(false);
  const [basketPosition, setBasketPosition] = useState(50);
  const [gifts, setGifts] = useState([]);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    let ticks = 0;
    const intervalId = window.setInterval(() => {
      const bounds = gameAreaRef.current?.getBoundingClientRect();
      if (!bounds || wonRef.current) return;

      ticks += 1;
      let caught = 0;
      const nextGifts = [];

      for (const gift of giftsRef.current) {
        const nextY = gift.y + 3.2 + scoreRef.current * 0.12;
        const horizontalDistance = Math.abs(gift.x - basketPositionRef.current) * bounds.width / 100;
        if (nextY >= bounds.height - 96 && nextY <= bounds.height - 32 && horizontalDistance < 54) {
          caught += 1;
        } else if (nextY < bounds.height + 36) {
          nextGifts.push({ ...gift, y: nextY });
        }
      }

      if (caught > 0) {
        scoreRef.current = Math.min(TARGET_SCORE, scoreRef.current + caught);
        setScore(scoreRef.current);
        if (scoreRef.current >= TARGET_SCORE) {
          wonRef.current = true;
          setWon(true);
        }
      }

      if (!wonRef.current && ticks % 16 === 0) {
        nextGifts.push({
          id: nextGiftIdRef.current++,
          x: 8 + Math.random() * 84,
          y: -42,
        });
      }

      giftsRef.current = nextGifts;
      setGifts(nextGifts);

      if (wonRef.current) window.clearInterval(intervalId);
    }, 35);

    return () => window.clearInterval(intervalId);
  }, []);

  function moveBasket(clientX) {
    const bounds = gameAreaRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const position = Math.max(8, Math.min(92, ((clientX - bounds.left) / bounds.width) * 100));
    basketPositionRef.current = position;
    setBasketPosition(position);
  }

  function handleKeyDown(event) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowLeft" ? -7 : 7;
    const position = Math.max(8, Math.min(92, basketPositionRef.current + direction));
    basketPositionRef.current = position;
    setBasketPosition(position);
  }

  return (
    <div className="scene-inner gift-catch-scene">
      <motion.div
        className="gift-catch-content"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        <p className="eyebrow">a birthday warm-up</p>
        <h1 className="heading-section">Catch 15 Gifts</h1>
        <div className="gift-catch-score" role="status" aria-live="polite">
          <span>{score}</span> / {TARGET_SCORE}
        </div>

        <div
          ref={gameAreaRef}
          className="gift-catch-area"
          role="application"
          aria-label="Catch the falling gifts. Move the basket with the pointer or arrow keys."
          tabIndex={0}
          onPointerMove={(event) => moveBasket(event.clientX)}
          onKeyDown={handleKeyDown}
        >
          <div className="gift-catch-stars" aria-hidden="true">✦　·　✧　·　✦</div>
          {gifts.map((gift) => (
            <span
              key={gift.id}
              className="gift-catch-present"
              style={{ left: `${gift.x}%`, top: `${gift.y}px` }}
              aria-hidden="true"
            >
              🎁
            </span>
          ))}
          {!won && (
            <span
              className="gift-catch-basket"
              style={{ left: `${basketPosition}%` }}
              aria-hidden="true"
            >
              🧺
            </span>
          )}
          {won && (
            <motion.div
              className="gift-catch-unlocked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              role="status"
            >
              <span aria-hidden="true">✦</span>
              <h2>You are absolutely amazing.</h2>
              <p>Today is all about you.</p>
            </motion.div>
          )}
        </div>

        {won && (
          <motion.button
            className="nav-button gift-catch-continue"
            onClick={onNext}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Continue <span aria-hidden="true">→</span>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}