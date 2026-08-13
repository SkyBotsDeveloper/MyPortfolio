import type Hls from "hls.js";
import { RefObject, useEffect, useState } from "react";
import { useAdaptiveMotion } from "./useAdaptiveMotion";

export const useHlsVideo = (
  videoRef: RefObject<HTMLVideoElement | null>,
  source: string,
  enabled = true,
) => {
  const [hasError, setHasError] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { isLowPower, reduceMotion } = useAdaptiveMotion();

  useEffect(() => {
    const video = videoRef.current;

    if (!enabled) {
      setIsReady(false);
      return;
    }

    if (!video) {
      return;
    }

    let hls: Hls | null = null;
    let cancelled = false;
    let mounted = true;

    const startPlayback = () => {
      if (cancelled) {
        return;
      }

      void video.play().catch(() => undefined);
    };

    const markReady = () => {
      if (cancelled) {
        return;
      }

      setIsReady(true);
      startPlayback();
    };

    const markError = () => {
      if (cancelled) {
        return;
      }

      setHasError(true);
    };

    setHasError(false);
    setIsReady(false);

    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = isLowPower || reduceMotion ? "none" : "metadata";

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("error", markError);

    void import("hls.js")
      .then(({ default: HlsConstructor }) => {
        if (!mounted || cancelled) {
          return;
        }

        if (HlsConstructor.isSupported()) {
          hls = new HlsConstructor({
            enableWorker: true,
            lowLatencyMode: false,
            capLevelToPlayerSize: true,
            maxBufferLength: isLowPower ? 12 : 24,
            backBufferLength: isLowPower ? 6 : 18,
          });
          hls.loadSource(source);
          hls.attachMedia(video);
          hls.on(HlsConstructor.Events.MANIFEST_PARSED, startPlayback);
          hls.on(HlsConstructor.Events.ERROR, (_event, data) => {
            if (data.fatal) {
              hls?.destroy();
              markError();
            }
          });
          return;
        }

        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = source;
          video.load();
          startPlayback();
          return;
        }

        markError();
      })
      .catch(markError);

    return () => {
      mounted = false;
      cancelled = true;
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("error", markError);
      hls?.destroy();
    };
  }, [enabled, isLowPower, reduceMotion, source, videoRef]);

  return { hasError, isReady };
};
