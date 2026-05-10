import { useEffect, useMemo, useState } from "react";

export const useActiveSection = (sectionIds: readonly string[]) => {
  const ids = useMemo(() => [...sectionIds], [sectionIds]);
  const [activeSection, setActiveSection] = useState(ids[0] ?? "home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let frame = 0;

    const setupObserver = () => {
      observer?.disconnect();

      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));

      if (!sections.length) {
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (entryA, entryB) =>
                Math.abs(entryA.boundingClientRect.top) -
                Math.abs(entryB.boundingClientRect.top),
            );

          if (visible[0]?.target.id) {
            setActiveSection(visible[0].target.id);
          }
        },
        {
          rootMargin: "-35% 0px -45% 0px",
          threshold: [0.1, 0.3, 0.6],
        },
      );

      sections.forEach((section) => observer?.observe(section));
    };

    const scheduleSetup = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(setupObserver);
    };

    setupObserver();

    const main = document.querySelector("main") ?? document.body;
    const mutationObserver = new MutationObserver(scheduleSetup);
    mutationObserver.observe(main, { childList: true });

    return () => {
      window.cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      observer?.disconnect();
    };
  }, [ids]);

  return { activeSection, scrolled };
};
