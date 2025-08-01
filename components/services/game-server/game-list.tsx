'use client';

import { getGames, platformIcons } from "@/lib/services/gameService";  // Angepasster Import
import { Shuffle } from "lucide-react";
import Tooltip from "@/components/tooltip";

export function GameList() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Games</h2>
          <p className="text-muted-foreground text-lg">
            Explore a variety of popular games ready for instant hosting. Choose your platform and play your way.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {getGames().map((game, idx) => (
            <div
              key={idx}
              className="cursor-pointer bg-neutral-800/60 border border-neutral-700 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2 flex flex-col h-[23rem]"
            >
              <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                <img
                  src={game.gameImage}
                  alt={game.title}
                  className="w-full h-full object-cover absolute top-0 left-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-800/60 to-transparent border-b-[4px]" />
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h3 className="font-semibold text-xl line-clamp-2">{game.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{game.description}</p>

                <div className="flex gap-2 mt-2">
                  {game.platforms.map((platform, i) => {
                    const Icon = platformIcons[platform];
                    return (
                      <Tooltip key={i} text={platform.charAt(0).toUpperCase() + platform.slice(1)}>
                        <Icon className="h-6 w-6 text-green-600" />
                      </Tooltip>
                    );
                  })}
                  {game.crossplay && (
                    <Tooltip text="Crossplay">
                      <Shuffle className="h-6 w-6 text-blue-500" />
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
