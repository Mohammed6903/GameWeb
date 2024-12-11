'use server'
import { NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";

export async function GET(request: Request, context: any) {
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
        const res = await supabase.from('games').select().eq('id', params.id).single();
        return NextResponse.json({ game: res.data }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}