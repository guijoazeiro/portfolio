"use client";

import { useEffect } from "react";

const BLINK_INTERVAL_MS = 600;

export function BlinkingFavicon() {
  useEffect(() => {
    const icon = document.querySelector<HTMLLinkElement>('link[rel~="icon"]');
    if (!icon) return;

    const originalHref = icon.href;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intervalId: number | undefined;
    let cursorVisible = true;

    const render = () => {
      icon.href = cursorVisible ? "/favicon-on.svg" : "/favicon-off.svg";
    };

    const stop = () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
      intervalId = undefined;
    };

    const start = () => {
      stop();
      cursorVisible = true;
      render();

      if (document.hidden || motionQuery.matches) return;

      intervalId = window.setInterval(() => {
        cursorVisible = !cursorVisible;
        render();
      }, BLINK_INTERVAL_MS);
    };

    const onVisibilityChange = () => start();
    const onMotionChange = () => start();

    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener("change", onMotionChange);
    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery.removeEventListener("change", onMotionChange);
      icon.href = originalHref;
    };
  }, []);

  return null;
}
