"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { SplitTextReveal, AnimateIn, RevealLine } from "@/components/AnimateIn";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  const shipping = subtotal >= 500 ? 0 : 35;
  const total = subtotal + shipping;

  return (
    <div className="pt-24 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-4">
          <AnimateIn>
            <p className="text-xs tracking-[0.3em] uppercase text-[#D69E2E] font-semibold mb-2">
              Your Selection
            </p>
          </AnimateIn>
          <SplitTextReveal
            text="Shopping Cart"
            tag="h1"
            className="font-serif text-5xl font-bold text-[#2D3748]"
          />
        </div>
        <RevealLine className="mb-12" />

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-6 text-center"
          >
            <span className="text-7xl">🛍️</span>
            <h2 className="font-serif text-2xl font-bold text-[#2D3748]">Your cart is empty</h2>
            <p className="text-[#718096]">Discover our curated collection of home furnishings.</p>
            <Link
              href="/shop"
              className="bg-[#2D3748] text-white px-8 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[#D69E2E] transition-colors duration-300"
            >
              Shop Now
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="hidden sm:grid grid-cols-5 gap-4 text-xs tracking-widest uppercase text-[#A0AEC0] pb-4 border-b border-[#E2E8F0] mb-6">
                <span className="col-span-2">Product</span>
                <span className="text-center">Price</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Total</span>
              </div>

              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center py-6 border-b border-[#E2E8F0]"
                  >
                    {/* Image + name */}
                    <div className="col-span-2 flex gap-4 items-center">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-[#EDF2F7] overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="font-serif font-semibold text-[#2D3748] hover:text-[#D69E2E] transition-colors text-sm"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-[#A0AEC0] capitalize mt-0.5">
                          {item.product.category.replace("-", " ")}
                        </p>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-xs text-[#FC8181] hover:text-red-600 transition-colors mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center text-sm text-[#2D3748]">
                      <span className="sm:hidden text-[#A0AEC0] mr-2 text-xs">Price:</span>
                      ${item.product.price.toLocaleString()}
                    </div>

                    {/* Qty */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center border border-[#CBD5E0]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#2D3748] hover:bg-[#EDF2F7] transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-[#2D3748]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#2D3748] hover:bg-[#EDF2F7] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="text-right font-semibold text-[#2D3748] text-sm">
                      <span className="sm:hidden text-[#A0AEC0] mr-2 text-xs">Total:</span>
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <AnimateIn direction="up" delay={0.2}>
                <div className="bg-white border border-[#E2E8F0] p-8 sticky top-24">
                  <h2 className="font-serif text-2xl font-bold text-[#2D3748] mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm text-[#718096]">
                      <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#718096]">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                        {shipping === 0 ? "Free" : `$${shipping}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-[#D69E2E]">
                        Add ${(500 - subtotal).toLocaleString()} more for free shipping
                      </p>
                    )}
                  </div>

                  <RevealLine className="mb-6" />

                  <div className="flex justify-between font-bold text-[#2D3748] text-lg mb-8">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>

                  <Link
                    href="/checkout"
                    className="block text-center bg-[#D69E2E] text-white py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[#B7791F] transition-colors duration-300 mb-4"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/shop"
                    className="block text-center text-sm tracking-widest uppercase font-semibold text-[#718096] hover:text-[#2D3748] transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </AnimateIn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
