"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Flower2,
  Tractor,
  Truck,
  Users,
  Star,
  ShoppingBag,
  Sprout,
} from "lucide-react";

const features = [
  "100% Chemical Free Farming",
  "Fresh Handpicked Flowers Daily",
  "Eco Friendly & Sustainable Farming",
  "Supporting Local Farmers & Vendors",
];

const services = [
  {
    icon: Flower2,
    title: "Fresh Flowers",
    desc: "Premium quality roses, marigold, lotus, jasmine and seasonal flowers.",
  },
  {
    icon: ShoppingBag,
    title: "Bulk Orders",
    desc: "Special pricing and fast delivery for weddings, events and shops.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Fresh flowers delivered safely with proper packaging and care.",
  },
  {
    icon: Tractor,
    title: "Organic Farming",
    desc: "Natural farming methods with zero harmful chemicals used.",
  },
];

const bestSellers = [
  {
    name: "Red Roses",
    image: "/rose.jpg",
    price: "₹299",
  },
  {
    name: "Marigold Flowers",
    image: "/marigold.jpg",
    price: "₹199",
  },
  {
    name: "Lotus Flowers",
    image: "/lotus.jpg",
    price: "₹399",
  },
];

const stats = [
  {
    number: "10K+",
    label: "Happy Customers",
  },
  {
    number: "50+",
    label: "Local Farmers",
  },
  {
    number: "100%",
    label: "Natural Flowers",
  },
  {
    number: "24/7",
    label: "Customer Support",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-[#fffdf8] to-[#f7f9f3]"
    >
      <div className="container mx-auto px-4">
        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-farm font-semibold text-sm mb-5">
              About Our Flower Farm
            </span>

            <h2
              className="font-heading font-bold leading-tight mb-6 text-darkgray"
              style={{ fontSize: "clamp(2.2rem,4vw,4rem)" }}
            >
              Growing Flowers With{" "}
              <span className="text-rose italic">Love & Passion</span>
            </h2>

            <p className="text-midgray leading-relaxed text-lg mb-8">
              We are dedicated to providing naturally grown fresh flowers
              directly from our farms to your home, shops and events. Our
              mission is to support local farmers while delivering premium
              quality flowers with freshness, beauty and care.
            </p>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 bg-white p-4 rounded-2xl shadow-sm border border-bordergray hover:shadow-lg transition"
                >
                  <CheckCircle2
                    size={20}
                    className="text-farm mt-1 flex-shrink-0"
                  />

                  <p className="text-darkgray font-medium text-sm">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4">
              <a href="#products" className="btn-primary">
                Explore Products
              </a>

              <a
                href="#contact"
                className="px-6 py-3 rounded-full border border-farm text-farm font-semibold hover:bg-farm hover:text-white transition"
              >
                Contact Us
              </a>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[32px] aspect-[4/5] shadow-2xl">
              <Image
                src="/flower.jpg"
                alt="Flower Farm"
                fill
                className="object-cover hover:scale-105 transition duration-700"
              />
            </div>

            {/* FLOATING CARD */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-bordergray"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                  <Sprout className="text-farm" size={28} />
                </div>

                <div>
                  <h4 className="font-bold text-3xl text-farm">100%</h4>
                  <p className="text-darkgray font-semibold">
                    Organic Flowers
                  </p>
                  <p className="text-sm text-midgray">
                    Fresh From Our Farms
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          {stats.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 text-center shadow-md border border-bordergray"
            >
              <h3 className="text-4xl font-bold text-farm mb-2">
                {item.number}
              </h3>
              <p className="text-midgray font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* SERVICES */}
        <div className="mt-28">
          <div className="text-center mb-14">
            <span className="section-label">Our Services</span>

            <h2 className="font-heading font-bold text-4xl mt-3 mb-4">
              What We Provide
            </h2>

            <p className="text-midgray max-w-2xl mx-auto">
              We provide fresh flowers, bulk event orders, organic farming and
              doorstep delivery services for customers and businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl p-8 border border-bordergray shadow-sm hover:shadow-2xl transition"
                >
                  <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
                    <Icon className="text-farm" size={32} />
                  </div>

                  <h3 className="font-bold text-xl mb-3 text-darkgray">
                    {service.title}
                  </h3>

                  <p className="text-midgray leading-relaxed text-sm">
                    {service.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* BEST SELLERS */}
        <div className="mt-28">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-14">
            <div>
              <span className="section-label">Best Sellers</span>

              <h2 className="font-heading font-bold text-4xl mt-3">
                Most Loved Flowers
              </h2>
            </div>

            <a href="#products" className="btn-primary">
              View All Products
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {bestSellers.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[28px] overflow-hidden shadow-md border border-bordergray"
              >
                <div className="relative h-[320px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover hover:scale-110 transition duration-700"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 text-yellow-500 mb-3">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>

                  <h3 className="font-bold text-2xl text-darkgray mb-2">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <p className="text-farm font-bold text-xl">
                      {item.price}
                    </p>

                    <button className="btn-primary">
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="mt-28 bg-farm rounded-[40px] p-10 lg:p-16 text-white relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-5">
                Why Choose Us
              </span>

              <h2 className="font-heading font-bold text-4xl mb-6">
                Trusted By Thousands Of Flower Lovers
              </h2>

              <p className="text-white/80 leading-relaxed mb-8">
                We focus on quality, freshness and customer satisfaction. Every
                flower is carefully selected and delivered with love to make
                your moments special.
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <Users size={22} />
                  <span>Trusted Farmers</span>
                </div>

                <div className="flex items-center gap-3">
                  <Truck size={22} />
                  <span>Fast Delivery</span>
                </div>

                <div className="flex items-center gap-3">
                  <Flower2 size={22} />
                  <span>Premium Flowers</span>
                </div>
              </div>
            </div>

            <div className="relative h-[350px] rounded-[32px] overflow-hidden">
              <Image
                src="/farmer.jpg"
                alt="Farmer"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}