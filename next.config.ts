import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avataaars.io',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
