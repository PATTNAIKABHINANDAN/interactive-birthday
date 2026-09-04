import { useState } from "react";
import { motion } from "framer-motion";
import BirthdayCake from "../components/BirthdayCake";
import AgeTransformation from "../components/AgeTransformation";
import FloatingHearts from "../components/FloatingHearts";
import NavButton from "../components/NavButton";
import { birthdayData } from "../data/birthdayData";

export default function BirthdayRevealScene({ onNext }) {
  const [transformDone, setTransformDone] = useState(false);

  return (
    <div className="scene-inner" style={{ background: "var(--gradient-warm)" }}>
      <FloatingHearts count={5} variant="sparkles" />
      <BirthdayCake />
      <AgeTransformation
        from={birthdayData.previousAge}
        to={birthdayData.birthdayAge}
        onComplete={() => setTransformDone(true)}
      />
      {transformDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <NavButton onClick={onNext} delay={0.3}>
            {birthdayData.buttons.seeWhatIFound}
          </NavButton>
        </motion.div>
      )}
    </div>
  );
}
