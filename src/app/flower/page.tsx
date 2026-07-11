"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  SlidersHorizontal,
  Flower2,
  AlertCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { getFlowersList } from "@/api/product";
import { getCategoryList } from "@/api/category";
import { useDebounce } from "@/hooks/useDebounce";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";

// ─── Types ───────────────────────────────────────────────────────

interface Flower {
  id: number;
  name: string;
  description: string;
  price: string;
  sku: string | null;
  imageUrl: string | null;
  stockQuantity: number;
  category?: {
    id: number;
    name: string;
  };
}

interface Category {
  id: string | number;
  name: string;
}

// ─── Component ───────────────────────────────────────────────────

export default function FeaturedFlowers() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial state from URL
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialLimit = parseInt(searchParams.get("limit") || "10", 10);

  // Local state
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(initialLimit);
  const [categories, setCategories] = useState<Category[]>([
    { id: "all", name: "All Flowers" },
  ]);

  // Debounced search for API calls
  const debouncedSearch = useDebounce(search, 300);

  // ─── Fetch Categories ──────────────────────────────────────────
  useEffect(() => {
    getCategoryList()
      .then((res) => {
        const list: Category[] = (res?.data ?? res ?? []).map((c: any) => ({
          id: c.id,
          name: c.name,
        }));
        setCategories([{ id: "all", name: "All Flowers" }, ...list]);
      })
      .catch(() => {
        // silently fail
      });
  }, []);

  // ─── Fetch Data ────────────────────────────────────────────────
  const fetchFlowers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (activeCategory && activeCategory !== "all")
        params.set("categoryId", activeCategory);

      const response = await getFlowersList(`?${params.toString()}`);

      const items = response?.data ?? [];
      setFlowers(items);

      const pagination = response?.pagination;
      if (pagination) {
        setTotalPages(pagination.totalPages ?? 1);
        setTotalItems(pagination.totalDocs ?? 0);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Unable to load flowers.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, activeCategory, page, limit]);

  useEffect(() => {
    fetchFlowers();
  }, [fetchFlowers]);

  // Reset page to 1 when search or category changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, activeCategory]);

  // ─── Sync URL with State ───────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) params.set("search", debouncedSearch);
    else params.delete("search");

    if (activeCategory && activeCategory !== "all")
      params.set("category", activeCategory);
    else params.delete("category");

    params.set("page", String(page));
    params.set("limit", String(limit));

    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [debouncedSearch, activeCategory, page, limit, pathname, searchParams]);

  // ─── Handlers ──────────────────────────────────────────────────
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleCategoryChange = (categoryId: string | number) => {
    setActiveCategory(String(categoryId));
  };

  const clearSearch = () => {
    setSearch("");
  };

  const clearAllFilters = () => {
    setSearch("");
    setActiveCategory("all");
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const hasActiveFilters = search || activeCategory !== "all";

  const activeCategoryName =
    categories.find((c) => String(c.id) === activeCategory)?.name || "";

  // ─── Render: Loading Skeleton ──────────────────────────────────
  if (loading && flowers.length === 0) {
    return (
      <section id="shop" className="py-20 bg-[#faf9f6]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <div className="h-4 w-24 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-10 w-64 bg-gray-200 rounded-xl mx-auto mb-3 animate-pulse" />
            <div className="h-4 w-48 bg-gray-200 rounded-full mx-auto animate-pulse" />
          </div>
          <div className="h-14 bg-gray-200 rounded-2xl mb-8 animate-pulse" />
          <div className="flex gap-3 mb-8 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-28 bg-gray-200 rounded-full flex-shrink-0 animate-pulse"
              />
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-200 h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── Render: Error State ───────────────────────────────────────
  if (error && flowers.length === 0) {
    return (
      <section id="shop" className="py-20 bg-[#faf9f6]">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 max-w-md mx-auto">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchFlowers}
              className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors font-medium"
            >
              <RefreshCw className="h-4 w-4" /> Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="py-16 md:py-24 bg-[#faf9f6]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-sm font-semibold mb-4"
          >
            <Flower2 className="h-4 w-4" />
            Farm Picks
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Beautiful{" "}
            <span className="text-rose-600 italic">Collection</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Handpicked blooms delivered with love and care. Discover premium
            flowers directly from our farm.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 mt-6"
          >
            <span className="block h-px w-16 bg-rose-200" />
            <span className="text-2xl">🌿</span>
            <span className="block h-px w-16 bg-rose-200" />
          </motion.div>
        </div>

        {/* ─── Search Bar ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative max-w-2xl mx-auto mb-8"
        >
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-rose-500 transition-colors pointer-events-none" />
            <input
              type="text"
              placeholder="Search roses, lilies, bouquets..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-14 pr-12 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all text-gray-900 placeholder:text-gray-400 text-base shadow-sm"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
        </motion.div>

        {/* ─── Category Filters ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">
              Filter by Category
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => {
              const isActive = activeCategory === String(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                    isActive
                      ? "bg-rose-600 text-white shadow-lg shadow-rose-600/25 scale-105"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50"
                  }`}
                >
                  {cat.name}
                  {isActive && (
                    <motion.span layoutId="activeCategory" className="ml-1">
                      <X className="h-3 w-3" />
                    </motion.span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ─── Results Header ────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Loading...
                </span>
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {flowers.length}
                  </span>{" "}
                  {flowers.length === 1 ? "flower" : "flowers"}
                  {hasActiveFilters && (
                    <span className="text-gray-400 ml-1">
                      (filtered from {totalItems} total)
                    </span>
                  )}
                </>
              )}
            </p>

            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                {search && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-medium">
                    Search: &quot;{search}&quot;
                    <button
                      onClick={clearSearch}
                      className="p-0.5 hover:bg-rose-100 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {activeCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-medium">
                    {activeCategoryName}
                    <button
                      onClick={() => handleCategoryChange("all")}
                      className="p-0.5 hover:bg-rose-100 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium underline underline-offset-2"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ─── Product Grid ──────────────────────────────────────── */}
        {flowers.length === 0 && !loading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200"
          >
            <Flower2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No flowers found
            </h3>
            <p className="text-gray-500 mb-2 max-w-md mx-auto">
              We couldn&apos;t find any flowers matching your criteria.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="mt-4 px-6 py-2.5 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors font-medium"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {flowers.map((flower, i) => (
                <motion.div
                  key={flower.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.4) }}
                >
                  <ProductCard product={flower} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {loading && flowers.length > 0 && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 text-rose-600 animate-spin" />
          </div>
        )}

        {/* ─── Pagination ─────────────────────────────────────────── */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          limit={limit}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </div>
    </section>
  );
}