import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "No Tirar",
    short_name: "No Tirar",
    description:
      "Descubre y rescata deliciosos alimentos cercanos a precios increíbles. ¡Únete a la lucha contra el desperdicio!",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#22c55e", // Primary color (Green-500)
    icons: [
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
