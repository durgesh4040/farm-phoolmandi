import Link from "next/link";
const footerLinks = {
  "Quick Links": ["Home", "About Us", "Flowers", "Shop", "Bulk Orders", "Contact"],
  "Customer Care": ["My Account", "Track Order", "Shipping Policy", "Return Policy", "FAQs"],
  "Information": ["Blog", "Care Tips", "Terms & Conditions", "Privacy Policy"],
};
export default function Footer() {
  return (
    <footer className="bg-farm text-white">
      <div className="border-b border-white/10">
        <div className="container py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-h5 font-heading mb-1">🌸 Stay Fresh with PhoolMandi</h3>
            <p className="text-white/60 text-sm">Get seasonal offers, farm updates & more.</p>
          </div>
          <form className="flex gap-2 w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20
                         text-white placeholder-white/40 text-sm outline-none
                         focus:border-white/50 transition-colors"
            />
            <button type="submit" className="bg-rose hover:bg-rose-dark px-6 py-3 rounded-full
                                            text-sm font-semibold transition-colors whitespace-nowrap">
              Subscribe →
            </button>
          </form>
        </div>
      </div>
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌸</span>
              <div>
                <span className="font-heading font-bold text-xl leading-none">PhoolMandi</span>
                <span className="block text-[10px] text-white/50 tracking-widest uppercase mt-0.5">
                  Flower Farm
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              Bringing nature&apos;s beauty to your life. Fresh, natural and handpicked flowers
              from our farm to your home.
            </p>
            <div className="flex gap-3">
              {["FB", "IG", "WA", "YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center
                             justify-center text-xs font-semibold hover:bg-white/10
                             hover:border-white/40 transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm tracking-wide mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-white/55 text-sm hover:text-white transition-colors"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-semibold text-sm tracking-wide mb-5">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex gap-2"><span>📞</span> +91 98765 43210</li>
              <li className="flex gap-2"><span>✉️</span> info@phoolmandi.com</li>
              <li className="flex gap-2 leading-relaxed">
                <span>📍</span>
                <span>Village – Phoolpur, District - Nashik, Maharashtra - 422101</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between
                        gap-3 text-xs text-white/40">
          <span>© 2024 PhoolMandi Flower Farm. All Rights Reserved.</span>
          <span>Designed with 🌸 for nature and you</span>
        </div>
      </div>
    </footer>
  );
}
