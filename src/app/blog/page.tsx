"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flower2,
  Clock,
  ArrowRight,
  Tag,
  BookOpen,
  Leaf,
  Search,
  Send,
} from "lucide-react";
interface Post {
  id: number;
  slug: string;
  category: string;
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  authorInitial: string;
  authorColor: string;
  date: string;
  readTime: string;
  emoji: string;
  gradient: string;
  featured?: boolean;
}

const CATEGORIES = ["All", "Flower Care", "Farming", "Events & Decor", "Seasonal", "Tips & Tricks"];

const POSTS: Post[] = [
  {
    id: 1,
    slug: "how-to-keep-roses-fresh",
    category: "Flower Care",
    tag: "Care Guide",
    title: "How to Keep Roses Fresh for 2 Weeks or More",
    excerpt:
      "Roses are delicate, but with the right techniques you can make them last far longer than most people expect. We share our farm-tested secrets that our team uses every day.",
    author: "Rajesh Patil",
    authorInitial: "R",
    authorColor: "bg-rose-500",
    date: "Aug 12, 2026",
    readTime: "5 min read",
    emoji: "🌹",
    gradient: "from-rose-400 to-pink-600",
    featured: true,
  },
  {
    id: 2,
    slug: "marigold-growing-guide",
    category: "Farming",
    tag: "Farm Story",
    title: "Our Complete Guide to Growing Marigolds at Scale",
    excerpt:
      "Marigolds are the backbone of Indian floriculture. Learn how our farm grows them organically across three acres and keeps every bloom vibrant.",
    author: "Sunita Patil",
    authorInitial: "S",
    authorColor: "bg-amber-500",
    date: "Aug 8, 2026",
    readTime: "7 min read",
    emoji: "🌼",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: 3,
    slug: "flowers-for-weddings-guide",
    category: "Events & Decor",
    tag: "Event Planning",
    title: "Choosing the Right Flowers for Your Wedding Season",
    excerpt:
      "From mandap decorations to bridal bouquets, the choice of flowers sets the tone for your entire wedding. We break it down season by season.",
    author: "Priya Verma",
    authorInitial: "P",
    authorColor: "bg-violet-500",
    date: "Aug 3, 2026",
    readTime: "8 min read",
    emoji: "💐",
    gradient: "from-violet-400 to-purple-600",
  },
  {
    id: 4,
    slug: "monsoon-flowers-india",
    category: "Seasonal",
    tag: "Seasonal Guide",
    title: "Best Flowers to Buy During Monsoon in India",
    excerpt:
      "The monsoon season brings unique challenges and unique beauties. Here are the varieties that thrive in humidity and why your home needs them right now.",
    author: "Amit Desai",
    authorInitial: "A",
    authorColor: "bg-green-600",
    date: "Jul 28, 2026",
    readTime: "4 min read",
    emoji: "🌧️",
    gradient: "from-green-400 to-emerald-600",
  },
  {
    id: 5,
    slug: "jasmine-benefits-home",
    category: "Tips & Tricks",
    tag: "Home Decor",
    title: "Why Every Indian Home Needs Jasmine — And How to Use It",
    excerpt:
      "Jasmine is more than fragrance. It purifies air, reduces anxiety and connects us to centuries of Indian tradition. Here is how to get the most from it.",
    author: "Rajesh Patil",
    authorInitial: "R",
    authorColor: "bg-rose-500",
    date: "Jul 20, 2026",
    readTime: "6 min read",
    emoji: "🤍",
    gradient: "from-gray-300 to-slate-500",
  },
  {
    id: 6,
    slug: "organic-farming-practices",
    category: "Farming",
    tag: "Sustainability",
    title: "How We Farm Without a Single Drop of Pesticide",
    excerpt:
      "Three generations of farming wisdom, combined with modern natural techniques, let us grow premium flowers with zero harmful chemicals. Here is our full process.",
    author: "Sunita Patil",
    authorInitial: "S",
    authorColor: "bg-amber-500",
    date: "Jul 14, 2026",
    readTime: "9 min read",
    emoji: "🌱",
    gradient: "from-lime-400 to-green-600",
  },
  {
    id: 7,
    slug: "lotus-puja-decoration-tips",
    category: "Events & Decor",
    tag: "Puja Decor",
    title: "Lotus Flowers for Puja: Selection, Care & Arrangement Tips",
    excerpt:
      "The lotus carries deep spiritual significance. We share how to select the freshest blooms, keep them open through your ceremony and arrange them beautifully.",
    author: "Priya Verma",
    authorInitial: "P",
    authorColor: "bg-violet-500",
    date: "Jul 5, 2026",
    readTime: "5 min read",
    emoji: "🪷",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    id: 8,
    slug: "bulk-order-flowers-events",
    category: "Tips & Tricks",
    tag: "Business Tips",
    title: "5 Things to Check Before Placing a Bulk Flower Order",
    excerpt:
      "Ordering hundreds of flowers for a big event? Avoid the common mistakes that lead to wilted flowers, missed varieties and last-minute panic.",
    author: "Amit Desai",
    authorInitial: "A",
    authorColor: "bg-green-600",
    date: "Jun 28, 2026",
    readTime: "6 min read",
    emoji: "📦",
    gradient: "from-sky-400 to-blue-500",
  },
];

/* ─── Animation ──────────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─── Sub-components ─────────────────────────────────────────── */

