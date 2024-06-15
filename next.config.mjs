/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    domains: [
      "www.canva.com",
      "i.pinimg.com",
      "picsum.photos",
      "loremflickr.com",
    ], // Add all required domains here
  },
};

export default nextConfig;
