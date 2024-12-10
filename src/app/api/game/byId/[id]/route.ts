'use server'
import { NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";

export async function GET(request: Request, context: any) {
    const {params} = context;
    const supabase = await createClient();
    try {
        const res = await supabase.from('games').select().eq('id', params.id).single();
        return NextResponse.json({ game: res.data }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}