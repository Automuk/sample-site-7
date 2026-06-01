"use client";

import { motion } from "framer-motion";

const items = [
  "Free Shipping Over $500",
  "Sustainably Sourced Materials",
  "Handcrafted Pieces",
  "10-Year Warranty",
  "30-Day Returns",
  "Expert Design Advice",
];

export function MarqueeStrip() {
  return (
    <div className="bg-[#2D3748] py-4 overflow-hidden">
      <div className="flex">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center gap-4 text-xs tracking-widest uppercase text-[#A0AEC0]">
              <span className="text-[#D69E2E] text-base">✦</span>
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
