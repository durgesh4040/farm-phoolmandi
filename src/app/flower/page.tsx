"use client";

import { motion } from "framer-motion";
import { FLOWERS } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
export default function FeaturedFlowers() {
  return (
    <div className="mx-auto  gap-6 px-4">
      <div>
        <p className="uppercase tracking-[4px] text-[#3d6b47] font-medium text-2xl mb-2">Our Collection</p>
        <h2 className="text-4xl md:text-4xl font-bold leading-tight text-[#1f2d1f]">
          Our Beautiful Flower{" "}
          <span className="text-pink-500 italic font-serif">
            Collection
          </span>
        </h2>
        <p className="mt-6 text-gray-600 text-lg max-w-2xl ">
          Explore all varieties — from everyday blooms to premium rare flowers
          crafted with freshness, elegance, and love.
        </p>
        <div className="flex flex-row gap-2 mt-3">
          <div className="border py-2 px-4 rounded-md">All Flowers</div>
          <div className="border py-2 px-4 rounded-md">Seasonal</div>
          <div className="border py-2 px-4 rounded-md">Religious</div>
          <div className="border py-2 px-4 rounded-md">Wedding</div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="block h-px w-12 bg-bordergray" />
          <span className="text-rose text-lg">🌿</span>
          <span className="block h-px w-12 bg-bordergray" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {FLOWERS.map((flower, i) => (
          <motion.div
            key={flower.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <ProductCard product={flower} />
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-10">
        <a href="#all-flowers" className="btn-secondary">
          View All Flowers →
        </a>
      </div>
    </div>
  );
}
