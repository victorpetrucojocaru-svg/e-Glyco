/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" }
        ]
      }
    ]
  }
}
module.exports = nextConfig;
