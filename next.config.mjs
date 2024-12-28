/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
          port: '',
          pathname: '/**',
          search: '',
        },
      ],
    },
    experimental: {
      serverActions: {
        bodySizeLimit: '3mb'
      }
    }
};

export default nextConfig;
