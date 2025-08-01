'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";
import { getGames, platformIcons } from "@/lib/services/gameService";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-idx") || "0");
            setVisibleItems((prev) => [...prev, idx]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".card-item").forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const filteredGames = getGames().filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGameClick = (gameTitle: string) => {
    setIsDropdownOpen(false);
    setSearchQuery("");
    router.push(`/services/game-server/${gameTitle.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-green-950" />
        <div className="absolute inset-0 bg-[url('/images/minecraft.jpg')] bg-cover bg-center opacity-60 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container relative z-10 text-center max-w-2xl px-4">
        <div className={`space-y-6 ${loaded ? "animate-fadeIn" : "opacity-0"}`}>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Our <span className="text-green-400">Game Server</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Pick your favorite game and set up your perfect server. Whether it's for you <br />
            and your friends, or an entire community, we've got you covered.
          </p>

          {/* Suchfeld */}
          <div className="pt-6 relative w-full max-w-md mx-auto" ref={dropdownRef}>
            <Input
              type="text"
              placeholder="Search for a game (e.g., Minecraft, ARK, Rust...)"
              className="text-base px-4 py-[1.3rem]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
            />
            {isDropdownOpen && searchQuery && filteredGames.length > 0 && (
              <div className="absolute z-20 w-full bg-neutral-800/90 backdrop-blur-sm border border-neutral-700 rounded-md shadow-md max-h-64 overflow-y-auto">
                {filteredGames.map((game, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 hover:bg-neutral-700/50 cursor-pointer transition-colors"
                    onClick={() => handleGameClick(game.title)}
                  >
                    <img
                      src={game.gameImage}
                      alt={game.title}
                      className="w-10 h-10 object-cover rounded m-2"
                    />
                    <div className="flex items-center justify-between w-full pr-3">
                      <h3 className="font-semibold text-lg">{game.title}</h3>
                      <div className="flex gap-2">
                        {game.platforms.map((platform, i) => {
                          const Icon = platformIcons[platform];
                          return <Icon key={i} className="h-5 w-5 text-green-600" />;
                        })}
                        {game.crossplay && <Shuffle className="h-5 w-5 text-blue-500" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>


          {/* Karten */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-sm text-left max-w-[52.5rem] mx-auto">
            {[
              { title: "10+ Games", subtitle: "Host all your favorite titles anytime" },
              { title: "General Plan", subtitle: "Enjoy all games with a single plan" },
              { title: "24/7 Uptime", subtitle: "Non stop action, always online" }
            ].map((item, idx) => (
              <div
                key={idx}
                data-idx={idx}
                className={`card-item bg-black/30 backdrop-blur-sm p-4 rounded-lg transition-all duration-500 ${
                  visibleItems.includes(idx) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="text-green-400 font-bold text-xl">{item.title}</div>
                <div className="text-muted-foreground">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}