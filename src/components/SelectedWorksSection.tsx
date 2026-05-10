import { motion } from "framer-motion";
import { featuredProjects } from "../lib/data";
import {
  handlePointerSurfaceLeave,
  handlePointerSurfaceMove,
} from "../lib/pointerSurface";
import { SectionIntro } from "./SectionIntro";

interface SelectedWorksSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const SelectedWorksSection = ({
  onNavigate,
}: SelectedWorksSectionProps) => {
  return (
    <section
      id="projects"
      data-scene
      className="scene-section section-shell section-ambient scroll-mt-28 bg-bg py-12 md:py-16"
    >
      <div data-scene-stage className="scene-stage section-frame max-w-[1200px]">
        <SectionIntro
          eyebrow="Selected Work"
          title={
            <>
              Featured{" "}
              <span className="font-display italic">projects</span>
            </>
          }
          description="A curated selection of products and tools built to solve real problems across search, media, AI, and digital experiences."
          action={
            <button
              type="button"
              onClick={() => onNavigate("more-projects")}
              className="group relative hidden rounded-full p-[1px] lg:inline-flex"
            >
              <span className="absolute inset-[-1px] rounded-full bg-accent-gradient opacity-0 transition duration-300 group-hover:opacity-100" />
              <span className="relative inline-flex items-center rounded-full bg-surface px-5 py-3 text-sm text-text-primary transition duration-300 group-hover:bg-bg">
                {"View all work \u2192"}
              </span>
            </button>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {featuredProjects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className={`depth-card interactive-surface interactive-surface-strong group relative flex min-h-[400px] overflow-hidden rounded-3xl border border-stroke bg-surface p-6 md:p-8 ${project.span}`}
              initial={{ opacity: 0, y: 48, scale: 0.96, filter: "blur(14px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              whileHover={{
                y: -10,
                rotateX: 4,
                rotateY: index % 2 === 0 ? -5 : 5,
                scale: 1.01,
              }}
              transition={{ duration: 0.85, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ transformPerspective: 1600 }}
              onPointerMove={handlePointerSurfaceMove}
              onPointerLeave={handlePointerSurfaceLeave}
            >
              <div className="interactive-media-shell !absolute inset-0">
                <motion.div
                  className="absolute inset-0 scale-[1.04] transition duration-700 group-hover:scale-[1.1]"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1.04 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  style={{ backgroundImage: project.visual }}
                />
              </div>
              <div className="halftone-overlay !absolute inset-0 opacity-20 mix-blend-multiply" />
              <div className="!absolute inset-0 bg-gradient-to-t from-black/85 via-black/18 to-transparent" />
              <div className="!absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_45%)] opacity-50" />
              <div className="!absolute inset-0 bg-bg/66 opacity-0 backdrop-blur-lg transition duration-500 group-hover:opacity-100" />
              <div
                className="interactive-highlight !absolute inset-0 opacity-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(255,255,255,0.16), transparent 30%)",
                }}
              />
              <div className="!absolute inset-0 rounded-3xl border border-white/0 transition duration-500 group-hover:border-white/10" />

              <div className="interactive-foreground relative z-10 flex w-full flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <span className="premium-pill rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.26em] text-muted">
                    {project.badge}
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] uppercase tracking-[0.26em] text-muted transition duration-300 group-hover:border-white/20 group-hover:text-text-primary/90">
                    {project.category}
                  </span>
                </div>

                <div className="space-y-4 [transform:translateZ(18px)]">
                  <div className="inline-flex translate-y-3 rounded-full p-[1px] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="accent-gradient inline-flex rounded-full px-4 py-[1px]">
                      <span className="rounded-full bg-bg px-3 py-1 text-sm text-text-primary">
                        {"View \u2014 "}
                        <span className="font-display italic">{project.title}</span>
                      </span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-3xl tracking-tight text-text-primary transition duration-300 group-hover:translate-x-1 md:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-7 text-text-primary/72 md:text-base">
                      {project.description}
                    </p>
                    {"credentials" in project ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-text-primary/78">
                          User: {project.credentials.username}
                        </span>
                        <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-text-primary/78">
                          Pass: {project.credentials.password}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="text-sm uppercase tracking-[0.24em] text-muted transition duration-300 group-hover:text-text-primary">
                    {"Open live \u2197"}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
