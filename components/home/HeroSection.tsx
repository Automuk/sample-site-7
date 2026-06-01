"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=85",
    alt: "Elegant living room interior",
  },
  {
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&q=85",
    alt: "Modern sofa in a bright room",
  },
  {
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1800&q=85",
    alt: "Minimalist bedroom design",
  },
  {
    src: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1800&q=85",
    alt: "Warm dining room with wooden furniture",
  },
];

const AUTOPLAY_INTERVAL = 5000;

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prevIndexRef = useRef(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  function navigate(dir: 1 | -1) {
    setDirection(dir);
    setIndex((prev) => {
      prevIndexRef.current = prev;
      return (prev + dir + IMAGES.length) % IMAGES.length;
    });
  }

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => navigate(1), AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Carousel background */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        {/* Persistent base image — always shows the PREVIOUS image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={IMAGES[prevIndexRef.current].src}
            alt={IMAGES[prevIndexRef.current].alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#2D3748]/50" />
        </div>

        {/* Incoming slide — wipes the NEW image over the old one */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            className="absolute inset-0 z-10"
            variants={{
              enter: (dir: number) => ({
                clipPath: dir > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
              }),
              center: {
                clipPath: "inset(0 0% 0 0%)",
              },
              exit: {
                clipPath: "inset(0 0% 0 0%)",
              },
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ clipPath: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          >
            <Image
              src={IMAGES[index].src}
              alt={IMAGES[index].alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#2D3748]/50" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Left click zone */}
      <button
        aria-label="Previous image"
        className="absolute left-0 top-0 h-full w-1/2 z-20 cursor-w-resize"
        onClick={() => navigate(-1)}
      />
      {/* Right click zone */}
      <button
        aria-label="Next image"
        className="absolute right-0 top-0 h-full w-1/2 z-20 cursor-e-resize"
        onClick={() => navigate(1)}
      />

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              prevIndexRef.current = index;
              setIndex(i);
            }}
            className={`h-px transition-all duration-500 ${i === index ? "w-10 bg-white" : "w-4 bg-white/40"}`}
          />
        ))}
      </div>

      {/* Centered brand name */}
      <motion.div
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
      >
        <h1
          className="font-serif text-[clamp(64px,12vw,160px)] font-bold tracking-wide text-center leading-none select-none"
          style={{ mixBlendMode: "difference", color: "#ffffff" }}
        >
          {["North", "\u00a0&\u00a0", "Oak"].map((word, wi) =>
            word.trim() === "&" ? (
              <span key="amp" className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  style={{ color: "#D69E2E" }}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.75, delay: wi * 0.18 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  &amp;
                </motion.span>
              </span>
            ) : (
              <span key={word} className="inline-block">
                {word.split("").map((char, ci) => (
                  <span key={ci} className="inline-block overflow-hidden align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.7,
                        delay: wi * 0.18 + ci * 0.045 + 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </span>
            )
          )}
        </h1>
      </motion.div>
    </section>
  );
}