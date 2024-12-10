'use server'
import { createClient } from "@/lib/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();
    const supabase = await createClient();
    try {
        const { name, description, gameUrl, tags, status, providerId, thumbnailUrl, categories } = data;
        
        const { data: newGame, error } = await supabase
            .from('games')
            .insert({
                name: name,
                description: description,
                play_url: gameUrl,
                thumbnail_url: thumbnailUrl,
                is_active: (status === 'active' ? true : false),
                tags: tags,
                categories: categories,
                provider_id: Number(providerId),
            })
            .select();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json({ newGame }, { status: 200 });
    } catch (err: any) {
        console.error('Error inserting game:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }

}