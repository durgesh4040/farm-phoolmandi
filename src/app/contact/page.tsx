import ContactSection from "@/components/sections/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Chhajed Garden",
  description: "Get in touch with Chhajed Garden. We are happy to help you.",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full bg-primary/5 py-12 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Contact Us
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-[600px]">
              Have questions about our plants, pots, or your order? We're here to help.
            </p>
          </div>
        </div>
      </div>
      
      <ContactSection />
    </main>
  );
}
