import { navItems } from "../lib/data";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  return (
    <footer className="mt-16 border-t border-white/10 pt-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="font-display text-3xl italic text-text-primary">SID</div>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted">
            Building powerful bots and innovative web experiences.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className="depth-card rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:text-text-primary"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 text-sm text-muted md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap gap-4">
          <a href="https://t.me/IflexElite" target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a href="mailto:skybotsdeveloper@gmail.com">Email</a>
          <a href="https://wa.me/639513139927" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a
            href="https://www.linkedin.com/in/siddhartha-abhimanyu-89697a40a/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <div className="space-y-1 text-left md:text-right">
          <div>{"\u00A9 2026 Siddhartha Abhimanyu"}</div>
          <div>Built with passion by SID</div>
        </div>
      </div>
    </footer>
  );
};
