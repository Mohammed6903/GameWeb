'use client'
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSideBar } from "@/components/AppSideBar";
import { NavBar } from "@/components/NavBar";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import { getMeta } from "@/lib/controllers/meta";
import { useMetadataStore } from "@/hooks/stores/meta";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const { siteName, setSiteName } = useMetadataStore();
  
  useEffect(() => {
    const fetch = async () => {
      const metaResult = await getMeta();
      const metaData = metaResult.status === 200 && metaResult.data ? metaResult.data : {};
      setSiteName(metaData.site_name);
    };
    fetch();
  }, [siteName])

  return (
    <SidebarProvider 
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <div className="flex flex-col w-full min-h-screen bg-[#0f0f1a] text-white">
        <NavBar siteName={siteName}/>
        <div className="flex flex-1 overflow-hidden">
          <AppSideBar siteName={siteName}/>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 transition-all duration-300 ease-in-out">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
}