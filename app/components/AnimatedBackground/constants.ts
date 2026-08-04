export type BlobAnim = "a" | "b" | "c" | "d";

export interface BlobConfig {
  readonly id: number;
  readonly color: string;
  readonly size: number;
  readonly x: string;
  readonly y: string;
  readonly parallax: number;
  readonly anim: BlobAnim;
  readonly delay: number;
}

export const BG_BASE = "#09090B";

export const BG_BLOBS: readonly BlobConfig[] = [
  {
    id: 1,
    color: "rgba(139, 92, 246, 0.30)",
    size: 900,
    x: "18%",
    y: "22%",
    parallax: 20,
    anim: "a",
    delay: 0,
  },
  {
    id: 2,
    color: "rgba(88, 28, 135, 0.38)",
    size: 720,
    x: "82%",
    y: "72%",
    parallax: 14,
    anim: "b",
    delay: -12,
  },
  {
    id: 3,
    color: "rgba(59, 130, 246, 0.18)",
    size: 620,
    x: "12%",
    y: "85%",
    parallax: 10,
    anim: "c",
    delay: -6,
  },
  {
    id: 4,
    color: "rgba(167, 139, 250, 0.22)",
    size: 800,
    x: "86%",
    y: "14%",
    parallax: 18,
    anim: "d",
    delay: -22,
  },
];

export const BG_SPOTLIGHT = {
  size: 620,
  color: "rgba(139, 92, 246, 0.10)",
} as const;

export const BG_SMOOTHING = 0.06;
export const BG_GRAIN_OPACITY = 0.05;
