'use server'
import { FetchedGameData, Game, GameFormData } from '@/types/games';
import { createClient } from "../utils/supabase/server";

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

export async function deleteGame(gameId: string) {
  const supabase = await createClient();
  
  try {
    const { error } = await supabase
      .from('games')
      .delete()
      .eq('id', gameId);

    if (error) {
      console.error(`Error deleting game: ${error.message}`);
    }

    return {status: 200, message: 'Deleted game successfully!'};
  } catch (err) {
    console.error('Error deleting game:', err);
    return {status: 500, message: 'Error deleting game'};
  }
}

export async function getAllGames(): Promise<FetchedGameData[]> {
  const supabase = await createClient();
  const {data, error} = await supabase.from('games').select('*').eq('is_active', true);
  if (error) {
    throw Error(`Error fetching all games.`);
  } else {    
    return data;
  }
}

export async function getPaginatedGames(page: number, pageSize: number): Promise<FetchedGameData[]> {
  const supabase = await createClient();
  
  const offset = (page - 1) * pageSize;

  const { data, error } = await supabase
    .from('games')
    .select('*')
    .range(offset, offset + pageSize - 1);

  if (error) {
    throw new Error(`Error fetching games: ${error.message}`);
  } else {
    return data as FetchedGameData[];
  }
}

export async function getTotalGamesCount(): Promise<number> {
  const supabase = await createClient();
  
  const { count, error } = await supabase
    .from('games')
    .select('*', { count: 'exact', head: true });

  if (error) {
    throw new Error(`Error fetching total games count: ${error.message}`);
  }

  return count || 0;
}

export async function getActiveGamesCount(): Promise<number> {
  const supabase = await createClient();
  
  const { count, error } = await supabase
    .from('games')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  if (error) {
    throw new Error(`Error fetching total games count: ${error.message}`);
  }

  return count || 0;
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
    .eq('is_active', true)
    .contains('categories', [category])
    .range(from, to);
    
    if (capErr) {
      const { data, error, count } = await supabase
        .from('games')
        .select('*', { count: 'exact' })
        .eq('is_active', true)
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

// export async function getGameStats() {
//   return {
//     totalGames: mockGames.length,
//     activeGames: mockGames.filter(game => game.status === 'active').length,
//     inactiveGames: mockGames.filter(game => game.status === 'active').length
//   };
// }
export async function fetchWeeklyGamePlays() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('game_plays')
    .select('play_date, play_count')
    .gte('play_date', new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('play_date', { ascending: true });

  if (error) {
    console.error('Error fetching weekly game plays:', error);
    return [];
  }

  // Aggregate plays by date
  const aggregatedData: { date: string; totalPlays: number }[] = [];

  data.forEach((row) => {
    const existingDate = aggregatedData.find((d) => d.date === row.play_date);
    if (existingDate) {
      existingDate.totalPlays += row.play_count;
    } else {
      aggregatedData.push({ date: row.play_date, totalPlays: row.play_count });
    }
  });

  return aggregatedData;
}


export async function updateGamePlays(gameId: number) {
  const supabase = await createClient();

  try {
    const currentDate = new Date().toISOString().split('T')[0];

    // Check if the record already exists
    const { data: existingPlay, error: fetchError } = await supabase
      .from('game_plays')
      .select('play_count')
      .eq('game_id', gameId)
      .eq('play_date', currentDate)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // Ignore "Row not found" error
      throw new Error(fetchError.message);
    }

    if (existingPlay) {
      // Increment play count if record exists
      const { error: incrementError } = await supabase.rpc('increment_play_count', {
        game_id_param: gameId,
        play_date_param: currentDate,
      });

      if (incrementError) {
        throw new Error(incrementError.message);
      }
    } else {
      // Insert new record if it doesn't exist
      const { error: insertError } = await supabase
        .from('game_plays')
        .insert([
          {
            game_id: gameId,
            play_date: currentDate,
            play_count: 1,
          },
        ]);

      if (insertError) {
        throw new Error(insertError.message);
      }
    }

    return { status: 200 };
  } catch (error: any) {
    return { error: error.message };
  }
}

export const getGameBySlug = async (slug: string) => {
  const game = await getGameById(slug);
  return game;
}