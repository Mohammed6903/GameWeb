'use server'
import { FetchedGameData, Game, GameFormData } from '@/types/games';
import { createClient } from "../utils/supabase/server";

// Mock games data
const mockGames: Game[] = [
  {
    id: '1',
    name: 'Space Invaders',
    description: 'Classic arcade space shooting game',
    play_url: 'https://example.com/space-invaders',
    thumbnail_url: 'https://via.placeholder.com/150',
    status: "active",
    tags: ['Arcade', 'Shooter'],
    categories: ['2 player games', 'game for kids'],
    provider_id: '1',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '2',
    name: 'Puzzle Master',
    description: 'Challenging puzzle game with multiple levels',
    play_url: 'https://example.com/puzzle-master',
    thumbnail_url: 'https://via.placeholder.com/150',
    status: "active",
    tags: ['Puzzle', 'Strategy'],
    categories: ['2 player games', 'game for kids'],
    provider_id: '1',
    created_at: new Date(),
    updated_at: new Date()
  }
];

export async function addGame(gameData: GameFormData) {
  const supabase = await createClient();
  try{
    const { data, error } = await supabase.from('games').insert({
      name: gameData.name,
      description: gameData.description,
      play_url: gameData.play_url,
      thumbnail_url: gameData.thumbnail_url || null,
      is_active: (gameData.status === 'active' ? true : false),
      tags: gameData.tags,
      categories: gameData.categories,
      provider_id: Number(gameData.provider_id),
    }).select().single();

    if (error) {
      throw new Error(`Error inserting game: ${error.message}`);
    } else {
      return data;
    }
  } catch (err) {
    console.error('Error adding game:', err);
    throw err;
  }
}

export async function updateGame(
  gameId: string, 
  gameData: Partial<GameFormData>
): Promise<Game> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('games')
      .update({
        name: gameData.name,
        description: gameData.description,
        play_url: gameData.play_url,
        thumbnail_url: gameData.thumbnail_url || null,
        is_active: (gameData.status === 'active' ? true : false),
        tags: gameData.tags,
        categories: gameData.categories,
        provider_id: gameData.provider_id,
        updated_at: new Date()
      })
      .eq('id', gameId)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating game: ${error.message}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error updating game:', error);
    throw error;
  }
}

export async function deleteGame(gameId: string): Promise<void> {
  const index = mockGames.findIndex(game => game.id === gameId);
  if (index !== -1) {
    mockGames.splice(index, 1);
  }
}

export async function getAllGames(): Promise<FetchedGameData[]> {
  const supabase = await createClient();
  const {data, error} = await supabase.from('games').select('*');
  if (error) {
    throw Error(`Error fetching all games.`);
  } else {    
    return data;
  }
}

export async function getGameById(gameId: string) {
  const supabase = await createClient();
  try {
    const game = await supabase.from('games').select().eq('id', gameId).single();
    if (game.error) {
      throw new Error(`Error fetching game: ${game.error}`)
    }
    return game.data;
  } catch (error) {
    throw new Error(`Error fetching game: ${error}`);
  }
}

function capitalizeFirstLetter(str: string): string {
  if (!str) return str; // Handle empty or null strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export async function getGamesByCategory(category: string, { page = 1, limit = 10 } = {}) {
  const supabase = await createClient();
  try {
    const cat = capitalizeFirstLetter(category);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: capData, error: capErr, count: capCount } = await supabase
    .from('games')
    .select('*', { count: 'exact' })
    .contains('categories', [category])
    .range(from, to);
    
    if (capErr) {
      const { data, error, count } = await supabase
        .from('games')
        .select('*', { count: 'exact' })
        .contains('categories', [cat])
        .range(from, to);
      if (error) {
        throw new Error(`Error fetching games: ${capErr.message}`);
      }
      return { games: data, total: count };
    } else {
      return {games: capData, total: capCount}
    }
  } catch (error: any) {
    throw new Error(`Error fetching games: ${error.message}`);
  }
}

export async function getGameStats() {
  return {
    totalGames: mockGames.length,
    activeGames: mockGames.filter(game => game.status === 'active').length,
    inactiveGames: mockGames.filter(game => game.status === 'active').length
  };
}