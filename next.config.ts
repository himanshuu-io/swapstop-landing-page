import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Source photography is already high-quality; don't let the image optimizer's
  // default quality=75 soften it further. Every <Image> in this app passes an
  // explicit quality={95}, allowed here.
  images: {
    qualities: [95, 100],
  },
};

export default nextConfig;
