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
  Leaf,
} from "lucide-react";
import { getFlowersList } from "@/api/product";
import { getCategoryList } from "@/api/category";
import { useDebounce } from "@/hooks/useDebounce";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";

interface Flower {
  id: number;
  name: string;
  description: string;
  price: string;
  sku: string | null;
  imageUrl: string | null;
  stockQuantity: number;
  category?: { id: number; name: string };
}

interface Category {
  id: string | number;
  name: string;
}

/* ─── Skeleton card ─────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[4/5] bg-gray-200" />
      <div className="p-4 space-y-2.5">
        <div className="h-3 w-16 bg-gray-200 rounded-full" />
        <div className="h-4 w-3/4 bg-gray-200 rounded-full" />
        <div className="h-3 w-full bg-gray-200 rounded-full" />
        <div className="h-3 w-2/3 bg-gray-200 rounded-full" />
        <div className="h-5 w-20 bg-gray-200 rounded-full mt-2" />
        <div className="h-10 w-full bg-gray-200 rounded-xl mt-1" />
      </div>
    </div>
  );
}

export default function FlowerPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialLimit = parseInt(searchParams.get("limit") || "12", 10);

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

  const debouncedSearch = useDebounce(search, 300);

  /* ── Load categories ── */
  useEffect(() => {
    getCategoryList()
      .then((res) => {
        const list: Category[] = (res?.data ?? res ?? []).map((c: { id: string | number; name: string }) => ({
          id: c.id,
          name: c.name,
        }));
        setCategories([{ id: "all", name: "All Flowers" }, ...list]);
      })
      .catch(() => {});
  }, []);

  /* ── Fetch flowers ── */
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
      setFlowers(response?.data ?? []);
      const pagination = response?.pagination;
      if (pagination) {
        setTotalPages(pagination.totalPages ?? 1);
        setTotalItems(pagination.totalDocs ?? 0);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Unable to load flowers.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, activeCategory, page, limit]);

  useEffect(() => { fetchFlowers(); }, [fetchFlowers]);
  useEffect(() => { setPage(1); }, [debouncedSearch, activeCategory]);

  /* ── Sync URL ── */
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) params.set("search", debouncedSearch);
    else params.delete("search");
    if (activeCategory && activeCategory !== "all") params.set("category", activeCategory);
    else params.delete("category");
    params.set("page", String(page));
    params.set("limit", String(limit));
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  }, [debouncedSearch, activeCategory, page, limit, pathname, searchParams]);

  /* ── Handlers ── */
  const clearSearch = () => setSearch("");
  const clearAllFilters = () => { setSearch(""); setActiveCategory("all"); setPage(1); };
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleLimitChange = (newLimit: number) => { setLimit(newLimit); setPage(1); };

  const hasActiveFilters = !!(search || activeCategory !== "all");
  const activeCategoryName = categories.find((c) => String(c.id) === activeCategory)?.name || "";

  /* ═══════════════════════════════════════════════════════════ */

  return (
    <div className="min-h-screen bg-[#faf9f6]">

      {/* ── Page hero banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-[#FFF7F2] to-green-50 border-b border-rose-100">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-green-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100 text-rose-600 rounded-full text-sm font-semibold mb-5"
          >
            <Flower2 className="h-4 w-4" />
            Farm Picks
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight"
          >
            Our Beautiful{" "}
            <span className="text-rose-600 italic">Collection</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed mb-8"
          >
            Handpicked blooms delivered with love. Discover premium flowers directly from our farm.
          </motion.p>

          {/* Search bar inside hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search roses, lilies, bouquets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-12 py-4 bg-white border-2 border-white rounded-2xl focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-400/10 transition-all text-gray-900 placeholder:text-gray-400 text-base shadow-lg shadow-rose-100/40"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Main content ── */}
      <section id="shop" className="mx-auto max-w-7xl px-4 md:px-8 py-10">

        {/* Category filter strip */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-500">Filter by Category</span>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => {
              const isActive = activeCategory === String(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(String(cat.id))}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                    isActive
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/25 scale-105"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50"
                  }`}
                >
                  {cat.name}
                  {isActive && <X className="h-3 w-3 ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center flex-wrap gap-2">
            {loading ? (
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Loading flowers...
              </span>
            ) : (
              <span className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-bold text-gray-900">{flowers.length}</span>{" "}
                {flowers.length === 1 ? "flower" : "flowers"}
                {hasActiveFilters && (
                  <span className="text-gray-400 ml-1">(of {totalItems} total)</span>
                )}
              </span>
            )}

            {/* Active filter chips */}
            {hasActiveFilters && (
              <>
                {search && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-semibold">
                    &ldquo;{search}&rdquo;
                    <button onClick={clearSearch} className="p-0.5 hover:bg-rose-100 rounded-full">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {activeCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-semibold">
                    <Leaf className="h-3 w-3" />
                    {activeCategoryName}
                    <button onClick={() => setActiveCategory("all")} className="p-0.5 hover:bg-rose-100 rounded-full">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold underline underline-offset-2"
                >
                  Clear all
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── Error state ── */}
        {error && flowers.length === 0 && (
          <div className="text-center py-24">
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 max-w-sm mx-auto">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <AlertCircle className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h3>
              <p className="text-gray-500 text-sm mb-6">{error}</p>
              <button
                onClick={fetchFlowers}
                className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors font-semibold"
              >
                <RefreshCw className="h-4 w-4" /> Try Again
              </button>
            </div>
          </div>
        )}

        {/* ── Skeleton loading ── */}
        {loading && flowers.length === 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(12)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && !error && flowers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200"
          >
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flower2 className="h-10 w-10 text-rose-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No flowers found</h3>
            <p className="text-gray-500 max-w-xs mx-auto mb-6 text-sm">
              We couldn&apos;t find any flowers matching your criteria. Try adjusting your filters.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors font-semibold text-sm"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        )}

        {/* ── Product grid ── */}
        {flowers.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {flowers.map((flower, i) => (
                <motion.div
                  key={flower.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.35) }}
                >
                  <ProductCard product={flower} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* ── Inline loading spinner (page change) ── */}
        {loading && flowers.length > 0 && (
          <div className="flex justify-center py-10">
            <div className="flex items-center gap-3 text-rose-600">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-sm font-medium">Updating results...</span>
            </div>
          </div>
        )}

        {/* ── Pagination ── */}
        {!loading && !error && flowers.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            limit={limit}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        )}
      </section>
    </div>
  );
}
