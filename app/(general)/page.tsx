import { HeroSection } from '@/components/general/hero-section';
import { FeaturesSection } from '@/components/general/features-section';
import { TeamList } from "@/components/general/team-list";
import { ModpackFeaturesSection } from '@/components/general/modpack-features-section';

export default function Home() {
  return (
    <div className="relative mx-auto">
      <HeroSection/>
      <FeaturesSection/>
      <TeamList/>
      <ModpackFeaturesSection/>
    </div>
  );
}