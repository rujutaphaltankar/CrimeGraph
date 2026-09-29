import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import {
  createEntity,
  createEntitySchema,
  entityTypeSchema,
  listEntities,
} from "@/lib/server/entities"

const querySchema = z.object({
  search: z.string().optional(),
  type: entityTypeSchema.optional(),
  caseId: z.string().optional(),
})

export function GET(request: NextRequest) {
  const query = querySchema.safeParse({
    search: request.nextUrl.searchParams.get("search") ?? undefined,
    type: request.nextUrl.searchParams.get("type") ?? undefined,
    caseId: request.nextUrl.searchParams.get("caseId") ?? undefined,
  })

  if (!query.success) {
    return NextResponse.json(
      { error: "Invalid entity filters", details: query.error.flatten() },
      { status: 400 }
    )
  }

  return NextResponse.json({ data: listEntities(query.data) })
}

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 })
  }

  const input = createEntitySchema.safeParse(body)

  if (!input.success) {
    return NextResponse.json(
      { error: "Invalid entity", details: input.error.flatten() },
      { status: 400 }
    )
  }

  return NextResponse.json({ data: createEntity(input.data) }, { status: 201 })
}