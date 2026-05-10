"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  hindi: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
  badgeColor: string;
  available: boolean;
  minQty: string;
}

const BADGE_COLORS: Record<string, string> = {
  rose:   "bg-rose-light text-rose",
  farm:   "bg-farm-light text-farm",
  leaf:   "bg-leaf-light text-leaf",
  amber:  "bg-amber-100 text-amber-700",
  purple: "bg-purple-100 text-purple-700",
};

export default function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [added,  setAdded]  = useState(false);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAdd = () => {
    if (!product.available) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group card-base rounded-lg overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-cream img-zoom">
        <Image
          src="/flower.jpg"
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-106"
        />
        {/* Badge */}
        <span
          className={cn(
            "absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full",
            BADGE_COLORS[product.badgeColor] || BADGE_COLORS.rose
          )}
        >
          {product.badge}
        </span>
        {/* Discount */}
        {discount > 0 && (
          <span className="absolute top-3 right-10 bg-rose text-white text-[10px]
                           font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        {/* Wishlist */}
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90
                     flex items-center justify-center shadow
                     hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          aria-label="Wishlist"
        >
          <Heart
            size={15}
            className={wished ? "fill-rose text-rose" : "text-midgray"}
          />
        </button>

        {/* Unavailable overlay */}
        {!product.available && (
          <div className="absolute inset-0 bg-darkgray/40 flex items-center justify-center">
            <span className="bg-white text-darkgray text-xs font-semibold px-4 py-2 rounded-full">
              📅 Pre-Book Now
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[11px] text-midgray mb-0.5">{product.hindi}</p>
        <h3 className="font-semibold text-sm text-darkgray mb-2 leading-snug">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="stars flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-lightgray"}
              />
            ))}
          </div>
          <span className="text-[11px] text-midgray">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-heading font-bold text-lg text-darkgray">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-midgray line-through">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
        </div>
        <p className="text-[11px] text-midgray mb-4">Min: {product.minQty}</p>

        {/* CTA */}
        <button
          onClick={handleAdd}
          className={cn(
            "mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
            product.available
              ? added
                ? "bg-farm text-white"
                : "bg-darkgray text-white hover:bg-farm active:scale-95"
              : "bg-rose-light text-rose hover:bg-rose hover:text-white"
          )}
        >
          <ShoppingCart size={14} />
          {product.available
            ? added ? "✓ Added to Cart" : "Add to Cart"
            : "Pre-Book Now"}
        </button>
      </div>
    </div>
  );
}
