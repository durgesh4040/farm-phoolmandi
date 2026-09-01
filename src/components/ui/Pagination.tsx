"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  limit?: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  className?: string;
}

function getVisiblePages(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);

  const go = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-center gap-1.5 mt-10 select-none ${className}`}
    >
      <button
        onClick={() => go(currentPage - 1)}
        disabled={isFirst}
        aria-label="Previous page"
        className={`
          group flex items-center gap-1.5 px-3 h-9 rounded-full text-sm font-medium
          border transition-all duration-200
          ${isFirst
            ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
            : "border-gray-200 bg-white text-gray-500 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 hover:shadow-sm active:scale-95"
          }
        `}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Prev</span>
      </button>
      {pages.map((item, idx) =>
        item === "..." ? (
          <span
            key={`dots-${idx}`}
            className="w-9 h-9 flex items-center justify-center text-sm text-gray-300 font-medium select-none"
          >
            ···
          </span>
        ) : (
          <button
            key={item}
            onClick={() => go(item as number)}
            aria-label={`Page ${item}`}
            aria-current={currentPage === item ? "page" : undefined}
            className={`
              w-9 h-9 rounded-full text-sm font-semibold
              transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-1
              ${currentPage === item
                ? "bg-rose-600 text-white shadow-md shadow-rose-500/25 scale-105 cursor-default"
                : "bg-white text-gray-500 border border-gray-200 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 hover:scale-105 active:scale-95"
              }
            `}
          >
            {item}
          </button>
        )
      )}
      <button
        onClick={() => go(currentPage + 1)}
        disabled={isLast}
        aria-label="Next page"
        className={`
          group flex items-center gap-1.5 px-3 h-9 rounded-full text-sm font-medium
          border transition-all duration-200
          ${isLast
            ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
            : "border-gray-200 bg-white text-gray-500 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 hover:shadow-sm active:scale-95"
          }
        `}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}