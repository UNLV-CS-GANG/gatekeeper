/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@react-email/components', '@react-email/render', '@react-email/tailwind'],
  },
  images: {
    domains: ['img.clerk.com'],
  },
}

module.exports = nextConfig
