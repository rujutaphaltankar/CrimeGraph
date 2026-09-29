"use client"

import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useLanguage } from "@/components/language-provider"

export type Entity = {
  id: number
  entity: string
  type: string
  directLinks: number
  indirectLinks: number
  caseId: number
}

export function DataTable({
  data,
}: {
  data: Entity[]
}) {
  const { translations } = useLanguage()
  const [pageIndex, setPageIndex] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(10)

  const pageCount = Math.max(
    1,
    Math.ceil(data.length / pageSize)
  )

  const currentPage = Math.min(
    pageIndex,
    pageCount - 1
  )

  const startIndex = currentPage * pageSize
  const endIndex = startIndex + pageSize

  const visibleData = data.slice(
    startIndex,
    endIndex
  )

function handlePageSizeChange(value: string | null) {
  if (value === null) return

  const newPageSize = Number(value)

  setPageSize(newPageSize)
  setPageIndex(0)
}


  function goToPreviousPage() {
    setPageIndex((current) =>
      Math.max(0, current - 1)
    )
  }

  function goToNextPage() {
    setPageIndex((current) =>
      Math.min(pageCount - 1, current + 1)
    )
  }

  function goToFirstPage() {
    setPageIndex(0)
  }

  function goToLastPage() {
    setPageIndex(pageCount - 1)
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="px-4 lg:px-6">
        <div>
          <h2 className="text-lg font-semibold">
            {translations.keyEntities}
          </h2>

          <p className="text-sm text-muted-foreground">
            {translations.entitiesDescription}
          </p>
        </div>
      </div>

      <div className="mx-4 overflow-hidden rounded-lg border lg:mx-6">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>
                {translations.entity}
              </TableHead>

              <TableHead>
                {translations.type}
              </TableHead>

              <TableHead className="text-right">
                {translations.directLinks}
              </TableHead>

              <TableHead className="text-right">
                {translations.indirectLinks}
              </TableHead>

              <TableHead className="text-right">
                {translations.caseId}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {visibleData.length > 0 ? (
              visibleData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.entity}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {item.type}
                  </TableCell>

                  <TableCell className="text-right tabular-nums">
                    {item.directLinks}
                  </TableCell>

                  <TableCell className="text-right tabular-nums">
                    {item.indirectLinks}
                  </TableCell>

                  <TableCell className="text-right tabular-nums">
                    {item.caseId}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center"
                >
                  {translations.noEntitiesFound}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="hidden text-sm text-muted-foreground lg:block">
          {data.length} {translations.entitiesCount}
        </div>

        <div className="flex w-full items-center justify-end gap-6">
          <div className="hidden items-center gap-2 lg:flex">
            <span className="text-sm font-medium">
              {translations.rowsPerPage}
            </span>

            <Select
              value={`${pageSize}`}
              onValueChange={handlePageSizeChange}
              items={[10, 20, 30, 40, 50].map(
                (size) => ({
                  label: `${size}`,
                  value: `${size}`,
                })
              )}
            >
              <SelectTrigger
                size="sm"
                className="w-20"
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {[10, 20, 30, 40, 50].map(
                    (size) => (
                      <SelectItem
                        key={size}
                        value={`${size}`}
                      >
                        {size}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm font-medium">
            {translations.page} {currentPage + 1} {translations.of} {pageCount}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={goToFirstPage}
              disabled={currentPage === 0}
            >
              <ChevronsLeftIcon />
              <span className="sr-only">
                {translations.firstPage}
              </span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
            >
              <ChevronLeftIcon />
              <span className="sr-only">
                {translations.previousPage}
              </span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={goToNextPage}
              disabled={currentPage >= pageCount - 1}
            >
              <ChevronRightIcon />
              <span className="sr-only">
                {translations.nextPage}
              </span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={goToLastPage}
              disabled={currentPage >= pageCount - 1}
            >
              <ChevronsRightIcon />
              <span className="sr-only">
                {translations.lastPage}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
