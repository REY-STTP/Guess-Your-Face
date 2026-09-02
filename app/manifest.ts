import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Guess Your Face — AI Face Detection & Comparison",
    short_name: "GYF",
    description:
      "Real-time AI facial detection, 1:1 face comparison, and face token analysis. Privacy-first, zero data retention. Powered by Face++.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0a0b",
    theme_color: "#f5b301",
    categories: ["productivity", "utilities", "photo"],
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    lang: "id",
  };
}