"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#f8f6f2]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-sm font-medium text-rose-600 mb-4">
            Customer Love
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers{" "}
            <span className="text-rose-500 italic">Say</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gray-300" />
            <span className="text-xl">🌿</span>
            <span className="h-px w-16 bg-gray-300" />
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -8,
              }}
              className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {/* Quote */}
              <div className="mb-4">
                <span className="font-serif text-6xl leading-none text-rose-200">
                </span>
              </div>

              {/* Review */}
              <p className="flex-grow text-gray-600 italic leading-relaxed mb-6">
                {testimonial.text}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    size={16}
                    className={
                      starIndex < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <div className="mt-auto border-t border-gray-100 pt-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white font-bold shadow-md">
                  {testimonial.avatar}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>

                  <p className="text-xs text-rose-500 font-medium">
                    {testimonial.occasion}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}