import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable runtime JavaScript
  unstable_runtimeJS: true,
  
  // Allow dynamic behavior for specific paths
  unstable_allowDynamic: [
    '/postitems/**', // Allow dynamic behavior for all paths under postitems
  ],
  
  // Optional: Add error handling for build process
  onError: (err: Error) => {
    console.error('Build-time error occurred:', err);
    return Promise.resolve();
  },
  
  experimental: {
    // Correctly typed serverActions configuration
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['*']
    }
  },

  // Optional: Configure redirects if needed
  async redirects() {
    return [];
  },
};

export default nextConfig;