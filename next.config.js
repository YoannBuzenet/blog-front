/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { titleProp: true } }],
    });

    return config;
  },
  images: {
    domains: ["via.placeholder.com"],
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
};
