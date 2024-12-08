import { Sidebar } from "@/components/admin/Sidebar";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const output = (await supabase).auth.getUser();
  console.log((await output).data.user?.email);
  console.log((await output).data.user);
  if(!(await output).data.user?.email_confirmed_at){
    console.log("email not verified");
  }

  if (!(await output).data.user?.email) {
    return redirect("/sign-in");
  }
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-white border-r"> {/* Added fixed width and background */}
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-8">
        {children}
      </main>
    </div>
  );
}
