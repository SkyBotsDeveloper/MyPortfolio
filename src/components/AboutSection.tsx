import { motion } from "framer-motion";
import { aboutSkills } from "../lib/data";
import {
  handlePointerSurfaceLeave,
  handlePointerSurfaceMove,
} from "../lib/pointerSurface";
import { SectionIntro } from "./SectionIntro";

export const AboutSection = () => {
  return (
    <section
      id="about"
      data-scene
      className="scene-section section-shell section-ambient relative scroll-mt-28 overflow-hidden bg-bg py-24 md:py-32"
    >
      <div data-scene-stage className="scene-stage section-frame">
        <SectionIntro
          eyebrow="About / Craft"
          title={
            <>
              Crafting digital{" "}
              <span className="font-display italic">experiences</span>
            </>
          }
          description="I build powerful automation tools, elegant web applications, and AI-enhanced systems while exploring the intersection of speed, design, security, and usability."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="space-y-6">
            {[
              "My work sits where product design, automation, and speed meet. I build Telegram bot ecosystems that feel dependable under pressure, from music bots and moderation tooling to utility layers that support real communities.",
              "Alongside bot systems, I ship web products around search, media, AI, and productivity. The goal is always the same: remove friction, sharpen clarity, and make the interface feel immediate.",
              "I also spend time inside investigative workflows, OSINT-oriented systems, API integrations, and AI-enabled tooling. That mix shapes how I think about frontend experiences: beautiful enough to feel considered, practical enough to stay useful.",
            ].map((paragraph, index) => (
              <motion.div
                key={paragraph}
                className="depth-card interactive-surface halo-card rounded-[32px] border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl"
                initial={{ opacity: 0, y: 30, x: index % 2 === 0 ? -18 : 18, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
                whileHover={{ y: -6, rotateX: 3, scale: 1.005 }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ transformPerspective: 1200 }}
                onPointerMove={handlePointerSurfaceMove}
                onPointerLeave={handlePointerSurfaceLeave}
              >
                <p className="interactive-foreground text-base leading-8 text-text-primary/86">
                  {paragraph}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {aboutSkills.map((skill, index) => (
              <motion.div
                key={skill.label}
                className="depth-card interactive-surface interactive-surface-light halo-card group rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 backdrop-blur-xl"
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                whileHover={{
                  y: -6,
                  rotateX: 4,
                  rotateY: index % 2 === 0 ? -4 : 4,
                  scale: 1.01,
                }}
                transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ transformPerspective: 1200 }}
                onPointerMove={handlePointerSurfaceMove}
                onPointerLeave={handlePointerSurfaceLeave}
              >
                <div className="interactive-foreground">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-primary">{skill.label}</span>
                    <span className="font-medium text-muted">{skill.value}%</span>
                  </div>
                  <div className="mt-5 h-[7px] overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="animate-gradient-shift h-full rounded-full bg-accent-gradient"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      transition={{ duration: 1, delay: 0.15 + index * 0.06 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <div className="mt-4 text-xs uppercase tracking-[0.22em] text-muted/80">
                    Precision / Delivery / Systems
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
