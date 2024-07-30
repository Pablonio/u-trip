import { withNextDevtools } from '@next-devtools/core/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  reactStrictMode: true,
};

export default withNextDevtools(nextConfig);
