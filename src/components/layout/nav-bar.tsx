"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Search,
    User,
    ShoppingCart,
    Menu,
    X,
} from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartCount] = useState(2);
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);
    return (
        <header
            className={cn(
                "sticky top-0 z-50 h-[88px] border-b border-border bg-farm  transition-all duration-300 text-foreground",
                scrolled && "shadow-sm"
            )}
        >
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 md:px-6 lg:px-8">
                <Link
                    href="/"
                    className="flex flex-shrink-2 items-center gap-3"
                >
                    <span className="text-3xl">
                        🌸
                    </span>
                    <div>
                        <span className="font-heading text-2xl font-bold leading-none text-[#305D3D]">
                            PhoolMandi
                        </span>
                        <span className="mt-1 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                            Flower Farm
                        </span>
                    </div>
                </Link>
                <nav className="hidden items-center gap-1 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="rounded-full px-4 py-2 text-sm font-medium  transition-all duration-200 hover:bg-[#E96D8E]/10  hover:text-[#E96D8E]"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    <button
                        className="rounded-full p-2.5 text-foreground transition-colors hover:bg-muted"
                        aria-label="Search"
                    >
                        <Search size={19} />
                    </button>
                    <button
                        className="rounded-full p-2.5 text-foreground transition-colors hover:bg-muted"
                        aria-label="Account"
                    >
                        <User size={19} />
                    </button>
                    <button
                        className="relative rounded-full p-2.5 text-foreground transition-colors hover:bg-muted"
                        aria-label="Cart"
                    >
                        <ShoppingCart size={19} />
                        {cartCount > 0 && (
                            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#E96D8E] text-[10px] font-bold ">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <Link
                        href="#booking"
                        className="ml-2 hidden rounded-full bg-[#305D3D] px-6 py-3 text-sm font-medium  transition-all duration-300 hover:scale-105 hover:bg-[#264B31] sm:inline-flex"
                    >
                        Shop Now
                    </Link>
                    <button
                        className="ml-1 rounded-full p-2.5 transition-colors hover:bg-muted lg:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {menuOpen ? (
                            <X size={22} />
                        ) : (
                            <Menu size={22} />
                        )}
                    </button>

                </div>
            </div>
            {menuOpen && (
                <div className="border-t border-border bg-[#FFFCF8] px-5 py-5 shadow-lg lg:hidden">
                    <nav className="flex flex-col gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-[#E96D8E]/10 hover:text-[#E96D8E]"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="#booking"
                            className="mt-3 flex justify-center  text-muted-foreground rounded-full bg-[#375840] px-6 py-3 text-sm font-medium transition-all duration-300 hover:bg-[#264B31]"
                        >
                            Shop Now
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}