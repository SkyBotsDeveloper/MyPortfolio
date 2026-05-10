import { AnimatePresence } from "framer-motion";
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CursorAtmosphere } from "./components/CursorAtmosphere";
import { FloatingNavbar } from "./components/FloatingNavbar";
import { HeroSection } from "./components/HeroSection";
import { LoadingScreen } from "./components/LoadingScreen";
import { useSceneTransitions } from "./hooks/useSceneTransitions";
import { navItems } from "./lib/data";
import { warmupSite } from "./lib/preload";
import { useActiveSection } from "./hooks/useActiveSection";

const AboutSection = lazy(() =>
  import("./components/AboutSection").then((module) => ({
    default: module.AboutSection,
  })),
);
const SelectedWorksSection = lazy(() =>
  import("./components/SelectedWorksSection").then((module) => ({
    default: module.SelectedWorksSection,
  })),
);
const JournalSection = lazy(() =>
  import("./components/JournalSection").then((module) => ({
    default: module.JournalSection,
  })),
);
const ProjectArchiveSection = lazy(() =>
  import("./components/ProjectArchiveSection").then((module) => ({
    default: module.ProjectArchiveSection,
  })),
);
const BotsShowcaseSection = lazy(() =>
  import("./components/BotsShowcaseSection").then((module) => ({
    default: module.BotsShowcaseSection,
  })),
);
const CapabilitiesSection = lazy(() =>
  import("./components/CapabilitiesSection").then((module) => ({
    default: module.CapabilitiesSection,
  })),
);
const TimelineSection = lazy(() =>
  import("./components/TimelineSection").then((module) => ({
    default: module.TimelineSection,
  })),
);
const ExplorationsSection = lazy(() =>
  import("./components/ExplorationsSection").then((module) => ({
    default: module.ExplorationsSection,
  })),
);
const StatsSection = lazy(() =>
  import("./components/StatsSection").then((module) => ({
    default: module.StatsSection,
  })),
);
const ContactSection = lazy(() =>
  import("./components/ContactSection").then((module) => ({
    default: module.ContactSection,
  })),
);

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);

  if (!element) {
    return false;
  }

  const nav = document.querySelector<HTMLElement>("[data-floating-nav]");
  const navOffset = sectionId === "home" ? 0 : (nav?.offsetHeight ?? 0) + 20;
  const top = Math.max(
    element.getBoundingClientRect().top + window.scrollY - navOffset,
    0,
  );

  window.scrollTo({
    top,
    behavior: "smooth",
  });

  return true;
};

const preloadCriticalSections = () => {
  void warmupSite();
  void import("./components/AboutSection");
  void import("./components/SelectedWorksSection");
  void import("./components/JournalSection");
  void import("./components/ProjectArchiveSection");
};

const preloadDeferredSections = () => {
  void import("./components/BotsShowcaseSection");
  void import("./components/CapabilitiesSection");
  void import("./components/TimelineSection");
  void import("./components/ExplorationsSection");
  void import("./components/StatsSection");
  void import("./components/ContactSection");
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const warmup = useMemo(() => warmupSite(), []);
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const { activeSection, scrolled } = useActiveSection(sectionIds);
  const navigate = useNavigate();
  const location = useLocation();
  useSceneTransitions();

  const handleNavigate = useCallback(
    (sectionId: string) => {
      const targetHash = sectionId === "home" ? "" : `#${sectionId}`;

      if (location.hash === targetHash || (sectionId === "home" && !location.hash)) {
        scrollToSection(sectionId);
        return;
      }

      navigate({
        pathname: "/",
        hash: targetHash,
      });
    },
    [location.hash, navigate],
  );

  useEffect(() => {
    const id = location.hash ? location.hash.replace("#", "") : "home";
    const delay = isLoading ? 3200 : 80;
    let retryTimer = 0;

    const timer = window.setTimeout(() => {
      if (scrollToSection(id)) {
        return;
      }

      retryTimer = window.setTimeout(() => {
        scrollToSection(id);
      }, 700);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(retryTimer);
    };
  }, [isLoading, location.hash]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const requestIdleCallback =
      window.requestIdleCallback ??
      ((callback: IdleRequestCallback) =>
        window.setTimeout(
          () =>
            callback({
              didTimeout: false,
              timeRemaining: () => 1,
            }),
          250,
        ));

    const cancelIdleCallback =
      window.cancelIdleCallback ?? ((id: number) => window.clearTimeout(id));

    let criticalIdleId = 0;
    let deferredIdleId = 0;
    const criticalTimer = window.setTimeout(() => {
      criticalIdleId = requestIdleCallback(preloadCriticalSections, {
        timeout: 1200,
      });
    }, 700);
    const deferredTimer = window.setTimeout(() => {
      deferredIdleId = requestIdleCallback(preloadDeferredSections, {
        timeout: 2600,
      });
    }, 2600);

    return () => {
      window.clearTimeout(criticalTimer);
      window.clearTimeout(deferredTimer);
      if (criticalIdleId) {
        cancelIdleCallback(criticalIdleId);
      }
      if (deferredIdleId) {
        cancelIdleCallback(deferredIdleId);
      }
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-text-primary">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(78,133,191,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(137,170,204,0.12),transparent_26%)]" />
      <CursorAtmosphere />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen
            key="loader"
            warmup={warmup}
            onComplete={() => setIsLoading(false)}
          />
        ) : null}
      </AnimatePresence>
      <FloatingNavbar
        activeSection={activeSection}
        isScrolled={scrolled}
        onNavigate={handleNavigate}
      />
      <main id="main-content" className="relative z-10">
        <HeroSection onNavigate={handleNavigate} />
        <Suspense fallback={<div className="min-h-[40vh] bg-bg" />}>
          <AboutSection />
          <SelectedWorksSection onNavigate={handleNavigate} />
          <JournalSection />
          <ProjectArchiveSection />
          <BotsShowcaseSection />
          <CapabilitiesSection />
          <TimelineSection />
          <ExplorationsSection onNavigate={handleNavigate} />
          <StatsSection />
          <ContactSection onNavigate={handleNavigate} />
        </Suspense>
      </main>
    </div>
  );
}
