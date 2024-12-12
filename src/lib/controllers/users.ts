"user server";
import { createClient } from "@supabase/supabase-js";

// Create the Supabase admin client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Fetch all users from Supabase auth
 */
export async function listAllUsers() {
  try {
    // Query all users from Supabase's `auth.users`
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      console.error("Error fetching users:", error);
      return { error: "Could not fetch users." };
    }

    return { users: data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Unexpected error occurred." };
  }
}