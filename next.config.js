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
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.cafpotranto.dev',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
        pathname: '/uploads/**',
      },
      // Cloudinary image hosting
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dbrx5fpi7/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
    ],
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Reduce bundle size
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
  // Exclude admin and backend folders from build
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack: config => {
    // Exclude admin and backend folders
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/admin/**', '**/backend/**', '**/node_modules/**'],
    };
    return config;
  },
};

module.exports = nextConfig;
