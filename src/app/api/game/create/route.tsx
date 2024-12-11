'use server'
import { createClient } from "@/lib/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();
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
        
        const { data: newGame, error } = await supabase
            .from('games')
            .insert({
                name: name,
                description: description,
                play_url: play_url,
                thumbnail_url: thumbnailUrl,
                is_active: (status === 'active' ? true : false),
                tags: tags,
                categories: categories,
                provider_id: Number(provider_id),
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