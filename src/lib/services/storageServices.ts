"use client";
import { createClient } from "@/lib/utils/supabase/client";
// import { supabaseAdmin } from "../utils/supabase/admin";

export async function uploadGameThumbnail(file: File): Promise<string> {
    const supabase = await createClient();
    // Return a placeholder URL for mock implementation
    const {data: uploadedFile, error} = await supabase
    .storage
    .from('gameThumbnails')
    .upload(`public/${file.name}-${new Date()}`, file, {
        cacheControl: '3600',
        upsert: false
    });
    if (error) {
        throw new Error(`Error uploading file: ${error}`);
    }

    const {data} = supabase
    .storage
    .from('gameThumbnails')
    .getPublicUrl(`${uploadedFile?.path}`);
    
    return data.publicUrl;
}