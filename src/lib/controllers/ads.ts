'use server'
import { AdSettings } from "@/app/admin/settings/page";
import { createClient } from "../utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Fetch ad settings from the database.
 * @returns {Promise<{data: any, error: any}>}
 */
export async function getAdSettings(): Promise<{data: any, error: PostgrestError | null | any}> {
    const supabase = await createClient()
    try {
        const { data, error } = await supabase
        .from('ad_settings')
        .select('*')
        .single();

        if (error) {
            console.error('Error fetching ad settings:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (error) {
        console.error('Unexpected error fetching ad settings:', error);
        return { data: null, error };
    }
}

/**
 * Update ad settings in the database.
 * @param {object} adSettings - The updated ad settings object.
 * @returns {Promise<{data: any, error: any}>}
 */
export async function updateAdSettings(adSettings: AdSettings) {
    const supabase = await createClient()
    try {
        const {data: lastSetting, error: previousError} = await supabase.from('ad_settings').select('*').single();
        if (previousError) {
            console.error('Error getting last setting: ', previousError);
        }
        else if (lastSetting) {
            console.log(lastSetting);
            const { data, error } = await supabase
            .from('ad_settings')
            .update(adSettings)
            .eq('id', lastSetting.id);
            if (error) {
                console.error('Error updating ad settings:', error);
                return { data: null, error };
            }
        }
        const { data, error } = await supabase
        .from('ad_settings')
        .insert(adSettings)
        if (error) {
            console.error('Error updating ad settings:', error);
            return { data: null, error };
        } else {
            return { lastSetting, error: null };
        }

    } catch (error) {
        console.error('Unexpected error updating ad settings:', error);
        return { data: null, error };
    }
}