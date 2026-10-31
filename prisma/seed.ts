import { hash } from "bcryptjs"

import { prisma } from "../lib/prisma"

async function main() {
  const station = await prisma.station.upsert({
    where: { code: "CEN-001" },
    update: {},
    create: {
      name: "Central Police Station",
      code: "CEN-001",
    },
  })

  const passwordHash = await hash("admin123", 10)

  await prisma.user.upsert({
    where: { email: "admin@crimegraph.local" },
    update: {
      name: "System Administrator",
      role: "SYSTEM_ADMIN",
      stationId: station.id,
      passwordHash,
    },
    create: {
      name: "System Administrator",
      email: "admin@crimegraph.local",
      passwordHash,
      role: "SYSTEM_ADMIN",
      stationId: station.id,
    },
  })

  const existingCase = await prisma.case.findFirst({
    where: { title: "Demo investigation - 2026" },
  })

  if (!existingCase) {
    await prisma.case.create({
      data: {
        title: "Demo investigation - 2026",
        status: "active",
        stationId: station.id,
      },
    })
  }

  console.log("Database seeded with a default station and admin user.")
}

main()
  .catch((error) => {
    console.error("Seed failed", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
