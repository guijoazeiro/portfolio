import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Guilherme Joazeiro",
    short_name: "gjoazeiro",
    description:
      "Portfolio of Guilherme Joazeiro, Backend Engineer specialized in APIs and microservices.",
    start_url: "/pt",
    scope: "/",
    display: "standalone",
    background_color: "#09090B",
    theme_color: "#09090B",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
