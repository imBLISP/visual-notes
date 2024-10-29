/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@tldraw/tldraw"],
  images: {
    dangerouslyAllowSVG: true,
    domains: ["api.dicebear.com", "utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
