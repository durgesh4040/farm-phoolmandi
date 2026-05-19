"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
const features = [
    "Chemical Free Farming",
    "Handpicked by Experts",
    "Eco Friendly Environment",
    "Supporting Local Farmers",
];
export default function AboutSection() {
    return (
        <section id="about" className="py-20 bg-cream">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-label">About Our Farm</span>
                        <h2 className="font-heading font-bold mb-4" style={{ fontSize: "clamp(2rem,4vw,42px)" }}>
                            Growing Beauty,{" "}
                            <span className="text-rose italic">Nurturing Nature</span>
                        </h2>
                        <p className="text-midgray leading-relaxed mb-8">
                            Our farm is spread across lush green fields where every flower is grown with care,
                            passion and sustainable farming practices. We believe in delivering not just flowers,
                            but memories that last a lifetime.
                        </p>
                        <ul className="space-y-3 mb-10">
                            {features.map((f) => (
                                <li key={f} className="flex items-center gap-3 text-sm font-medium text-darkgray">
                                    <CheckCircle2 size={18} className="text-farm flex-shrink-0" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <a href="#contact" className="btn-primary">
                            Know More About Us
                        </a>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="relative"
                    >
                        <div className="relative rounded-hero overflow-hidden aspect-[4/5] img-zoom">
                            <Image
                                src="/flower.jpg"
                                alt="Farmer holding fresh flowers on the farm"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -right-4 bottom-8 bg-white rounded-2xl p-5 shadow-hover
                         border border-bordergray"
                        >
                            <p className="font-heading font-bold text-3xl text-farm">100%</p>
                            <p className="text-sm font-semibold text-darkgray">Natural Flowers</p>
                            <p className="text-xs text-midgray">Grown with love</p>
                            <p className="text-xs text-midgray">Delivered with care</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
