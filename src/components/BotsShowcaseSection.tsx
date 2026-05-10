import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  additionalBots,
  botFilters,
  botStatCards,
  featuredBots,
} from "../lib/data";
import {
  handlePointerSurfaceLeave,
  handlePointerSurfaceMove,
} from "../lib/pointerSurface";
import { SectionIntro } from "./SectionIntro";

type FilterId = (typeof botFilters)[number]["id"];

const categoryLabels: Record<Exclude<FilterId, "all">, string> = {
  multi: "Multi-tool",
  utility: "Utility",
  gaming: "Gaming",
};

const getTelegramHref = (username: string) =>
  `https://t.me/${username.replace(/^@/, "")}`;

export const BotsShowcaseSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filteredFeatured = useMemo(() => {
    if (activeFilter === "all") {
      return featuredBots;
    }

    return featuredBots.filter((bot) => bot.category === activeFilter);
  }, [activeFilter]);

  const filteredAdditional = useMemo(() => {
    if (activeFilter === "all") {
      return additionalBots;
    }

    return additionalBots.filter((bot) => bot.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="bots"
      data-scene
      className="scene-section section-shell section-ambient scroll-mt-28 bg-bg py-16 md:py-24"
    >
      <div data-scene-stage className="scene-stage section-frame">
        <SectionIntro
          eyebrow="Bots"
          title={
            <>
              18+ bots built{" "}
              <span className="font-display italic">& deployed</span>
            </>
          }
          description="Selected active Telegram bots from the wider ecosystem, spanning AI tools, utility, safety, moderation, and gaming experiences."
        />

        <div className="mt-10 flex flex-wrap gap-3">
          {botFilters.map((filter) => {
            const active = filter.id === activeFilter;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full border px-4 py-2 text-sm transition duration-300 ${active ? "premium-pill border-white/20 bg-white/[0.06] text-text-primary shadow-glow" : "border-white/10 bg-transparent text-muted hover:border-white/20 hover:bg-white/[0.03] hover:text-text-primary"}`}
              >
                {filter.label} {filter.count}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 2xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            {filteredFeatured.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                {filteredFeatured.map((bot, index) => {
                  const isPrimary = bot.name === "SkyBeatz";

                  return (
                    <motion.a
                      key={bot.name}
                      href={getTelegramHref(bot.username)}
                      target="_blank"
                      rel="noreferrer"
                      className={`depth-card interactive-surface interactive-surface-strong halo-card group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl md:p-6 ${isPrimary ? "md:col-span-2 xl:col-span-2" : ""}`}
                      initial={{ opacity: 0, y: 42, scale: 0.97, filter: "blur(12px)" }}
                      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      whileHover={{
                        y: -10,
                        rotateX: 5,
                        rotateY: index % 2 === 0 ? -6 : 6,
                        scale: 1.01,
                      }}
                      transition={{ duration: 0.82, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true, margin: "-100px" }}
                      style={{ transformPerspective: 1200 }}
                      aria-label={`Open ${bot.name} on Telegram`}
                      onPointerMove={handlePointerSurfaceMove}
                      onPointerLeave={handlePointerSurfaceLeave}
                    >
                      <div className="interactive-media-shell !absolute inset-0">
                        <div
                          className="absolute inset-0 scale-[1.03] opacity-90 transition duration-500 group-hover:scale-[1.08]"
                          style={{ backgroundImage: bot.visual }}
                        />
                      </div>
                      <div className="!absolute inset-0 bg-gradient-to-t from-black/82 via-black/24 to-black/10" />
                      <div className="!absolute inset-x-6 top-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <div
                        className="interactive-highlight !absolute inset-0 opacity-0"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(255,255,255,0.16), transparent 28%)",
                        }}
                      />
                      <div className="!absolute -left-20 top-10 h-28 w-44 rotate-12 bg-white/10 blur-3xl transition duration-700 group-hover:left-[70%]" />

                      <div className={`interactive-foreground relative z-10 flex flex-col ${isPrimary ? "min-h-[300px]" : "min-h-[250px]"}`}>
                        <div className="flex items-start justify-between gap-3">
                          <span className="premium-pill rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-muted">
                            Featured
                          </span>
                          <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-muted">
                            {bot.accent}
                          </span>
                        </div>

                        <div className={`${isPrimary ? "mt-10 max-w-xl" : "mt-14"}`}>
                          <div className="premium-pill mb-3 inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-text-primary/82 transition duration-300 group-hover:border-[#89AACC]/35 group-hover:text-text-primary">
                            {bot.username}
                          </div>
                          <h3 className={`${isPrimary ? "text-4xl" : "text-2xl"} tracking-tight text-text-primary`}>
                            {bot.name}
                          </h3>
                          <p className={`${isPrimary ? "max-w-lg" : ""} mt-3 text-sm leading-7 text-text-primary/72`}>
                            {bot.description}
                          </p>
                          {"features" in bot ? (
                            <div className="mt-5 flex flex-wrap gap-2">
                              {bot.features.map((feature) => (
                                <span
                                  key={feature}
                                  className="rounded-full border border-[#89AACC]/20 bg-[#89AACC]/[0.07] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-text-primary/70"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              {filteredAdditional.map((bot, index) => (
                <motion.a
                  key={bot.username}
                  href={getTelegramHref(bot.username)}
                  target="_blank"
                  rel="noreferrer"
                  className="depth-card interactive-surface interactive-surface-light group rounded-[26px] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                  initial={{ opacity: 0, y: 28, scale: 0.98, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  whileHover={{
                    y: -6,
                    rotateX: 4,
                    rotateY: index % 2 === 0 ? -4 : 4,
                    scale: 1.01,
                  }}
                  transition={{ duration: 0.68, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-80px" }}
                  style={{ transformPerspective: 1200 }}
                  aria-label={`Open ${bot.name} on Telegram`}
                  onPointerMove={handlePointerSurfaceMove}
                  onPointerLeave={handlePointerSurfaceLeave}
                >
                  <div className="interactive-foreground">
                    <div className="flex items-start justify-between gap-4">
                      <span className="premium-pill rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-muted">
                        {categoryLabels[bot.category]}
                      </span>
                      <div className="h-2.5 w-2.5 rounded-full bg-[#89AACC] shadow-[0_0_18px_rgba(137,170,204,0.8)]" />
                    </div>
                    <h3 className="mt-5 text-xl tracking-tight text-text-primary">
                      {bot.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{bot.username}</p>
                    <p className="mt-4 max-w-md text-sm leading-6 text-text-primary/62">
                      {bot.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {botStatCards.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="depth-card halo-card rounded-[24px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
                  initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  whileHover={{ y: -6, rotateX: 4, scale: 1.01 }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  style={{ transformPerspective: 1100 }}
                >
                  <div className="text-2xl tracking-tight text-text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="depth-card halo-card relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-7 backdrop-blur-xl"
              initial={{ opacity: 0, y: 26, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              whileHover={{ y: -8, rotateX: 4, scale: 1.01 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ transformPerspective: 1200 }}
            >
              <div className="!absolute right-0 top-0 h-44 w-44 rounded-full bg-[#4E85BF]/10 blur-3xl" />
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-[0.3em] text-muted">
                  Live ecosystem
                </div>
                <h3 className="mt-4 text-3xl tracking-tight text-text-primary">
                  Built for daily use, not just launches.
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  The portfolio is grounded in real Telegram products: music
                  playback, moderation, safety tooling, games, utilities, and
                  support systems that stay active in production.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
