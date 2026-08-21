"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { getCategoryList } from "@/api/category";

interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
}

const PLACEHOLDER_IMAGE = "/images/placeholder-product.jpg";
const FALLBACK_IMAGE = "/images/placeholder-category.svg";

function resolveImageUrl(imageUrl: string | null): string {
  if (!imageUrl) return PLACEHOLDER_IMAGE;
  if (imageUrl.startsWith("http")) return imageUrl;

  const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(
    /\/+$/,
    ""
  );

  const path = imageUrl.replace(/^\/+/, "");
  return baseUrl ? `${baseUrl}/${path}` : `/${path}`;
}

function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-40 h-40 rounded-full bg-gray-200 animate-pulse" />
        <div className="absolute inset-0 rounded-full ring-4 ring-gray-100 animate-pulse" />
      </div>
      <div className="h-5 w-24 bg-gray-200 rounded-full animate-pulse" />
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 w-full">
      <p className="text-red-500 font-medium mb-4">
        Unable to load categories. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
      >
        Retry
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 w-full">
      <p className="text-gray-500">No categories available at the moment.</p>
    </div>
  );
}

function CategoryCard({
  category,
  index,
  shouldReduceMotion,
}: {
  category: Category;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(() =>
    resolveImageUrl(category.imageUrl)
  );

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 40, scale: 0.92 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: shouldReduceMotion ? 0 : index * 0.09,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex-shrink-0"
    >
      <Link
        href={`/flower?category=${encodeURIComponent(category.name)}`}
        prefetch={false}
        className="group flex flex-col items-center gap-4"
        aria-label={`Browse ${category.name} flowers`}
      >
        {/* Image circle with ring + glow effect */}
        <div className="relative">
          {/* Outer glow ring — visible on hover */}
          <div
            className="absolute -inset-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "conic-gradient(from 180deg, #E96D8E, #305D3D, #E96D8E)",
              filter: "blur(4px)",
            }}
          />

          {/* Static decorative ring */}
          <div className="absolute -inset-0.5 rounded-full ring-2 ring-gray-200 group-hover:ring-transparent transition-all duration-500" />

          {/* Image container */}
          <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
            <Image
              src={imgSrc}
              alt={`${category.name} flowers`}
              fill
              sizes="160px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImgSrc(FALLBACK_IMAGE)}
            />
            {/* Subtle bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
          </div>
        </div>

        {/* Label */}
        <span className="text-base font-semibold text-gray-800 group-hover:text-[#E96D8E] transition-colors duration-300 tracking-wide">
          {category.name}
        </span>
      </Link>
    </motion.div>
  );
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCategoryList();
      const items = Array.isArray(response) ? response : response?.data ?? [];
      setCategories(items);
    } catch (err) {
      setError("Failed to load categories");
      console.error("[CategoriesSection] Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section id="flowers" className="py-20 bg-[#FFFCF8] overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Section header */}
        <div className="text-center mb-14">
          <motion.span
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-block bg-[#305D3D] text-white text-xs font-bold px-5 py-2 rounded-full uppercase tracking-widest mb-5"
          >
            Most Popular
          </motion.span>

          <motion.h2
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Top Categories
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-gray-500 max-w-md mx-auto text-base"
          >
            Discover premium flowers directly from our farm.
          </motion.p>
        </div>

        {/* Categories */}
        {loading ? (
          <div className="flex flex-wrap justify-center gap-10 md:gap-14">
            {Array.from({ length: 6 }, (_, i) => (
              <CategorySkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        ) : error ? (
          <ErrorState onRetry={fetchCategories} />
        ) : categories.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-wrap justify-center gap-10 md:gap-14">
            {categories.map((cat, index) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                index={index}
                shouldReduceMotion={shouldReduceMotion ?? false}
              />
            ))}
          </div>
        )}

        {/* CTA button */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link
            href="/flower"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#E96D8E] text-white font-semibold text-sm tracking-wide hover:bg-[#d45a7b] hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-[#E96D8E]/30 focus:outline-none focus:ring-2 focus:ring-[#E96D8E] focus:ring-offset-2"
          >
            Explore Full Collection
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
