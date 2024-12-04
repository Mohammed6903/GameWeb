// src/app/dashboard/layout.tsx

import { AppSideBar } from "@/components/AppSideBar"; // Sidebar component
import { SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
