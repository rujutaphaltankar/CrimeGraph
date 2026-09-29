"use client"

import * as React from "react"
import {
  CheckIcon,
  FileTextIcon,
  UserIcon,
  XIcon,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export type CaseRequest = {
  id: string
  requesterName: string
  requesterRole: string
  caseId: string
  caseTitle: string
  reason: string
  requestedAt: string
}

type CaseRequestCardProps = {
  request: CaseRequest
  onAllow?: (request: CaseRequest) => void
  onReject?: (request: CaseRequest) => void
}

export function CaseRequestCard({
  request,
  onAllow,
  onReject,
}: CaseRequestCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UserIcon className="size-4" />
            </div>

            <div className="min-w-0">
              <CardTitle className="truncate text-sm">
                {request.requesterName}
              </CardTitle>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {request.requesterRole}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg border bg-muted/30 p-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-background">
              <FileTextIcon className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Requested case</p>

              <p className="mt-0.5 font-medium">
                {request.caseTitle}
              </p>

              <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                {request.caseId}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Reason for access
          </p>

          <p className="mt-1 text-sm leading-6">
            {request.reason}
          </p>
        </div>

        <p className="text-xs text-muted-foreground">
          Requested {request.requestedAt}
        </p>
      </CardContent>

      <Separator />

      <CardFooter className="justify-end gap-2 bg-muted/20">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => onReject?.(request)}
        >
          <XIcon className="size-4" />
          Reject
        </Button>

        <Button
          type="button"
          size="sm"
          className="gap-1.5"
          onClick={() => onAllow?.(request)}
        >
          <CheckIcon className="size-4" />
          Allow access
        </Button>
      </CardFooter>
    </Card>
  )
}
