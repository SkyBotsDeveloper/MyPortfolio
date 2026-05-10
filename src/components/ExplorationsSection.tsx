import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useAdaptiveMotion } from "../hooks/useAdaptiveMotion";
import { explorations } from "../lib/data";
import { ScrollTrigger, gsap } from "../lib/gsap";
import {
  handlePointerSurfaceLeave,
  handlePointerSurfaceMove,
} from "../lib/pointerSurface";

interface ExplorationsSectionProps {
  onNavigate: (sectionId: string) => void;
}

type ExplorationCard = (typeof explorations)[number];

const modalMeta: Record<
  ExplorationCard["title"],
  {
    label: string;
    chips: string[];
    stats: { label: string; value: string }[];
  }
> = {
  "Search Systems": {
    label: "Discovery stack",
    chips: ["Query flow", "Result ranking", "Fast recall"],
    stats: [
      { label: "Latency", value: "0.18s" },
      { label: "Signals", value: "12" },
      { label: "Results", value: "248" },
    ],
  },
  "Music Interfaces": {
    label: "Playback surface",
    chips: ["Queue logic", "Player states", "Ambient rhythm"],
    stats: [
      { label: "Tracks", value: "1.2k" },
      { label: "Mixes", value: "48" },
      { label: "Flow", value: "Live" },
    ],
  },
  "AI Tools": {
    label: "Generation layer",
    chips: ["Prompt flow", "Response framing", "Useful outputs"],
    stats: [
      { label: "Prompts", value: "86" },
      { label: "Modes", value: "06" },
      { label: "Speed", value: "Fast" },
    ],
  },
  "Bot Dashboards": {
    label: "Operations panel",
    chips: ["Moderation", "Queues", "Control center"],
    stats: [
      { label: "Bots", value: "18" },
      { label: "Actions", value: "2.4k" },
      { label: "Health", value: "Stable" },
    ],
  },
  "OSINT Workflows": {
    label: "Investigation flow",
    chips: ["Cross-checks", "Evidence trail", "Search layers"],
    stats: [
      { label: "Sources", value: "34" },
      { label: "Matches", value: "117" },
      { label: "Status", value: "Tracked" },
    ],
  },
  "Motion UI": {
    label: "Transition study",
    chips: ["Scroll timing", "Layer depth", "Reveal balance"],
    stats: [
      { label: "Scenes", value: "09" },
      { label: "Layers", value: "14" },
      { label: "Feel", value: "Smooth" },
    ],
  },
};

