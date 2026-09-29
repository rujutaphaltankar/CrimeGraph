import { NextResponse } from "next/server"

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "crimegraph",
    storage: "demo-memory",
    productionReady: false,
    timestamp: new Date().toISOString(),
  })
}