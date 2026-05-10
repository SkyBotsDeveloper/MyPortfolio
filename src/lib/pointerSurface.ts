import { PointerEvent } from "react";

interface PendingSurfaceState {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

const pendingStates = new WeakMap<HTMLElement, PendingSurfaceState>();
const pendingFrames = new WeakMap<HTMLElement, number>();

const resetSurface = (element: HTMLElement) => {
  const frame = pendingFrames.get(element);

  if (frame) {
    window.cancelAnimationFrame(frame);
    pendingFrames.delete(element);
  }

  element.style.setProperty("--pointer-x", "50%");
  element.style.setProperty("--pointer-y", "50%");
  element.style.setProperty("--pointer-dx", "0px");
  element.style.setProperty("--pointer-dy", "0px");
  element.style.setProperty("--pointer-shadow-x", "0px");
  element.style.setProperty("--pointer-shadow-y", "22px");
};

export const handlePointerSurfaceMove = (
  event: PointerEvent<HTMLElement>,
) => {
  if (event.pointerType && event.pointerType !== "mouse") {
    return;
  }

  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  const dx = (x - 0.5) * 26;
  const dy = (y - 0.5) * 22;
  const pendingState = {
    x,
    y,
    dx,
    dy,
  };

  pendingStates.set(element, pendingState);

  if (pendingFrames.has(element)) {
    return;
  }

  const frame = window.requestAnimationFrame(() => {
    const state = pendingStates.get(element);

    pendingFrames.delete(element);

    if (!state) {
      return;
    }

    element.style.setProperty("--pointer-x", `${(state.x * 100).toFixed(2)}%`);
    element.style.setProperty("--pointer-y", `${(state.y * 100).toFixed(2)}%`);
    element.style.setProperty("--pointer-dx", `${state.dx.toFixed(2)}px`);
    element.style.setProperty("--pointer-dy", `${state.dy.toFixed(2)}px`);
    element.style.setProperty(
      "--pointer-shadow-x",
      `${(state.dx * 0.7).toFixed(2)}px`,
    );
    element.style.setProperty(
      "--pointer-shadow-y",
      `${(20 + state.dy * 0.8).toFixed(2)}px`,
    );
  });

  pendingFrames.set(element, frame);
};

export const handlePointerSurfaceLeave = (
  event: PointerEvent<HTMLElement>,
) => {
  resetSurface(event.currentTarget);
};
