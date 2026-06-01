"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/TransitionLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const CATEGORIES = [
  { label: "All Products", value: "all" },
  { label: "Living Room", value: "living-room" },
  { label: "Bedroom", value: "bedroom" },
  { label: "Lighting", value: "lighting" },
  { label: "Textiles", value: "textiles" },
  { label: "Decor", value: "decor" },
];

const FEATURED_PRODUCTS = [
  {
    slug: "linden-sofa",
    name: "Linden Sofa",
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    slug: "arc-floor-lamp",
    name: "Arc Floor Lamp",
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  },
  {
    slug: "cove-bed-frame",
    name: "Cove Bed Frame",
    category: "Bedroom",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
  },
  {
    slug: "harlow-dining-table",
    name: "Harlow Dining Table",
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=600&q=80",
  },
];

export function Navbar() {
  const { totalItems } = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openMega() {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  }
  function closeMega() {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 120);
  }

  const navLinks = [
    { href: "/shop?category=living-room", label: "Living Room" },
    { href: "/shop?category=bedroom", label: "Bedroom" },
    { href: "/shop?category=lighting", label: "Lighting" },
    { href: "/shop?category=textiles", label: "Textiles" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-[#F7FAFC]/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo — hidden on homepage until scrolled, always visible elsewhere */}
          <motion.div
            initial={false}
            animate={{
              opacity: !isHome || scrolled ? 1 : 0,
              y: !isHome || scrolled ? 0 : -8,
              pointerEvents: !isHome || scrolled ? "auto" : "none",
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <TransitionLink
              href="/"
              className="font-serif text-xl font-bold tracking-wide text-[#2D3748] hover:text-[#D69E2E] transition-colors duration-300"
            >
              North <span className="text-[#D69E2E]">&amp;</span> Oak
            </TransitionLink>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Shop with mega menu */}
            <div
              className="relative"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <TransitionLink
                href="/shop"
                className={`text-sm tracking-widest uppercase font-medium hover:text-[#D69E2E] transition-colors duration-200 ${scrolled || !isHome ? "text-[#4A5568]" : "text-[#F7FAFC]"}`}
              >
                Shop
              </TransitionLink>
            </div>

            {navLinks.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest uppercase font-medium hover:text-[#D69E2E] transition-colors duration-200 ${scrolled || !isHome ? "text-[#4A5568]" : "text-[#F7FAFC]"}`}
              >
                {link.label}
              </TransitionLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <TransitionLink
              href="/cart"
              className={`relative flex items-center gap-2 text-sm font-medium hover:text-[#D69E2E] transition-colors ${scrolled || !isHome ? "text-[#2D3748]" : "text-[#F7FAFC]"}`}
            >
              <CartIcon />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#D69E2E] text-white text-xs rounded-full flex items-center justify-center font-bold leading-none">
                  {totalItems}
                </span>
              )}
            </TransitionLink>
            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-1 text-lg transition-colors ${scrolled || !isHome ? "text-[#2D3748]" : "text-[#F7FAFC]"}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mega menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            className="fixed top-16 left-0 right-0 z-40 bg-[#F7FAFC] border-b border-[#E2E8F0] shadow-xl overflow-hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <div className="max-w-7xl mx-auto px-6 py-10 flex gap-12">
              {/* Categories */}
              <div className="w-52 shrink-0">
                <p className="text-xs tracking-widest uppercase text-[#A0AEC0] font-semibold mb-5">Shop</p>
                <ul className="flex flex-col gap-1">
                  {CATEGORIES.map((cat, i) => (
                    <motion.li
                      key={cat.value}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 + 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <TransitionLink
                        href={cat.value === "all" ? "/shop" : `/shop?category=${cat.value}`}
                        onClick={() => setMegaOpen(false)}
                        className="block py-2 text-[15px] font-medium text-[#2D3748] hover:text-[#D69E2E] transition-colors duration-150"
                      >
                        {cat.label}
                      </TransitionLink>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="w-px bg-[#E2E8F0] self-stretch" />

              {/* Featured products */}
              <div className="flex-1">
                <p className="text-xs tracking-widest uppercase text-[#A0AEC0] font-semibold mb-5">Featured</p>
                <div className="grid grid-cols-4 gap-4">
                  {FEATURED_PRODUCTS.map((product, i) => (
                    <motion.div
                      key={product.slug}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 + 0.2, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <TransitionLink
                        href={`/shop/${product.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="group block"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#E2E8F0] rounded-sm mb-3">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 1280px) 25vw, 280px"
                          />
                          <div className="absolute inset-0 bg-[#2D3748]/0 group-hover:bg-[#2D3748]/20 transition-colors duration-300" />
                          <span className="absolute bottom-0 left-0 right-0 text-center text-xs tracking-widest uppercase font-bold text-white py-3 bg-gradient-to-t from-[#2D3748]/70 to-transparent">
                            {product.name}
                          </span>
                        </div>
                        <p className="text-xs tracking-widest uppercase text-[#A0AEC0]">{product.category}</p>
                      </TransitionLink>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#F7FAFC] flex flex-col pt-20 px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col gap-6 mt-8">
              {[{ href: "/shop", label: "Shop" }, ...navLinks].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  <TransitionLink
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl font-serif font-bold text-[#2D3748] hover:text-[#D69E2E] transition-colors"
                  >
                    {link.label}
                  </TransitionLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CartIcon() {
  return <FontAwesomeIcon icon={faBagShopping} className="w-5 h-5" />;
}