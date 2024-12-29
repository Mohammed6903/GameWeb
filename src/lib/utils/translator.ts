import { Game } from '@/types/games';
import { ExternalGame } from '@/types/games';

function stringToArray(str?: string): string[] {
    if (!str) return [];
    return str
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
}  

/**
 * Translates external API game data to the internal Supabase schema format
 * @param game Game data from external API (GamePix or GameMonetize)
 * @param providerId The ID of the provider (e.g., 'gamepix' or 'gamemonetize')
 * @returns Formatted game data matching the Supabase schema
 */
export function translateGameData(game: ExternalGame, providerId: string): Game {
  // Initialize categories array
  let categories: string[] = [];
  
  // Handle categories logic
  if (game.categories && Array.isArray(game.categories)) {
    // For GamePix API which already provides categories as an array
    categories = [...game.categories];
  } else if (game.category && typeof game.category === 'string') {
    // For GameMonetize API which provides categories as comma-separated string
    // Split the string, trim whitespace, and filter out empty strings
    categories = game.category
      .split(',')
      .map(cat => cat.trim())
      .filter(cat => cat.length > 0);
  }
  
  // If category exists and isn't in categories array, add it
  if (game.category && !categories.includes(game.category)) {
    categories.push(game.category);
  }

  const tags = stringToArray(game.tags);

  // Create the translated game object
  const translatedGame: Game = {
    id: game.id,
    name: game.title,
    description: game.description,
    thumbnail_url: game.thumbnailUrl || undefined,
    play_url: game.url,
    tags: tags || undefined,
    provider_id: providerId,
    categories: categories,
    status: "active", // Default status
    created_at: new Date(),
    updated_at: new Date()
  };

  return translatedGame;
}

/**
 * Batch translates multiple games
 * @param games Array of games from external API
 * @param providerId The ID of the provider
 * @returns Array of translated games
 */
export function translateGames(games: ExternalGame[], providerId: string): Game[] {
  return games.map(game => translateGameData(game, providerId));
}

/**
 * Translates game data for form usage
 * @param game Game data from external API
 * @param providerId The ID of the provider
 * @returns GameFormData object
 */
export function translateToGameFormData(game: ExternalGame, provider: string): Omit<Game, 'id' | 'created_at' | 'updated_at'> {
  const translatedGame = translateGameData(game, provider);
  
  // Omit id, created_at, and updated_at for form data
  const { id, created_at, updated_at, ...formData } = translatedGame;
  
  return formData;
}

export function translateGamesToFormData(games: ExternalGame[], providerId: string): Omit<Game, 'id' | 'created_at' | 'updated_at'>[] {
    return games.map(game => translateToGameFormData(game, providerId));
}