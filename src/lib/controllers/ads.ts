'use server'
import { AdSettings, SavedScript } from "@/app/admin/settings/page";
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

import { JSDOM } from "jsdom";

/**
 * Parse a DOM element as text and get all its attributes in JSON format (Node.js/Server-side).
 * @param elementText - The serialized HTML string of the element.
 * @returns A JSON object containing all attributes of the element.
 */
export async function parseElementAttributesFromText(
    elementText: string
): Promise<{ attributes: Record<string, string>, type: string }> {
    if (typeof elementText !== "string" || !elementText.trim()) {
        throw new Error("Invalid element text provided. Must be a non-empty string.");
    }

    // Use JSDOM to parse the HTML string
    const dom = new JSDOM(elementText.trim());
    const element = dom.window.document.body.firstElementChild;

    if (!element) {
        throw new Error("Invalid HTML structure. Could not parse element.");
    }

    // Extract attributes
    const attributes: Record<string, string> = {};
    for (const attr of element.attributes) {
        attributes[attr.name] = attr.value;
    }

    // Return attributes along with the element type (e.g., div, ins, etc.)
    return {
        attributes,
        type: element.tagName.toLowerCase(),
    };
}

export async function getAllScripts(): Promise<{status: number, data?: SavedScript[], message?: string}> {
    const supabase = await createClient();
    try {
        const {data, error} = await supabase.from('adsense_scripts').select();
        if (error) {
            return {status: 404, message: 'Error fetching adsense scripts'};
        } else {
            return {status: 200, data: data};
        }
    } catch (error: any) {
        return {status: 500, message: 'Internal Error while fetching scripts'};
    }
}

export async function saveScript(saveData: SavedScript): Promise<{status: number, data?: SavedScript, message?: string}> {
    const supabase = await createClient();
    try {
        const {data, error} = await supabase.from('adsense_scripts').upsert({
            name: saveData.name,
            element: saveData.element,
            position: saveData.position,
            script: saveData.script,
            parsedElement: saveData.parsedElement,
            updated_at: new Date().toISOString()
        }, {onConflict: 'name'}).select().single();
        if (data) {
            return {status: 200, data: data};
        } else {
            return {status: 500, message: 'Error upserting the data'};
        }
    } catch (error: any) {
        return {status: 500, message: 'Internal Error while inserting scripts'};
    }
}

export async function deleteScript(id: string): Promise<{status: number, data: any} | {status: number, message: string}> {
    const supabase = await createClient();
    try {
        const {data, error} = await supabase.from('adsense_scripts').delete().match({id: id});
        if (data) {
            return {status: 200, message: 'Successfully deleted the script'};
        } else {
            return {status: 500, message: `Error deleting the script: ${error}`};
        }
    } catch (error: any) {
        return {status: 500, message: `Internal Server Error whilte upserting the script: ${error}`};
    }
}

export async function getScript(id: string): Promise<{status: number, data: any} | {status: number, message: string}> {
    const supabase = await createClient();
    try {
        const {data, error} = await supabase.from('adsense_scripts').select().eq('id', id);
        if (data) {
            return {status: 200, data: data};
        } else {
            return {status: 500, message: `Error fetching the script: ${error}`};
        }
    } catch (error: any) {
        return {status: 500, message: `Internal Server Error whilte fetching the script: ${error}`};
    }
}