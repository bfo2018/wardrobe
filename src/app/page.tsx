import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <FeaturedCollections />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <GalleryStrip />
      <CtaBanner />
    </>
  );
}
