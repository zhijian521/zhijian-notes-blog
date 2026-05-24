import type { NextConfig } from 'next';

// 目前允许远程图片通配，后续如果确定来源域名可以再继续收紧。
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
