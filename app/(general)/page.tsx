import { HeroSection } from '@/components/general/hero-section';
import { FeaturesSection } from '@/components/general/features-section';
import { TeamList } from "@/components/general/team-list";
import { CommunitySection } from '@/components/general/community-section';
import { SeasonsSection } from "@/components/general/seasons";
import { ModpackSection } from "@/components/general/modpack";
import { GallerySlider } from "@/components/general/gallery";

export default function Home() {
  return (
    <div className="relative mx-auto">
      <HeroSection/>
      <FeaturesSection/>
      <ModpackSection/>
      <SeasonsSection/>
        <GallerySlider
            items={[
                { src: "/images/gallery/banner.png", author: "Shot 1" },
                { src: "/images/gallery/banner.png", author: "Shot 2" },
                { src: "/images/gallery/banner.png", author: "Shot 3" },
                { src: "/images/gallery/banner.png", author: "Shot 4" },
            ]}
            autoPlay
            interval={5000}
        />
      <TeamList/>
      <CommunitySection/>
    </div>
  );
}