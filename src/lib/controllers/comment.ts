"use server"
import { createClient } from "../utils/supabase/server";

export const fetchComments = async (gameId: number) => {
    const supabase = await createClient();
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('id, user_id, content, created_at')
        .eq('game_id', gameId)
        .order('created_at', { ascending: false });
  
      if (error) {
        throw new Error(error.message);
      }
  
      // Fetch usernames for each comment
      const commentsWithUsernames = await Promise.all(
        data.map(async (comment) => {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('email')
            .eq('id', comment.user_id)
            .single();
  
          if (userError) {
            console.error('Error fetching username:', userError.message);
            return {
              id: comment.id,
              user: 'Unknown',  
              content: comment.content,
              createdAt: comment.created_at,
            };
          }
  
          return {
            id: comment.id,
            user: userData?.email || 'Unknown', 
            content: comment.content,
            createdAt: comment.created_at,
          };
        })
      );
  
      return commentsWithUsernames;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  };
  

export const postComment = async (gameId: number, content: string) => {
    const supabase = await createClient();
    
    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            console.error('Error getting user:', userError?.message);
            return { error: 'User not authenticated' };
        }

        const { data, error } = await supabase
            .from('comments')
            .insert({
                user_id: user.id,
                game_id: Number(gameId),
                content: content,
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            console.error('Error posting comment:', error.message);
            return { error: 'Unable to post comment' };
        }

        return { data };
    } catch (error) {
        console.error('Unexpected error posting comment:', error);
        return { error: 'Unexpected error' };
    }
}