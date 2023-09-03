/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/AAcHTtfF5F6r3iIWAe46lIoWxcX6wpBY84EoBSa1cqk3stRJig=s96-c",
      },
    ],
  },
};

module.exports = nextConfig;
