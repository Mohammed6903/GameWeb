import { Sidebar } from "@/components/admin/Sidebar";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { createClient as serverClient } from "@/lib/utils/supabase/server";
import { listAllUsers } from "@/lib/controllers/users";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();


  const output = (await supabase).auth.getUser();
  // if ((await output).data.user?.role !== 'supabase_admin') {
  //   return redirect("/permission-denied");
  // }

  // if (!(await output).data.user?.email) {
  //   return redirect("/sign-in");
  // }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-white border-r">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100 hide-scrollbar">
        {children}
      </main>
    </div>
  );
}