const renderModalPreview = (card: ExplorationCard) => {
  switch (card.title) {
    case "Search Systems":
      return (
        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
            <div className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-text-primary/74">
              Search query / intent / result surface
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
                Filters
              </div>
              <div className="mt-4 space-y-2">
                {["Verified", "Fast links", "Live index"].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-text-primary/78"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              {[
                "Elite Search / direct intent matching",
                "Media result / clean hierarchy",
                "Utility result / one-click access",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <div className="text-sm text-text-primary">{item}</div>
                  <div className="mt-2 h-1.5 rounded-full bg-white/[0.05]">
                    <div className="h-full w-[68%] rounded-full bg-accent-gradient" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case "Music Interfaces":
      return (
        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
                  Now playing
                </div>
                <div className="mt-2 text-lg text-text-primary">Midnight Motion</div>
              </div>
              <div className="flex gap-2">
                {["Prev", "Stop", "Play"].map((item) => (
                  <div
                    key={item}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-primary/78"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-white/[0.05]">
              <div className="h-full w-[54%] rounded-full bg-accent-gradient" />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {["Playlist focus", "Artist state", "Mood queue"].map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/25 p-4"
              >
                <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
                  0{index + 1}
                </div>
                <div className="mt-3 text-base text-text-primary">{item}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case "AI Tools":
      return (
        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
              Prompt input
            </div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-black/35 p-4 text-sm text-text-primary/74">
              Generate a practical visual system with cleaner hierarchy and fast user flow.
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {["Response framing", "Output modes", "History panel", "Action strip"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
                    Module
                  </div>
                  <div className="mt-3 text-base text-text-primary">{item}</div>
                </div>
              ),
            )}
          </div>
        </div>
      );
    case "Bot Dashboards":
      return (
        <div className="grid gap-3">
          <div className="grid gap-3 md:grid-cols-3">
            {["Moderation", "Utilities", "Music"].map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/25 p-4"
              >
                <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
                  Lane 0{index + 1}
                </div>
                <div className="mt-3 text-base text-text-primary">{item}</div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
                Active queue
              </div>
              <div className="text-xs text-text-primary/74">Realtime</div>
            </div>
            <div className="space-y-2">
              {["Anti-abuse rules", "User request backlog", "Support escalations"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-text-primary/78"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      );
    case "OSINT Workflows":
      return (
        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
                Evidence chain
              </div>
              <div className="text-xs text-text-primary/74">Tracked</div>
            </div>
            <div className="grid gap-2">
              {["Source capture", "Entity match", "Cross-reference", "Output log"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-text-primary/78"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#89AACC]" />
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
                Search lanes
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 rounded-full bg-white/[0.05]">
                  <div className="h-full w-[76%] rounded-full bg-accent-gradient" />
                </div>
                <div className="h-2 rounded-full bg-white/[0.05]">
                  <div className="h-full w-[58%] rounded-full bg-accent-gradient opacity-80" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
                Context map
              </div>
              <div className="mt-4 flex h-[92px] items-center justify-center rounded-2xl border border-white/10 bg-[radial-gradient(circle,_rgba(137,170,204,0.18),transparent_62%)]">
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="h-2 w-2 rounded-full bg-white/70" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "Motion UI":
      return (
        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
              Sequence
            </div>
            <div className="mt-4 flex items-center gap-3">
              {["Intro", "Shift", "Reveal", "Settle"].map((item) => (
                <div
                  key={item}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center text-sm text-text-primary/78"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {["Layer depth", "Scroll timing", "Text pacing", "Visual weight"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
                    Study
                  </div>
                  <div className="mt-3 text-base text-text-primary">{item}</div>
                </div>
              ),
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export const ExplorationsSection = ({
  onNavigate,
}: ExplorationsSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const leftColumnRef = useRef<HTMLDivElement | null>(null);
  const rightColumnRef = useRef<HTMLDivElement | null>(null);
  const { enableDepthMotion, enableHeavyMotion, reduceMotion } = useAdaptiveMotion();
  const [activeCard, setActiveCard] =
    useState<(typeof explorations)[number] | null>(null);

  const leftCards = useMemo(
    () => explorations.filter((_, index) => index % 2 === 0),
    [],
  );
  const rightCards = useMemo(
    () => explorations.filter((_, index) => index % 2 !== 0),
    [],
  );

  useLayoutEffect(() => {
    if (!sectionRef.current || !contentRef.current) {
      return;
    }

    const mm = gsap.matchMedia();

    if (reduceMotion) {
      return () => mm.revert();
    }

    mm.add("(min-width: 1024px)", () => {
      if (!enableHeavyMotion) {
        return undefined;
      }

      const pin = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      gsap.fromTo(
        ".exploration-content-panel",
        {
          scale: 0.92,
          yPercent: 8,
          opacity: 0.72,
        },
        {
          scale: 1.04,
          yPercent: -6,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );

      if (leftColumnRef.current) {
        gsap.fromTo(
          leftColumnRef.current,
          { yPercent: -3 },
          {
            yPercent: 18,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      }

      if (rightColumnRef.current) {
        gsap.fromTo(
          rightColumnRef.current,
          { yPercent: 8 },
          {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      }

      gsap.utils
        .toArray<HTMLElement>(".exploration-card")
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              rotate: index % 2 === 0 ? -10 : 10,
              y: 80,
              opacity: 0.28,
              scale: 0.88,
            },
            {
              rotate: index % 2 === 0 ? 4 : -4,
              y: 0,
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 52%",
                scrub: 1,
              },
            },
          );

          const visual = card.querySelector<HTMLElement>(".exploration-card-visual");

          if (visual) {
            gsap.fromTo(
              visual,
              {
                scale: 1.14,
                yPercent: -10,
              },
              {
                scale: 1,
                yPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }
        });

      return () => {
        pin.kill();
      };
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(
        ".exploration-content-panel",
        {
          opacity: 0,
          y: 26,
          filter: "blur(14px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 88%",
          },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>(".exploration-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 42,
          opacity: 0,
          rotate: index % 2 === 0 ? -4 : 4,
          scale: 0.96,
          filter: "blur(12px)",
        },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        },
      );
    });

    return () => mm.revert();
  }, [enableHeavyMotion, reduceMotion]);

  return (
    <>
      <section
        ref={sectionRef}
        data-scene
        className="scene-section section-shell section-ambient relative overflow-hidden bg-bg py-16 md:py-20 lg:min-h-[300vh] lg:py-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(78,133,191,0.14),transparent_30%),radial-gradient(circle_at_top_left,_rgba(137,170,204,0.16),transparent_20%),linear-gradient(180deg,rgba(4,4,4,0.9),rgba(4,4,4,0.98))]" />
        <div className="absolute left-[6%] top-[18%] h-52 w-52 rounded-full bg-[#89AACC]/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[4%] h-72 w-72 rounded-full bg-[#4E85BF]/10 blur-[150px]" />

        <div
          ref={contentRef}
          data-scene-stage
          className="scene-stage relative z-10 flex min-h-[34rem] items-center justify-center py-20 lg:h-screen lg:min-h-0 lg:py-0"
        >
          <div className="exploration-content-panel depth-card interactive-surface interactive-surface-strong halo-card mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-black/25 px-6 py-8 text-center backdrop-blur-2xl sm:px-8 md:rounded-[40px] md:px-12 md:py-12">
            <div className="mb-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
              <span className="h-px w-8 bg-stroke" />
              <span>Explorations</span>
            </div>
            <h2 className="text-5xl leading-[0.95] tracking-tight text-text-primary md:text-7xl">
              Visual <span className="font-display italic">playground</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted md:text-base">
              A space for motion, interface experiments, interactive depth, and
              future-facing product aesthetics.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("projects")}
              className="group relative mt-8 rounded-full p-[1px]"
            >
              <span className="absolute inset-[-1px] rounded-full bg-accent-gradient opacity-0 transition duration-300 group-hover:opacity-100" />
              <span className="relative inline-flex rounded-full border border-white/10 bg-black/30 px-6 py-3 text-sm text-text-primary transition duration-300 group-hover:bg-bg">
                See selected systems
              </span>
            </button>
          </div>
        </div>

        <div className="absolute inset-0 z-20 hidden lg:block">
          <div className="section-frame grid min-h-[300vh] max-w-[1400px] grid-cols-2 gap-12 px-6 md:gap-40 lg:px-10">
            <div
              ref={leftColumnRef}
              className="flex min-h-[300vh] flex-col items-center gap-24 pt-[30vh]"
            >
              {leftCards.map((card) => (
                <motion.button
                  key={card.title}
                  type="button"
                  onClick={() => setActiveCard(card)}
                  className="exploration-card interactive-surface interactive-surface-strong depth-card pointer-events-auto w-full max-w-[320px] rounded-[32px] border border-white/10 bg-white/[0.03] p-4 text-left backdrop-blur-xl transition duration-300 hover:border-white/20"
                  whileHover={
                    enableDepthMotion ? { y: -12, rotateX: 5, rotateY: -5, scale: 1.02 } : undefined
                  }
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformPerspective: 1400 }}
                  onPointerMove={handlePointerSurfaceMove}
                  onPointerLeave={handlePointerSurfaceLeave}
                >
                  <div className="interactive-media-shell">
                    <div
                      className="exploration-card-visual aspect-square rounded-[26px] border border-white/10"
                      style={{ backgroundImage: card.visual }}
                    />
                  </div>
                  <div
                    className="interactive-highlight !absolute inset-0 opacity-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(255,255,255,0.18), transparent 30%)",
                    }}
                  />
                  <div className="interactive-foreground mt-4">
                    <div className="text-[11px] uppercase tracking-[0.26em] text-muted">
                      Concept
                    </div>
                    <h3 className="mt-2 text-2xl tracking-tight text-text-primary">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {card.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>

            <div
              ref={rightColumnRef}
              className="flex min-h-[300vh] flex-col items-center gap-24 pt-[48vh]"
            >
              {rightCards.map((card) => (
                <motion.button
                  key={card.title}
                  type="button"
                  onClick={() => setActiveCard(card)}
                  className="exploration-card interactive-surface interactive-surface-strong depth-card pointer-events-auto w-full max-w-[320px] rounded-[32px] border border-white/10 bg-white/[0.03] p-4 text-left backdrop-blur-xl transition duration-300 hover:border-white/20"
                  whileHover={
                    enableDepthMotion ? { y: -12, rotateX: 5, rotateY: 5, scale: 1.02 } : undefined
                  }
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformPerspective: 1400 }}
                  onPointerMove={handlePointerSurfaceMove}
                  onPointerLeave={handlePointerSurfaceLeave}
                >
                  <div className="interactive-media-shell">
                    <div
                      className="exploration-card-visual aspect-square rounded-[26px] border border-white/10"
                      style={{ backgroundImage: card.visual }}
                    />
                  </div>
                  <div
                    className="interactive-highlight !absolute inset-0 opacity-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(255,255,255,0.18), transparent 30%)",
                    }}
                  />
                  <div className="interactive-foreground mt-4">
                    <div className="text-[11px] uppercase tracking-[0.26em] text-muted">
                      Study
                    </div>
                    <h3 className="mt-2 text-2xl tracking-tight text-text-primary">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {card.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-20 -mt-8 grid gap-4 pb-20 sm:-mt-10 md:grid-cols-2 lg:hidden">
          {explorations.map((card) => (
            <button
              key={card.title}
              type="button"
              onClick={() => setActiveCard(card)}
              className="depth-card interactive-surface interactive-surface-light rounded-[28px] border border-white/10 bg-white/[0.03] p-4 text-left backdrop-blur-xl"
              onPointerMove={handlePointerSurfaceMove}
              onPointerLeave={handlePointerSurfaceLeave}
            >
              <div className="interactive-media-shell">
                <div
                  className="exploration-card-visual aspect-square rounded-[22px] border border-white/10"
                  style={{ backgroundImage: card.visual }}
                />
              </div>
              <div className="interactive-foreground">
                <h3 className="mt-4 text-2xl tracking-tight text-text-primary">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {card.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeCard ? (
          <motion.div
            className="fixed inset-0 z-[70] overflow-y-auto bg-black/80 px-6 py-24 backdrop-blur-lg md:py-28"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              className="depth-card interactive-surface interactive-surface-strong halo-card relative mx-auto w-full max-w-2xl rounded-[32px] border border-white/10 bg-surface p-6 md:p-7"
              initial={{ y: 30, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              onPointerMove={handlePointerSurfaceMove}
              onPointerLeave={handlePointerSurfaceLeave}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="text-xs uppercase tracking-[0.3em] text-muted">
                  Visual study
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCard(null)}
                  className="premium-pill inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted transition duration-300 hover:border-white/20 hover:text-text-primary"
                >
                  Close
                </button>
              </div>

              <div
                className="interactive-media-shell relative overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(145deg,rgba(7,10,14,1),rgba(13,21,32,0.94))] p-4 md:p-5"
                style={{ backgroundImage: activeCard.visual }}
              >
                <div className="!absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_42%),linear-gradient(180deg,transparent,rgba(4,4,4,0.35))]" />
                <div
                  className="interactive-highlight !absolute inset-0 opacity-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(255,255,255,0.16), transparent 28%)",
                  }}
                />
                <div className="interactive-foreground relative z-10 flex flex-wrap items-center justify-between gap-3">
                  <div className="premium-pill inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-muted">
                    <span>{modalMeta[activeCard.title].label}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-text-primary/78">
                    <span className="h-2 w-2 rounded-full bg-[#89AACC] shadow-[0_0_14px_rgba(137,170,204,0.8)]" />
                    Active study
                  </div>
                </div>

                <div className="interactive-foreground mt-4">
                  {renderModalPreview(activeCard)}
                </div>

                <div className="interactive-foreground mt-4 grid gap-3 md:grid-cols-3">
                  {modalMeta[activeCard.title].stats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-xl"
                    >
                      <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
                        {item.label}
                      </div>
                      <div className="mt-2 text-lg text-text-primary">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="mt-6 text-3xl tracking-tight text-text-primary">
                {activeCard.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {activeCard.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {modalMeta[activeCard.title].chips.map((item) => (
                  <div
                    key={item}
                    className="premium-pill rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-text-primary/76"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
