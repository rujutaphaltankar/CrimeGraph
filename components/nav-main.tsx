"use client"

import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import type { AppView } from "@/components/app-sidebar"
import { useLanguage } from "@/components/language-provider"

export interface NavMainItem {
  title: string
  view: AppView
  icon?: React.ReactNode
}

interface NavMainProps {
  items: NavMainItem[]
  activeView: AppView
  onViewChange: (view: AppView) => void
}

export function NavMain({
  items,
  activeView,
  onViewChange,
}: NavMainProps) {
  const { translations } = useLanguage()

  const labels: Record<AppView, string> = {
    overview: translations.overview,
    graph: translations.graph,
    "ai-chat": translations.aiChat,
    cases: translations.cases,
    entities: translations.entities,
    documents: translations.documents,
    "case-requests": translations.caseRequests,
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.view}>
              <SidebarMenuButton
                tooltip={labels[item.view]}
                isActive={activeView === item.view}
                onClick={() => onViewChange(item.view)}
              >
                {item.icon}
                <span>{labels[item.view]}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
