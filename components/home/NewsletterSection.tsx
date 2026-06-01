"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SplitTextReveal, AnimateIn } from "@/components/AnimateIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="relative overflow-hidden bg-[#F7FAFC] border-t border-[#E2E8F0] py-28 px-6">
      {/* Decorative background letters */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span className="font-serif text-[20vw] font-bold text-[#E2E8F0] leading-none tracking-tight whitespace-nowrap">
          N &amp; O
        </span>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <AnimateIn>
          <p className="text-xs tracking-[0.3em] uppercase text-[#D69E2E] font-semibold mb-4">
            Stay Connected
          </p>
        </AnimateIn>

        <SplitTextReveal
          text="Stories, new arrivals, and edit inspiration."
          tag="h2"
          className="font-serif text-3xl md:text-4xl font-bold text-[#2D3748] mb-4"
          delay={0.1}
        />

        <AnimateIn direction="up" delay={0.3}>
          <p className="text-[#718096] mb-10">
            Join the North & Oak community. No spam — just the good stuff.
          </p>
        </AnimateIn>

        <AnimateIn direction="up" delay={0.4}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 text-[#2D3748]"
            >
              <span className="w-8 h-8 rounded-full bg-[#D69E2E] flex items-center justify-center text-white font-bold">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <p className="font-semibold text-lg">You&apos;re on the list. Thank you.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-5 py-4 bg-white border border-[#CBD5E0] text-[#2D3748] placeholder:text-[#A0AEC0] text-sm focus:outline-none focus:border-[#D69E2E] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#D69E2E] text-white px-8 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[#B7791F] transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </AnimateIn>
      </div>
    </section>
  );
}
