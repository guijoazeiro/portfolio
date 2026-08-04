import { CSSProperties } from "react";
import styles from "./animations.module.css";
import { BG_SPOTLIGHT } from "./constants";

export const Spotlight = () => {
  const style = {
    "--ab-spot-size": `${BG_SPOTLIGHT.size}px`,
    "--ab-spot-color": BG_SPOTLIGHT.color,
  } as CSSProperties;
  return <div className={styles.spotlight} style={style} aria-hidden />;
};
