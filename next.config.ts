import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Option 2: Disable static generation for specific paths
    unstable_runtimeJS: true,
    unstable_allowDynamic: ['/postitems/**'],
};

export default nextConfig;
