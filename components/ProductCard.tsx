"use client";

import Image from "next/image";
import { TransitionLink as Link } from "@/components/TransitionLink";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCartShopping } from "@fortawesome/free-solid-svg-icons";

type Props = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!product.inStock) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/shop/${product.slug}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <div className="relative overflow-hidden bg-[#EDF2F7] aspect-[4/5] mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-700 ease-out ${
              hovered ? "scale-105" : "scale-100"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-xs tracking-widest uppercase px-3 py-1 font-semibold ${
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

          {/* Quick add */}
          <motion.button
            onClick={handleAdd}
            initial={{ y: 20, opacity: 0 }}
            animate={hovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`absolute bottom-4 left-4 right-4 py-3 text-sm tracking-widest uppercase font-semibold transition-colors ${
              product.inStock
                ? added
                  ? "bg-[#D69E2E] text-white"
                  : "bg-[#2D3748] text-white hover:bg-[#D69E2E]"
                : "bg-[#CBD5E0] text-[#A0AEC0] cursor-not-allowed"
            }`}
            disabled={!product.inStock}
          >
            {!product.inStock ? "Out of Stock" : added ? <><FontAwesomeIcon icon={faCheck} className="mr-1.5" />Added</> : <><FontAwesomeIcon icon={faCartShopping} className="mr-1.5" />Add to Cart</>}
          </motion.button>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs tracking-widest uppercase text-[#A0AEC0] mb-1">
            {product.category.replace("-", " ")}
          </p>
          <h3 className="font-serif text-lg font-semibold text-[#2D3748] group-hover:text-[#D69E2E] transition-colors duration-200 mb-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[#2D3748] font-semibold">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#A0AEC0] line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
