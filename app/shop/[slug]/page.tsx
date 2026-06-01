"use client";

import { use, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { getProductBySlug, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/ProductCard";
import { AnimateIn, SplitTextReveal, RevealLine } from "@/components/AnimateIn";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const related = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  function handleAdd() {
    if (!product!.inStock) return;
    for (let i = 0; i < qty; i++) addItem(product!);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-[#E2E8F0]">
        <AnimateIn>
          <nav className="flex gap-2 text-xs text-[#A0AEC0] tracking-wide">
            <Link href="/" className="hover:text-[#D69E2E] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#D69E2E] transition-colors">Shop</Link>
            <span>/</span>
            <Link
              href={`/shop?category=${product.category}`}
              className="hover:text-[#D69E2E] transition-colors capitalize"
            >
              {product.category.replace("-", " ")}
            </Link>
            <span>/</span>
            <span className="text-[#2D3748]">{product.name}</span>
          </nav>
        </AnimateIn>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div>
            <motion.div
              key={activeImage}
              className="relative aspect-square overflow-hidden bg-[#EDF2F7] mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 text-xs tracking-widest uppercase px-3 py-1.5 font-semibold ${
                    product.badge === "Sale"
                      ? "bg-[#D69E2E] text-white"
                      : product.badge === "Out of Stock"
                      ? "bg-[#2D3748] text-white"
                      : "bg-white text-[#2D3748]"
                  }`}
                >
                  {product.badge}
                </span>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-20 overflow-hidden transition-all ${
                    i === activeImage
                      ? "ring-2 ring-[#D69E2E] ring-offset-2"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <AnimateIn direction="up">
              <p className="text-xs tracking-[0.3em] uppercase text-[#D69E2E] font-semibold mb-2">
                {product.category.replace("-", " ")}
              </p>
            </AnimateIn>

            <SplitTextReveal
              text={product.name}
              tag="h1"
              className="font-serif text-4xl md:text-5xl font-bold text-[#2D3748] mb-4"
              delay={0.1}
            />

            <AnimateIn direction="up" delay={0.2}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-[#2D3748]">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-[#A0AEC0] line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </AnimateIn>

            <RevealLine className="mb-6" />

            <AnimateIn direction="up" delay={0.3}>
              <p className="text-[#718096] leading-relaxed mb-8">{product.longDescription}</p>
            </AnimateIn>

            {/* Qty + Add to Cart */}
            <AnimateIn direction="up" delay={0.4}>
              <div className="flex gap-4 mb-8 flex-wrap">
                {/* Quantity */}
                <div className="flex items-center border border-[#CBD5E0]">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-12 h-12 flex items-center justify-center text-[#2D3748] hover:bg-[#EDF2F7] transition-colors text-lg"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-semibold text-[#2D3748]">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-12 h-12 flex items-center justify-center text-[#2D3748] hover:bg-[#EDF2F7] transition-colors text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Add to cart */}
                <motion.button
                  onClick={handleAdd}
                  whileTap={{ scale: 0.98 }}
                  disabled={!product.inStock}
                  className={`flex-1 min-w-[160px] py-4 text-sm tracking-widest uppercase font-semibold transition-colors duration-300 ${
                    !product.inStock
                      ? "bg-[#CBD5E0] text-[#A0AEC0] cursor-not-allowed"
                      : added
                      ? "bg-[#D69E2E] text-white"
                      : "bg-[#2D3748] text-white hover:bg-[#D69E2E]"
                  }`}
                >
                  {!product.inStock ? "Out of Stock" : added ? <><FontAwesomeIcon icon={faCheck} className="mr-2" />Added to Cart</> : <><FontAwesomeIcon icon={faCartShopping} className="mr-2" />Add to Cart</>}
                </motion.button>
              </div>

              <Link
                href="/cart"
                className="block text-center text-sm tracking-widest uppercase font-semibold border border-[#2D3748] text-[#2D3748] py-4 hover:bg-[#2D3748] hover:text-white transition-colors duration-300 mb-10"
              >
                View Cart
              </Link>
            </AnimateIn>

            <RevealLine className="mb-6" />

            {/* Product details */}
            <AnimateIn direction="up" delay={0.5}>
              <div className="space-y-4">
                <details className="group border-b border-[#E2E8F0] pb-4">
                  <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold tracking-widest uppercase text-[#2D3748] py-2 select-none">
                    Details
                    <span className="text-[#D69E2E] transition-transform group-open:rotate-45 duration-200 text-xl">+</span>
                  </summary>
                  <ul className="mt-3 space-y-2">
                    {product.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-[#718096]">
                        <span className="text-[#D69E2E] mt-1">—</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </details>

                <details className="group border-b border-[#E2E8F0] pb-4">
                  <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold tracking-widest uppercase text-[#2D3748] py-2 select-none">
                    Materials
                    <span className="text-[#D69E2E] transition-transform group-open:rotate-45 duration-200 text-xl">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-[#718096]">{product.materials}</p>
                </details>

                <details className="group border-b border-[#E2E8F0] pb-4">
                  <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold tracking-widest uppercase text-[#2D3748] py-2 select-none">
                    Dimensions
                    <span className="text-[#D69E2E] transition-transform group-open:rotate-45 duration-200 text-xl">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-[#718096]">{product.dimensions}</p>
                </details>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="bg-[#EDF2F7] py-20 px-6 mt-12">
          <div className="max-w-7xl mx-auto">
            <AnimateIn>
              <h2 className="font-serif text-3xl font-bold text-[#2D3748] mb-10">
                You might also like
              </h2>
            </AnimateIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
