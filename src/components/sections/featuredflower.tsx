"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getFlowersList } from "@/api/product"; // Use absolute path
import ProductCard from "@/components/ui/ProductCard";
import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

interface Flower {
  id: number;
  name: string;
  description: string;
  price: string;
  sku: string | null;
  imageUrl: string | null;
  stockQuantity: number;
  category: {
    name: string;
  };
}

export default function FeaturedFlowers() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlowers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getFlowersList();
      const items = response?.data ?? response ?? [];
      setFlowers(items);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Unable to load flowers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <section id="shop" className="py-20 bg-[#faf9f6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured <span className="text-rose-600 italic">Flowers</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl bg-gray-200 h-80" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="shop" className="py-20 bg-[#faf9f6]">
        <div className="container mx-auto px-4 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchFlowers}
            className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>
        </div>
      </section>
    );
  }
  return (
    <section id="shop" className="py-20 bg-[#faf9f6]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm text-rose-600 font-medium mb-2 block">Farm Picks</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Featured <span className="text-rose-600 italic">Flowers</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="block h-px w-12 bg-gray-300" />
            <span className="text-rose-600 text-lg">🌿</span>
            <span className="block h-px w-12 bg-gray-300" />
          </div>
        </div>

        {flowers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No flowers available right now.</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon for fresh picks!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {flowers.map((flower, i) => (
              <motion.div
                key={flower.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.08, 0.5) }}
              >
                <ProductCard product={flower} />
              </motion.div>
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link href="/flowers" className="inline-flex items-center gap-2 px-6 py-3 border border-rose-600 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white transition-colors">
            View All Flowers →
          </Link>
        </div>
      </div>
    </section>
  );
}