/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.cafpotranto.dev',
        pathname: '/uploads/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  // Exclude admin and backend folders from build
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack: (config) => {
    // Exclude admin and backend folders
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/admin/**', '**/backend/**', '**/node_modules/**']
    };
    return config;
  },
}

module.exports = nextConfig
