"use client"

import * as React from "react"
import Link from "next/link"

import { AppSidebar, type AppView } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { AIChat } from "@/app/dashboard/ai-chat"
import { CaseRequests } from "./case-requests"
import { Entities } from "./entities"
import { Cases } from "./cases"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Documents } from "./documents"
import { Graph } from "./graph"
import { LanguageProvider } from "@/components/language-provider"
import data from "./data.json"

export default function Page() {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  )
}

function DashboardContent() {
  const [activeView, setActiveView] =
    React.useState<AppView>("overview")
  const [showWelcome, setShowWelcome] = React.useState(true)

  return (
    <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
      <AppSidebar
        variant="inset"
        activeView={activeView}
        onViewChange={setActiveView}
      />

      <SidebarInset className="min-h-svh md:me-0">
        <SiteHeader activeView={activeView} />

        <main className="flex min-h-0 flex-1 flex-col">
          <div className="@container/main flex min-h-0 flex-1 flex-col">

            {/* ==================== OVERVIEW ==================== */}
            {activeView === "overview" && (
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <SectionCards />

                  <div className="px-4 lg:px-6">
                    <ChartAreaInteractive />
                  </div>

                  <DataTable data={data} />
                </div>
              </div>
            )}

            {/* ==================== AI CHAT ==================== */}
            {activeView === "ai-chat" && (
              <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
                <AIChat />
              </div>
            )}

            {/* ==================== GRAPH ==================== */}
            {activeView === "graph" && (
              <div className="flex h-full min-h-0 min-w-0 flex-1 overflow-hidden">
                <Graph />
              </div>
            )}

            {/* ==================== CASES ==================== */}
            {activeView === "cases" && (
              <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
                <Cases />
              </div>
            )}

            {/* ==================== ENTITIES ==================== */}
            {activeView === "entities" && (
              <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
                <Entities />
              </div>
            )}

            {/* ==================== DOCUMENTS ==================== */}
            {activeView === "documents" && (
              <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
                <Documents />
              </div>
            )}

            {/* ==================== CASE REQUESTS ==================== */}
            {activeView === "case-requests" && (
              <div className="flex flex-1 items-center justify-center p-6">
                <CaseRequests />
              </div>
            )}

          </div>
        </main>
      </SidebarInset>

      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Welcome</DialogTitle>
            <DialogDescription className="space-y-3 pt-2 leading-6">
              <span className="block">
                This static demo shows the CrimeGraph WebApp for SHO (Station House
                Officer).
              </span>
              <span className="block">
                You can change the language by clicking on Profile at the
                bottom. The UI is adaptive for mobile screens as well.
              </span>
              <span className="block">
                An in-depth explanation of the idea is available in the
                documentation.
              </span>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Link
              href="/docs"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              View documentation
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
