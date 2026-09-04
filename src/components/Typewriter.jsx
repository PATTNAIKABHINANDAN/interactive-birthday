import { useEffect, useState } from "react";


export default function Typewriter({ text, speed = 45, onDone, className }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onDone]);

  return (
    <span className={className}>
      {shown}
      <span aria-hidden="true" className="typewriter-cursor">
        |
      </span>
    </span>
  );
}
