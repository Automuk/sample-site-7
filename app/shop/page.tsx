"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { SplitTextReveal, AnimateIn } from "@/components/AnimateIn";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") ?? "all";

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  function setCategory(value: string) {
    if (value === "all") {
      router.push("/shop", { scroll: false });
    } else {
      router.push(`/shop?category=${value}`, { scroll: false });
    }
  }

  const activeCatLabel =
    categories.find((c) => c.value === activeCategory)?.label ?? "All Products";

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-16 border-b border-[#E2E8F0]">
        <AnimateIn>
          <p className="text-xs tracking-[0.3em] uppercase text-[#D69E2E] font-semibold mb-3">
            The Collection
          </p>
        </AnimateIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SplitTextReveal
            text={activeCatLabel}
            tag="h1"
            className="font-serif text-5xl md:text-6xl font-bold text-[#2D3748]"
          />
          <AnimateIn direction="up" delay={0.2}>
            <p className="text-[#A0AEC0] text-sm">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </p>
          </AnimateIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Filters */}
        <div className="flex gap-2 flex-wrap py-8 border-b border-[#E2E8F0] mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-5 py-2 text-xs tracking-widest uppercase font-semibold transition-all duration-200 ${
                activeCategory === cat.value
                  ? "bg-[#2D3748] text-white"
                  : "bg-transparent text-[#718096] border border-[#CBD5E0] hover:border-[#2D3748] hover:text-[#2D3748]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[#A0AEC0]">No products found.</div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            layout
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-[#A0AEC0]">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
