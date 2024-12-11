'use server'
import { createClient } from "../utils/supabase/server";

export const getAllTags = async ():Promise<any[]> => {
    const supabase = await createClient();
    try {
        const user = (await supabase.auth.getUser()).data.user;
        const { data, error } = await supabase.from('tags').select('tag');
          if (error) {
          throw new Error(`Error getting tags: ${error.message}`);
        }
        return data;
    } catch (err) {
        console.error('Error getting tags:', err);
        throw err;
    }
}

export const addTag = async (tag: string) => {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase.from('tags').insert({
            tag: tag
        }).select();
          if (error) {
          throw new Error(`Error inserting tag: ${error.message}`);
        }
        return data;
    } catch (err) {
        console.error('An unexpected error occured while inserting tag:', err);
        throw err;
    }
}