import { useState } from "react";
import { motion } from "framer-motion";
import "./PhotoCard.css";


export default function PhotoCard({
  src,
  alt = "",
  caption,
  date,
  rotation = 0,
  delay = 0,
  size = "md", // "sm" | "md" | "lg"
  decorative,
}) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.figure
      className={`photo-card photo-card--${size}`}
      style={{ "--rotate": `${rotation}deg` }}
      initial={{ opacity: 0, y: 26, rotate: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="photo-card__frame">
        {!failed ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="photo-card__img"
          />
        ) : (
          <div className="photo-card__placeholder" role="img" aria-label={alt}>
            <span>♡</span>
          </div>
        )}
        {decorative}
      </div>
      {(caption || date) && (
        <figcaption className="photo-card__caption">
          {date && <span className="photo-card__date">{date}</span>}
          {caption && <span className="photo-card__text">{caption}</span>}
        </figcaption>
      )}
    </motion.figure>
  );
}
