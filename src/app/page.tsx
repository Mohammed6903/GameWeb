import React from 'react'
import Navbar from '@/components/NavBar';
import { AppSideBar } from '@/components/AppSideBar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
  return (
    <SidebarProvider>
    <Navbar />
    <main className="flex">
      <AppSideBar />
      <div className="flex-1 p-8">
        {/* Your main content goes here */}
      </div>
    </main>
  </SidebarProvider>
  )
}

export default page