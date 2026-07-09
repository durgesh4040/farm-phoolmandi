
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
    "Home",
    "About Us",
    "Flowers",
    "Shop",
    "Bulk Orders",
    "Contact",
  ],
  Information: [
    "Blog",
    "Flower Care Tips",
    "Terms & Conditions",
    "Privacy Policy",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#305D3D] text-white">
      {/* Decorative Top Border */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#E96D8E]/60 to-transparent" />

      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-14">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div>
              <span className="mb-3 inline-block rounded-full bg-[#E96D8E]/15 px-4 py-1 text-xs font-medium text-[#E96D8E]">
                Newsletter
              </span>

              <h3 className="text-3xl font-bold">
                🌸 Stay Fresh with PhoolMandi
              </h3>

              <p className="mt-2 max-w-lg text-white/70">
                Get seasonal flower updates, farming insights,
                exclusive discounts and special offers directly
                from our farm.
              </p>
            </div>

            <form className="flex w-full max-w-xl gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder:text-white/40 outline-none transition-all focus:border-[#E96D8E]"
              />

              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-[#E96D8E] px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#d95a7d]"
              >
                Subscribe
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

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

            {/* Social Icons */}
            {/* <div className="mt-8 flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#E96D8E]"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div> */}
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-5 text-lg font-semibold">{title}</h4>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-white/65 transition-all duration-300 hover:translate-x-1 hover:text-[#E96D8E]"
                    >
                      {link}
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
                <span>+91 98765 43210</span>
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