/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '110.232.72.163',
        port: '8100',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
