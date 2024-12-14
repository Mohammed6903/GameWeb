"user server";
import { createClient } from "../utils/supabase/server";
import { supabaseAdmin } from "../utils/supabase/admin";
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