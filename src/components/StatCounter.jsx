import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Animates a number counting up from 0 to `value` the moment it scrolls
 * into view. Uses an ease-out curve so it starts fast and settles at the
 * target — reads as a rapid "counting up" rather than a slow linear tick.
 */
export default function StatCounter({ value = 0, suffix = "", duration = 3, className = "" }) {
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);
  const rafRef = useRef(null);

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;

    const target = Number(value) || 0;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic — fast start, smooth settle
      setDisplay(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);

  return (
    <motion.p
      onViewportEnter={start}
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {display}
      {suffix}
    </motion.p>
  );
}
