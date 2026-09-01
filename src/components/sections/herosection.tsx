"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, ShieldCheck, Truck, Sprout } from "lucide-react";
const STATS = [
    { number: "500+", label: "Events Served" },
    { number: "10K+", label: "Happy Customers" },
    { number: "100%", label: "Natural Flowers" },
];

const TRUST_FEATURES = [
    {
        icon: Truck,
        color: "bg-rose-100 text-rose-600",
        title: "Fast Delivery",
        desc: "Fresh flowers at your doorstep",
    },
    {
        icon: Sprout,
        color: "bg-green-100 text-green-600",
        title: "Farm Fresh",
        desc: "Direct from local farms",
    },
    {
        icon: ShieldCheck,
        color: "bg-amber-100 text-amber-600",
        title: "Quality Assured",
        desc: "Premium handpicked blooms",
    },
    {
        icon: Leaf,
        color: "bg-emerald-100 text-emerald-700",
        title: "Eco Friendly",
        desc: "Sustainable farming methods",
    },
];

/* ─── Animation helpers ───────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─── Component ───────────────────────────────────────────────── */

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#FFF7F2]">
            {/* ── Decorative blobs ── */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-rose-200/40 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 -right-40 h-80 w-80 rounded-full bg-green-200/30 blur-3xl"
            />

            {/* ══ Main hero grid ══════════════════════════════════════ */}
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                <div className="grid min-h-[88vh] items-center gap-12 lg:grid-cols-2">

                    {/* ── Left: copy ── */}
                    <div className="py-16 lg:py-24">

                        {/* Badge */}
                        <motion.div
                            {...fadeUp(0)}
                            className="mb-7 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-rose-400" />
                            🌱 &nbsp;100% Farm Fresh · Harvested Daily
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            {...fadeUp(0.1)}
                            className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900 lg:text-[4.5rem]"
                        >
                            Fresh Flowers
                            <span className="relative mt-1 block text-rose-600 italic">
                                From Our Farm
                                {/* squiggle underline */}
                                <svg
                                    aria-hidden
                                    viewBox="0 0 300 12"
                                    className="absolute -bottom-3 left-0 w-64 opacity-70 lg:w-80"
                                >
                                    <path
                                        d="M0 6 Q37.5 0 75 6 Q112.5 12 150 6 Q187.5 0 225 6 Q262.5 12 300 6"
                                        stroke="#fca5a5"
                                        strokeWidth="3"
                                        fill="none"
                                    />
                                </svg>
                            </span>
                        </motion.h1>

                        {/* Sub-copy */}
                        <motion.p
                            {...fadeUp(0.2)}
                            className="mb-10 max-w-lg text-lg leading-8 text-gray-500"
                        >
                            Handpicked blooms delivered with love and care.
                            Bringing freshness, beauty, and happiness directly
                            from local farms to your home — every single day.
                        </motion.p>

                        {/* CTA row */}
                        <motion.div
                            {...fadeUp(0.3)}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <Link
                                href="#shop"
                                className="group inline-flex items-center gap-2 rounded-full bg-rose-600 px-8 py-4 font-semibold text-white shadow-lg shadow-rose-200 transition-all duration-300 hover:scale-105 hover:bg-rose-700 hover:shadow-rose-300"
                            >
                                Shop Flowers
                                <ArrowRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>
                            <Link
                                href="#about"
                                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                            >
                                Explore Farm
                            </Link>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            {...fadeUp(0.4)}
                            className="mt-12 flex flex-wrap gap-10"
                        >
                            {STATS.map((item, i) => (
                                <div key={item.label} className="flex flex-col">
                                    <motion.span
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
                                        className="text-3xl font-extrabold text-green-800"
                                    >
                                        {item.number}
                                    </motion.span>
                                    <span className="mt-0.5 text-sm text-gray-500">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Right: image ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as const }}
                        className="relative h-[520px] lg:h-[720px]"
                    >
                        {/* Soft glow */}
                        <div className="absolute inset-4 rounded-[36px] bg-rose-300/30 blur-2xl" />

                        {/* Main image card */}
                        <div className="relative h-full overflow-hidden rounded-[36px] shadow-2xl shadow-rose-100">
                            <Image
                                src="/flowers.jpg"
                                alt="Fresh flowers from our farm"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                            {/* bottom gradient overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Floating stats chip — bottom left */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-8 left-6 rounded-2xl border border-white/60 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-2xl">
                                    🌸
                                </span>
                                <div>
                                    <p className="text-xl font-extrabold leading-none text-green-800">
                                        50K+
                                    </p>
                                    <p className="mt-0.5 text-xs text-gray-500">Happy Customers</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating seasonal badge — top right */}
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                            className="absolute top-6 right-6 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-xl">🍂</span>
                                <div>
                                    <p className="text-xs font-semibold text-gray-800">Season Special</p>
                                    <p className="text-[11px] text-rose-500">20% off today</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            <div className="border-t border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-7 md:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        {TRUST_FEATURES.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.55 + index * 0.1,
                                        duration: 0.5,
                                        ease: "easeOut",
                                    }}
                                    className="flex items-center gap-3"
                                >
                                    <span
                                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${feature.color}`}
                                    >
                                        <Icon size={18} />
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {feature.title}
                                        </p>
                                        <p className="text-xs text-gray-500">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

