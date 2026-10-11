import { useState } from "react";
import { motion } from "framer-motion";
import { birthdayData } from "../data/birthdayData";
import "./LockScene.css";

export default function LockScene({ onNext }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const unlock = (event) => {
    event.preventDefault();
    if (value.trim().toUpperCase() === birthdayData.lockCode.toUpperCase()) {
      setOpen(true);
      setTimeout(onNext, 1150);
    } else {
      setError(true);
      setValue("");
      setTimeout(() => setError(false), 650);
    }
  };
  return <div className="scene-inner lock-scene">
    <motion.div className="lock-shell" initial={{opacity:0,y:24,scale:.96}} animate={{opacity:1,y:0,scale:1}}>
      <motion.div className={`lock-visual${open?" lock-visual--open":""}`} animate={error?{x:[0,-10,9,-7,5,0]}:{}} transition={{duration:.42}}>
        <div className="lock-shackle"/><div className="lock-body"><span>♡</span></div>
      </motion.div>
      <p className="eyebrow">a tiny secret first...</p>
      <h1 className="heading-section lock-heading">{birthdayData.lockPrompt}</h1>
      <form className="lock-form" onSubmit={unlock}>
        <input
          className={`lock-input${error ? " lock-input--error" : ""}`}
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError(false);
          }}
          placeholder="Type your answer"
          aria-label={birthdayData.lockPrompt}
          aria-invalid={error}
          aria-describedby={error ? "lock-error" : undefined}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck="false"
          disabled={open}
        />
        {error && <motion.p id="lock-error" className="lock-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{birthdayData.lockError}</motion.p>}
        <button className="lock-enter" type="submit" aria-label="unlock" disabled={open}>♡</button>
      </form>
    </motion.div>
  </div>
}
