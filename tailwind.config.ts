import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        "text-primary": "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        stroke: "hsl(var(--stroke))",
      },
      fontFamily: {
        body: ["var(--font-body)"],
        display: ["var(--font-display)"],
      },
      boxShadow: {
        premium:
          "0 20px 70px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.04)",
        glow: "0 0 30px rgba(78, 133, 191, 0.18)",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
      },
      maxWidth: {
        "screen-2xl": "1440px",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
