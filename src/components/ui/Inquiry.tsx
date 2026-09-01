"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Phone,
  Loader2,
  CheckCircle,
  AlertCircle,
  Send,
  MapPin,
  Package,
  Hash,
  ShoppingBag,
} from "lucide-react";
import { createInquiry } from "@/api/inquiry";

interface Product {
  id: number;
  name: string;
  price: string | number;
  imageUrl: string | null;
  category?: { name: string };
}

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

type Step = "form" | "otp" | "success";

const INPUT_CLS =
  "w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400/20 focus:border-rose-400 transition-all placeholder:text-gray-400";

const LABEL_CLS = "block text-xs font-semibold text-gray-700 mb-1.5";

export default function InquiryModal({ isOpen, onClose, product }: InquiryModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
    message: "",
  });
  const [otp, setOtp] = useState("");
  const [inquiryId, setInquiryId] = useState<number | null>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  /* Reset on open */
  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setError(null);
      setOtp("");
      setLoading(false);
      setForm({ name: "", email: "", phone: "", address: "", quantity: 1, message: "" });
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  /* Escape + scroll lock */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && isOpen && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  /* Validation */
  const validate = useCallback(() => {
    if (!form.name.trim()) return "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Valid email is required";
    if (!/^\+?[\d\s-]{10,}$/.test(form.phone.replace(/\s/g, "")))
      return "Valid phone number is required (min 10 digits)";
    if (!form.address.trim()) return "Delivery address is required";
    if (form.quantity < 1) return "Quantity must be at least 1";
    return null;
  }, [form]);

  /* Submit inquiry */
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const err = validate();
    if (err) return setError(err);

    setLoading(true);
    try {
      const payload = {
        productId: product.id,
        productName: product.name,
        name: form.name,
        email: form.email,
        phoneNo: form.phone,
        address: form.address,
        quantity: form.quantity,
        message: form.message,
      };
      const data = await createInquiry(payload);
      if (data?.status === "success" && data?.data?.inquiryId) {
        setInquiryId(data.data.inquiryId);
        setStep("otp");
      } else {
        setStep("success");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to submit inquiry. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  /* Verify OTP */
  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) return setError("Please enter the OTP sent to your phone");

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/inquiries/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiryId, phoneNo: form.phone, otpCode: otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP");
      setStep("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "OTP verification failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  /* Resend OTP */
  const resendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/inquiries/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiryId, phoneNo: form.phone }),
      });
      if (!res.ok) throw new Error("Failed to resend OTP");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to resend OTP";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-rose-50 to-white">
          <div>
            <h2 id="inquiry-title" className="text-lg font-bold text-gray-900">
              {step === "success"
                ? "Inquiry Confirmed ?"
                : step === "otp"
                ? "Verify Your Phone"
                : "Place an Inquiry"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {step === "form"
                ? "Fill in your details and we will get back to you"
                : step === "otp"
                ? "Enter the OTP sent to your phone to confirm"
                : "Thank you for reaching out!"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[82vh] overflow-y-auto">

          {/* Error banner */}
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-sm text-rose-700">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* FORM STEP */}
          {step === "form" && (
            <form onSubmit={submitForm} className="space-y-4">

              {/* Product summary card */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-50 border border-rose-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                  <ShoppingBag size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">Selected Product</p>
                  <p className="text-sm font-bold text-gray-900 truncate">{product.name}</p>
                  {product.category && (
                    <p className="text-xs text-gray-500">{product.category.name}</p>
                  )}
                </div>
                {product.price && (
                  <p className="text-sm font-bold text-rose-600 shrink-0">Rs. {product.price}</p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className={LABEL_CLS}>
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  required
                  value={form.name}
                  onChange={set("name")}
                  className={INPUT_CLS}
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL_CLS}>
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    className={INPUT_CLS}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className={LABEL_CLS}>
                    Phone <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={set("phone")}
                      className={INPUT_CLS + " pl-9"}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className={LABEL_CLS}>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-rose-400" />
                    Delivery Address <span className="text-rose-500">*</span>
                  </span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.address}
                  onChange={set("address")}
                  className={INPUT_CLS + " resize-none"}
                  placeholder="House no., Street, City, State, PIN"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className={LABEL_CLS}>
                  <span className="flex items-center gap-1">
                    <Hash size={12} className="text-rose-400" />
                    Quantity <span className="text-rose-500">*</span>
                  </span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, quantity: Math.max(1, p.quantity - 1) }))}
                    className="h-10 w-10 shrink-0 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 font-bold text-lg hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 transition-all flex items-center justify-center"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={form.quantity}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, quantity: parseInt(e.target.value) || 1 }))
                    }
                    className={INPUT_CLS + " text-center font-bold"}
                  />
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, quantity: p.quantity + 1 }))}
                    className="h-10 w-10 shrink-0 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 font-bold text-lg hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 transition-all flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className={LABEL_CLS}>
                  Message <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={form.message}
                  onChange={set("message")}
                  className={INPUT_CLS + " resize-none"}
                  placeholder="Any special requirements, event details, etc."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-rose-200"
              >
                {loading ? (
                  <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Submitting...</span>
                ) : (
                  <span className="flex items-center gap-2"><Send size={16} /> Send Inquiry</span>
                )}
              </button>
            </form>
          )}

          {/* OTP STEP */}
          {step === "otp" && (
            <form onSubmit={verifyOtp} className="space-y-5">

              {/* Phone icon */}
              <div className="text-center pt-2">
                <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-rose-100">
                  <Phone size={24} className="text-rose-500" />
                </div>
                <p className="text-sm text-gray-600">
                  We sent a 6-digit code to{" "}
                  <span className="font-bold text-gray-900">{form.phone}</span>
                </p>
              </div>

              {/* Order summary recap */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 divide-y divide-gray-100 overflow-hidden">
                <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100">
                  Please Verify Your Order
                </p>
                <div className="px-4 py-3 flex items-center gap-3">
                  <Package size={14} className="text-rose-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase font-medium">Product</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center gap-3">
                  <Hash size={14} className="text-rose-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">Quantity</p>
                    <p className="text-sm font-semibold text-gray-900">{form.quantity}</p>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-start gap-3">
                  <Phone size={14} className="text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">Phone</p>
                    <p className="text-sm font-semibold text-gray-900">{form.phone}</p>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-start gap-3">
                  <MapPin size={14} className="text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">Delivery Address</p>
                    <p className="text-sm font-semibold text-gray-900 whitespace-pre-wrap">{form.address}</p>
                  </div>
                </div>
              </div>

              {/* OTP input */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 text-center">
                  Enter OTP
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-center text-2xl tracking-[0.6em] font-mono font-bold focus:outline-none focus:ring-2 focus:ring-rose-400/20 focus:border-rose-400 transition-all"
                  placeholder="------"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 4}
                className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-rose-200"
              >
                {loading ? (
                  <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Verifying...</span>
                ) : (
                  "Verify and Confirm"
                )}
              </button>

              <p className="text-center text-xs text-gray-500">
                Did not receive it?{" "}
                <button
                  type="button"
                  onClick={resendOtp}
                  disabled={loading}
                  className="text-rose-600 font-semibold hover:text-rose-700 disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </p>
            </form>
          )}

          {/* SUCCESS STEP */}
          {step === "success" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-100">
                <CheckCircle size={36} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Inquiry Submitted!</h3>
              <p className="text-sm text-gray-600 mb-1">
                Your inquiry for{" "}
                <span className="font-semibold text-gray-900">{product.name}</span>{" "}
                (qty: {form.quantity}) has been received.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                We will contact you at{" "}
                <span className="font-semibold">{form.phone}</span> shortly.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
