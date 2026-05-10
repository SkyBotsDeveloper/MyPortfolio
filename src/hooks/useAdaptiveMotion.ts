import { useSyncExternalStore } from "react";

interface AdaptiveMotionState {
  reduceMotion: boolean;
  canHover: boolean;
  isCompact: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  isLowPower: boolean;
}

const getAdaptiveMotionState = (): AdaptiveMotionState => {
  if (typeof window === "undefined") {
    return {
      reduceMotion: false,
      canHover: true,
      isCompact: false,
      isDesktop: true,
      isTouch: false,
      isLowPower: false,
    };
  }

  const navigatorHints = navigator as Navigator & {
    deviceMemory?: number;
  };
  const isCompact = window.innerWidth < 480;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const lowMemory =
    typeof navigatorHints.deviceMemory === "number" &&
    navigatorHints.deviceMemory <= 4;
  const lowCpu =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;

  return {
    reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    canHover: window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    isCompact,
    isDesktop: window.innerWidth >= 1024,
    isTouch,
    isLowPower: isCompact || isTouch || lowMemory || lowCpu,
  };
};

const addMediaListener = (media: MediaQueryList, listener: () => void) => {
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }

  media.addListener(listener);

  return () => media.removeListener(listener);
};

const stateEquals = (
  currentState: AdaptiveMotionState,
  nextState: AdaptiveMotionState,
) =>
  currentState.reduceMotion === nextState.reduceMotion &&
  currentState.canHover === nextState.canHover &&
  currentState.isCompact === nextState.isCompact &&
  currentState.isDesktop === nextState.isDesktop &&
  currentState.isTouch === nextState.isTouch &&
  currentState.isLowPower === nextState.isLowPower;

let currentState = getAdaptiveMotionState();
let resizeFrame = 0;
let cleanupListeners: Array<() => void> = [];
const subscribers = new Set<() => void>();

const notifySubscribers = () => {
  const nextState = getAdaptiveMotionState();

  if (stateEquals(currentState, nextState)) {
    return;
  }

  currentState = nextState;
  subscribers.forEach((subscriber) => subscriber());
};

const scheduleUpdate = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.cancelAnimationFrame(resizeFrame);
  resizeFrame = window.requestAnimationFrame(notifySubscribers);
};

const startGlobalListeners = () => {
  if (typeof window === "undefined" || cleanupListeners.length) {
    return;
  }

  const reducedMotionMedia = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const hoverMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
  const touchMedia = window.matchMedia("(hover: none), (pointer: coarse)");

  cleanupListeners = [
    addMediaListener(reducedMotionMedia, notifySubscribers),
    addMediaListener(hoverMedia, notifySubscribers),
    addMediaListener(touchMedia, notifySubscribers),
  ];

  window.addEventListener("resize", scheduleUpdate, { passive: true });
  window.addEventListener("orientationchange", scheduleUpdate, {
    passive: true,
  });
  notifySubscribers();
};

const stopGlobalListeners = () => {
  if (typeof window === "undefined" || subscribers.size > 0) {
    return;
  }

  window.cancelAnimationFrame(resizeFrame);
  cleanupListeners.forEach((cleanup) => cleanup());
  cleanupListeners = [];
  window.removeEventListener("resize", scheduleUpdate);
  window.removeEventListener("orientationchange", scheduleUpdate);
};

const subscribe = (subscriber: () => void) => {
  subscribers.add(subscriber);
  startGlobalListeners();

  return () => {
    subscribers.delete(subscriber);
    stopGlobalListeners();
  };
};

const getSnapshot = () => currentState;

export const useAdaptiveMotion = () => {
  const state = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getAdaptiveMotionState,
  );

  return {
    ...state,
    enableDepthMotion: state.canHover && !state.reduceMotion && state.isDesktop,
    enableHeavyMotion:
      state.canHover &&
      !state.reduceMotion &&
      state.isDesktop &&
      !state.isLowPower,
  };
};
