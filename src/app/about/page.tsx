"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Flower2,
  Tractor,
  Truck,
  Users,
  Star,
  Sprout,
  Leaf,
  Heart,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Quote,
} from "lucide-react";
const FEATURES = [
  "100% Chemical-Free & Organic Farming",
  "Fresh Handpicked Flowers Every Morning",
  "Eco-Friendly & Sustainable Practices",
  "Supporting 50+ Local Farmers & Families",
  "Same-Day Delivery Across the City",
  "Bulk Orders for Events & Occasions",
];

const SERVICES = [
  {
    icon: Flower2,
    color: "bg-rose-100 text-rose-600",
    title: "Premium Fresh Flowers",
    desc: "Roses, marigolds, lotuses, jasmine, tuberose and dozens of seasonal varieties — sourced fresh every dawn directly from our farm beds.",
  },
  {
    icon: Tractor,
    color: "bg-green-100 text-green-600",
    title: "Organic Farm-to-Table",
    desc: "Zero harmful pesticides or chemicals. We use natural compost, drip irrigation and traditional farming wisdom passed down over three generations.",
  },
  {
    icon: Truck,
    color: "bg-amber-100 text-amber-600",
    title: "Fast & Safe Delivery",
    desc: "Temperature-controlled packaging and a dedicated fleet ensure your flowers arrive fresh, vibrant and on time — every single order.",
  },
  {
    icon: Users,
    color: "bg-violet-100 text-violet-600",
    title: "Bulk & Event Orders",
    desc: "Special pricing, custom arrangements and priority fulfilment for weddings, corporate events, temples, shops and festival decorations.",
  },
];

const STATS = [
  { number: "10K+", label: "Happy Customers", icon: Heart },
  { number: "50+", label: "Partner Farmers", icon: Tractor },
  { number: "100%", label: "Natural Flowers", icon: Leaf },
  { number: "500+", label: "Events Served", icon: Star },
];

const TIMELINE = [
  {
    year: "2015",
    title: "Seeds of an Idea",
    desc: "PhoolMandi was born in a small village farm near Pune when founder Rajesh Patil decided to cut out the middlemen and sell directly to flower lovers across the city.",
  },
  {
    year: "2017",
    title: "First 100 Customers",
    desc: "Word spread quickly — our marigolds were fresher, our roses more vibrant. We onboarded 10 neighbouring farmers and expanded our daily harvest.",
  },
  {
    year: "2020",
    title: "Going Digital",
    desc: "We launched our online platform so customers from across Maharashtra could order farm-fresh flowers from the comfort of their homes.",
  },
  {
    year: "2023",
    title: "Growing Together",
    desc: "Today we partner with 50+ local farming families, serve 10,000+ customers and deliver thousands of bouquets weekly — still with the same love we started with.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Wedding Planner, Pune",
    text: "PhoolMandi has been my go-to for every event. The flowers are always incredibly fresh and the team handles bulk orders like pros. Never disappointed!",
    stars: 5,
  },
  {
    name: "Amit Desai",
    role: "Florist, Mumbai",
    text: "I switched to PhoolMandi two years ago and my customers immediately noticed the difference in quality. The farm-fresh difference is real!",
    stars: 5,
  },
  {
    name: "Sunita Joshi",
    role: "Home Customer, Nashik",
    text: "Order roses every week for my puja. They arrive so fresh and fragrant — exactly like picking them from a garden yourself. Wonderful service.",
    stars: 5,
  },
];

