"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react";
import { createInquiry } from "@/api/inquiry";
import { motion, Variants } from "framer-motion";
import { createContact } from "@/api/contact";

const formFields = [
  {
    id: "name",
    name: "name",
    type: "text",
    label: "Full Name",
    placeholder: "Rahul Kumar",
    required: true,
    component: "input",
    colSpan: "full",
  },
  {
    id: "email",
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "rahul@example.com",
    required: true,
    component: "input",
    colSpan: "half",
  },
  {
    id: "phone",
    name: "phone",
    type: "tel",
    label: "Phone Number",
    placeholder: "+916392226008",
    required: true,
    component: "input",
    colSpan: "half",
  },
  {
    id: "message",
    name: "message",
    type: "text",
    label: "Your Message",
    placeholder: "How can we help you today?",
    required: true,
    component: "textarea",
    rows: 5,
    colSpan: "full",
  },
];

import siteData from "@/data/siteData.json";

const contactDetails = {
  whatsapp: {
    display: siteData.contact.whatsapp,
    href: `https://wa.me/${siteData.contact.whatsapp.replace(/[^0-9]/g, "")}`,
  },
  phone: {
    display: siteData.contact.phone,
    href: `tel:${siteData.contact.phone.replace(/[^0-9+]/g, "")}`,
  },
  emails: siteData.contact.emails,
  address: siteData.contact.address,
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await createContact(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      console.error("Failed to submit contact:", error?.message || "Unknown error");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-teal-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-2">
            Get in Touch
          </div>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-slate-900 dark:text-slate-50">
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">Conversation</span>
          </h2>
          <p className="max-w-[700px] text-slate-600 md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed dark:text-slate-400">
            We'd love to hear from you. Please fill out this form or use our contact details below to reach our team.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto"
        >
          {/* Contact Details */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <div className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20 dark:border-slate-800 h-full transition-transform hover:-translate-y-1 duration-300">
              <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-50 flex items-center gap-3">
                Contact Information
              </h3>
              
              <div className="space-y-8">
                <div className="group flex items-start space-x-4">
                  <div className="bg-primary/10 p-3.5 rounded-2xl text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-50">WhatsApp (Preferred)</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-2">
                      Quickest way to reach us.
                    </p>
                    <a href={contactDetails.whatsapp.href} className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
                      {contactDetails.whatsapp.display}
                      <span className="ml-1 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">&rarr;</span>
                    </a>
                  </div>
                </div>

                <div className="group flex items-start space-x-4">
                  <div className="bg-primary/10 p-3.5 rounded-2xl text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Phone</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-2">
                      Give us a call anytime.
                    </p>
                    <a href={contactDetails.phone.href} className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
                      {contactDetails.phone.display}
                      <span className="ml-1 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">&rarr;</span>
                    </a>
                  </div>
                </div>

                <div className="group flex items-start space-x-4">
                  <div className="bg-primary/10 p-3.5 rounded-2xl text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Email</h4>
                    <div className="flex flex-col mt-2 gap-1">
                      {contactDetails.emails.map((email, idx) => (
                        <a key={idx} href={`mailto:${email}`} className="text-sm text-slate-600 hover:text-primary dark:text-slate-300 transition-colors">
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="group flex items-start space-x-4">
                  <div className="bg-primary/10 p-3.5 rounded-2xl text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Address</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {contactDetails.address.map((line, idx) => (
                        <React.Fragment key={idx}>
                          {line}
                          {idx < contactDetails.address.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-xl border border-white/40 dark:border-slate-800">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields.map((field) => (
                    <div
                      key={field.id}
                      className={`space-y-2 ${field.colSpan === "full" ? "md:col-span-2" : "md:col-span-1"}`}
                    >
                      <label htmlFor={field.id} className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {field.label}
                      </label>
                      {field.component === "textarea" ? (
                        <textarea
                          id={field.id}
                          name={field.name}
                          required={field.required}
                          rows={field.rows}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          className="flex min-h-[140px] w-full rounded-xl border border-slate-200/60 bg-slate-50/50 px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-50 resize-none transition-all"
                          placeholder={field.placeholder}
                        />
                      ) : (
                        <input
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          required={field.required}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          className="flex h-12 w-full rounded-xl border border-slate-200/60 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-50 transition-all"
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-primary/25 disabled:pointer-events-none disabled:opacity-70"
                >
                  <span className="relative z-10">{isSubmitting ? "Sending Message..." : "Send Message"}</span>
                  {!isSubmitting && <Send className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                </motion.button>

                {submitStatus === "success" && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-600 dark:text-green-400 mt-4 text-center font-medium bg-green-50 dark:bg-green-900/20 py-3 rounded-lg border border-green-200 dark:border-green-800/30"
                  >
                    Thank you! Your message has been sent successfully. We will get back to you soon.
                  </motion.p>
                )}
                {submitStatus === "error" && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 dark:text-red-400 mt-4 text-center font-medium bg-red-50 dark:bg-red-900/20 py-3 rounded-lg border border-red-200 dark:border-red-800/30"
                  >
                    Something went wrong. Please check your connection and try again later.
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
