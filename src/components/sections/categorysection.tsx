"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/data";

export default function CategoriesSection() {
  return (
    <section id="flowers" className="py-20 bg-warmwhite">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label mx-auto justify-center before:hidden">
            Our Collection
          </span>
          <h2 className="font-heading font-bold text-h2 text-darkgray mb-3">
            Our Beautiful Flower{" "}
            <span className="text-rose italic">Collection</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="block h-px w-12 bg-bordergray" />
            <span className="text-rose text-lg">🌿</span>
            <span className="block h-px w-12 bg-bordergray" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                href={`#${cat.name.toLowerCase()}`}
                className="group block rounded-lg overflow-hidden border border-bordergray
                           bg-white shadow-card hover:shadow-hover transition-all duration-300
                           hover:-translate-y-1"
              >
                <div className="relative aspect-square img-zoom overflow-hidden">
                  <Image
                    src="/flower.jpg"
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay icon */}
                  <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0
                                  group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 rounded-full p-2 text-xl shadow">🛒</span>
                  </div>
                </div>
                <div className="p-3 text-center">
                  <p className="font-semibold text-sm text-darkgray group-hover:text-rose
                                transition-colors">{cat.name}</p>
                  <p className="text-[11px] text-midgray mt-0.5">{cat.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="#shop" className="btn-secondary">
            View All Flowers →
          </Link>
        </div>
      </div>
    </section>
  );
}