const VALUES = [
  {
    icon: Sprout,
    color: "bg-green-100 text-green-700",
    title: "Sustainability",
    desc: "Every decision we make considers its impact on the land, the water and the next generation of farmers.",
  },
  {
    icon: Heart,
    color: "bg-rose-100 text-rose-600",
    title: "Community",
    desc: "We are not just a business — we are a community of farmers, vendors, customers and nature lovers united by a love for flowers.",
  },
  {
    icon: ShieldCheck,
    color: "bg-amber-100 text-amber-700",
    title: "Quality",
    desc: "From seed to doorstep, every flower is held to the highest standards. Freshness is non-negotiable at PhoolMandi.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});
export default function AboutPage() {
  return (
    <div className="bg-[#faf9f6] overflow-x-hidden">
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-[#FFF7F2] to-green-50 border-b border-rose-100">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-green-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28 text-center">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100 text-rose-600 rounded-full text-sm font-bold mb-6">
            <Flower2 className="h-4 w-4" /> About PhoolMandi
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-5 tracking-tight leading-tight">
            Growing Flowers With{" "}
            <span className="text-rose-600 italic">Love & Passion</span>
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            PhoolMandi connects flower lovers directly with local farming families — no middlemen, no compromises. Just the freshest blooms, harvested every morning and delivered to your door with care.
          </motion.p>
          <motion.div {...fadeUp(0.24)} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/flower" className="inline-flex items-center gap-2 px-7 py-3.5 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transition-all hover:scale-105 shadow-lg shadow-rose-200">
              Shop Flowers <ArrowRight size={17} />
            </Link>
            <Link href="#story" className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-200 bg-white text-gray-700 font-semibold rounded-full hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition-all">
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 -mt-8 relative z-10 mb-24">
          {STATS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                {...fadeUp(i * 0.08)}
                className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg shadow-gray-100 border border-gray-100"
              >
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="text-rose-500" size={22} />
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-1">{item.number}</h3>
                <p className="text-gray-500 text-sm font-medium">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
        <section id="story" className="grid lg:grid-cols-2 gap-16 items-center mb-28">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-6">
              <Leaf size={14} /> Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              From a Small Farm to{" "}
              <span className="text-rose-600 italic">Your Doorstep</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-5">
              PhoolMandi was founded in 2015 by <strong className="text-gray-800">Rajesh Patil</strong>, a third-generation farmer from the outskirts of Pune who watched his father sell beautiful roses at a fraction of their true worth to traders who marked them up tenfold.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              Rajesh had a simple vision: give farmers a fair price and give customers the freshest flowers possible by removing every unnecessary step in between. Today, PhoolMandi partners with over 50 local farming families and delivers thousands of bouquets weekly — each one handpicked that very morning.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle2 size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-4 rounded-[36px] bg-rose-200/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[36px] aspect-[4/5] shadow-2xl">
              <Image src="/flower.jpg" alt="PhoolMandi flower farm" fill className="object-cover hover:scale-105 transition duration-700" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white px-6 py-5 rounded-2xl shadow-2xl border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-13 h-13 rounded-xl bg-green-100 flex items-center justify-center p-3">
                  <Sprout className="text-green-700" size={26} />
                </div>
                <div>
                  <h4 className="font-extrabold text-3xl text-green-800 leading-none">100%</h4>
                  <p className="font-semibold text-gray-700 text-sm">Organic Flowers</p>
                  <p className="text-xs text-gray-500">Fresh From Our Farms</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>
        <section className="mb-28">
          <div className="text-center mb-14">
            <motion.span {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100 text-rose-600 rounded-full text-sm font-bold mb-4">
              <Star size={14} /> Our Journey
            </motion.span>
            <motion.h2 {...fadeUp(0.08)} className="text-3xl md:text-4xl font-extrabold text-gray-900">
              A Decade of Blooming Together
            </motion.h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-rose-100 -translate-x-1/2" />
            <div className="space-y-10 md:space-y-0">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  {...fadeUp(i * 0.1)}
                  className={`relative md:grid md:grid-cols-2 md:gap-12 md:items-center md:mb-14 ${i % 2 === 0 ? "" : "md:direction-rtl"}`}
                > 
                    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-7 hover:shadow-lg transition-shadow ${i % 2 !== 0 ? "md:col-start-2" : ""}`}>
                    <span className="inline-block px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-bold mb-3">{item.year}</span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-rose-600 text-white text-sm font-extrabold items-center justify-center shadow-lg shadow-rose-200 z-10`}>
                    {item.year.slice(2)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="mb-28">
          <div className="text-center mb-14">
            <motion.span {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4">
              <Flower2 size={14} /> What We Offer
            </motion.span>
            <motion.h2 {...fadeUp(0.08)} className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Our Services
            </motion.h2>
            <motion.p {...fadeUp(0.14)} className="text-gray-500 max-w-xl mx-auto text-lg">
              From individual bouquets to large-scale event arrangements, we have a service tailored for every need.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  {...fadeUp(i * 0.1)}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${service.color}`}>
                    <Icon size={26} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-rose-700 transition-colors">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
        <section className="mb-28">
          <div className="text-center mb-14">
            <motion.span {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-bold mb-4">
              <Heart size={14} /> Our Values
            </motion.span>
            <motion.h2 {...fadeUp(0.08)} className="text-3xl md:text-4xl font-extrabold text-gray-900">
              What We Stand For
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  {...fadeUp(i * 0.1)}
                  className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow text-center"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${v.color}`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
        <section className="mb-28">
          <div className="text-center mb-14">
            <motion.span {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-bold mb-4">
              <Star size={14} /> Testimonials
            </motion.span>
            <motion.h2 {...fadeUp(0.08)} className="text-3xl md:text-4xl font-extrabold text-gray-900">
              What Our Customers Say
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp(i * 0.1)}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
              >
                <Quote size={28} className="text-rose-200 mb-4 flex-shrink-0" />
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-green-800 to-green-900 rounded-[36px] p-10 lg:p-16 text-white relative overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 text-white rounded-full text-sm font-bold mb-6">
                  <ShieldCheck size={14} /> Why Choose PhoolMandi
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight">
                  Trusted by Thousands of Flower Lovers Across Maharashtra
                </h2>
                <p className="text-white/75 leading-relaxed mb-8 text-lg">
                  We focus on quality, freshness and customer satisfaction. Every flower is carefully selected and delivered with love to make your moments — big or small — truly special.
                </p>
                <div className="flex flex-wrap gap-5 mb-10">
                  {[
                    { icon: Users, label: "50+ Trusted Farmer Partners" },
                    { icon: Truck, label: "Same-Day Fast Delivery" },
                    { icon: Flower2, label: "100% Premium Blooms" },
                    { icon: Leaf, label: "Chemical-Free Guarantee" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-2.5 bg-white/10 rounded-full px-4 py-2">
                        <Icon size={16} className="text-rose-300 flex-shrink-0" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href="/flower"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg"
                >
                  Shop Now <ArrowRight size={17} />
                </Link>
              </div>

              <div className="relative h-[360px] rounded-[28px] overflow-hidden shadow-2xl">
                <Image src="/flowers.jpg" alt="Fresh flowers from PhoolMandi" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
              </div>
            </div>
          </motion.div>
        </section>
        <section className="mb-24">
          <motion.div
            {...fadeUp(0)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100 text-rose-600 rounded-full text-sm font-bold mb-5">
                  <MapPin size={14} /> Get In Touch
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                  Ready to Order Fresh Flowers?
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Whether you want a single bouquet or a truckload for your event, our team is here to help. Reach out and we will get back to you within the hour.
                </p>
                <div className="space-y-4">
                  <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-700 hover:text-rose-600 transition-colors group">
                    <div className="w-10 h-10 bg-rose-50 group-hover:bg-rose-100 rounded-xl flex items-center justify-center transition-colors">
                      <Phone size={18} className="text-rose-500" />
                    </div>
                    <span className="font-semibold">+91 98765 43210</span>
                  </a>
                  <a href="mailto:hello@phoolmandi.in" className="flex items-center gap-3 text-gray-700 hover:text-rose-600 transition-colors group">
                    <div className="w-10 h-10 bg-rose-50 group-hover:bg-rose-100 rounded-xl flex items-center justify-center transition-colors">
                      <Mail size={18} className="text-rose-500" />
                    </div>
                    <span className="font-semibold">hello@phoolmandi.in</span>
                  </a>
                  <div className="flex items-start gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-rose-500" />
                    </div>
                    <span className="font-semibold">Survey No. 42, Phool Nagar, Pune – 412308, Maharashtra</span>
                  </div>
                </div>
              </div>
              <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden">
                <Image src="/flower.jpg" alt="PhoolMandi farm" fill className="object-cover" />
                <div className="absolute inset-0 bg-rose-900/10" />
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
