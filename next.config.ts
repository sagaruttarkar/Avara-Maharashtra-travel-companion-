import type { NextConfig } from "next";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();
const normalizedBasePath = configuredBasePath ? configuredBasePath.replace(/^\/+|\/+$/g, "") : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  ...(normalizedBasePath
    ? {
        basePath: `/${normalizedBasePath}`,
      }
    : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
