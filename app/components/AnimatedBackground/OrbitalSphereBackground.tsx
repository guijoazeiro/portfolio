"use client";

import { useEffect, useRef } from "react";
import {
  createOrbitalSphereRenderer,
  ORBITAL_SPHERE_DEFAULTS,
  type OrbitalSphereOptions,
} from "./orbitalSphereRenderer";

export type OrbitalSphereBackgroundProps = Partial<OrbitalSphereOptions> & {
  className?: string;
};

export function OrbitalSphereBackground({
  className = "",
  ...props
}: OrbitalSphereBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsRef = useRef({ ...ORBITAL_SPHERE_DEFAULTS, ...props });
  optionsRef.current = { ...ORBITAL_SPHERE_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    let frame = 0;
    let visible = true;
    const renderer = createOrbitalSphereRenderer(canvas, () => ({
      ...optionsRef.current,
      speed: reducedMotion ? 0 : optionsRef.current.speed,
    }));

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const tick = () => {
      renderer.render();
      frame = visible && !document.hidden && !reducedMotion
        ? requestAnimationFrame(tick)
        : 0;
    };
    const start = () => {
      if (!frame && visible && !document.hidden && !reducedMotion) {
        frame = requestAnimationFrame(tick);
      }
    };
    const resize = () => {
      const bounds = host.getBoundingClientRect();
      renderer.resize(bounds.width, bounds.height);
      renderer.render();
    };
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      stop();
      renderer.render();
      start();
    };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) start();
      else stop();
    });

    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener("change", onMotionChange);
    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery.removeEventListener("change", onMotionChange);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={hostRef} className={className}>
      <canvas
        ref={canvasRef}
        style={{ filter: `hue-rotate(${optionsRef.current.hue}deg)` }}
      />
    </div>
  );
}
