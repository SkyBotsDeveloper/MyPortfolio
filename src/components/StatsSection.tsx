import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAdaptiveMotion } from "../hooks/useAdaptiveMotion";
import { stats } from "../lib/data";
import {
  handlePointerSurfaceLeave,
  handlePointerSurfaceMove,
} from "../lib/pointerSurface";
import { SectionIntro } from "./SectionIntro";

interface AnimatedStatProps {
  value: number;
  suffix: string;
  label: string;
  index: number;
  enableDepthMotion: boolean;
}

const AnimatedStat = ({
  value,
  suffix,
  label,
  index,
  enableDepthMotion,
}: AnimatedStatProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="depth-card interactive-surface interactive-surface-light halo-card rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      whileHover={
        enableDepthMotion
          ? {
              y: -8,
              rotateX: 5,
              rotateY: index % 2 === 0 ? -4 : 4,
              scale: 1.01,
            }
          : undefined
      }
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      style={{ transformPerspective: 1200 }}
      onPointerMove={handlePointerSurfaceMove}
      onPointerLeave={handlePointerSurfaceLeave}
    >
      <div className="interactive-foreground">
        <div className="text-3xl tracking-tight text-text-primary sm:text-4xl md:text-5xl">
          {displayValue.toLocaleString()}
          {suffix}
        </div>
        <div className="mt-3 text-xs uppercase tracking-[0.24em] text-muted">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

export const StatsSection = () => {
  const { enableDepthMotion } = useAdaptiveMotion();

  return (
    <section
      data-scene
      className="scene-section section-shell section-ambient bg-bg py-16 md:py-24"
    >
      <div data-scene-stage className="scene-stage section-frame">
        <SectionIntro
          eyebrow="Stats"
          centered
          title={
            <>
              Portfolio <span className="font-display italic">stats</span>
            </>
          }
          description="Built across automation, media, AI, search, and modern web experiences."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              index={index}
              enableDepthMotion={enableDepthMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
