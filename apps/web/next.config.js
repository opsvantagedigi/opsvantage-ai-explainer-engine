/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep any app-specific Next.js config here (images, rewrites, etc.)
  experimental: {
    allowedDevOrigins: [
      'https://9000-firebase-ai-youtube-studio-1768561663814.cluster-yylgzpipxrar4v4a72liastuqy.cloudworkstations.dev',
    ],
  },
}

module.exports = nextConfig
