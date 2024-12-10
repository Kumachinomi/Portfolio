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
  }
};

module.exports = nextConfig;
