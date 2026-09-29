"use client"

import * as React from "react"

import {
  ArrowDownAZIcon,
  ArrowUpAZIcon,
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

type EntityType =
  | "Person"
  | "Organization"
  | "Vehicle"
  | "Location"
  | "Phone"
  | "Account"

type EntityItem = {
  id: string
  entity: string
  type: EntityType
  directLinks: number
  indirectLinks: number
  caseId: string
  createdAt: string
}

const entities: EntityItem[] = [
  {
    id: "ENT-001",
    entity: "Rohan Verma",
    type: "Person",
    directLinks: 12,
    indirectLinks: 27,
    caseId: "CASE-2026-001",
    createdAt: "2026-01-08",
  },
  {
    id: "ENT-002",
    entity: "Apex Trading Pvt Ltd",
    type: "Organization",
    directLinks: 8,
    indirectLinks: 19,
    caseId: "CASE-2026-001",
    createdAt: "2026-01-15",
  },
  {
    id: "ENT-003",
    entity: "MH-12-AB-4589",
    type: "Vehicle",
    directLinks: 5,
    indirectLinks: 14,
    caseId: "CASE-2026-002",
    createdAt: "2026-02-14",
  },
  {
    id: "ENT-004",
    entity: "Suresh Patil",
    type: "Person",
    directLinks: 9,
    indirectLinks: 21,
    caseId: "CASE-2026-002",
    createdAt: "2026-03-02",
  },
  {
    id: "ENT-005",
    entity: "Pune Central Bank",
    type: "Organization",
    directLinks: 6,
    indirectLinks: 11,
    caseId: "CASE-2026-003",
    createdAt: "2026-03-18",
  },
  {
    id: "ENT-006",
    entity: "John Doe",
    type: "Person",
    directLinks: 4,
    indirectLinks: 9,
    caseId: "CASE-2026-003",
    createdAt: "2026-04-07",
  },
  {
    id: "ENT-007",
    entity: "MH-14-CD-7821",
    type: "Vehicle",
    directLinks: 7,
    indirectLinks: 16,
    caseId: "CASE-2026-004",
    createdAt: "2026-04-21",
  },
  {
    id: "ENT-008",
    entity: "Nexus Logistics",
    type: "Organization",
    directLinks: 11,
    indirectLinks: 24,
    caseId: "CASE-2026-004",
    createdAt: "2026-05-11",
  },
  {
    id: "ENT-009",
    entity: "Priya Sharma",
    type: "Person",
    directLinks: 3,
    indirectLinks: 8,
    caseId: "CASE-2026-005",
    createdAt: "2026-06-23",
  },
  {
    id: "ENT-010",
    entity: "Central Pune",
    type: "Location",
    directLinks: 15,
    indirectLinks: 32,
    caseId: "CASE-2026-005",
    createdAt: "2026-07-16",
  },
  {
    id: "ENT-011",
    entity: "+91 98765 43210",
    type: "Phone",
    directLinks: 6,
    indirectLinks: 13,
    caseId: "CASE-2026-006",
    createdAt: "2026-08-02",
  },
  {
    id: "ENT-012",
    entity: "ACME Bank Account 4821",
    type: "Account",
    directLinks: 10,
    indirectLinks: 22,
    caseId: "CASE-2026-007",
    createdAt: "2026-08-19",
  },
]

export function Entities() {
  const [search, setSearch] = React.useState("")
  const [sortOrder, setSortOrder] = React.useState<
    "oldest" | "newest"
  >("newest")
  const { translations } = useLanguage()

  const filteredEntities = React.useMemo(() => {
    const query = search.trim().toLowerCase()

    const result = entities.filter((item) => {
      if (!query) return true

      return (
        item.entity.toLowerCase().includes(query) ||
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

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6 overflow-hidden p-4 lg:p-6">
      <Card className="min-w-0 overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-base">
                {translations.allEntities}
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                {filteredEntities.length}{" "}
                {filteredEntities.length === 1
                  ? translations.entitySingular
                  : translations.entitiesCount}{" "}
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
                  placeholder={translations.searchEntities}
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
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="pl-6">
                    {translations.entity}
                  </TableHead>

                  <TableHead>
                    {translations.type}
                  </TableHead>

                  <TableHead className="text-center">
                    {translations.directLinks}
                  </TableHead>

                  <TableHead className="text-center">
                    {translations.indirectLinks}
                  </TableHead>

                  <TableHead className="pr-6">
                    {translations.caseId}
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredEntities.length > 0 ? (
                  filteredEntities.map((item) => (
                    <TableRow
                      key={item.id}
                      className="cursor-default"
                    >
                      <TableCell className="pl-6 font-medium">
                        {item.entity}
                      </TableCell>

                      <TableCell>
                        <EntityTypeBadge type={item.type} />
                      </TableCell>

                      <TableCell className="text-center tabular-nums">
                        {item.directLinks}
                      </TableCell>

                      <TableCell className="text-center tabular-nums">
                        {item.indirectLinks}
                      </TableCell>

                      <TableCell className="pr-6 font-mono text-xs text-muted-foreground">
                        {item.caseId}
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
                          {translations.noEntitiesFoundDetailed}
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

function EntityTypeBadge({
  type,
}: {
  type: EntityType
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium",
        type === "Person" &&
          "border-[#0D99FF]/30 bg-[#0D99FF]/10 text-[#0D99FF]",

        type === "Organization" &&
          "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400",

        type === "Vehicle" &&
          "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",

        type === "Location" &&
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",

        type === "Phone" &&
          "border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",

        type === "Account" &&
          "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400"
      )}
    >
      <span
        className={cn(
          "mr-1.5 size-1.5 rounded-full",

          type === "Person" &&
            "bg-[#0D99FF]",

          type === "Organization" &&
            "bg-violet-500",

          type === "Vehicle" &&
            "bg-amber-500",

          type === "Location" &&
            "bg-emerald-500",

          type === "Phone" &&
            "bg-cyan-500",

          type === "Account" &&
            "bg-purple-500"
        )}
      />

      {type}
    </Badge>
  )
}
