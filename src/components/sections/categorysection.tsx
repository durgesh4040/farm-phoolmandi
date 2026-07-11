"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { getCategoryList } from "@/api/category";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const PLACEHOLDER_IMAGE = "/images/placeholder-product.jpg";
const FALLBACK_IMAGE = "/images/placeholder-category.svg";

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function resolveImageUrl(imageUrl: string | null): string {
  if (!imageUrl) return PLACEHOLDER_IMAGE;
  if (imageUrl.startsWith("http")) return imageUrl;

  const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "")
    .replace(/\/+$/, "");

  const path = imageUrl.replace(/^\/+/, "");
  return baseUrl ? `${baseUrl}/${path}` : `/${path}`;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-44 h-44 rounded-full bg-gray-200 animate-pulse" />
      <div className="mt-5 h-6 w-24 bg-gray-200 rounded animate-pulse" />
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
      <p className="text-red-600 font-medium mb-4">
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
    <div className="col-span-full text-center py-16">
      <p className="text-gray-500">No categories available at the moment.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Category Card                                                     */
/* ------------------------------------------------------------------ */

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
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: shouldReduceMotion ? 0 : index * 0.08,
        duration: 0.5,
      }}
    >
      <Link
        href={`/flower?category=${encodeURIComponent(category.name)}`}
        prefetch={false}
        className="group flex flex-col items-center"
        aria-label={`Browse ${category.name} flowers`}
      >
        <div className="relative w-44 h-44 rounded-full overflow-hidden bg-gray-100 shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
          <Image
            src={imgSrc}
            alt={`${category.name} flowers category`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgSrc(FALLBACK_IMAGE)}
          />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-darkgray text-center group-hover:text-rose transition-colors">
          {category.name}
        </h3>
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */

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
      console.log(JSON.stringify(items,null,2))
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

  /* ------------------- Loading ------------------- */
  if (loading) {
    return (
      <section id="flowers" className="py-18 bg-warmwhite">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-darkgray">
              Top Categories
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
            {Array.from({ length: 6 }, (_, i) => (
              <CategorySkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ------------------- Error ------------------- */
  if (error) {
    return (
      <section id="flowers" className="py-18 bg-warmwhite">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-darkgray">
              Top Categories
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
            <ErrorState onRetry={fetchCategories} />
          </div>
        </div>
      </section>
    );
  }

  /* ------------------- Success ------------------- */
  return (
    <section id="flowers" className="py-18 bg-warmwhite">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-4">
          <span className="bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-full uppercase tracking-wide">
            Most Popular
          </span>
        </div>

        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-darkgray">
            Top Categories
          </h2>
          <p className="mt-4 text-midgray max-w-xl mx-auto">
            Discover premium flowers directly from our farm.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {categories.length === 0 ? (
            <EmptyState />
          ) : (
            categories.map((cat, index) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                index={index}
                shouldReduceMotion={shouldReduceMotion ?? false}
              />
            ))
          )}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/flower"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-rose text-white font-medium hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-rose focus:ring-offset-2"
          >
            Explore Collection <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}