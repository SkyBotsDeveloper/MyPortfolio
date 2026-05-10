import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Build", "Create", "Scale"];

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const duration = 2700;
    const start = performance.now();
    let frame = 0;
    let completionTimer = 0;

    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const nextCount = Math.round(progress * 100);
      setCount(nextCount);

      if (progress < 1) {
        frame = window.requestAnimationFrame(update);
      } else {
        completionTimer = window.setTimeout(onComplete, 400);
      }
    };

    frame = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(completionTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 900);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="relative flex h-full flex-col justify-between p-6 md:p-10">
        <motion.div
          className="text-xs uppercase tracking-[0.3em] text-muted"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          SID PORTFOLIO
        </motion.div>

        <div className="flex flex-1 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={words[wordIndex]}
              className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {words[wordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-stroke/50">
            <motion.div
              className="h-full origin-left rounded-full bg-accent-gradient shadow-[0_0_8px_rgba(137,170,204,0.35)]"
              animate={{ scaleX: count / 100 }}
              transition={{ duration: 0.2, ease: "linear" }}
            />
          </div>
          <div className="font-display text-6xl tabular-nums text-text-primary md:text-8xl lg:text-9xl">
            {String(count).padStart(3, "0")}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
