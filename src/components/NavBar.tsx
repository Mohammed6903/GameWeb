"use client"

import Link from "next/link"
import { Bell, Heart, Search, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useState } from "react"

export function NavBar() {
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  return (
    <header className="sticky p-2 top-0 z-50 border-b border-white/10 bg-purple-700">
      <nav className="flex flex-wrap items-center justify-between h-auto w-full px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-white/80 hover:text-white" />
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-sm font-bold text-white">GG</span>
            </div>
            <span className="font-semibold text-white">GameGrid</span>
          </Link>
        </div>
        
        <div className="hidden sm:flex flex-1 items-center justify-center max-w-lg mx-6">
          <div className="w-full relative group">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-focus-within:text-white/70" />
            <Input
              placeholder="Search games..."
              className="h-9 w-full pl-9 bg-white/10 border-transparent text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="sm:hidden text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <Search className="size-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:inline-flex text-white/80 hover:text-white hover:bg-white/10"
          >
            <Bell className="size-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:inline-flex text-white/80 hover:text-white hover:bg-white/10"
          >
            <Heart className="size-5" />
          </Button>
          <Button 
            size="sm" 
            className="hidden sm:inline-flex ml-1.5 bg-white/20 hover:bg-white/30 text-white font-medium"
          >
            Log in
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="sm:hidden text-white/80 hover:text-white hover:bg-white/10"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </nav>
      {isSearchVisible && (
        <div className="w-full px-4 py-2 sm:hidden">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <Input
              placeholder="Search games..."
              className="h-9 w-full pl-9 bg-white/10 border-transparent text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/20"
            />
          </div>
        </div>
      )}
    </header>
  )
}