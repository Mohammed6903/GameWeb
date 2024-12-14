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

export async function getUsedCategories() {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from('games')
            .select('categories')
            .not('categories', 'is', null);

        if (error) {
            throw new Error(`Error fetching categories: ${error.message}`);
        }

        // Flatten the categories array and count occurrences
        const categoryCounts: { [key: string]: number } = {};

        data.forEach((game) => {
            if (Array.isArray(game.categories)) { // Ensure it's an array
                game.categories.forEach((category: string) => {
                    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
                });
            }
        });

        const sortedCategories = Object.entries(categoryCounts)
            .map(([category, count]) => ({ category, count }))
            .sort((a, b) => b.count - a.count);

        return sortedCategories;
    } catch (error) {
        console.error('Error fetching used categories:', error);
        return [];
    }
}
