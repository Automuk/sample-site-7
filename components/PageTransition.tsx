"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, useAnimation } from "framer-motion";

interface PageTransitionContextValue {
  navigate: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

const OVERLAY_DURATION = 0.55; // seconds for overlay to slide up / slide away
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const controls = useAnimation();
  const pendingHref = useRef<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Slide the overlay away after a new page mounts
  useEffect(() => {
    if (!isTransitioning) return;
    // New page has mounted — slide overlay back down off screen
    controls
      .start({ y: "-100%", transition: { duration: OVERLAY_DURATION, ease: EASE } })
      .then(() => {
        setIsTransitioning(false);
        controls.set({ y: "100%" }); // reset for next transition
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navigate = useCallback(
    async (href: string) => {
      if (href === pathname) return;
      pendingHref.current = href;

      // Slide overlay UP to cover the screen
      setIsTransitioning(true);
      await controls.start({
        y: "0%",
        transition: { duration: OVERLAY_DURATION, ease: EASE },
      });

      // Overlay is now covering the screen — scroll to top invisibly
      window.scrollTo({ top: 0, behavior: "instant" });

      // Navigate — new template mounts, useEffect above fires
      router.push(href);
    },
    [controls, pathname, router]
  );

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      {children}

      {/* Overlay panel — starts below viewport, slides up then away */}
      <motion.div
        initial={{ y: "100%" }}
        animate={controls}
        className="fixed inset-0 z-[9999] bg-[#2D3748] pointer-events-none"
        aria-hidden="true"
      />
    </PageTransitionContext.Provider>
  );
}

