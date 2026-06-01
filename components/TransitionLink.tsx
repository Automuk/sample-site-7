"use client";

import { usePageTransition } from "@/components/PageTransition";
import Link from "next/link";
import { ComponentProps, MouseEvent } from "react";

type Props = ComponentProps<typeof Link>;

export function TransitionLink({ href, onClick, children, ...props }: Props) {
  const { navigate } = usePageTransition();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Let modified clicks (new tab, etc.) fall through normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onClick?.(e);
    navigate(href.toString());
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
