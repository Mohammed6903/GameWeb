'use client'
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSideBar } from "@/components/AppSideBar";
import { NavBar } from "@/components/NavBar";
import { useState } from "react";
import Footer from "@/components/footer";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarProvider 
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
    {isOpen ? (
          <div className="min-h-screen w-full flex flex-col bg-[#0f0f1a] text-white">
            <NavBar />
            <div className="flex flex-grow">
              <AppSideBar visible={true}/>
              <main 
                className={`
                  transition-all duration-300 ease-in-out
                  flex-1 overflow-x-auto w-full
                `}
              >
                {children}
              </main>
            </div>
            <Footer />
          </div>
        ) : (
          <div className="min-h-screen w-full bg-[#0f0f1a] text-white">
            <NavBar />
            <main 
              className={`
                transition-all duration-300 ease-in-out
                overflow-x-auto
              `}
            >
              {children}
            </main>
            <Footer />
          </div>
        )}
    </SidebarProvider>
  );
}