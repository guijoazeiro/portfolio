import { ImageResponse } from "next/og";

export const alt = "Guilherme Joazeiro — Backend Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#09090b",
          color: "#e4e4e7",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid #27272a",
            borderRadius: "28px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "64px",
            width: "100%",
          }}
        >
          <div style={{ color: "#71717a", display: "flex", fontSize: 24 }}>
            portfolio
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#fafafa",
                display: "flex",
                fontSize: 66,
                fontWeight: 700,
                letterSpacing: "-3px",
              }}
            >
              Guilherme Joazeiro
            </div>
            <div
              style={{
                color: "#a1a1aa",
                display: "flex",
                fontSize: 34,
                marginTop: 18,
              }}
            >
              Backend Engineer
            </div>
          </div>
          <div
            style={{
              color: "#22d3ee",
              display: "flex",
              fontSize: 25,
              letterSpacing: "1px",
            }}
          >
            Node.js · TypeScript · Go · Python · AWS
          </div>
        </div>
      </div>
    ),
    size,
  );
}
