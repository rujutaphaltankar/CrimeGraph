import seedEntities from "@/app/dashboard/data.json"
import { z } from "zod"

export const entityTypeSchema = z.enum([
  "Person",
  "Organization",
  "Phone Number",
  "Email",
  "Location",
  "Vehicle",
  "IP Address",
  "Account",
])

export const entitySchema = z.object({
  id: z.string(),
  entity: z.string().min(1),
  type: entityTypeSchema,
  directLinks: z.number().int().nonnegative(),
  indirectLinks: z.number().int().nonnegative(),
  caseId: z.string().min(1),
})

export const createEntitySchema = z.object({
  entity: z.string().trim().min(1).max(200),
  type: entityTypeSchema,
  caseId: z.string().trim().min(1).max(100),
})

export type Entity = z.infer<typeof entitySchema>
export type CreateEntity = z.infer<typeof createEntitySchema>

const seededEntities: Entity[] = seedEntities.map((item) =>
  entitySchema.parse({
    id: `ENT-${String(item.id).padStart(3, "0")}`,
    entity: item.entity,
    type: item.type,
    directLinks: item.directLinks,
    indirectLinks: item.indirectLinks,
    caseId: String(item.caseId),
  })
)

type EntityStore = {
  entities: Entity[]
}

const globalStore = globalThis as typeof globalThis & {
  crimeGraphEntityStore?: EntityStore
}

const store: EntityStore =
  globalStore.crimeGraphEntityStore ?? { entities: structuredClone(seededEntities) }

if (process.env.NODE_ENV !== "production") {
  globalStore.crimeGraphEntityStore = store
}

export function listEntities(filters: { search?: string; type?: string; caseId?: string }) {
  const search = filters.search?.toLowerCase()

  return store.entities.filter((entity) => {
    const matchesSearch =
      !search ||
      entity.entity.toLowerCase().includes(search) ||
      entity.id.toLowerCase().includes(search)
    const matchesType = !filters.type || entity.type === filters.type
    const matchesCase = !filters.caseId || entity.caseId === filters.caseId

    return matchesSearch && matchesType && matchesCase
  })
}

export function createEntity(input: CreateEntity): Entity {
  const nextId = store.entities.length + 1
  const entity: Entity = {
    id: `ENT-${String(nextId).padStart(3, "0")}`,
    entity: input.entity,
    type: input.type,
    directLinks: 0,
    indirectLinks: 0,
    caseId: input.caseId,
  }

  store.entities.push(entity)
  return entity
}