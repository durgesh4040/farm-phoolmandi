"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const FLOWER_OPTIONS = [
  "🌹 Roses (Gulab)   — ₹8–15/stem",
  "💐 Marigold (Genda) — ₹40–80/kg",
  "🌺 Tuberose (Rajnigandha) — ₹5–10/stem",
  "🌸 Lily — Pre-Book",
  "🌼 Gerbera — ₹6–12/stem",
  "🌻 Sunflower — Pre-Book",
  "💐 Mixed Flowers",
];

const CUSTOMER_TYPES = ["💍 Wedding", "🏪 Retail Shop", "🎪 Event/Decorator", "🕌 Temple", "🏢 Corporate"];

export default function BookingSection() {
  const [form, setForm] = useState({
    name: "", phone: "", whatsapp: "", customerType: "",
    flower: "", qty: "", date: "", city: "", note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.flower || !form.city) {
      alert("Please fill all required fields.");
      return;
    }
    setSubmitted(true);
  };

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-bordergray bg-warmwhite text-sm text-darkgray " +
    "placeholder-midgray outline-none focus:border-rose focus:bg-white transition-all";
  return (
    <section id="booking" className="py-20 bg-cream">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Booking System</span>
            <h2 className="font-heading font-bold mb-4" style={{ fontSize: "clamp(2rem,4vw,42px)" }}>
              Future Booking &{" "}
              <span className="text-rose italic">Enquiry</span>
            </h2>
            <p className="text-midgray leading-relaxed mb-10 max-w-sm">
              Book your flowers in advance — especially for wedding season. We confirm via
              WhatsApp within 24 hours.
            </p>
            <div className="space-y-5">
              {[
                { n: "1", t: "Choose Flower & Quantity",  d: "Tell us what you need and how much." },
                { n: "2", t: "Fill the Form",             d: "Name, number, date and delivery location." },
                { n: "3", t: "WhatsApp Confirmation",     d: "We confirm within 24 hours on WhatsApp." },
                { n: "4", t: "Receive Farm-Fresh Flowers", d: "Delivered right after harvest." },
              ].map((s) => (
                <div key={s.n} className="flex gap-4 items-start">
                  <span className="w-9 h-9 rounded-full bg-rose text-white flex items-center
                                   justify-center font-bold text-sm flex-shrink-0">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-darkgray">{s.t}</p>
                    <p className="text-xs text-midgray mt-0.5">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da04e]
                         text-white px-6 py-3.5 rounded-full font-semibold text-sm transition-all
                         hover:-translate-y-0.5 hover:shadow-lg"
            >
              💬 WhatsApp Us Directly
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-hero p-8 border border-bordergray shadow-hover"
          >
            {submitted ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">🌸</div>
                <h3 className="font-heading font-bold text-2xl text-farm mb-2">Booking Received!</h3>
                <p className="text-midgray text-sm leading-relaxed mb-6">
                  Our team will contact you on WhatsApp within 24 hours to confirm your order.
                </p>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-rose"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            ) : (
              <>
                <h3 className="font-heading font-bold text-h5 mb-1">📋 Book / Enquiry Form</h3>
                <p className="text-midgray text-xs mb-6">Fields marked * are required</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-midgray uppercase tracking-wide mb-1.5">
                      Full Name *
                    </label>
                    <input className={inputCls} placeholder="e.g. Sanjay Gupta"
                           value={form.name} onChange={set("name")} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-midgray uppercase tracking-wide mb-1.5">
                        Mobile *
                      </label>
                      <input type="tel" className={inputCls} placeholder="10 digits"
                             value={form.phone} onChange={set("phone")} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-midgray uppercase tracking-wide mb-1.5">
                        WhatsApp
                      </label>
                      <input type="tel" className={inputCls} placeholder="If different"
                             value={form.whatsapp} onChange={set("whatsapp")} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-midgray uppercase tracking-wide mb-1.5">
                      I am a...
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CUSTOMER_TYPES.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setForm((f) => ({ ...f, customerType: t }))}
                          className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                            form.customerType === t
                              ? "bg-rose border-rose text-white"
                              : "border-bordergray text-midgray hover:border-rose hover:text-rose"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-midgray uppercase tracking-wide mb-1.5">
                      Flower *
                    </label>
                    <select className={inputCls} value={form.flower} onChange={set("flower")}>
                      <option value="">— Select a flower —</option>
                      {FLOWER_OPTIONS.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-midgray uppercase tracking-wide mb-1.5">
                        Quantity *
                      </label>
                      <input className={inputCls} placeholder="e.g. 500 stems"
                             value={form.qty} onChange={set("qty")} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-midgray uppercase tracking-wide mb-1.5">
                        Delivery Date
                      </label>
                      <input type="date" className={inputCls}
                             value={form.date} onChange={set("date")} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-midgray uppercase tracking-wide mb-1.5">
                      City / Location *
                    </label>
                    <input className={inputCls} placeholder="e.g. Delhi, Jaipur, Agra"
                           value={form.city} onChange={set("city")} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-midgray uppercase tracking-wide mb-1.5">
                      Special Requirements
                    </label>
                    <textarea
                      rows={3}
                      className={inputCls + " resize-none"}
                      placeholder="Color preference, packaging, budget..."
                      value={form.note}
                      onChange={set("note")}
                    />
                  </div>
                  <button type="submit" className="btn-rose w-full justify-center py-4 text-base">
                    🌸 Submit Enquiry
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
