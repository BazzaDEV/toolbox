import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: '/toolbox/passgen',
  transpilePackages: ['@repo/ui'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
