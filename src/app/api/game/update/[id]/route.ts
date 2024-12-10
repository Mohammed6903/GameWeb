'use server'
import { createClient } from "@/lib/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, context: any) {
    const data = await request.json();
    const {params} = context;
    const supabase = await createClient();
    try {
        const { name, description, gameUrl, tags, status, providerId, thumbnailUrl, categories } = data;
        const updateData: Record<string, any> = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (gameUrl !== undefined) updateData.play_url = gameUrl;
        if (thumbnailUrl !== undefined) updateData.thumbnail_url = thumbnailUrl;
        if (status !== undefined) updateData.is_active = status === "active";
        if (tags !== undefined) updateData.tags = tags;
        if (categories !== undefined) updateData.categories = categories;
        if (providerId !== undefined) updateData.provider_id = Number(providerId);

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { error: "No fields provided for update." },
                { status: 400 }
            );
        }
        
        const { data: updatedGame, error } = await supabase
            .from("games")
            .update(updateData)
            .eq('id', params.id)

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json({ updatedGame }, { status: 200 });
    } catch (err: any) {
        console.error('Error inserting game:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }

}