"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getFlowersList } from "@/api/product";
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


function FlowerSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 animate-pulse">
      <div className="aspect-[4/5] bg-gray-200 w-full" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3 w-16 bg-gray-200 rounded-full" />
        <div className="h-4 w-3/4 bg-gray-200 rounded-full" />
        <div className="h-3 w-full bg-gray-200 rounded-full" />
        <div className="h-3 w-2/3 bg-gray-200 rounded-full" />
        <div className="h-6 w-1/3 bg-gray-200 rounded-full mt-1" />
      </div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20">
      <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-500 text-sm mb-6">
        We couldn't load the flowers. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#E96D8E] text-white font-semibold rounded-full hover:bg-[#d45a7b] active:scale-95 transition-all duration-200 shadow-md shadow-[#E96D8E]/30 focus:outline-none focus:ring-2 focus:ring-[#E96D8E] focus:ring-offset-2"
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full text-center py-20">
      <p className="text-gray-500 text-lg">No flowers available right now.</p>
      <p className="text-gray-400 text-sm mt-2">
        Check back soon for fresh picks!
      </p>
    </div>
  );
}
export default function FeaturedFlowers() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const fetchFlowers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getFlowersList();
      const items = response?.data ?? response ?? [];
      setFlowers(items);
    } catch (err: unknown) {
      const msg: string =
        (err instanceof Error
          ? (err as { response?: { data?: { message?: string } } } & Error)
              .response?.data?.message ?? err.message
          : typeof err === "object" && err !== null
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined) ?? "Unable to load flowers.";
      setError(msg);
      console.error("[FeaturedFlowers] Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlowers();
  }, [fetchFlowers]);

  return (
    <section id="shop" className="py-20 bg-[#FFFCF8] overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Section header */}
        <div className="text-center mb-14">
          <motion.span
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-block bg-[#E96D8E] text-white text-xs font-bold px-5 py-2 rounded-full uppercase tracking-widest mb-5"
          >
            Farm Picks
          </motion.span>

          <motion.h2
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Featured{" "}
            <span className="text-[#E96D8E] italic">Flowers</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-gray-500 max-w-md mx-auto text-base"
          >
            Hand-picked blooms fresh from our farm, delivered to your door.
          </motion.p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }, (_, i) => (
              <FlowerSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        ) : error ? (
          <div className="grid grid-cols-1">
            <ErrorState onRetry={fetchFlowers} />
          </div>
        ) : flowers.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {flowers.map((flower, i) => (
              <motion.div
                key={flower.id}
                initial={
                  shouldReduceMotion ? undefined : { opacity: 0, y: 32, scale: 0.96 }
                }
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
                }
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: shouldReduceMotion ? 0 : Math.min(i * 0.07, 0.45),
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProductCard product={flower} />
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link
            href="/flower"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-2 border-[#305D3D] text-[#305D3D] font-semibold text-sm tracking-wide hover:bg-[#305D3D] hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#305D3D] focus:ring-offset-2"
          >
            View All Flowers
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}