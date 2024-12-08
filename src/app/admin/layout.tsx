import { Sidebar } from "@/components/admin/Sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
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
