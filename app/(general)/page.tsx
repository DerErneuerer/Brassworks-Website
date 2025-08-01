import { HeroSection } from '@/components/general/hero-section';
import { FeaturesSection } from '@/components/general/features-section';
import { NewsWrapper } from '@/components/general/news-wrapper';
import { PricingSectionWrapper } from '@/components/general/pricing-section-wrapper';
import { TechnicalFeaturesSection } from '@/components/general/technical-features-section';
import { TargetAudienceSection } from '@/components/general/target-audience-section';
import { FaqSection } from '@/components/general/faq-section';
import { CtaSection } from '@/components/general/cta-section';

export default function Home() {
  return (
    <div className="relative mx-auto">
      <HeroSection />
      <FeaturesSection />
      <PricingSectionWrapper />
      <TechnicalFeaturesSection />
      <NewsWrapper />
      <TargetAudienceSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}