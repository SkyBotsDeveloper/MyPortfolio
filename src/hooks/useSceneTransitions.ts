import { useLayoutEffect } from "react";
import { ScrollTrigger, gsap } from "../lib/gsap";
import { useAdaptiveMotion } from "./useAdaptiveMotion";

export const useSceneTransitions = () => {
  const { enableHeavyMotion, reduceMotion } = useAdaptiveMotion();

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia | null = null;
    let setupFrame = 0;
    let sceneCount = 0;

    const cleanup = () => {
      mm?.revert();
      mm = null;
    };

    const setupTransitions = () => {
      cleanup();
      sceneCount = document.querySelectorAll("[data-scene]").length;
      mm = gsap.matchMedia();

      if (reduceMotion) {
        ScrollTrigger.refresh();
        return;
      }

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
        },
        (context) => {
          const conditions = context.conditions as {
            desktop?: boolean;
            mobile?: boolean;
          };
          const sections = gsap.utils.toArray<HTMLElement>("[data-scene]");
          const isDesktop = Boolean(conditions.desktop);

          sections.forEach((section, index) => {
            const stage =
              section.querySelector<HTMLElement>("[data-scene-stage]") ??
              section.querySelector<HTMLElement>(".section-frame");
            const sceneGlowFrom = isDesktop ? "0.05" : "0.02";
            const stageDistance = index === 0 ? 0 : isDesktop ? 82 : 24;
            const stageScale = index === 0 ? 1 : isDesktop ? 0.968 : 0.992;
            const stageBlur = index === 0 ? "0px" : isDesktop ? "18px" : "0px";

            gsap.fromTo(
              section,
              {
                "--scene-glow": sceneGlowFrom,
                "--scene-sweep-y": isDesktop ? "60px" : "18px",
              } as gsap.TweenVars,
              {
                "--scene-glow": isDesktop ? "1" : "0.36",
                "--scene-sweep-y": "0px",
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top 92%",
                  end: "top 28%",
                  scrub: isDesktop ? 1 : 0.5,
                },
              } as gsap.TweenVars,
            );

            if (stage && index > 0) {
              gsap.fromTo(
                stage,
                {
                  y: stageDistance,
                  scale: stageScale,
                  opacity: isDesktop ? 0.68 : 0.88,
                  filter: `blur(${stageBlur})`,
                },
                {
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 88%",
                    end: "top 34%",
                    scrub: isDesktop ? 1 : 0.5,
                  },
                },
              );
            }

            if (stage && isDesktop && enableHeavyMotion) {
              gsap.fromTo(
                stage,
                {
                  yPercent: index === 0 ? 0 : 5,
                },
                {
                  yPercent: index === 0 ? -2 : -4,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            }
          });
        },
      );

      ScrollTrigger.refresh();
    };

    const scheduleSetup = () => {
      window.cancelAnimationFrame(setupFrame);
      setupFrame = window.requestAnimationFrame(() => {
        setupFrame = window.requestAnimationFrame(setupTransitions);
      });
    };

    scheduleSetup();

    const main = document.querySelector("main") ?? document.body;
    const observer = new MutationObserver(() => {
      const nextCount = document.querySelectorAll("[data-scene]").length;

      if (nextCount !== sceneCount) {
        scheduleSetup();
      }
    });

    observer.observe(main, { childList: true });

    return () => {
      window.cancelAnimationFrame(setupFrame);
      observer.disconnect();
      cleanup();
    };
  }, [enableHeavyMotion, reduceMotion]);
};
