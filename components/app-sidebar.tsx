"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  ChartNetworkIcon,
  ClipboardListIcon,
  CommandIcon,
  FileTextIcon,
  FolderIcon,
  LayoutDashboardIcon,
  MessageCircleIcon,
  UsersIcon,
} from "lucide-react"

export type AppView =
  | "overview"
  | "graph"
  | "ai-chat"
  | "cases"
  | "entities"
  | "documents"
  | "case-requests"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeView: AppView
  onViewChange: (view: AppView) => void
}

const data = {
  user: {
    name: "Ramesh Wagh",
    email: "SHO - Thane Police Station",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Overview",
      view: "overview" as AppView,
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Graph",
      view: "graph" as AppView,
      icon: <ChartNetworkIcon />,
    },
    {
      title: "AI Chat",
      view: "ai-chat" as AppView,
      icon: <MessageCircleIcon />,
    },
    {
      title: "Cases",
      view: "cases" as AppView,
      icon: <FolderIcon />,
    },
    {
      title: "Entities",
      view: "entities" as AppView,
      icon: <UsersIcon />,
    },
    {
      title: "Documents",
      view: "documents" as AppView,
      icon: <FileTextIcon />,
    },
    {
      title: "Case Requests",
      view: "case-requests" as AppView,
      icon: <ClipboardListIcon />,
    },
  ],
}

export function AppSidebar({
  activeView,
  onViewChange,
  ...props
}: AppSidebarProps) {
  const { isMobile, setOpenMobile } = useSidebar()

  function handleViewChange(view: AppView) {
    onViewChange(view)

    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              onClick={() => handleViewChange("overview")}
            >
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">
                CrimeGraph AI
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain
          items={data.navMain}
          activeView={activeView}
          onViewChange={handleViewChange}
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
