import { CSSProperties } from "react";
import styles from "./animations.module.css";
import type { BlobConfig } from "./constants";

interface BlobProps {
  config: BlobConfig;
}

export const Blob = ({ config }: BlobProps) => {
  const wrapStyle = {
    top: config.y,
    left: config.x,
    "--ab-parallax": `${config.parallax}px`,
  } as CSSProperties;

  const blobStyle: CSSProperties = {
    width: config.size,
    height: config.size,
    background: `radial-gradient(circle, ${config.color} 0%, transparent 70%)`,
    animationDelay: `${config.delay}s`,
  };

  return (
    <div className={styles.blobWrap} style={wrapStyle}>
      <div
        className={`${styles.blob} ${styles[config.anim]}`}
        style={blobStyle}
      />
    </div>
  );
};
