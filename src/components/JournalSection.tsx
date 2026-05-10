import { motion } from "framer-motion";
import { journalEntries } from "../lib/data";
import {
  handlePointerSurfaceLeave,
  handlePointerSurfaceMove,
} from "../lib/pointerSurface";
import { SectionIntro } from "./SectionIntro";

export const JournalSection = () => {
  return (
    <section
      data-scene
      className="scene-section section-shell section-ambient bg-bg py-16 md:py-24"
    >
      <div data-scene-stage className="scene-stage section-frame">
        <SectionIntro
          eyebrow="Journal"
          title={
            <>
              Recent <span className="font-display italic">thoughts</span>
            </>
          }
          description="Notes, ideas, and reflections around bots, web systems, AI workflows, and modern digital products."
          action={
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-muted">
              View all
            </div>
          }
        />

        <div className="mt-10 space-y-4">
          {journalEntries.map((entry, index) => (
            <motion.article
              key={entry.title}
              className="depth-card interactive-surface interactive-surface-light group flex flex-col gap-5 rounded-[40px] border border-stroke bg-surface/30 p-4 transition duration-300 hover:bg-surface sm:flex-row sm:items-center sm:rounded-full"
              initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              whileHover={{ x: 8, y: -3, scale: 1.004 }}
              transition={{ duration: 0.75, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              onPointerMove={handlePointerSurfaceMove}
              onPointerLeave={handlePointerSurfaceLeave}
            >
              <div className="interactive-media-shell">
                <div
                  className="h-20 w-20 shrink-0 rounded-[28px] border border-white/10 transition duration-500 group-hover:scale-105 sm:rounded-full"
                  style={{ backgroundImage: entry.visual }}
                />
              </div>
              <div className="interactive-foreground min-w-0 flex-1">
                <div className="mb-2 text-[11px] uppercase tracking-[0.26em] text-muted">
                  {entry.theme}
                </div>
                <h3 className="text-lg leading-tight text-text-primary md:text-xl">
                  {entry.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted">
                <span>{entry.readTime}</span>
                <span className="h-1 w-1 rounded-full bg-muted" />
                <span>{entry.year}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
