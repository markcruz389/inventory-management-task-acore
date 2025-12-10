/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@mui/x-charts", "@mui/x-data-grid"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@mui/material/styles": "@mui/material/node/styles/index.js",
    };
    return config;
  },
};

export default nextConfig;
