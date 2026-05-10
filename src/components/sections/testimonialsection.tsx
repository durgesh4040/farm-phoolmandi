"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-warmwhite">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section-label mx-auto justify-center before:hidden">
            Customer Love
          </span>
          <h2 className="font-heading font-bold text-h2 text-darkgray mb-3">
            What Our Customers <span className="text-rose italic">Say</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="block h-px w-12 bg-bordergray" />
            <span className="text-rose text-lg">🌿</span>
            <span className="block h-px w-12 bg-bordergray" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="card-base rounded-xl p-7 flex flex-col gap-4"
            >
              {/* Quote mark */}
              <span className="text-5xl text-rose-light font-serif leading-none">&ldquo;</span>

              <p className="text-midgray text-sm leading-relaxed italic -mt-4">{t.text}</p>

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={13} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-bordergray">
                <div className="w-10 h-10 rounded-full bg-rose-light text-rose font-bold text-sm
                                flex items-center justify-center flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-darkgray">{t.name}</p>
                  <p className="text-xs text-midgray">{t.location} · {t.occasion}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
