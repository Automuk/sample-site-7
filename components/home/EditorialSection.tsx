"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplitTextReveal, AnimateIn } from "@/components/AnimateIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export function EditorialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="relative pb-4 pr-4">
          <div className="relative overflow-hidden aspect-[4/5]">
            <motion.div className="absolute inset-0" style={{ y: imgY }}>
              <Image
                src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80"
                alt="Interior design craftsmanship"
                fill
                className="object-cover scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
          {/* Gold accent — outside overflow-hidden so it bleeds out */}
          <motion.div
            className="absolute bottom-0 right-0 w-32 h-32 border-2 border-[#D69E2E] pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center">
          <AnimateIn direction="up">
            <p className="text-xs tracking-[0.3em] uppercase text-[#D69E2E] font-semibold mb-4">
              Our Philosophy
            </p>
          </AnimateIn>

          <SplitTextReveal
            text="Designed to be lived in."
            tag="h2"
            className="font-serif text-4xl md:text-5xl font-bold text-[#2D3748] leading-tight mb-6"
            delay={0.1}
            stagger={0.05}
          />

          <AnimateIn direction="up" delay={0.3}>
            <p className="text-[#718096] leading-relaxed mb-4">
              Every piece in our collection is chosen with one question in mind: will this still feel right in ten years? We work with makers who share our belief that the best design is honest — showing its materials, its process, and its purpose.
            </p>
            <p className="text-[#718096] leading-relaxed mb-8">
              From solid walnut dining tables to hand-thrown stoneware, we source from workshops in Portugal, Morocco, and across Northern Europe. Small runs, long relationships.
            </p>
          </AnimateIn>

          <AnimateIn direction="up" delay={0.5}>
            <div className="flex gap-12 mb-10">
              {[
                { num: "12+", label: "Artisan Partners" },
                { num: "200+", label: "Products" },
                { num: "10yr", label: "Warranty" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl font-bold text-[#D69E2E]">{stat.num}</p>
                  <p className="text-xs tracking-widest uppercase text-[#A0AEC0] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-3 text-sm tracking-widest uppercase font-semibold text-[#2D3748] group"
            >
              <span className="border-b border-[#D69E2E] pb-0.5 group-hover:text-[#D69E2E] transition-colors">
                Explore the Collection
              </span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </motion.span>
            </Link>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
