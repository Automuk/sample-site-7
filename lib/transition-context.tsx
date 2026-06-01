"use client";

import { createContext, useContext, useRef, ReactNode } from "react";

type NavigateFn = (href: string) => void;

const TransitionContext = createContext<{ navigate: NavigateFn }>({
  navigate: () => {},
});

export function useTransitionRouter() {
  return useContext(TransitionContext);
}

// The PageTransition component registers its cover function here
export const transitionRef = {
  cover: null as null | ((href: string) => void),
};

export function TransitionProvider({ children }: { children: ReactNode }) {
  function navigate(href: string) {
    if (transitionRef.cover) {
      transitionRef.cover(href);
    } else {
      window.location.href = href;
    }
  }

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
    </TransitionContext.Provider>
  );
}
