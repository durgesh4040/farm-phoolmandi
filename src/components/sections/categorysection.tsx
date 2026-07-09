"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { getCategoryList } from "@/api/category";
import { useEffect } from "react";
interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
}
export default function CategoriesSection() {
  const [categories,setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCategoryList();
      const items = response?.data ?? response ?? [];
      setCategories(items);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Unable to load flowers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchCategories()
  }, []);

  return (
    <div
      id="flowers"
      className="py-18 bg-warmwhite"
    >
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
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
              }}
            >
              <Link
                href={`#${cat.name.toLowerCase()}`}
                className="group flex flex-col items-center"
              >
                <div
                  className="
                    relative
                    w-44
                    h-44
                    rounded-full
                    overflow-hidden
                    bg-white
                    shadow-md
                    transition-all
                    duration-500
                    group-hover:shadow-2xl
                    group-hover:-translate-y-2
                  "
                >
                  <Image
                    src={`http://localhost:4200/${cat.imageUrl}`}
                    alt={cat.name}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />
                </div>
                <h3
                  className="
                    mt-5
                    text-xl
                    font-semibold
                    text-darkgray
                    text-center
                    group-hover:text-rose
                    transition-colors
                  "
                >
                  {cat.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link
            href="#shop"
            className="
              inline-flex
              items-center
              gap-2
              px-8
              py-4
              rounded-full
              bg-rose
              text-white
              font-medium
              hover:scale-105
              transition-transform
            "
          >
            Explore Collection →
          </Link>
        </div>
      </div>
    </div>
  );
}