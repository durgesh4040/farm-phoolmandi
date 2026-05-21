"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
const TRUST_FEATURES = [
    {
        icon: "🚚",
        title: "Fast Delivery",
        desc: "Fresh flowers at your doorstep",
    },
    {
        icon: "🌸",
        title: "Farm Fresh",
        desc: "Direct from local farms",
    },
    {
        icon: "🛡️",
        title: "Quality Assured",
        desc: "Premium handpicked blooms",
    },
    {
        icon: "💚",
        title: "Eco Friendly",
        desc: "Sustainable farming methods",
    },
];
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
        duration: 0.7,
        delay,
    },
});
export default function HeroSection() {
    return (
        <section className=" bg-[#FFF7F2] text-black">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                <div className="grid min-h-[80vh] items-center gap-12 lg:grid-cols-2">
                    <div className="py-12 lg:py-20">
                        <motion.div
                            {...fadeUp(0)}
                            className="mb-6 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-600"
                        >
                            🌱 100% Farm Fresh Flowers
                        </motion.div>
                        <motion.h1
                            {...fadeUp(0.1)}
                            className="mb-6 text-5xl font-bold leading-tight tracking-tight text-gray-900 lg:text-7xl"
                        >
                            Fresh Flowers
                            <span className="block text-rose-600 italic">
                                From Our Farm
                            </span>
                        </motion.h1>
                        <motion.p
                            {...fadeUp(0.2)}
                            className="mb-10 max-w-xl text-lg leading-8 text-gray-600"
                        >
                            Handpicked blooms delivered with love and care.
                            Bringing freshness, beauty, and happiness
                            directly from local farms to your home.
                        </motion.p>
                        <motion.div
                            {...fadeUp(0.3)}
                            className="flex flex-wrap gap-4"
                        >
                            <Link
                                href="#shop"
                                className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-8 py-4 font-medium text-white shadow-lg transition-all hover:scale-105 hover:bg-rose-700"
                            >
                                Shop Flowers
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                href="#about"
                                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-4 font-medium text-gray-800 transition-all hover:bg-gray-100"
                            >
                                Explore Farm
                            </Link>
                        </motion.div>
                        <motion.div
                            {...fadeUp(0.4)}
                            className="mt-12 flex flex-wrap gap-8"
                        >
                            {[
                                {
                                    number: "500+",
                                    label: "Events Served",
                                },
                                {
                                    number: "10K+",
                                    label: "Happy Customers",
                                },
                                {
                                    number: "100%",
                                    label: "Natural Flowers",
                                },
                            ].map((item) => (
                                <div key={item.label}>
                                    <h3 className="text-2xl font-bold text-green-800">
                                        {item.number}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] lg:h-[700px]"
                    >
                        <div className="inset-0 rounded-full bg-rose-200/40 blur-3xl" />
                        <div className="relative h-full overflow-hidden rounded-[32px] shadow-2xl">
                            <Image
                                src="/flowers.jpg"
                                alt="Flower Farm"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute bottom-6 left-6 rounded-3xl border border-gray-200 bg-white/90 p-5 shadow-xl backdrop-blur"
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-4xl">
                                    🌸
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-green-800">
                                        50K+
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        Happy Customers
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            <div className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        {TRUST_FEATURES.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.5 + index * 0.1,
                                }}
                                className="flex items-center gap-3"
                            >
                                <span className="text-2xl">
                                    {feature.icon}
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {feature.title}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {feature.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
