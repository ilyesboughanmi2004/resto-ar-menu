/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['sketchfab.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    return config;
  },
}

module.exports = nextConfig

