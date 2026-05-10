import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionIntroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  action?: ReactNode;
  centered?: boolean;
  className?: string;
}

export const SectionIntro = ({
  eyebrow,
  title,
  description,
  action,
  centered = false,
  className = "",
}: SectionIntroProps) => {
  return (
    <motion.div
      className={`flex flex-col gap-6 ${centered ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"} ${className}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className={`${centered ? "max-w-3xl" : "max-w-2xl"}`}>
        <motion.div
          className="mb-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted"
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="h-px w-8 bg-stroke" />
          <span>{eyebrow}</span>
        </motion.div>
        <motion.h2
          className="text-4xl leading-[0.95] tracking-tight text-text-primary md:text-6xl"
          initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="mt-5 max-w-2xl text-sm leading-7 text-muted md:text-base"
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {description}
        </motion.p>
      </div>
      {action ? (
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {action}
        </motion.div>
      ) : null}
    </motion.div>
  );
};
