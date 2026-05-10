import { motion } from "framer-motion";
import { FormEvent, useLayoutEffect, useRef } from "react";
import { useAdaptiveMotion } from "../hooks/useAdaptiveMotion";
import { contactCards } from "../lib/data";
import { gsap } from "../lib/gsap";
import {
  handlePointerSurfaceLeave,
  handlePointerSurfaceMove,
} from "../lib/pointerSurface";
import { Footer } from "./Footer";
import { VideoBackdrop } from "./VideoBackdrop";

interface ContactSectionProps {
  onNavigate: (sectionId: string) => void;
}

const marqueeLine = "BUILDING POWERFUL DIGITAL SYSTEMS \u2022 ".repeat(10);

export const ContactSection = ({ onNavigate }: ContactSectionProps) => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const { isLowPower, reduceMotion } = useAdaptiveMotion();

  useLayoutEffect(() => {
    if (!marqueeRef.current) {
      return;
    }

    if (isLowPower || reduceMotion) {
      gsap.set(marqueeRef.current, { xPercent: 0 });
      return;
    }

    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 46,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [isLowPower, reduceMotion]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const subject = encodeURIComponent(
      `Portfolio inquiry from ${name || "New contact"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );

    window.location.href = `mailto:elitesid23@gmail.com?subject=${subject}&body=${body}`;
    event.currentTarget.reset();
  };

  return (
    <section
      id="contact"
      data-scene
      className="scene-section relative scroll-mt-28 overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20"
    >
      <VideoBackdrop
        flipY
        overlayClassName="bg-black/60"
        className="opacity-80"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,4,4,0.4),rgba(4,4,4,0.85)),radial-gradient(circle_at_top,_rgba(137,170,204,0.14),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(137,170,204,0.14),transparent_18%),radial-gradient(circle_at_82%_78%,rgba(78,133,191,0.12),transparent_24%)]" />

      <div className="relative z-10 overflow-hidden border-y border-white/10 bg-black/20 backdrop-blur-sm">
        <div
          ref={marqueeRef}
          className={`flex w-max whitespace-nowrap py-5 ${isLowPower || reduceMotion ? "marquee-mobile" : ""}`}
        >
          <span className="pr-8 text-[clamp(1.8rem,5vw,4rem)] font-medium tracking-[0.18em] text-white/12">
            {marqueeLine}
          </span>
          <span className="text-[clamp(1.8rem,5vw,4rem)] font-medium tracking-[0.18em] text-white/12">
            {marqueeLine}
          </span>
        </div>
      </div>

      <div className="section-shell relative z-10">
        <div data-scene-stage className="scene-stage section-frame pt-12 md:pt-16">
          <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="mb-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
                <span className="h-px w-8 bg-stroke" />
                <span>Contact</span>
              </div>
              <h2 className="text-5xl leading-[0.95] tracking-tight text-text-primary md:text-7xl">
                Let's connect
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted md:text-base">
                Have a project in mind? I'm always open to new opportunities.
              </p>

              <div className="depth-card interactive-surface interactive-surface-light halo-card mt-8 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-xl">
                <div className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/45" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-text-primary">Available 24/7</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted">
                    Quick response guaranteed
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {contactCards.map((card, index) => {
                  const href = card.href;
                  const content = (
                    <>
                      <div className="text-xs uppercase tracking-[0.24em] text-muted">
                        {card.label}
                      </div>
                      <div className="mt-3 text-lg tracking-tight text-text-primary">
                        {card.value}
                      </div>
                    </>
                  );

                  return href ? (
                    <motion.a
                      key={card.label}
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                      className="depth-card interactive-surface interactive-surface-light halo-card rounded-[26px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition duration-300 hover:border-white/20"
                      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      whileHover={{
                        y: -6,
                        rotateX: 4,
                        rotateY: index % 2 === 0 ? -4 : 4,
                        scale: 1.008,
                      }}
                      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true, margin: "-80px" }}
                      style={{ transformPerspective: 1200 }}
                      onPointerMove={handlePointerSurfaceMove}
                      onPointerLeave={handlePointerSurfaceLeave}
                    >
                      <div className="interactive-foreground">{content}</div>
                    </motion.a>
                  ) : (
                    <motion.div
                      key={card.label}
                      className="depth-card interactive-surface interactive-surface-light halo-card rounded-[26px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
                      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      whileHover={{
                        y: -6,
                        rotateX: 4,
                        rotateY: index % 2 === 0 ? -4 : 4,
                        scale: 1.008,
                      }}
                      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true, margin: "-80px" }}
                      style={{ transformPerspective: 1200 }}
                      onPointerMove={handlePointerSurfaceMove}
                      onPointerLeave={handlePointerSurfaceLeave}
                    >
                      <div className="interactive-foreground">{content}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="depth-card interactive-surface interactive-surface-strong halo-card rounded-[36px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8"
              initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              whileHover={{ y: -8, rotateX: 3, scale: 1.003 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ transformPerspective: 1200 }}
              onPointerMove={handlePointerSurfaceMove}
              onPointerLeave={handlePointerSurfaceLeave}
            >
              <div className="interactive-foreground">
                <div className="text-xs uppercase tracking-[0.3em] text-muted">
                  Send a message
                </div>
                <h3 className="mt-4 text-3xl tracking-tight text-text-primary">
                  Start the conversation.
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-7 text-muted">
                  Use the form below and it will open an email draft addressed to
                  SID with your details already included.
                </p>

                <div className="mt-8 grid gap-4">
                  <input
                    required
                    name="name"
                    type="text"
                    autoComplete="name"
                    aria-label="Name"
                    placeholder="Name"
                    className="input-shell"
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-label="Email"
                    placeholder="Email"
                    className="input-shell"
                  />
                  <textarea
                    required
                    name="message"
                    rows={6}
                    aria-label="Message"
                    placeholder="Message"
                    className="input-shell resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative mt-6 rounded-full p-[1px]"
                >
                  <span className="absolute inset-[-1px] rounded-full bg-accent-gradient opacity-0 transition duration-300 group-hover:opacity-100" />
                  <span className="relative inline-flex rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg transition duration-300 group-hover:bg-bg group-hover:text-text-primary">
                    Send Message
                  </span>
                </button>
              </div>
            </motion.form>
          </div>

          <Footer onNavigate={onNavigate} />
        </div>
      </div>
    </section>
  );
};
