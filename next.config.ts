/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // Disable static generation for problematic routes
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;