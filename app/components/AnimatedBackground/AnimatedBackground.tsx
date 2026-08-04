"use client";

import { useRef } from "react";
import styles from "./animations.module.css";
import { useMouseParallax } from "./useMouseParallax";
import { Blob } from "./Blob";
import { Spotlight } from "./Spotlight";
import { Grain } from "./Grain";
import { BG_BLOBS, BG_SMOOTHING } from "./constants";

export const AnimatedBackground = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  useMouseParallax(rootRef, { smoothing: BG_SMOOTHING });

  return (
    <div ref={rootRef} aria-hidden className={styles.root}>
      <div className={styles.blobsLayer}>
        {BG_BLOBS.map((blob) => (
          <Blob key={blob.id} config={blob} />
        ))}
      </div>
      <Spotlight />
      <Grain />
    </div>
  );
};
