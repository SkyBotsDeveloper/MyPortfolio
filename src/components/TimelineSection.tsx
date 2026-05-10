import { motion } from "framer-motion";
import { timelineMilestones } from "../lib/data";
import {
  handlePointerSurfaceLeave,
  handlePointerSurfaceMove,
} from "../lib/pointerSurface";
import { SectionIntro } from "./SectionIntro";

export const TimelineSection = () => {
  return (
    <section
      data-scene
      className="scene-section section-shell section-ambient bg-bg py-16 md:py-24"
    >
      <div data-scene-stage className="scene-stage section-frame max-w-5xl">
        <SectionIntro
          eyebrow="Journey"
          centered
          title={
            <>
              Timeline / <span className="font-display italic">journey</span>
            </>
          }
          description="A compact view of how the craft expanded from coding fundamentals into bots, AI systems, product leadership, and scaled releases."
        />

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/14 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10 md:space-y-14">
            {timelineMilestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={`${milestone.year}-${milestone.title}`}
                  className={`relative pl-14 md:w-1/2 ${isLeft ? "md:pr-14 md:pl-0" : "md:ml-auto md:pl-14"}`}
                  initial={{ opacity: 0, y: 36, x: isLeft ? -24 : 24, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-120px" }}
                >
                  <span
                    className={`absolute left-[9px] top-8 h-3 w-3 rounded-full bg-[#89AACC] shadow-[0_0_20px_rgba(137,170,204,0.8)] md:top-10 ${isLeft ? "md:left-auto md:right-[-6px]" : "md:left-[-6px]"}`}
                  />
                  <div
                    className="depth-card interactive-surface interactive-surface-light halo-card rounded-[30px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
                    onPointerMove={handlePointerSurfaceMove}
                    onPointerLeave={handlePointerSurfaceLeave}
                  >
                    <div className="interactive-foreground">
                      <div className="text-xs uppercase tracking-[0.3em] text-muted">
                        {milestone.year}
                      </div>
                      <h3 className="mt-3 text-3xl tracking-tight text-text-primary">
                        {milestone.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
