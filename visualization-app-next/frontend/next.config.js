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
      // 開発環境用の設定
      return [
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:8000/api/:path*/',
        },
      ];
    } else {
      // 本番環境用の設定
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*/`,
        },
      ];
    }
  }
};

module.exports = nextConfig;
