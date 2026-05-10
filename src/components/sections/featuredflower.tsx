"use client";

import { motion } from "framer-motion";
import { FLOWERS } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";

export default function FeaturedFlowers() {
  return (
    <section id="shop" className="py-20 bg-warmwhite">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section-label mx-auto justify-center before:hidden">
            Farm Picks
          </span>
          <h2 className="font-heading font-bold text-h2 text-darkgray mb-3">
            Featured <span className="text-rose italic">Flowers</span>
          </h2>
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
    </section>
  );
}
