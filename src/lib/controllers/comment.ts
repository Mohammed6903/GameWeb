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
          try {
            const { data: userData, error: userError } = await supabase
              .from('user_roles')
              .select('username, email')
              .eq('user_id', comment.user_id)
              .single();
      
            if (!userError && userData?.username) {
              return {
                id: comment.id,
                user: userData.username,
                content: comment.content,
                createdAt: comment.created_at,
              };
            }
      
            const { data: emailUserData, error: emailUserError } = await supabase
              .from('emailUser')
              .select('first_name, last_name')
              .eq('email', userData?.email)
              .single();
      
            if (!emailUserError && (emailUserData?.first_name || emailUserData?.last_name)) {
              const username = [
                emailUserData.first_name,
                emailUserData.last_name
              ]
                .filter(Boolean)  
                .join(' ')       
                .trim();         
      
              return {
                id: comment.id,
                user: username || 'Unknown User',
                content: comment.content,
                createdAt: comment.created_at,
              };
            }
      
            return {
              id: comment.id,
              user: 'Unknown User',
              content: comment.content,
              createdAt: comment.created_at,
            };
      
          } catch (error: any) {
            console.error('Error in username resolution:', error.message);
            return {
              id: comment.id,
              user: 'Unknown User',
              content: comment.content,
              createdAt: comment.created_at,
            };
          }
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