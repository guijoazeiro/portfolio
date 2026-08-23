import styles from "./animations.module.css";
import { OrbitalSphereBackground } from "./OrbitalSphereBackground";

export const AnimatedBackground = () => {
  return (
    <div aria-hidden className={styles.root}>
      <OrbitalSphereBackground
        className={styles.orbital}
        speed={1.10}
        particleSize={0.020}
        particleOpacity={0.42}
        orbitOpacity={0.16}
        scale={1.00}
        haloOpacity={0.12}
      />
      <div className={styles.readabilityShade} />
    </div>
  );
};