function AuthorAvatar({ initial, color }: { initial: string; color: string }) {
  return (
    <span className={`w-7 h-7 rounded-full ${color} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
      {initial}
    </span>
  );
}

function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.article
      key={post.id}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Gradient image area */}
      <div className={`relative h-44 bg-gradient-to-br ${post.gradient} flex items-center justify-center overflow-hidden`}>
        <span className="text-7xl select-none drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
          {post.emoji}
        </span>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-[11px] font-bold">
          <Tag size={10} /> {post.tag}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider mb-2">
          {post.category}
        </span>
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-rose-700 transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AuthorAvatar initial={post.authorInitial} color={post.authorColor} />
            <div>
              <p className="text-xs font-semibold text-gray-700 leading-none">{post.author}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{post.date}</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <Clock size={11} /> {post.readTime}
          </span>
        </div>
      </div>

      {/* Read more footer */}
      <Link
        href={`/blog/${post.slug}`}
        className="flex items-center gap-2 px-5 py-3.5 border-t border-gray-100 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors group/link"
      >
        Read Article
        <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-1" />
      </Link>
    </motion.article>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const featured = POSTS.find((p) => p.featured)!;

  const filtered = POSTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Remove featured from grid if it passes filters
  const gridPosts = filtered.filter((p) => !p.featured || activeCategory !== "All" || search);

  return (
    <div className="min-h-screen bg-[#faf9f6]">

      {/* ══ Hero banner ════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-[#FFF7F2] to-green-50 border-b border-rose-100">
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-green-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24 text-center">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100 text-rose-600 rounded-full text-sm font-bold mb-5">
            <BookOpen className="h-4 w-4" /> PhoolMandi Blog
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Flower Wisdom &{" "}
            <span className="text-rose-600 italic">Farm Stories</span>
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Care guides, farming insights, seasonal tips and event inspiration — straight from the farm to your feed.
          </motion.p>

          {/* Search */}
          <motion.div {...fadeUp(0.22)} className="relative max-w-md mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-14 pr-5 py-3.5 bg-white border-2 border-white rounded-2xl focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-400/10 transition-all text-gray-900 placeholder:text-gray-400 text-base shadow-lg shadow-rose-100/30"
            />
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">

        {/* ── Category tabs ── */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 mb-10 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                activeCategory === cat
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/25 scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50"
              }`}
            >
              {cat === "All" && <Flower2 size={13} />}
              {cat === "Farming" && <Leaf size={13} />}
              {cat}
            </button>
          ))}
        </div>

        {/* ── Featured post (only on All + no search) ── */}
        {activeCategory === "All" && !search && (
          <motion.div {...fadeUp(0)} className="mb-12">
            <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-rose-300 inline-block" />
              Featured Article
              <span className="w-6 h-px bg-rose-300 inline-block" />
            </p>
            <article className="group grid md:grid-cols-2 gap-0 bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              {/* Left: gradient */}
              <div className={`relative bg-gradient-to-br ${featured.gradient} h-64 md:h-auto flex items-center justify-center overflow-hidden`}>
                <span className="text-[9rem] select-none drop-shadow-2xl group-hover:scale-110 transition-transform duration-700">
                  {featured.emoji}
                </span>
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/8 transition-colors" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-bold">
                  ⭐ Featured
                </span>
              </div>

              {/* Right: content */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-3">{featured.category}</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight group-hover:text-rose-700 transition-colors">
                  <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <AuthorAvatar initial={featured.authorInitial} color={featured.authorColor} />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{featured.author}</p>
                      <p className="text-xs text-gray-400">{featured.date}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} /> {featured.readTime}
                  </span>
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-md shadow-rose-200 self-start"
                >
                  Read Full Article <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          </motion.div>
        )}

        {/* ── Results info ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {filtered.length === 0
              ? "No articles found"
              : `${gridPosts.length} article${gridPosts.length !== 1 ? "s" : ""}`}
            {search && <span className="text-gray-400"> for &ldquo;{search}&rdquo;</span>}
          </p>
          {(search || activeCategory !== "All") && (
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold underline underline-offset-2"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* ── Post grid ── */}
        {gridPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200"
          >
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-9 w-9 text-rose-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
              Try a different category or search term.
            </p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="px-6 py-2.5 bg-rose-600 text-white rounded-full font-semibold text-sm hover:bg-rose-700 transition-colors"
            >
              Show All Articles
            </button>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {gridPosts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* ── Newsletter CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-br from-green-800 to-green-900 rounded-3xl p-10 md:p-16 text-center text-white mb-12"
        >
          <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-white/5" />

          <div className="relative">
            <span className="text-4xl mb-4 block">🌸</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              Get Flower Tips in Your Inbox
            </h2>
            <p className="text-white/70 text-lg max-w-lg mx-auto mb-8">
              Join 5,000+ flower lovers who receive our weekly care guides, seasonal picks and exclusive farm stories.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-2xl text-white font-semibold">
                ✓ You&apos;re subscribed! Thank you 🌺
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all text-sm"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] text-sm"
                >
                  <Send size={15} /> Subscribe
                </button>
              </form>
            )}
            <p className="text-white/40 text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </motion.div>

        {/* ── Browse by topic chips ── */}
        <div className="text-center pb-12">
          <p className="text-sm font-semibold text-gray-500 mb-4">Browse by Topic</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Rose Care", "Marigold", "Lotus", "Jasmine", "Organic Farming", "Wedding Flowers", "Monsoon Blooms", "Bulk Orders", "Puja Decor", "Sustainability"].map((t) => (
              <button
                key={t}
                onClick={() => setSearch(t)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-sm hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 transition-all"
              >
                <Tag size={12} /> {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
