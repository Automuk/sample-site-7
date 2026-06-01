import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { SplitTextReveal, AnimateIn, RevealLine } from "@/components/AnimateIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export function FeaturedSection() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div>
          <AnimateIn direction="up">
            <p className="text-xs tracking-[0.3em] uppercase text-[#D69E2E] font-semibold mb-3">
              Curated Selection
            </p>
          </AnimateIn>
          <SplitTextReveal
            text="Featured Pieces"
            tag="h2"
            className="font-serif text-4xl md:text-5xl font-bold text-[#2D3748]"
            delay={0.1}
          />
        </div>
        <AnimateIn direction="up" delay={0.2}>
          <Link
            href="/shop"
            className="text-sm tracking-widest uppercase font-semibold text-[#2D3748] border-b border-[#D69E2E] pb-0.5 hover:text-[#D69E2E] transition-colors"
          >
            View All <FontAwesomeIcon icon={faArrowRight} className="ml-1.5" />
          </Link>
        </AnimateIn>
      </div>
      <RevealLine className="mb-12" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
