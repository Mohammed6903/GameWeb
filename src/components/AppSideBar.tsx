import { Calendar, Home, Inbox, Search, Settings,History, Sparkles, Flame, RefreshCw } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader
} from "@/components/ui/sidebar"


const mainNavItems = [
  {
    title: "Recently Played",
    url: "/recent",
    icon: History,
  },
  {
    title: "New Games",
    url: "/new",
    icon: Sparkles,
  },
  {
    title: "Trending",
    url: "/trending",
    icon: Flame,
  },
  {
    title: "Updated",
    url: "/updated",
    icon: RefreshCw,
  },
]

// Menu items.
const items = [
  {
    title: "Action",
    url: "#",
    icon: Home,
  },
  {
    title: "Adventure",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Arcade",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Board Game",
    url: "#",
    icon: Search,
  },
  {
    title: "Dress-up",
    url: "#",
    icon: Settings,
  },
  {
    title: "Driving",
    url: "#",
    icon: Settings,
  },
  {
    title: "Multiplayer",
    url: "#",
    icon: Settings,
  },
  {
    title: "Puzzles",
    url: "#",
    icon: Settings,
  },
  {
    title: "Sports",
    url: "#",
    icon: Settings,
  },
]

export function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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
