'use server'
import { createClient } from "@/lib/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, context: any) {
    const data = await request.json();
    const {params} = context;
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const {data: roleData, error: roleError} = await supabase.from('user_roles').select('role').eq('user_id', user.data.user?.id).single();
    if (!(user.data.user?.role === "authenticated")){
      return NextResponse.json(
        {error: "Not Signed In"},
        {status: 405}
      )
    } else if (roleData?.role === "user") {
      return NextResponse.json(
        {error: "Not allowed on this route"},
        {status: 405}
      )
    }
    try {
        const { name, description, play_url, tags, status, provider_id, thumbnailUrl, categories } = data;
        const updateData: Record<string, any> = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (play_url !== undefined) updateData.play_url = play_url;
        if (thumbnailUrl !== undefined) updateData.thumbnail_url = thumbnailUrl;
        if (status !== undefined) updateData.is_active = status === "active";
        if (tags !== undefined) updateData.tags = tags;
        if (categories !== undefined) updateData.categories = categories;
        if (provider_id !== undefined) updateData.provider_id = Number(provider_id);

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