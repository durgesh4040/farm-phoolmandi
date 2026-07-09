"use client";
import { useState, useCallback } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  stockQuantity: number;
  category?: { name: string };
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isAvailable = product.stockQuantity > 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity < 10;
  const priceNum = parseFloat(product.price);
  const displayPrice = isNaN(priceNum) ? product.price : priceNum.toLocaleString("en-IN");
  const handleAdd = useCallback(() => {
    if (!isAvailable) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }, [isAvailable]);

  const toggleWish = useCallback(() => setWished((prev) => !prev), []);

  return (
    <article className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
        <Image
          src={`http://localhost:4200/${product.imageUrl}`}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover"
          onError={() => setImgError(true)}
          unoptimized
        />
        <button
          onClick={toggleWish}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={15}
            className={cn(
              "transition-colors",
              wished ? "fill-rose-500 text-rose-500" : "text-gray-500"
            )}
          />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm text-gray-900 mb-1 leading-snug line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-bold text-lg text-gray-900">₹{displayPrice}</span>
          {isLowStock && (
            <span className="text-xs text-amber-600 font-medium">
              Only {product.stockQuantity} left
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          disabled={!isAvailable}
          className={cn(
            "mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
            !isAvailable
              ? "bg-rose-50 text-rose-600 cursor-not-allowed"
              : added
                ? "bg-green-600 text-white"
                : "bg-gray-900 text-white hover:bg-green-600 active:scale-95"
          )}
        >
          <ShoppingCart size={14} />
          {isAvailable ? (added ? "Added to Cart" : "Add to Cart") : "Out of Stock"}
        </button>
      </div>
    </article>
  );
}