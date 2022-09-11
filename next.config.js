/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["via.placeholder.com"],
  },
  i18n: {
    locales: ["en-US", "fr-FR"],
    defaultLocale: "en-US",
    localeDetection: false,
  },
};
