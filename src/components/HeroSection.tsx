import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type Hls from "hls.js";
import { PointerEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAdaptiveMotion } from "../hooks/useAdaptiveMotion";
import { gsap } from "../lib/gsap";
import { heroRoles, heroStats } from "../lib/data";

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

const videoSrc =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const { enableDepthMotion, enableHeavyMotion, isCompact, isLowPower, reduceMotion } =
    useAdaptiveMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 20, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 20, mass: 0.8 });
  const contentX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const contentY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [22, -22]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const glowYSecondary = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % heroRoles.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    let cancelled = false;

    video.preload = isLowPower || reduceMotion ? "none" : "metadata";

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.load();
    } else {
      void import("hls.js")
        .then(({ default: HlsConstructor }) => {
          if (cancelled || !HlsConstructor.isSupported()) {
            return;
          }

          hls = new HlsConstructor({
            enableWorker: true,
            lowLatencyMode: false,
            capLevelToPlayerSize: true,
            maxBufferLength: isLowPower ? 12 : 24,
            backBufferLength: isLowPower ? 6 : 18,
          });
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
        })
        .catch(() => undefined);
    }

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [isLowPower, reduceMotion]);

  useLayoutEffect(() => {
    if (!heroRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      if (enableHeavyMotion && mediaRef.current) {
        gsap.fromTo(
          mediaRef.current,
          {
            scale: 1.08,
            yPercent: -2,
          },
          {
            scale: 1,
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      if (enableHeavyMotion) {
        gsap.to(".hero-content-shell", {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-atmosphere", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline.fromTo(
        ".name-reveal",
        {
          opacity: 0,
          y: 60,
          filter: "blur(18px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          delay: 0.1,
        },
      );

      timeline.fromTo(
        ".blur-in",
        {
          opacity: 0,
          y: 20,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
        },
        "-=0.9",
      );

      timeline.fromTo(
        ".desc-reveal, .cta-reveal, .stat-reveal, .scroll-reveal",
        {
          opacity: 0,
          y: 28,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.08,
        },
        "-=0.6",
      );

      if (enableHeavyMotion) {
        timeline.fromTo(
          ".stat-reveal",
          {
            rotateX: 18,
            scale: 0.96,
          },
          {
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.05,
          },
          "-=0.7",
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [enableHeavyMotion, reduceMotion]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!enableDepthMotion) {
      return;
    }

    const rect = heroRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    if (!enableDepthMotion) {
      return;
    }

    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      ref={heroRef}
      data-scene
      className="scene-section relative min-h-screen min-h-[100svh] overflow-hidden bg-bg"
      onPointerMove={enableDepthMotion ? handlePointerMove : undefined}
      onPointerLeave={enableDepthMotion ? handlePointerLeave : undefined}
    >
      <div ref={mediaRef} className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          disablePictureInPicture
          preload="metadata"
          className="hero-video absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        />
      </div>

      <div className="hero-atmosphere absolute inset-0 z-[1]">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(137,170,204,0.18),transparent_18%),radial-gradient(circle_at_78%_20%,rgba(78,133,191,0.18),transparent_24%),linear-gradient(90deg,rgba(4,4,4,0.6),rgba(4,4,4,0.08)_42%,rgba(4,4,4,0.36)_100%)]"
          style={enableDepthMotion ? { x: glowX, y: glowY } : undefined}
        />
      </div>
      <motion.div
        className="absolute inset-0 z-[1] opacity-70"
        style={enableDepthMotion ? { x: glowX, y: glowYSecondary } : undefined}
      >
        <div className="animate-float-drift absolute left-[8%] top-[18%] h-48 w-48 rounded-full bg-[#89AACC]/12 blur-[120px]" />
        <div className="animate-glow-pulse absolute bottom-[18%] right-[10%] h-64 w-64 rounded-full bg-[#4E85BF]/10 blur-[160px]" />
      </motion.div>
      <div className="absolute inset-0 bg-black/35" />
      <div className="hero-grid absolute inset-0 z-[2] opacity-[0.1]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 flex min-h-screen min-h-[100svh] items-center justify-center px-4 pt-24 sm:px-6 sm:pt-28 md:pt-32 lg:pt-36">
        <div data-scene-stage className="hero-content-shell scene-stage">
          <motion.div
            className="mx-auto max-w-5xl text-center"
            style={enableDepthMotion ? { x: contentX, y: contentY } : undefined}
          >
            <h1 className="name-reveal font-display text-[clamp(3rem,15vw,5rem)] italic leading-[0.95] tracking-tight text-text-primary sm:text-6xl md:text-8xl lg:text-9xl">
              Siddhartha Abhimanyu
            </h1>
            <div className="blur-in mt-6 text-base text-text-primary/90 sm:text-lg md:mt-7 md:text-2xl">
              A{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroRoles[roleIndex]}
                  className="animate-role-fade-in inline-block font-display italic text-text-primary"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {heroRoles[roleIndex]}
                </motion.span>
              </AnimatePresence>{" "}
              {isCompact ? "building digital systems." : "building powerful digital systems."}
            </div>
            <div className="desc-reveal mx-auto mt-7 max-w-2xl space-y-4 text-sm leading-6 text-muted md:mt-9 md:text-base md:leading-7">
              <p>
                Building powerful Telegram bots, advanced automation tools,
                AI-driven products, and immersive web experiences.
              </p>
              <p>
                Focused on scalable bot systems, elegant web applications,
                investigative workflows, and product experiences that feel fast,
                useful, and unforgettable.
              </p>
            </div>

            <div className="cta-reveal mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4">
              <motion.button
                type="button"
                onClick={() => onNavigate("projects")}
                whileHover={
                  enableDepthMotion ? { scale: 1.04, y: -4, rotateX: 5 } : undefined
                }
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-full p-[1px]"
                style={{ transformPerspective: 1200 }}
              >
                <span className="absolute inset-[-1px] rounded-full bg-accent-gradient opacity-0 transition duration-300 group-hover:opacity-100" />
                <span className="relative inline-flex rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg transition duration-300 group-hover:bg-bg group-hover:text-text-primary">
                  View Work
                </span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => onNavigate("contact")}
                whileHover={
                  enableDepthMotion ? { scale: 1.04, y: -4, rotateX: 5 } : undefined
                }
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-full p-[1px]"
                style={{ transformPerspective: 1200 }}
              >
                <span className="absolute inset-[-1px] rounded-full bg-accent-gradient opacity-0 transition duration-300 group-hover:opacity-100" />
                <span className="relative inline-flex rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-sm text-text-primary transition duration-300 group-hover:border-transparent">
                  Contact Me
                </span>
              </motion.button>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 [perspective:1400px] md:mt-14 md:grid-cols-4">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-reveal depth-card halo-card rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-md"
                  whileHover={
                    enableDepthMotion
                      ? {
                          y: -8,
                          rotateX: 7,
                          rotateY: index % 2 === 0 ? -6 : 6,
                          scale: 1.01,
                        }
                      : undefined
                  }
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformPerspective: 1400 }}
                >
                  <div className="text-lg font-medium text-text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="scroll-reveal mt-12 flex flex-col items-center gap-3 md:mt-14">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                SCROLL
              </span>
              <div className="relative h-10 w-px overflow-hidden bg-stroke">
                <div className="animate-scroll-down absolute inset-x-0 top-0 h-5 bg-accent-gradient" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
