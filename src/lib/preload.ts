const HERO_POSTER =
  "https://image.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g/thumbnail.jpg?time=1&width=1920&fit_mode=preserve";
const HERO_HLS =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

let warmupPromise: Promise<void> | null = null;

const warmupImage = (src: string) =>
  new Promise<void>((resolve) => {
    const image = new Image();

    image.decoding = "async";
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;

    if (typeof image.decode === "function") {
      void image.decode().then(resolve).catch(resolve);
    }
  });

const warmupFetch = (url: string) =>
  fetch(url, {
    cache: "force-cache",
    mode: "no-cors",
    priority: "low",
  } as RequestInit & { priority?: "high" | "low" | "auto" })
    .then(() => undefined)
    .catch(() => undefined);

const preloadSectionChunks = () =>
  Promise.allSettled([
    import("../components/AboutSection"),
    import("../components/SelectedWorksSection"),
    import("../components/JournalSection"),
    import("../components/ProjectArchiveSection"),
    import("../components/BotsShowcaseSection"),
    import("../components/CapabilitiesSection"),
    import("../components/TimelineSection"),
    import("../components/ExplorationsSection"),
    import("../components/StatsSection"),
    import("../components/ContactSection"),
  ]).then(() => undefined);

export const warmupSite = () => {
  if (!warmupPromise) {
    warmupPromise = Promise.allSettled([
      warmupImage(HERO_POSTER),
      warmupFetch(HERO_HLS),
      preloadSectionChunks(),
    ]).then(() => undefined);
  }

  return warmupPromise;
};
