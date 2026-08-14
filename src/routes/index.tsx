import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/general/Header.tsx";
import { HeroSection } from "../components/general/HeroSection.tsx";
import { CreationsSection } from "../components/general/CreationsSection.tsx";
import { ModsSection } from "../components/general/ModsSection.tsx";
import { TeamSection } from "../components/general/TeamSection.tsx";
import { NewsSection } from "../components/general/NewsSection.tsx";
import { MediaSection } from "../components/general/MediaSection.tsx";

export const Route = createFileRoute("/")({ component: IndexRoute });

function IndexRoute() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <CreationsSection />
                <ModsSection />
                <TeamSection />
                <NewsSection />
                <MediaSection />
            </main>
        </>
    );
}
