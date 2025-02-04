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
        hostname: `${process.env.BACKEND_URL}`,
        port: '8100',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
