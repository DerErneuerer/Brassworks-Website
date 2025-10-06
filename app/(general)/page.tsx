import { HeroSection } from '@/components/general/hero-section';
import { FeaturesSection } from '@/components/general/features-section';
import { TeamList } from "@/components/general/team-list";
import { CommunitySection } from '@/components/general/community-section';
import { SeasonsSection } from "@/components/general/seasons";
import { ModpackSection } from "@/components/general/modpack";
import { GallerySlider } from "@/components/general/gallery";

export const metadata = {
    title: "Brassworks – Create SMP",
    description: "Our public server thrives on cooperation between players - express your creativity freely, with each other.",
    openGraph: {
        title: "Brassworks – Create SMP",
        description: "Our public server thrives on cooperation between players - express your creativity freely, with each other.",
        url: "https://brassworks.572.at/",
        type: "website",
        images: [
            {
                url: "https://brassworks.572.at/images/logo.png",
                width: 1200,
                height: 630,
                alt: "Brassworks Cover",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Brassworks – Create SMP",
        description: "Our public server thrives on cooperation between players - express your creativity freely, with each other.",
        images: ["https://brassworks.572.at/images/logo.png"],
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