import { GameList } from "@/components/services/game-server/game-list";
import { HeroSection } from "@/components/services/game-server/hero-section";


export default function GamesPage() {
    return (
      <div className="relative mx-auto">
        <HeroSection></HeroSection>
        <GameList></GameList>
      </div>
    );
}