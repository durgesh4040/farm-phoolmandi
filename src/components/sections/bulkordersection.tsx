"use client";

import { motion } from "framer-motion";
import { BULK_OCCASIONS } from "@/lib/data";

export default function BulkOrdersSection() {
  return (
    <section
      id="bulk"
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1e3d27 0%, #305D3D 50%, #2a5035 100%)" }}
    >
      {/* Decorative petals */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {["🌸","🌺","🌼","💐","🌹"].map((e, i) => (
          <span
            key={i}
            className="absolute text-5xl"
            style={{
              top:  `${10 + i * 18}%`,
              left: `${5  + i * 20}%`,
              transform: `rotate(${i * 30}deg)`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-white mb-4"
                style={{ fontSize: "clamp(2rem, 4vw, 48px)" }}>
              Bulk Orders for<br />
              <span className="text-rose-300">Events & Occasions</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8 max-w-md">
              We provide fresh flowers in bulk for weddings, events, temples, and decorations.
              Get farm-direct pricing with guaranteed freshness.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-rose hover:bg-rose-dark
                         text-white px-7 py-4 rounded-full font-semibold text-sm
                         transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rose"
            >
              Contact Us for Bulk Orders →
            </a>
          </motion.div>

          {/* Right — occasion icons */}
          <div className="grid grid-cols-2 gap-4">
            {BULK_OCCASIONS.map((o, i) => (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl
                           p-6 text-center hover:bg-white/15 transition-colors group cursor-pointer"
              >
                <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform duration-300">
                  {o.icon}
                </span>
                <p className="text-white font-semibold text-sm">{o.label}</p>
                <p className="text-white/50 text-xs mt-0.5">{o.hindi}</p>
                <p className="text-white/40 text-[11px] mt-1 leading-snug">{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
