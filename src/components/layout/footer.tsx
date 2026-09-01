
"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "/" },
    { label: "Product", href: "/flower" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Information: [
    { label: "Blog", href: "/blog" },
    { label: "Flower Care Tips", href: "/blog" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#305D3D] text-white">

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-4xl">🌸</span>

              <div>
                <h2 className="text-3xl font-bold">
                  Phool<span className="text-[#E96D8E]">Mandi</span>
                </h2>

                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Premium Flower Farm
                </p>
              </div>
            </div>

            <p className="max-w-md leading-relaxed text-white/65">
              Premium quality Gypsophila, Carnation, Chrysanthemum
              and seasonal flowers grown with care and delivered
              fresh from our farm directly to your doorstep.
            </p>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                🌱 Farm Fresh
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                🚚 Fast Delivery
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                💯 Quality Assured
              </span>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-5 text-lg font-semibold">{title}</h4>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/65 transition-all duration-300 hover:translate-x-1 hover:text-[#E96D8E]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-lg font-semibold">
              Contact Us
            </h4>

            <div className="space-y-4 text-white/65">
              <div className="flex gap-3">
                <Phone size={18} className="text-[#E96D8E]" />
                <span>+91 73032 31231</span>
              </div>

              <div className="flex gap-3">
                <Mail size={18} className="text-[#E96D8E]" />
                <span>info@phoolmandi.com</span>
              </div>

              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-1 flex-shrink-0 text-[#E96D8E]"
                />
                <span>
                  Village Phoolpur,
                  <br />
                  Nashik, Maharashtra 422101
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-2xl font-bold text-[#E96D8E]">
                  500+
                </h5>
                <p className="text-xs text-white/50">
                  Happy Customers
                </p>
              </div>

              <div>
                <h5 className="text-2xl font-bold text-[#E96D8E]">
                  100%
                </h5>
                <p className="text-xs text-white/50">
                  Farm Fresh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-white/45 md:flex-row">
          <p>
            © {new Date().getFullYear()} PhoolMandi Flower Farm.
            All Rights Reserved.
          </p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#E96D8E]">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-[#E96D8E]">
              Terms
            </Link>
          </div>

          <p>
            Made with 🌸 for flower lovers across India
          </p>
        </div>
      </div>
    </footer>
  );
}