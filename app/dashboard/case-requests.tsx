"use client"

import * as React from "react"
import {
  CheckIcon,
  Clock3Icon,
  UserIcon,
  XIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/components/language-provider"

type CaseRequest = {
  id: string
  requesterName: string
  requesterRole: string
  caseId: string
  caseTitle: string
  reason: string
  requestedAt: string
}

const caseRequests: CaseRequest[] = [
  {
    id: "REQ-001",
    requesterName: "Arjun Mehta",
    requesterRole: "Inspector",
    caseId: "CASE-2026-0142",
    caseTitle: "Rohan Verma Investigation",
    reason:
      "I am assisting the investigation team and require access to the case entities and related documents.",
    requestedAt: "12 minutes ago",
  },
  {
    id: "REQ-002",
    requesterName: "Priya Sharma",
    requesterRole: "Sub-Inspector",
    caseId: "CASE-2026-0118",
    caseTitle: "Financial Fraud Investigation",
    reason:
      "The case is connected to an investigation currently assigned to my unit.",
    requestedAt: "34 minutes ago",
  },
  {
    id: "REQ-003",
    requesterName: "Vikram Singh",
    requesterRole: "Inspector",
    caseId: "CASE-2026-0097",
    caseTitle: "Organized Crime Network",
    reason:
      "I need to review the entity relationships relevant to an ongoing investigation.",
    requestedAt: "1 hour ago",
  },
  {
    id: "REQ-004",
    requesterName: "Neha Kapoor",
    requesterRole: "Deputy Inspector",
    caseId: "CASE-2026-0156",
    caseTitle: "Missing Person Investigation",
    reason:
      "Several entities in this case overlap with an investigation currently under my supervision.",
    requestedAt: "2 hours ago",
  },
  {
    id: "REQ-005",
    requesterName: "Rahul Deshmukh",
    requesterRole: "Inspector",
    caseId: "CASE-2026-0084",
    caseTitle: "Cyber Crime Investigation",
    reason:
      "Access is required to compare digital evidence and linked entities with another active case.",
    requestedAt: "3 hours ago",
  },
  {
    id: "REQ-006",
    requesterName: "Ananya Rao",
    requesterRole: "Sub-Inspector",
    caseId: "CASE-2026-0131",
    caseTitle: "Property Fraud Investigation",
    reason:
      "I am working with the regional investigation team and need access to the case documents.",
    requestedAt: "Yesterday",
  },
]

export function CaseRequests() {
  const [requests, setRequests] =
    React.useState<CaseRequest[]>(caseRequests)

  const [showHelp, setShowHelp] = React.useState(false)

  const { translations } = useLanguage()

  function handleAllow(id: string) {
    setRequests((current) =>
      current.filter((request) => request.id !== id)
    )
  }

  function handleReject(id: string) {
    setRequests((current) =>
      current.filter((request) => request.id !== id)
    )
  }

  return (
    <section className="flex flex-col gap-6">
      {/* Request cards */}
      <div className="grid gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
        {requests.map((request) => (
          <Card
            key={request.id}
            className="group flex h-full flex-col overflow-hidden transition-colors hover:border-primary/30"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UserIcon className="size-5" />
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

                <Badge
                  variant="outline"
                  className="shrink-0 border-primary/20 bg-primary/5 text-primary"
                >
                  {translations.accessRequest}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
              {/* Requested case */}
              <div className="border-y py-3">
                <p className="text-xs font-medium text-muted-foreground">
                  {translations.requestedCase}
                </p>

                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <p className="truncate text-sm font-medium">
                    {request.caseTitle}
                  </p>

                  <p className="shrink-0 font-mono text-[11px] text-muted-foreground">
                    {request.caseId}
                  </p>
                </div>
              </div>

              {/* Reason */}
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {translations.reason}
                </p>

                <p className="mt-1 text-sm leading-5 text-foreground/80">
                  {request.reason}
                </p>
              </div>

              {/* Request time */}
              <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock3Icon className="size-3.5" />
                  {translations.requested} {request.requestedAt}
                </div>

                <span className="font-mono">{request.id}</span>
              </div>
            </CardContent>

            <Separator />

            {/* Actions */}
            <CardFooter className="justify-end gap-2 bg-muted/20">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => handleReject(request.id)}
              >
                <XIcon className="size-3.5" />
                {translations.reject}
              </Button>

              <Button
                type="button"
                size="sm"
                className="gap-1.5"
                onClick={() => handleAllow(request.id)}
              >
                <CheckIcon className="size-3.5" />
                {translations.allow}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {requests.length === 0 && (
        <div className="mx-4 rounded-xl border border-dashed p-10 text-center lg:mx-6">
          <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-muted">
            <CheckIcon className="size-5 text-muted-foreground" />
          </div>

          <h3 className="mt-3 text-sm font-medium">
            {translations.noPendingRequests}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {translations.allRequestsReviewed}
          </p>
        </div>
      )}

      {/* Floating help button */}
<Button
  type="button"
  variant="outline"
  size="icon"
  className="fixed bottom-6 right-6 z-50 size-16 rounded-full bg-background text-lg font-semibold shadow-lg transition-colors hover:bg-muted"
  onClick={() => setShowHelp(true)}
  aria-label="Help"
>
  ?
</Button>


      {/* Help modal */}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Case Access Requests</DialogTitle>
          </DialogHeader>

          <p className="text-sm leading-6 text-muted-foreground">
            These are the requsts sent by officers in the police station for
            accesing data to a case which they arent assigned to. For cases
            regietered in differnt police station the SHO must get access to
            case data first by foloowing govt procedures.
          </p>
        </DialogContent>
      </Dialog>
    </section>
  )
}
