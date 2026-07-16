import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// Repositório publicado em https://<user>.github.io/myterapie/
const repo = "myterapie";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : "",
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
