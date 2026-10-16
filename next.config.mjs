/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  cleanDistDir: false,
  // Avoid concurrent static-export directory creation failures on Windows.
  experimental: { cpus: 1 },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;



