"use client"

import Link from "next/link"
import { Bell, Heart, Search, Menu, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOutAction } from "@/lib/actions/authActions"

interface publicUserSchema {
  id: string,
  first_name: any,
  last_name: any
}

export function NavBar() {
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [user, setUser] = useState<any>();
  const [emailInfo, setEmailInfo] = useState<any>();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await supabase.auth.getUser();
      if (response.error) {
        setUser(null);
      } else {
        console.log("Setting user:", response.data.user);
        setUser(response.data.user);
      }
    };
  
    fetchUser();
  }, [supabase]); // Ensure supabase is included as a dependency if it can change.
  
  useEffect(() => {
    const fetchEmailInfo = async () => {
      if (user?.app_metadata.provider === "email") {
        const response = await supabase
          .from("emailUser")
          .select("first_name, last_name")
          .eq("email", user?.email)
          .single();
  
        if (response.error || !response.data) {
          console.error("Error fetching email info:", response.error);
          setUser(null);
        } else {
          setEmailInfo({
            id: user?.id,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
          });
          console.log("Email Info:", {
            id: user?.id,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
          });
        }
      }
    };
  
    if (user) {
      fetchEmailInfo();
    }
  }, [user, supabase]);
  


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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata.avatar_url} alt={'User Photo'} />
                    <AvatarFallback>{emailInfo ? emailInfo.first_name?.[0] : user.user_metadata.name?.[0]}{emailInfo && emailInfo.last_name?.[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                <DropdownMenuItem className="flex-col items-start">
                  <div className="text-sm font-medium">{emailInfo ? (emailInfo.first_name + " " + emailInfo.last_name) : user.user_metadata.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={async () => await signOutAction()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              size="sm" 
              className="hidden sm:inline-flex ml-1.5 bg-white/20 hover:bg-white/30 text-white font-medium"
              onClick={() => router.push('/sign-in')}
            >
              Sign In
            </Button>
          )}
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