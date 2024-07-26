import { withNextDevtools } from '@next-devtools/core/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withNextDevtools(nextConfig);
