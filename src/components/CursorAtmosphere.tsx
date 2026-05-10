import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useAdaptiveMotion } from "../hooks/useAdaptiveMotion";

export const CursorAtmosphere = () => {
  const { enableDepthMotion } = useAdaptiveMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 70,
    damping: 22,
    mass: 0.9,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 70,
    damping: 22,
    mass: 0.9,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    pointerX.set(window.innerWidth / 2);
    pointerY.set(window.innerHeight / 2);
  }, [pointerX, pointerY]);

  useEffect(() => {
    if (!enableDepthMotion) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [enableDepthMotion, pointerX, pointerY]);

  const orbX = useTransform(smoothX, (value) => value - 224);
  const orbY = useTransform(smoothY, (value) => value - 224);
  const innerOrbX = useTransform(smoothX, (value) => value - 132);
  const innerOrbY = useTransform(smoothY, (value) => value - 132);
  const veilX = useTransform(smoothX, (value) => {
    if (typeof window === "undefined") {
      return 0;
    }

    return ((value / window.innerWidth) - 0.5) * 46;
  });
  const veilY = useTransform(smoothY, (value) => {
    if (typeof window === "undefined") {
      return 0;
    }

    return ((value / window.innerHeight) - 0.5) * 32;
  });
  const rotation = useTransform(smoothX, (value) => {
    if (typeof window === "undefined") {
      return 0;
    }

    return ((value / window.innerWidth) - 0.5) * 4;
  });

  if (!enableDepthMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[3] overflow-hidden"
    >
      <motion.div
        className="absolute left-0 top-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(137,170,204,0.18),rgba(78,133,191,0.08)_42%,transparent_70%)] blur-[120px] mix-blend-screen"
        style={{ x: orbX, y: orbY }}
      />
      <motion.div
        className="absolute left-0 top-0 h-[16.5rem] w-[16.5rem] rounded-full border border-white/5 bg-[radial-gradient(circle,_rgba(255,255,255,0.12),rgba(137,170,204,0.04)_48%,transparent_72%)] blur-[56px] opacity-80"
        style={{ x: innerOrbX, y: innerOrbY }}
      />
      <motion.div
        className="absolute inset-[-8%] bg-[radial-gradient(circle_at_center,_rgba(137,170,204,0.1),transparent_18%),radial-gradient(circle_at_50%_50%,_rgba(78,133,191,0.1),transparent_24%)] opacity-55"
        style={{ x: veilX, y: veilY, rotate: rotation }}
      />
    </div>
  );
};
