"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="bg-white border-b border-slate-100 h-22 sticky top-0 z-50 shadow-sm">
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
                            Phool<span className="text-[#E96D8E]">Mandi</span>
                        </span>
                        <span className="mt-1 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                            Premium Flower Farm
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
                    </nav>
                </div>
            )}
        </header>
    );
}