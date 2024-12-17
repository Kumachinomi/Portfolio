/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      crypto: false
    };
    config.externals = [...(config.externals || []), 'cytoscape'];
    return config;
  },
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:8000/api/:path*/',
        },
      ];
    } else {
      return [
        {
          source: '/api/:path*',
          destination: 'https://portfolio-production-ccca.up.railway.app/api/:path*/',
        },
      ];
    }
  }
};

module.exports = nextConfig;
