"use client";

import { Leaf, Sprout, Truck, Phone, Mail } from "lucide-react";

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const announcements = [
  { icon: Sprout, text: "Farm Fresh Flowers" },
  { icon: Leaf, text: "Sustainable & Natural" },
  { icon: Truck, text: "Delivered with Care" },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-primary/90 via-primary to-emerald-600 text-white text-xs font-medium py-2.5 px-4 overflow-hidden">
      {/* Decorative background shine */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />

      <div className="container relative z-10 flex items-center justify-center md:justify-between mx-auto">
        {/* Mobile: Carousel, Desktop: List */}
        <div className="md:hidden flex items-center justify-center h-5 overflow-hidden relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center gap-2 absolute"
            >
              {(() => {
                const Icon = announcements[currentIndex].icon;
                return (
                  <>
                    <Icon className="w-3.5 h-3.5 text-white/90" />
                    <span className="tracking-wide text-white/95">{announcements[currentIndex].text}</span>
                  </>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {announcements.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                key={a.text} 
                className="flex items-center gap-2 group cursor-default"
              >
                <div className="bg-white/10 p-1 rounded-full group-hover:bg-white/20 transition-colors">
                  <Icon className="w-3.5 h-3.5 text-white/90" />
                </div>
                <span className="tracking-wide text-white/95">{a.text}</span>
              </motion.span>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-6 text-white/90">
          <motion.a 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            href="tel:+919876543210" 
            className="flex items-center gap-1.5 hover:text-white transition-colors group"
          >
            <Phone className="w-3.5 h-3.5 group-hover:-rotate-12 transition-transform" /> 
            <span className="tracking-wide">+91 98765 43210</span>
          </motion.a>
          <motion.a 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            href="mailto:info@phoolmandi.com" 
            className="flex items-center gap-1.5 hover:text-white transition-colors group"
          >
            <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" /> 
            <span className="tracking-wide">info@phoolmandi.com</span>
          </motion.a>
          
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 ml-2 pl-6 border-l border-white/20"
          >
            <a href="#" className="bg-white/10 p-1 rounded-full hover:bg-white hover:text-primary transition-all">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="bg-white/10 p-1 rounded-full hover:bg-white hover:text-primary transition-all">
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
