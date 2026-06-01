"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SplitTextReveal, AnimateIn, RevealLine } from "@/components/AnimateIn";

const categories = [
  {
    label: "Living Room",
    slug: "living-room",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    count: 4,
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    label: "Bedroom",
    slug: "bedroom",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    count: 3,
    span: "",
  },
  {
    label: "Lighting",
    slug: "lighting",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    count: 2,
    span: "",
  },
  {
    label: "Textiles",
    slug: "textiles",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    count: 3,
    span: "",
  },
  {
    label: "Decor",
    slug: "decor",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
    count: 1,
    span: "",
  },
];

export function CategoriesSection() {
  return (
    <section className="bg-[#2D3748] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <div>
            <AnimateIn>
              <p className="text-xs tracking-[0.3em] uppercase text-[#D69E2E] font-semibold mb-3">
                Browse by Room
              </p>
            </AnimateIn>
            <SplitTextReveal
              text="Shop by Category"
              tag="h2"
              className="font-serif text-4xl md:text-5xl font-bold text-[#F7FAFC]"
              delay={0.1}
            />
          </div>
        </div>
        <RevealLine className="mb-12" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={cat.span}
            >
              <Link
                href={`/shop?category=${cat.slug}`}
                className="group relative overflow-hidden block h-full bg-[#4A5568]"
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D3748]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xs tracking-widest uppercase text-[#D69E2E] font-semibold mb-1">
                    {cat.count} products
                  </p>
                  <p className="font-serif text-xl font-bold text-white group-hover:text-[#D69E2E] transition-colors">
                    {cat.label}
                  </p>
                </div>
                {/* Corner accent */}
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#D69E2E] opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
