/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'zdkxnwnjffoacosbgbil.supabase.co',
              port: '',
              pathname: '/storage/v1/object/public/**',
              search: '',
            },
            {
              protocol: 'https',
              hostname: 'www.htmlgames.com',
              port: '',
              pathname: '/**',
              search: '',
            },
            {
              protocol: 'https',
              hostname: 'cdn.htmlgames.com',
              port: '',
              pathname: '/**',
              search: '',
            },
            {
              protocol: 'https',
              hostname: 'www.mahjong.com',
              port: '',
              pathname: '/**',
              search: '',
            },
            {
              protocol: 'https',
              hostname: 'games.assets.gamepix.com',
              port: '',
              pathname: '/**',
              search: '',
            },
            {
              protocol: 'https',
              hostname: 'img.gamemonetize.com',
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
