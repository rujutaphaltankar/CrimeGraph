import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import type { AppView } from "@/components/app-sidebar"
import { useLanguage } from "@/components/language-provider"

export function SiteHeader({ activeView }: { activeView: AppView }) {
  const { translations } = useLanguage()
  const titles: Record<AppView, string> = {
    overview: translations.overview,
    graph: translations.graph,
    "ai-chat": translations.aiChat,
    cases: translations.cases,
    entities: translations.entities,
    documents: translations.documentsView,
    "case-requests": translations.caseRequestsView,
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ms-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <h1 className="text-base font-medium">{titles[activeView]}</h1>
      </div>
    </header>
  )
}
