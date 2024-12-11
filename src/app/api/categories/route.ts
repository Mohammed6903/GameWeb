import { createClient } from "@/lib/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
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
      const { data: categories } = await supabase.from('categories').select();

      return NextResponse.json({ categories: categories }, { status: 200 });
    } catch (error) {
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { error: "Unexpected error occurred." },
        { status: 500 }
      );
    }
}