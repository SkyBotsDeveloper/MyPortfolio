import { motion } from "framer-motion";
import { navItems } from "../lib/data";

interface FloatingNavbarProps {
  activeSection: string;
  isScrolled: boolean;
  onNavigate: (sectionId: string) => void;
}

export const FloatingNavbar = ({
  activeSection,
  isScrolled,
  onNavigate,
}: FloatingNavbarProps) => {
  return (
    <motion.div
      data-floating-nav
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-6 md:pt-6"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div
        className={`no-scrollbar inline-flex max-w-[calc(100vw-1rem)] min-w-0 items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-surface/90 px-2 py-2 backdrop-blur-md transition duration-500 ${isScrolled ? "shadow-md shadow-black/20" : ""}`}
      >
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="group relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 sm:h-9 sm:w-9"
          aria-label="Go to home"
        >
          <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#89AACC_0%,#4E85BF_100%)] transition-opacity duration-300 group-hover:opacity-0" />
          <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#4E85BF_0%,#89AACC_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative flex h-[calc(100%-2px)] w-[calc(100%-2px)] items-center justify-center rounded-full bg-bg font-display text-[13px] italic text-text-primary">
            SID
          </span>
        </button>

        <div className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        <nav className="flex items-center gap-0.5 sm:gap-1" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] transition duration-300 sm:px-4 sm:py-2 sm:text-sm ${active ? "bg-stroke/50 text-text-primary" : "text-muted hover:bg-stroke/50 hover:text-text-primary"}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mx-1 hidden h-5 w-px bg-stroke md:block" />

        <button
          type="button"
          onClick={() => onNavigate("contact")}
          className="group relative hidden rounded-full p-[1px] md:inline-flex"
        >
          <span className="absolute inset-[-1px] rounded-full bg-accent-gradient opacity-0 transition duration-300 group-hover:opacity-100" />
          <span className="relative rounded-full bg-surface px-4 py-2 text-sm text-text-primary transition duration-300 group-hover:bg-bg">
            {"Let's Talk \u2197"}
          </span>
        </button>
      </div>
    </motion.div>
  );
};
