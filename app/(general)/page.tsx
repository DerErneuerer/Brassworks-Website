import { HeroSection } from '@/components/general/hero-section';
import { FeaturesSection } from '@/components/general/features-section';
import { TeamList } from "@/components/general/team-list";
import { CommunitySection } from '@/components/general/community-section';
import { SeasonsSection } from "@/components/general/seasons";
import { ModpackSection } from "@/components/general/modpack";
import { GallerySlider } from "@/components/general/gallery";

export const metadata = {
    other: {
        'og:title': "Brassworks – Create SMP",
        'og:description': "Our public server thrives on cooperation between players - express your creativity freely, with each other.",
        'og:url': "https://brassworks.572.at/",
        'og:type': "website",
        'og:images': [
            {
                url: "https://brassworks.572.at/images/logo.png",
                width: 540,
                height: 540,
            },
        ],
    },
};

export default function Home() {
  return (
    <div className="relative mx-auto">
      <HeroSection/>
      <FeaturesSection/>
      <ModpackSection/>
      <SeasonsSection/>
        <GallerySlider
            items={[
                { src: "/images/gallery/1.png", author: "Coming Soon" },
            ]}
            autoPlay
            interval={5000}
        />
      <TeamList/>
      <CommunitySection/>
    </div>
  );
}