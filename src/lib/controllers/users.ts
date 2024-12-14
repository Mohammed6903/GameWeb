"use server";
import { createClient } from "../utils/supabase/server";
import { supabaseAdmin } from "../utils/supabase/admin";
import { User } from "@supabase/supabase-js";

export type ListUsersResponse = {
  users: User[];
  total: number;
};

/**
 * Fetch users from Supabase auth with pagination
 * @param {number} page - The page number to fetch
 * @param {number} pageSize - The number of users to fetch per page
 */
export async function listAllUsers(page = 1, pageSize = 10): Promise<ListUsersResponse | {error: string}> {
  try {
    // Query users from Supabase's `auth.users` with pagination
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage: pageSize,
    });

    if (error) {
      console.error("Error fetching users:", error);
      return { error: "Could not fetch users." };
    }

    // Fetch roles for each user and add them to the user data
    const usersWithRoles = await Promise.all(data.users.map(async (item) => {
      // Fetch role for each user from 'user_roles' table
      const { data: roleData, error: roleError } = await supabaseAdmin
        .from('user_roles')
        .select('role')
        .eq('user_id', item.id)
        .single();

      if (roleError) {
        console.error(`Error fetching role for user ${item.id}:`, roleError);
        item.role = undefined; // Assign null if there is an error fetching the role
      } else {
        item.role = roleData?.role || null; // Assign role if found, otherwise null
      }

      return item;
    }));

    return { users: usersWithRoles, total: Math.ceil(data.total/pageSize) };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Unexpected error occurred." };
  }
}

export async function promoteUser(id: string) {
  const supabase = await createClient();
  try {
    const { data: user, error: fetchError } = await supabase
      .from('user_roles')
      .select('id, role')
      .eq('user_id', id)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    // Only promote if the user is not already an admin
    if (user.role === "admin") {
      throw new Error("User is already an admin.");
    }

    // Update the role to 'admin'
    const { error: updateError } = await supabaseAdmin
      .from('user_roles')
      .update({ role: 'admin' })
      .eq('user_id', id);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return { success: true, message: "User promoted to admin successfully." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteUser(id: string) {
  const supabase = await createClient();
  try {
    const { data: user, error: fetchError } = await supabase
      .from('user_roles')
      .select('id, role')
      .eq('user_id', id)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    if (user.role === "admin") {
      throw new Error("Can't delete admin users.");
    }

    const { data, error: updateError } = await supabaseAdmin
      .auth.admin.deleteUser(id)

    if (updateError) {
      throw new Error(updateError.message);
    }

    return { success: true, message: "User promoted to admin successfully." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}