'use server'
import { createClient } from "../utils/supabase/server";

export const likeGame = async (gameId: number, userId: string) => {
    const supabase = await createClient();
    try {
        const response = await supabase.from('likes_dislikes').upsert({
            user_id: userId,
            game_id: gameId,
            is_like: true
        }, {onConflict: 'user_id, game_id'})
        if (response.error) {
            console.error(`Error liking the game: ${response.error.message}`)
        }
        return {status: 200, message: 'successfully liked the game'}
    } catch (error: any) {
        console.error(`Unexpected error: ${error.message}`)
    }
}

export const dislikeGame = async (gameId: number, userId: string) => {
    const supabase = await createClient();
    try {
        const response = await supabase.from('likes_dislikes').upsert({
            user_id: userId,
            game_id: gameId,
            is_like: false
        }, {onConflict: 'user_id, game_id'})
        if (response.error) {
            console.error(`Error disliking the game: ${response.error}`)
        }
        return {status: 200, message: 'successfully disliked the game'}
    } catch (error: any) {
        console.error(`Unexpected error: ${error.message}`)
    }
}

const getLikedGames = async (userId: string) => {
    const supabase = await createClient();
    try {
        const response = await supabase
            .from('likes_dislikes')
            .select('gameId')
            .eq('userId', userId)
            .eq('is_like', true);

        if (response.error) {
            console.error(`Error fetching liked games: ${response.error.message}`);
            return null;
        }

        return response.data;
    } catch (error: any) {
        console.error(`Unexpected error: ${error.message}`);
        return null;
    }
};

export const getLikedGameDetails = async (userId: string) => {
    const supabase = await createClient();
    try {
        const likedGamesResponse = await supabase
            .from('likes_dislikes')
            .select('game_id')
            .eq('user_id', userId)
            .eq('is_like', true);

        if (likedGamesResponse.error) {
            console.error(`Error fetching liked games: ${likedGamesResponse.error.message}`);
            return null;
        }

        const gameIds = likedGamesResponse.data.map(item => item.game_id);

        const gamesResponse = await supabase
            .from('games')
            .select('*')
            .in('id', gameIds);

        if (gamesResponse.error) {
            console.error(`Error fetching game details: ${gamesResponse.error.message}`);
            return null;
        }

        return gamesResponse.data;
    } catch (error: any) {
        console.error(`Unexpected error: ${error.message}`);
        return null;
    }
};


export const getLikedOrDisliked = async (gameId: number, userId: string) => {
    const supabase = await createClient();
    try {
        const response = await supabase.from('likes_dislikes').select('is_like')
                        .eq('user_id', userId)
                        .eq('game_id', gameId)
                        .single()
        if (response.error && (response.status !== 406)) {
            console.error(`Error fetching like or dislike info: ${response.error.message}`);
            return null;
        }
        return response.data;
    } catch (error: any) {
      console.error(`Error fetching like or dislikes: ${error.status} ${error.message}`);
      return null
    }
}