import { CommunityPartnersSection } from "@/components/services/general-plans/community-partners-section";
import { HeroSection } from "@/components/services/general-plans/hero-section";

export default function PlansPage() {
    return (
      <div className="relative mx-auto">
        <HeroSection></HeroSection>
        <CommunityPartnersSection></CommunityPartnersSection>
      </div>
    );
}