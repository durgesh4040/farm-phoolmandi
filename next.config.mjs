/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
   allowedDevOrigins: ["192.168.0.104", "localhost"],
};
export default nextConfig;