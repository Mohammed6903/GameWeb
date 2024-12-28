'use server'

import { createClient } from "@/lib/utils/supabase/server";
import { translateGamesToFormData, ExternalGame } from '@/lib/utils/translator';

/**
 * Saves multiple games to Supabase in a batch operation
 */
export async function saveGames(games: ExternalGame[], providerId: string) {
  const supabase = await createClient();
  const translatedGames = translateGamesToFormData(games, providerId);
  
  try {
    // Convert translated games to the format expected by Supabase
    const gamesToInsert = translatedGames.map(game => ({
      name: game.name,
      description: game.description,
      play_url: game.play_url,
      thumbnail_url: game.thumbnail_url || null,
      is_active: true,
      tags: game.tags || [],
      categories: game.categories || [],
      provider_id: Number(game.provider_id),
    }));

    const { data, error } = await supabase
      .from('games')
      .upsert(gamesToInsert, {onConflict: 'play_url'})
      .select();

    if (error) {
      console.error(`Error inserting games: ${error.message}`);
      throw new Error(`Error inserting games: ${error.message}`);
    }

    return {
      success: true,
      data,
      message: `Successfully saved ${data.length} games`
    };

  } catch (err) {
    console.error('Error saving games:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error occurred',
      message: 'Failed to save games'
    };
  }
}