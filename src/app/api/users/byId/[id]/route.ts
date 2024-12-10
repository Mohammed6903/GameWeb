import { supabaseAdmin } from "@/lib/utils/supabase/admin";
import { createClient } from "@/lib/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
      // Query all users from Supabase's auth users table
    //   const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    const supabase = await createClient();
    //   const {data: users} = await supabase.from('users').select();
    const { data: users } = await supabase.from('users').select();
  
    //   if (error) {
    //     console.error("Error fetching users:", error);
    //     return NextResponse.json(
    //       { error: "Could not fetch users." },
    //       { status: 500 }
    //     );
    //   }
  
      // Send users list as JSON on success
      return NextResponse.json({ users: users }, { status: 200 });
    } catch (error) {
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { error: "Unexpected error occurred." },
        { status: 500 }
      );
    }
  }
  