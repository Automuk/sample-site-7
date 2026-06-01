import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { EditorialSection } from "@/components/home/EditorialSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <FeaturedSection />
      <CategoriesSection />
      <EditorialSection />
      <NewsletterSection />
    </>
  );
}
