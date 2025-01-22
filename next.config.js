/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.1a.lv",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
