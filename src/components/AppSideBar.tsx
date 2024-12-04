import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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
      <SidebarContent>
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
