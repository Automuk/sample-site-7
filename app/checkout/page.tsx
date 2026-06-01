"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { SplitTextReveal, AnimateIn, RevealLine } from "@/components/AnimateIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

type Step = "information" | "shipping" | "payment" | "confirmation";

const STEPS: Step[] = ["information", "shipping", "payment", "confirmation"];

function StepIndicator({ current }: { current: Step }) {
  const stepLabels: Record<Step, string> = {
    information: "Information",
    shipping: "Shipping",
    payment: "Payment",
    confirmation: "Confirmation",
  };
  const currentIdx = STEPS.indexOf(current);

  return (
    <div className="flex items-center gap-0 mb-12">
      {STEPS.filter((s) => s !== "confirmation").map((step, i) => {
        const idx = STEPS.indexOf(step);
        const isActive = idx === currentIdx;
        const isDone = idx < currentIdx;
        return (
          <div key={step} className="flex items-center">
            <div
              className={`flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-colors ${
                isActive ? "text-[#D69E2E]" : isDone ? "text-[#2D3748]" : "text-[#CBD5E0]"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                  isActive
                    ? "border-[#D69E2E] text-[#D69E2E]"
                    : isDone
                    ? "bg-[#2D3748] border-[#2D3748] text-white"
                    : "border-[#CBD5E0] text-[#CBD5E0]"
                }`}
              >
                {isDone ? <FontAwesomeIcon icon={faCheck} className="text-[10px]" /> : idx + 1}
              </span>
              <span className="hidden sm:inline">{stepLabels[step]}</span>
            </div>
            {i < 2 && (
              <div
                className={`w-12 sm:w-16 h-px mx-2 transition-colors ${
                  isDone ? "bg-[#2D3748]" : "bg-[#E2E8F0]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function InputField({
  label,
  id,
  type = "text",
  placeholder,
  half,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  half?: boolean;
  required?: boolean;
}) {
  return (
    <div className={half ? "sm:col-span-1" : "sm:col-span-2"}>
      <label htmlFor={id} className="block text-xs font-semibold tracking-widest uppercase text-[#718096] mb-2">
        {label} {required && <span className="text-[#D69E2E]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-[#CBD5E0] text-[#2D3748] text-sm focus:outline-none focus:border-[#D69E2E] transition-colors placeholder:text-[#CBD5E0] bg-white"
      />
    </div>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("information");
  const { items, subtotal, clearCart } = useCart();

  const shipping = subtotal >= 500 ? 0 : 35;
  const total = subtotal + shipping;

  function handleNext() {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  }

  function handleConfirm() {
    clearCart();
    setStep("confirmation");
  }

  if (step === "confirmation") {
    return (
      <div className="pt-24 min-h-screen pb-20 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-[#D69E2E] flex items-center justify-center text-white text-3xl mx-auto mb-8"
          >
            <FontAwesomeIcon icon={faCheck} />
          </motion.div>
          <h1 className="font-serif text-4xl font-bold text-[#2D3748] mb-4">
            Order Confirmed
          </h1>
          <p className="text-[#718096] mb-2">
            Thank you for your order. A confirmation email has been sent.
          </p>
          <p className="text-xs text-[#A0AEC0] mb-10">
            Order #NO-{Math.floor(Math.random() * 90000) + 10000}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-[#2D3748] text-white px-8 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[#D69E2E] transition-colors duration-300"
            >
              Back to Home
            </Link>
            <Link
              href="/shop"
              className="border border-[#2D3748] text-[#2D3748] px-8 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[#2D3748] hover:text-white transition-colors duration-300"
            >
              Keep Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-6">
          <AnimateIn>
            <p className="text-xs tracking-[0.3em] uppercase text-[#D69E2E] font-semibold mb-2">
              Secure Checkout
            </p>
          </AnimateIn>
          <SplitTextReveal
            text="Checkout"
            tag="h1"
            className="font-serif text-5xl font-bold text-[#2D3748] mb-8"
          />
          <StepIndicator current={step} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === "information" && (
                <motion.div
                  key="information"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-serif text-2xl font-bold text-[#2D3748] mb-6">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <InputField label="First Name" id="firstName" half required />
                    <InputField label="Last Name" id="lastName" half required />
                    <InputField label="Email Address" id="email" type="email" placeholder="you@example.com" required />
                    <InputField label="Phone Number" id="phone" type="tel" placeholder="+1 (555) 000-0000" half />
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-[#2D3748] mb-6">
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Address Line 1" id="address1" placeholder="123 Oak Street" required />
                    <InputField label="Address Line 2" id="address2" placeholder="Apt, suite, etc. (optional)" />
                    <InputField label="City" id="city" half required />
                    <InputField label="State / Province" id="state" half required />
                    <InputField label="Postal Code" id="postal" half required />
                    <InputField label="Country" id="country" half required />
                  </div>
                </motion.div>
              )}

              {step === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-serif text-2xl font-bold text-[#2D3748] mb-6">
                    Shipping Method
                  </h2>
                  <div className="space-y-3">
                    {[
                      { label: "Standard Delivery", sub: "5–7 business days", price: subtotal >= 500 ? "Free" : "$35" },
                      { label: "Express Delivery", sub: "2–3 business days", price: "$65" },
                      { label: "Next Day Delivery", sub: "1 business day", price: "$95" },
                    ].map((option, i) => (
                      <label
                        key={option.label}
                        className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                          i === 0
                            ? "border-[#D69E2E] bg-[#FFFBEB]"
                            : "border-[#E2E8F0] hover:border-[#2D3748]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              i === 0 ? "border-[#D69E2E]" : "border-[#CBD5E0]"
                            }`}
                          >
                            {i === 0 && <div className="w-2 h-2 rounded-full bg-[#D69E2E]" />}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-[#2D3748]">{option.label}</p>
                            <p className="text-xs text-[#A0AEC0]">{option.sub}</p>
                          </div>
                        </div>
                        <span className="font-bold text-sm text-[#D69E2E]">{option.price}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-serif text-2xl font-bold text-[#2D3748] mb-6">
                    Payment Details
                  </h2>
                  <div className="flex gap-3 mb-6">
                    {["Visa", "Mastercard", "Amex", "PayPal"].map((card) => (
                      <span
                        key={card}
                        className="px-3 py-1.5 border border-[#E2E8F0] text-xs font-semibold text-[#718096] rounded"
                      >
                        {card}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Name on Card" id="cardName" required />
                    <InputField label="Card Number" id="cardNumber" placeholder="•••• •••• •••• ••••" required />
                    <InputField label="Expiry Date" id="expiry" placeholder="MM / YY" half required />
                    <InputField label="CVV" id="cvv" placeholder="•••" half required />
                  </div>
                  <p className="flex items-center gap-2 text-xs text-[#A0AEC0] mt-6">
                    <span className="text-green-500 text-base">🔒</span>
                    Your payment details are encrypted and secure. This is a mock checkout — no real charges will be made.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-10">
              <button
                onClick={() => {
                  const idx = STEPS.indexOf(step);
                  if (idx > 0) setStep(STEPS[idx - 1]);
                }}
                className="text-sm tracking-widest uppercase font-semibold text-[#718096] hover:text-[#2D3748] transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />Back
              </button>
              {step === "payment" ? (
                <button
                  onClick={handleConfirm}
                  className="bg-[#D69E2E] text-white px-10 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[#B7791F] transition-colors duration-300"
                >
                  Place Order — ${total.toLocaleString()}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="bg-[#2D3748] text-white px-10 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[#D69E2E] transition-colors duration-300"
                >
                  Continue<FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <AnimateIn direction="up" delay={0.2}>
              <div className="bg-white border border-[#E2E8F0] p-6 sticky top-24">
                <h3 className="font-serif text-xl font-bold text-[#2D3748] mb-6">Your Order</h3>

                {items.length === 0 ? (
                  <p className="text-sm text-[#A0AEC0] mb-6">Your cart is empty.</p>
                ) : (
                  <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-2">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3 items-center">
                        <div className="relative w-14 h-14 flex-shrink-0 bg-[#EDF2F7] overflow-hidden">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2D3748] text-white text-xs rounded-full flex items-center justify-center font-bold">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#2D3748] truncate">{item.product.name}</p>
                          <p className="text-xs text-[#A0AEC0]">${item.product.price.toLocaleString()} each</p>
                        </div>
                        <p className="text-sm font-bold text-[#2D3748] flex-shrink-0">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <RevealLine className="mb-4" />

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-[#718096]">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#718096]">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                      {shipping === 0 ? "Free" : `$${shipping}`}
                    </span>
                  </div>
                </div>

                <RevealLine className="mb-4" />

                <div className="flex justify-between font-bold text-[#2D3748]">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </div>
  );
}
