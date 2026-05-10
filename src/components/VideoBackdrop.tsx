import { motion } from "framer-motion";
import { useRef } from "react";
import { useAdaptiveMotion } from "../hooks/useAdaptiveMotion";
import { useHlsVideo } from "../hooks/useHlsVideo";
import { HLS_SOURCE } from "../lib/data";

interface VideoBackdropProps {
  overlayClassName?: string;
  bottomFade?: boolean;
  flipY?: boolean;
  className?: string;
  videoClassName?: string;
}

export const VideoBackdrop = ({
  overlayClassName = "bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.42)_45%,rgba(4,4,4,0.72)_100%)]",
  bottomFade = false,
  flipY = false,
  className = "",
  videoClassName = "",
}: VideoBackdropProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { isDesktop, isLowPower, reduceMotion } = useAdaptiveMotion();
  const shouldUseVideo = isDesktop && !isLowPower && !reduceMotion;
  const { hasError, isReady } = useHlsVideo(videoRef, HLS_SOURCE);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      {hasError || !shouldUseVideo ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(137,170,204,0.18),transparent_25%),radial-gradient(circle_at_80%_20%,_rgba(78,133,191,0.18),transparent_30%),linear-gradient(180deg,_rgba(12,12,12,1),_rgba(4,4,4,1))]">
          <div className="absolute left-[10%] top-[16%] h-52 w-52 rounded-full bg-[#89AACC]/10 blur-[120px]" />
          <div className="absolute bottom-[12%] right-[8%] h-56 w-56 rounded-full bg-[#4E85BF]/10 blur-[140px]" />
        </div>
      ) : (
        <motion.video
          ref={videoRef}
          className={`absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover will-change-transform ${flipY ? "scale-y-[-1]" : ""} ${videoClassName}`}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: isReady ? 1 : 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="hero-grid absolute inset-0 opacity-25" />
      {bottomFade ? (
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      ) : null}
    </div>
  );
};
