// 'use client'
// import { Calendar, Home, Inbox, Search, Settings, History, Sparkles, Flame, RefreshCw } from 'lucide-react'
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarHeader,
//   useSidebar
// } from "@/components/ui/sidebar"
// import { useEffect, useState } from 'react'
// import { getUsedCategories } from '@/lib/controllers/categories'
// import { toast, Toaster } from 'sonner'

// const mainNavItems = [
//   { name: "Recently Played", url: "/recent", icon: History },
//   { name: "New Games", url: "/new", icon: Sparkles },
//   { name: "Trending", url: "/trending", icon: Flame },
//   { name: "Updated", url: "/updated", icon: RefreshCw },
// ]

// const items = [
//   { name: "Action", url: "/search/Action", icon: Home },
//   { name: "Adventure", url: "#", icon: Inbox },
//   { name: "Arcade", url: "#", icon: Calendar },
//   { name: "Board Game", url: "#", icon: Search },
//   { name: "Dress-up", url: "#", icon: Settings },
//   { name: "Driving", url: "#", icon: Settings },
//   { name: "Multiplayer", url: "#", icon: Settings },
//   { name: "Puzzles", url: "#", icon: Settings },
//   { name: "Sports", url: "#", icon: Settings },
// ]

// export function AppSideBar() {
//   const [categories, setCategories] = useState<{category:string, count: number}[]>();
//   const { open } = useSidebar();

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await getUsedCategories();
//       console.log(res)
//       if (res?.[0] === null){
//         toast('OOPS! It seems that there are no games added yet!');
//       }
//       setCategories(res);
//     };
//     fetch();
//   }, [])

//   return (
//     <Sidebar className={`${open ? 'w-64' : 'w-0 md:w-16'} transition-all duration-300 ease-in-out`}>
//       <SidebarHeader className="bg-purple-700" />
//       <SidebarContent className="bg-purple-700">
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu className="text-white">
//               {mainNavItems.map((item) => (
//                 <SidebarMenuItem key={item.name}>
//                   <SidebarMenuButton asChild>
//                     <a href={item.url} className="flex items-center gap-2">
//                       <item.icon className="size-5" />
//                       <span className={`block`}>{item.name}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         <SidebarGroup>
//           <SidebarGroupLabel className={`text-white ${open || 'md:hidden' ? '' : 'hidden'}`}>Categories</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem className="text-white" key={item.name}>
//                   <SidebarMenuButton asChild>
//                     <a href={item.url} className="flex items-center gap-2">
//                       <item.icon className="size-5" />
//                       <span className={`block`}>{item.name}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <Toaster position='bottom-right' />
//     </Sidebar>
//   )
// }

'use client'

import { History, Sparkles, Flame, RefreshCw } from 'lucide-react'
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
import { useEffect, useState } from 'react'
import { getUsedCategories } from '@/lib/controllers/categories'
import { toast, Toaster } from 'sonner'

const mainNavItems = [
  { name: "Recently Played", url: "/recent", icon: History },
  { name: "New Games", url: "/new", icon: Sparkles },
  { name: "Trending", url: "/trending", icon: Flame },
  { name: "Updated", url: "/updated", icon: RefreshCw },
]

export function AppSideBar() {
  const [categories, setCategories] = useState<{category:string, count: number}[]>([]);
  const { open } = useSidebar();

  useEffect(() => {
    const fetch = async () => {
      const res = await getUsedCategories();
      if (res?.[0] === null){
        toast('OOPS! It seems that there are no games added yet!');
      } else {
        setCategories(res);
      }
    };
    fetch();
  }, [])

  return (
    <Sidebar 
      className={`
        ${open ? 'w-64' : 'w-0 md:w-16'} 
        transition-all duration-300 ease-in-out 
        bg-purple-900
        text-white
        shadow-xl
      `}
    >
      <SidebarHeader className="h-16 flex items-center justify-center border-b bg-purple-700 border-purple-700/50">
        <h1 className={`
          text-2xl font-bold text-white
          ${open ? 'opacity-100' : 'opacity-0 md:opacity-100'} 
          transition-opacity duration-300
        `}>
          GameHub
        </h1>
      </SidebarHeader>
      <SidebarContent className='bg-purple-700 custom-scrollbar'>
        <SidebarGroup>
          <SidebarGroupLabel className={`
            text-white/90 font-semibold px-4 py-2 text-sm
            ${open ? '' : 'md:hidden'}
          `}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="
                      flex items-center gap-3 py-2.5 px-4 
                      rounded-lg hover:bg-purple-800/50
                      transition-colors duration-200
                      text-white/90 hover:text-white
                    ">
                      <item.icon className="size-5 flex-shrink-0" />
                      <span className={`
                        ${open ? 'opacity-100' : 'opacity-0 md:opacity-100'} 
                        transition-opacity duration-300 whitespace-nowrap
                      `}>
                        {item.name}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className={`
            text-white/90 font-semibold px-4 py-2 text-sm
            ${open ? '' : 'md:hidden'}
          `}>
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((item) => (
                <SidebarMenuItem key={item.category}>
                  <SidebarMenuButton asChild>
                    <a href={`/categories/${item.category}`} className="
                      flex items-center justify-between py-2.5 px-4 
                      rounded-lg hover:bg-purple-800/50
                      transition-colors duration-200
                      text-white/90 hover:text-white
                      group
                    ">
                      <span className={`
                        ${open ? 'opacity-100' : 'opacity-0 md:opacity-100'} 
                        transition-opacity duration-300 whitespace-nowrap
                      `}>
                        {item.category}
                      </span>
                      <span className={`
                        text-sm bg-purple-800/50 px-2 py-0.5 rounded-md
                        text-white/75 group-hover:text-white
                        ${open ? 'opacity-100' : 'opacity-0 md:opacity-100'} 
                        transition-all duration-300
                      `}>
                        {item.count}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Toaster position='bottom-right' />
    </Sidebar>
  )
}