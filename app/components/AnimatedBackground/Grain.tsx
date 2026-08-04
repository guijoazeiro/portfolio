import styles from "./animations.module.css";
import { BG_GRAIN_OPACITY } from "./constants";

export const Grain = () => (
  <div
    className={styles.grain}
    style={{ opacity: BG_GRAIN_OPACITY }}
    aria-hidden
  />
);
