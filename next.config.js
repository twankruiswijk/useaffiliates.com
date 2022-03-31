/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s3.us-west-2.amazonaws.com'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
