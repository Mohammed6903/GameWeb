import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSideBar } from "@/components/AppSideBar";
import { NavBar } from "@/components/NavBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex flex-col bg-[#0f0f1a] text-white">
        <NavBar />
        <div className="flex flex-grow">
          <AppSideBar />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
