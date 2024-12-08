import { AppSideBar } from "@/components/AppSideBar";
import { SidebarProvider, SidebarTrigger,SidebarInset } from "@/components/ui/sidebar";
import {NavBar} from "@/components/NavBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen w-full bg-[#0f0f1a]">
        <NavBar />
        <div className="flex">
          <AppSideBar />
          <main className="flex-1">
            <SidebarInset className="min-h-[calc(100vh-3.5rem)]">
              {children}
            </SidebarInset>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )


}