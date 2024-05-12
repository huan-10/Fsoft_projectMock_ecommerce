/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./base.scss";`,
  },
  // transpilePackages: [
  //   "antd",
  //   "@ant-design",
  //   "rc-util",
  //   "rc-pagination",
  //   "rc-picker",
  //   "rc-notification",
  //   "rc-tooltip",
  //   "rc-tree",
  //   "rc-table",
  // ],
};

module.exports = nextConfig;
