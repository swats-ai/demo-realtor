import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hay lockfiles en directorios padre; fija la raíz para Turbopack.
  turbopack: { root: __dirname },
  // Acceso al dev server desde otros equipos (LAN y Tailscale) sin bloqueo
  // cross-origin de HMR/assets.
  allowedDevOrigins: ["100.92.10.40", "192.168.1.28", "igs-mac-mini", "*.ts.net"],
  images: {
    // Demo: fotos de stock de Unsplash. En un proyecto real las imágenes
    // viven en /public y esta entrada se elimina.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
