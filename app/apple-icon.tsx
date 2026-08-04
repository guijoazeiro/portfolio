import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const BG = "#09090B";
const FG = "#6D8CFF";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: BG,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
          fontSize: 110,
          color: FG,
          fontWeight: 700,
          letterSpacing: "-6px",
        }}
      >
        G_
      </div>
    ),
    { ...size }
  );
}
