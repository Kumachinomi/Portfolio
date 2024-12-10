/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
      return config;
    },
    transpilePackages: ['mermaid'],
    experimental: {
      appDir: true
    }
  };
  
  export default nextConfig;
