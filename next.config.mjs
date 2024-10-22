/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/:path*", // Match any route
          has: [
            {
              type: "host",
              value: "(?<hotelName>.*)\\.yourapp\\.com", // Match subdomain as hotelName
            },
          ],
          destination: "/:path*", // Rewrites to the same path
        },
      ];
    },
  };
  
  export default nextConfig;
  