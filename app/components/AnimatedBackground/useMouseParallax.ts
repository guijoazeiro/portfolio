"use client";

import { RefObject, useEffect } from "react";

export interface MouseParallaxOptions {
  smoothing?: number;
}

export function useMouseParallax(
  ref: RefObject<HTMLElement>,
  { smoothing = 0.06 }: MouseParallaxOptions = {}
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    let targetX = 0.5;
    let targetY = 0.5;
    let currentX = 0.5;
    let currentY = 0.5;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX / window.innerWidth;
      targetY = e.clientY / window.innerHeight;
    };

    const tick = () => {
      currentX += (targetX - currentX) * smoothing;
      currentY += (targetY - currentY) * smoothing;
      el.style.setProperty("--mx", currentX.toFixed(4));
      el.style.setProperty("--my", currentY.toFixed(4));
      el.style.setProperty("--mx-px", ((currentX - 0.5) * 2).toFixed(4));
      el.style.setProperty("--my-px", ((currentY - 0.5) * 2).toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [ref, smoothing]);
}
