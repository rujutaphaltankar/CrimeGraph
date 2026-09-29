"use client"

import * as React from "react"
import {
  ArrowDownAZIcon,
  ArrowUpAZIcon,
  SearchIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

type CaseStatus = "Active" | "Pending" | "Closed"

type CaseItem = {
  id: string
  title: string
  totalDocuments: number
  totalEntities: number
  assignedTo: string
  status: CaseStatus
  createdAt: string
}

const cases: CaseItem[] = [
  {
    id: "CASE-2026-001",
    title: "Rohan Verma Investigation",
    totalDocuments: 24,
    totalEntities: 18,
    assignedTo: "Inspector Arjun Singh",
    status: "Active",
    createdAt: "2026-01-08",
  },
  {
    id: "CASE-2026-002",
    title: "Financial Network Analysis",
    totalDocuments: 42,
    totalEntities: 31,
    assignedTo: "SI Priya Sharma",
    status: "Active",
    createdAt: "2026-02-14",
  },
  {
    id: "CASE-2026-003",
    title: "Missing Person Investigation",
    totalDocuments: 17,
    totalEntities: 12,
    assignedTo: "Inspector Vikram Rao",
    status: "Pending",
    createdAt: "2026-03-02",
  },
  {
    id: "CASE-2026-004",
    title: "Organized Crime Network",
    totalDocuments: 67,
    totalEntities: 49,
    assignedTo: "ACP Neha Kapoor",
    status: "Active",
    createdAt: "2026-03-18",
  },
  {
    id: "CASE-2026-005",
    title: "Cyber Fraud Investigation",
    totalDocuments: 36,
    totalEntities: 27,
    assignedTo: "SI Rahul Mehta",
    status: "Closed",
    createdAt: "2026-04-07",
  },
  {
    id: "CASE-2026-006",
    title: "Property Fraud Network",
    totalDocuments: 29,
    totalEntities: 21,
    assignedTo: "Inspector Arjun Singh",
    status: "Pending",
    createdAt: "2026-05-11",
  },
  {
    id: "CASE-2026-007",
    title: "Interstate Criminal Network",
    totalDocuments: 53,
    totalEntities: 38,
    assignedTo: "ACP Neha Kapoor",
    status: "Active",
    createdAt: "2026-06-23",
  },
  {
    id: "CASE-2026-008",
    title: "Extortion Investigation",
    totalDocuments: 19,
    totalEntities: 15,
    assignedTo: "SI Priya Sharma",
    status: "Closed",
    createdAt: "2026-07-16",
  },
]

export function Cases() {
  const [search, setSearch] = React.useState("")
  const [sortOrder, setSortOrder] = React.useState<"oldest" | "newest">(
    "newest"
  )
  const { translations } = useLanguage()

  const filteredCases = React.useMemo(() => {
    const query = search.trim().toLowerCase()

    const result = cases.filter((item) => {
      if (!query) return true

      return (
        item.id.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.assignedTo.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
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

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6 overflow-hidden p-4 lg:p-6">

      <Card className="min-w-0 overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-base">{translations.allCases}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                {filteredCases.length}{" "}
                {filteredCases.length === 1 ? translations.case : translations.cases} {translations.casesFound}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              {/* Search */}
              <div className="relative w-full sm:w-[280px]">
                <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={translations.searchCases}
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
                    current === "newest" ? "oldest" : "newest"
                  )
                }
              >
                {sortOrder === "newest" ? (
                  <ArrowDownAZIcon className="size-4" />
                ) : (
                  <ArrowUpAZIcon className="size-4" />
                )}

                {sortOrder === "newest" ? translations.newest : translations.oldest}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="pl-6">{translations.caseId}</TableHead>
                  <TableHead>{translations.title}</TableHead>
                  <TableHead className="text-center">
                    {translations.totalDocuments}
                  </TableHead>
                  <TableHead className="text-center">
                    {translations.totalEntities}
                  </TableHead>
                  <TableHead>{translations.assignedTo}</TableHead>
                  <TableHead className="pr-6">{translations.status}</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredCases.length > 0 ? (
                  filteredCases.map((item) => (
                    <TableRow
                      key={item.id}
                      className="cursor-default"
                    >
                      <TableCell className="pl-6 font-medium">
                        {item.id}
                      </TableCell>

                      <TableCell>
                        <span className="font-medium">
                          {item.title}
                        </span>
                      </TableCell>

                      <TableCell className="text-center tabular-nums">
                        {item.totalDocuments}
                      </TableCell>

                      <TableCell className="text-center tabular-nums">
                        {item.totalEntities}
                      </TableCell>

                      <TableCell>
                        {item.assignedTo}
                      </TableCell>

                      <TableCell className="pr-6">
                        <StatusBadge status={item.status} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-1">
                        <p className="text-sm font-medium">
                          {translations.noCasesFound}
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

function StatusBadge({ status }: { status: CaseStatus }) {
  const { translations } = useLanguage()
  const label = status === "Active"
    ? translations.active
    : status === "Pending"
      ? translations.pending
      : translations.closed

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium",
        status === "Active" &&
          "border-[#0D99FF]/30 bg-[#0D99FF]/10 text-[#0D99FF]",
        status === "Pending" &&
          "border-amber-500/30 bg-amber-500/10 text-amber-600",
        status === "Closed" &&
          "border-muted-foreground/20 bg-muted text-muted-foreground"
      )}
    >
      <span
        className={cn(
          "mr-1.5 size-1.5 rounded-full",
          status === "Active" && "bg-[#0D99FF]",
          status === "Pending" && "bg-amber-500",
          status === "Closed" && "bg-muted-foreground"
        )}
      />
      {label}
    </Badge>
  )
}
