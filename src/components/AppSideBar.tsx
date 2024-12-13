import { Calendar, Home, Inbox, Search, Settings, History, Sparkles, Flame, RefreshCw } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar
} from "@/components/ui/sidebar"

const mainNavItems = [
  { name: "Recently Played", url: "/recent", icon: History },
  { name: "New Games", url: "/new", icon: Sparkles },
  { name: "Trending", url: "/trending", icon: Flame },
  { name: "Updated", url: "/updated", icon: RefreshCw },
]

const items = [
  { name: "Action", url: "/search/Action", icon: Home },
  { name: "Adventure", url: "#", icon: Inbox },
  { name: "Arcade", url: "#", icon: Calendar },
  { name: "Board Game", url: "#", icon: Search },
  { name: "Dress-up", url: "#", icon: Settings },
  { name: "Driving", url: "#", icon: Settings },
  { name: "Multiplayer", url: "#", icon: Settings },
  { name: "Puzzles", url: "#", icon: Settings },
  { name: "Sports", url: "#", icon: Settings },
]

export function AppSideBar() {
  const { open } = useSidebar();

  return (
    <Sidebar className={`${open ? 'w-64' : 'w-0 md:w-16'} transition-all duration-300 ease-in-out`}>
      <SidebarHeader className="bg-purple-700" />
      <SidebarContent className="bg-purple-700">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="text-white">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="size-5" />
                      <span className={`block`}>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={`text-white ${open || 'md:hidden' ? '' : 'hidden'}`}>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="text-white" key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="size-5" />
                      <span className={`block`}>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}