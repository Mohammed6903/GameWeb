'use server'
import { createClient } from "../utils/supabase/server";


export const getAllCategories = async ():Promise<any[]> => {
    const supabase = await createClient();
    try {
        const user = (await supabase.auth.getUser()).data.user;
        const { data, error } = await supabase.from('categories').select('category');
          if (error) {
          throw new Error(`Error getting categories: ${error.message}`);
        }
        return data;
    } catch (err) {
        console.error('Error getting categories:', err);
        throw err;
    }
}

export const addCategory = async (category: string) => {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase.from('categories').insert({
            category: category
        }).select();
          if (error) {
          throw new Error(`Error inserting category: ${error.message}`);
        }
        return data;
    } catch (err) {
        console.error('An unexpected error occured while inserting category:', err);
        throw err;
    }
}