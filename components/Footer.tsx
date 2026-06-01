import Link from "next/link";
import { RevealLine } from "@/components/AnimateIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faPinterest, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  return (
    <footer className="bg-[#2D3748] text-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <RevealLine className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-serif text-3xl font-bold mb-4">
              North <span className="text-[#D69E2E]">&amp;</span> Oak
            </p>
            <p className="text-[#A0AEC0] text-sm leading-relaxed max-w-xs">
              Curated furniture and home decor crafted for modern living. We believe a beautiful home should feel effortless.
            </p>
            <div className="flex gap-5 mt-6">
              {[
                { icon: faInstagram, label: "Instagram" },
                { icon: faPinterest, label: "Pinterest" },
                { icon: faLinkedin, label: "LinkedIn" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-[#A0AEC0] hover:text-[#D69E2E] transition-colors duration-200 text-xl"
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-xs tracking-widest uppercase font-semibold text-[#D69E2E] mb-4">Shop</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "All Products", href: "/shop" },
                { label: "Living Room", href: "/shop?category=living-room" },
                { label: "Bedroom", href: "/shop?category=bedroom" },
                { label: "Lighting", href: "/shop?category=lighting" },
                { label: "Textiles", href: "/shop?category=textiles" },
                { label: "Decor", href: "/shop?category=decor" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#A0AEC0] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs tracking-widest uppercase font-semibold text-[#D69E2E] mb-4">Info</p>
            <ul className="flex flex-col gap-3">
              {["Our Story", "Sustainability", "Delivery & Returns", "Care Guides", "Contact"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-[#A0AEC0] hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <RevealLine className="mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[#718096] text-xs">
          <p>© 2026 North & Oak. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
