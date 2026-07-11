"use client";
import { useState, useCallback } from "react";
import { ShoppingCart, Heart, Star, Eye, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
interface Product {
  id: number;
  name: string;
  description: string;
  price: string | number;
  originalPrice?: string | number;
  imageUrl: string | null;
  stockQuantity: number;
  category?: { name: string };
  rating?: number;
  reviewCount?: number;
  badge?: "new" | "bestseller" | "sale" | "limited";
}
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => Promise<void> | void;
  onToggleWishlist?: (product: Product) => Promise<void> | void;
  isWishlisted?: boolean;
  priority?: boolean;
}
function formatPrice(value: string | number | undefined): string {
  if (value === undefined) return "";
  const num = typeof value === "string" ? parseFloat(value.replace(/[^\d.]/g, "")) : value;
  if (isNaN(num)) return String(value);
  return `₹${num.toLocaleString("en-IN")}`;
}
function resolveImageUrl(imageUrl: string | null): string {
  if (!imageUrl) return "/images/placeholder-product.jpg";
  if (imageUrl.startsWith("http")) return imageUrl;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  return `${baseUrl}/${imageUrl}`;
}

function calculateDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}

function ProductBadge({ badge }: { badge: Product["badge"] }) {
  if (!badge) return null;
  const styles = {
    new: "bg-emerald-500",
    bestseller: "bg-amber-500",
    sale: "bg-rose-500",
    limited: "bg-violet-500",
  };
  const labels = { new: "New", bestseller: "Best Seller", sale: "Sale", limited: "Limited" };
  return (
    <span className={cn("absolute top-3 left-3 px-2.5 py-1 text-white text-[10px] font-bold uppercase tracking-wider rounded-full z-10", styles[badge])}>
      {labels[badge]}
    </span>
  );
}

function StockBadge({ quantity }: { quantity: number }) {
  if (quantity === 0 || quantity >= 10) return null;
  return (
    <span className="absolute bottom-3 left-3 px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-semibold rounded-md border border-amber-200 z-10">
      Only {quantity} left
    </span>
  );
}

function RatingStars({ rating, reviewCount }: { rating?: number; reviewCount?: number }) {
  if (rating === undefined || rating <= 0) return null;
  return (
    <div className="flex items-center gap-1.5 mb-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className={cn(
              "transition-colors",
              i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
            )}
          />
        ))}
      </div>
      <span className="text-[11px] text-gray-500 font-medium">
        {rating.toFixed(1)} {reviewCount ? `(${reviewCount.toLocaleString("en-IN")})` : ""}
      </span>
    </div>
  );
}

function PriceDisplay({ price, originalPrice }: { price: string | number; originalPrice?: string | number }) {
  const current = typeof price === "string" ? parseFloat(price) : price;
  const original = originalPrice ? (typeof originalPrice === "string" ? parseFloat(originalPrice) : originalPrice) : null;
  const hasDiscount = original !== null && original > current;
  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className="font-bold text-lg text-gray-900">{formatPrice(price)}</span>
      {hasDiscount && (
        <>
          <span className="text-sm text-gray-400 line-through">{formatPrice(originalPrice)}</span>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
            {calculateDiscount(original!, current)}% off
          </span>
        </>
      )}
    </div>
  );
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  priority = false,
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isAvailable = product.stockQuantity > 0;
  const imageSrc = imgError ? "/images/placeholder-product.jpg" : resolveImageUrl(product.imageUrl);
  console.log("imageSrc",imageSrc)

  const handleAdd = useCallback(async () => {
    if (!isAvailable || !onAddToCart || isAdding) return;
    setIsAdding(true);
    try {
      await onAddToCart(product);
    } catch (err) {
      console.error("[ProductCard] Add to cart failed:", err);
    } finally {
      setTimeout(() => setIsAdding(false), 1500);
    }
  }, [isAvailable, onAddToCart, isAdding, product]);

  const handleWishlist = useCallback(async () => {
    if (!onToggleWishlist) return;
    try {
      await onToggleWishlist(product);
    } catch (err) {
      console.error("[ProductCard] Wishlist toggle failed:", err);
    }
  }, [onToggleWishlist, product]);

  return (
    <article
      className={cn(
        "group relative bg-white rounded-2xl border border-gray-100 overflow-hidden",
        "hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-200",
        "transition-all duration-300 flex flex-col"
      )}
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <Image
          src={imageSrc}
          alt={`${product.name}${product.category?.name ? ` — ${product.category.name}` : ""}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={cn(
            "object-cover transition-all duration-500",
            imageLoaded ? "opacity-100 group-hover:scale-105" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImgError(true);
            setImageLoaded(true);
          }}
        />
        <ProductBadge badge={product.badge} />
        <StockBadge quantity={product.stockQuantity} />
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={handleWishlist}
            disabled={!onToggleWishlist}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center shadow-sm",
              "bg-white/90 backdrop-blur-sm transition-all duration-200",
              "hover:bg-white hover:scale-110 active:scale-95",
              "focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-1",
              isWishlisted ? "text-rose-500" : "text-gray-500 hover:text-rose-500"
            )}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isWishlisted}
          >
            <Heart size={16} className={cn("transition-all", isWishlisted && "fill-current")} />
          </button>
          <Link
            href={`/product/${product.id}`}
            className={cn(
              "w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm",
              "text-gray-500 hover:text-gray-900 hover:bg-white hover:scale-110 active:scale-95",
              "transition-all duration-200 opacity-0 group-hover:opacity-100",
              "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            )}
            aria-label={`View details for ${product.name}`}
          >
            <Eye size={16} />
          </Link>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">

        {product.category?.name && (
          <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-widest mb-1.5">
            {product.category.name}
          </span>
        )}
        <h3 className="font-semibold text-sm text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-emerald-700 transition-colors duration-200">
          <Link href={`/product/${product.id}`} className="focus:outline-none focus:underline focus:underline-offset-2">
            {product.name}
          </Link>
        </h3>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>
        <div className="mb-3">
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} />
        </div>
        <button
          onClick={handleAdd}
          disabled={!isAvailable || !onAddToCart}
          className={cn(
            "mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold",
            "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1",
            !isAvailable
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : isAdding
                ? "bg-emerald-600 text-white cursor-default"
                : "bg-gray-900 text-white hover:bg-emerald-600 active:scale-[0.98] focus:ring-emerald-400"
          )}
          aria-label={isAdding ? "Added to cart" : `Add ${product.name} to cart`}
        >
          {isAdding ? (
            <>
              <Check size={16} className="animate-bounce" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart size={15} />
              {isAvailable ? "Add to Cart" : "Out of Stock"}
            </>
          )}
        </button>
      </div>
    </article>
  );
}