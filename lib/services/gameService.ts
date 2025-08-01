// services/gameService.ts

import { Monitor, Gamepad2, Smartphone, LucideIcon } from "lucide-react";

// ----------------------------------------
// 🔹 Types
// ----------------------------------------

export type Platform = "desktop" | "console" | "mobile";

export interface Game {
  title: string;
  description: string;
  platforms: Platform[];
  crossplay: boolean;
  gameImage: string;
}

// ----------------------------------------
// 🔹 Icon mapping for platforms
// ----------------------------------------

export const platformIcons: Record<Platform, LucideIcon> = {
  desktop: Monitor,
  console: Gamepad2,
  mobile: Smartphone,
};

// ----------------------------------------
// 🔹 In-memory state (resets on reload)
// ----------------------------------------

let games: Game[] = [
  {
    title: "Minecraft",
    description: "Endless creativity in blocky worlds. Host your own adventures.",
    platforms: ["desktop", "console", "mobile"],
    crossplay: true,
    gameImage: "/images/minecraft.jpg",
  },
];

// ----------------------------------------
// 🔹 Cache variable for games list
// ----------------------------------------

let cachedGames: Game[] | null = null;

// ----------------------------------------
// 🔹 Global price in Zenth for all games
// ----------------------------------------

export const defaultPrice = 500;
export const price3Days = 100;

// ----------------------------------------
// 🔹 Service functions with cache mechanism
// ----------------------------------------

/**
 * Returns all games.
 * Uses cache if available, otherwise loads fresh and caches.
 */
export const getGames = (): Game[] => {
  if (cachedGames) {
    console.log("[Cache] getGames: returning cached games");
    return cachedGames;
  }
  console.log("[Load] getGames: loading fresh games");
  cachedGames = [...games];
  return cachedGames;
};

/**
 * Finds a game by title.
 * Uses getGames() to utilize cache.
 */
export const getGameByTitle = (title: string): Game | undefined => {
  const allGames = getGames();
  return allGames.find(game => game.title === title);
};

/**
 * Adds a new game and updates the cache.
 */
export const addGame = (newGame: Game): void => {
  games.push(newGame);
  cachedGames = [...games];
  console.log(`[Update] addGame: game "${newGame.title}" added, cache updated`);
};

/**
 * Updates an existing game by title and updates the cache.
 */
export const updateGame = (updatedGame: Game): void => {
  games = games.map(game => (game.title === updatedGame.title ? updatedGame : game));
  cachedGames = [...games];
  console.log(`[Update] updateGame: game "${updatedGame.title}" updated, cache updated`);
};

/**
 * Deletes a game by title and updates the cache.
 */
export const deleteGame = (title: string): void => {
  games = games.filter(game => game.title !== title);
  cachedGames = [...games];
  console.log(`[Update] deleteGame: game "${title}" deleted, cache updated`);
};