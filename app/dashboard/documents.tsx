"use client"

{/* Chnage for commit, to trigger vercel deploy since vvercel requires pro to support commits byy other users */}

import * as React from "react"

import {
  ArrowDownAZIcon,
  ArrowUpAZIcon,
  DownloadIcon,
  SearchIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

type DocumentType =
  | "PDF"
  | "Image"
  | "Word"
  | "Spreadsheet"
  | "Text"

type DocumentItem = {
  id: string
  document: string
  type: DocumentType
  caseId: string
  entities: number
  createdAt: string
  fileUrl: string
}

const documents: DocumentItem[] = [
  {
    id: "DOC-001",
    document: "Rohan Verma Investigation Report",
    type: "PDF",
    caseId: "CASE-2026-001",
    entities: 18,
    createdAt: "2026-01-08",
    fileUrl: "/documents/rohan-verma-report.pdf",
  },
  {
    id: "DOC-002",
    document: "Financial Transaction Records",
    type: "Spreadsheet",
    caseId: "CASE-2026-002",
    entities: 31,
    createdAt: "2026-02-14",
    fileUrl: "/documents/financial-records.xlsx",
  },
  {
    id: "DOC-003",
    document: "Witness Statement - Suresh Patil",
    type: "Word",
    caseId: "CASE-2026-002",
    entities: 12,
    createdAt: "2026-03-02",
    fileUrl: "/documents/witness-statement.docx",
  },
  {
    id: "DOC-004",
    document: "Organized Crime Network Report",
    type: "PDF",
    caseId: "CASE-2026-004",
    entities: 49,
    createdAt: "2026-03-18",
    fileUrl: "/documents/crime-network-report.pdf",
  },
  {
    id: "DOC-005",
    document: "Vehicle Registration - MH-12-AB-4589",
    type: "Image",
    caseId: "CASE-2026-002",
    entities: 5,
    createdAt: "2026-04-07",
    fileUrl: "/documents/vehicle-registration.jpg",
  },
  {
    id: "DOC-006",
    document: "Cyber Fraud Investigation Notes",
    type: "Text",
    caseId: "CASE-2026-005",
    entities: 27,
    createdAt: "2026-05-11",
    fileUrl: "/documents/cyber-fraud-notes.txt",
  },
  {
    id: "DOC-007",
    document: "Nexus Logistics Financial Report",
    type: "Spreadsheet",
    caseId: "CASE-2026-004",
    entities: 24,
    createdAt: "2026-06-23",
    fileUrl: "/documents/nexus-financial-report.xlsx",
  },
  {
    id: "DOC-008",
    document: "Interstate Network Evidence",
    type: "PDF",
    caseId: "CASE-2026-007",
    entities: 38,
    createdAt: "2026-07-16",
    fileUrl: "/documents/interstate-evidence.pdf",
  },
]

export function Documents() {
  const [search, setSearch] = React.useState("")
  const [sortOrder, setSortOrder] = React.useState<
    "oldest" | "newest"
  >("newest")

  const { translations } = useLanguage()

  const filteredDocuments = React.useMemo(() => {
    const query = search.trim().toLowerCase()

    const result = documents.filter((item) => {
      if (!query) return true

      return (
        item.document.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.caseId.toLowerCase().includes(query)
      )
    })

    return [...result].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()

      return sortOrder === "oldest"
        ? dateA - dateB
        : dateB - dateA
    })
  }, [search, sortOrder])

  function handleDownload(document: DocumentItem) {
    const link = window.document.createElement("a")

    link.href = document.fileUrl
    link.download = document.document
    link.target = "_blank"

    window.document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6 overflow-hidden p-4 lg:p-6">
      <Card className="min-w-0 overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-base">
                {translations.allDocuments}
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                {filteredDocuments.length}{" "}
                {filteredDocuments.length === 1
                  ? translations.documentSingular
                  : translations.documents}{" "}
                {translations.casesFound}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              {/* Search */}
              <div className="relative w-full sm:w-[280px]">
                <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder={translations.searchDocuments}
                  className="pl-9"
                />
              </div>

              {/* Sort */}
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() =>
                  setSortOrder((current) =>
                    current === "newest"
                      ? "oldest"
                      : "newest"
                  )
                }
              >
                {sortOrder === "newest" ? (
                  <ArrowDownAZIcon className="size-4" />
                ) : (
                  <ArrowUpAZIcon className="size-4" />
                )}

                {sortOrder === "newest"
                  ? translations.newest
                  : translations.oldest}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[720px] w-full">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  {/* Document */}
                  <TableHead className="w-[32%] pl-6">
                    {translations.document}
                  </TableHead>

                  {/* Type */}
                  <TableHead className="w-[13%] whitespace-nowrap">
                    {translations.type}
                  </TableHead>

                  {/* Case */}
                  <TableHead className="w-[22%] whitespace-nowrap">
                    {translations.case}
                  </TableHead>

                  {/* Entities */}
                  <TableHead className="w-[13%] text-center">
                    {translations.entitiesCount}
                  </TableHead>

                  {/* Download */}
<TableHead className="w-[12%] text-center">
  {translations.download}
</TableHead>

                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((item) => (
                    <TableRow
                      key={item.id}
                      className="cursor-default"
                    >
                      {/* Document */}
                      <TableCell className="w-[32%] pl-6 font-medium">
                        <div className="truncate pr-4">
                          {item.document}
                        </div>
                      </TableCell>

                      {/* Type */}
                      <TableCell className="w-[13%] whitespace-nowrap">
                        <DocumentTypeBadge
                          type={item.type}
                        />
                      </TableCell>

                      {/* Case */}
                      <TableCell className="w-[22%] whitespace-nowrap">
                        <span className="font-mono text-xs text-muted-foreground">
                          {item.caseId}
                        </span>
                      </TableCell>

                      {/* Entities */}
                      <TableCell className="w-[13%] text-center tabular-nums">
                        {item.entities}
                      </TableCell>

                      {/* Download */}
                      <TableCell className="w-[20%]">
                        <div className="flex justify-end pr-6">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-muted-foreground hover:text-[#0D99FF]"
                            onClick={() =>
                              handleDownload(item)
                            }
                          >
                            <DownloadIcon className="size-4" />

                            <span className="hidden sm:inline">
                              {translations.download}
                            </span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-1">
                        <p className="text-sm font-medium">
                          {translations.noDocumentsFound}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {translations.tryChangingSearch}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DocumentTypeBadge({
  type,
}: {
  type: DocumentType
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium",

        type === "PDF" &&
          "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",

        type === "Image" &&
          "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400",

        type === "Word" &&
          "border-[#0D99FF]/30 bg-[#0D99FF]/10 text-[#0D99FF]",

        type === "Spreadsheet" &&
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",

        type === "Text" &&
          "border-muted-foreground/20 bg-muted text-muted-foreground"
      )}
    >
      <span
        className={cn(
          "mr-1.5 size-1.5 rounded-full",

          type === "PDF" && "bg-red-500",

          type === "Image" && "bg-violet-500",

          type === "Word" && "bg-[#0D99FF]",

          type === "Spreadsheet" && "bg-emerald-500",

          type === "Text" && "bg-muted-foreground"
        )}
      />

      {type}
    </Badge>
  )
}
