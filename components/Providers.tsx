"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { CartProvider } from "@/lib/cart-context";
import PageTransitionProvider from "@/components/PageTransition";

function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <PageTransitionProvider>
        <LenisProvider>{children}</LenisProvider>
      </PageTransitionProvider>
    </CartProvider>
  );
}
