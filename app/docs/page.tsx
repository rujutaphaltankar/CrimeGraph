"use client"

import * as React from "react"
import { ArrowRight, X } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

/* ================================================================
   TYPES
================================================================ */

type NodeId =
  | "newData"
  | "criminalDB"
  | "ingestion"
  | "graphDB"
  | "prediction"
  | "graphView"
  | "insights"
  | "webapp"
  | "admin"
  | "policeStation"
  | "sho"
  | "io"

const nodeText: Record<NodeId, string> = {
  newData: "New Data",
  criminalDB: "Govt Criminal DB",
  ingestion: "Ingestion Pipeline",
  graphDB: "Graph DB",
  prediction: "Prediction pipeline",
  graphView: "Graph View",
  insights: "Insights",
  webapp: "Crimegraph Webapp",
  admin: "Highest Level Admin",
  policeStation: "Police Station",
  sho: "SHO",
  io: "IO",
}

/* ================================================================
   DRAW.IO → SVG COORDINATE TRANSLATION

   Original diagram coordinates:
   x center = 1274
   prediction = 1119
   insights = 1429

   We translate the whole diagram left by 800px.
================================================================ */

const SHIFT_X = 800
const FLOW_LINE_WIDTH = 2

const CENTER = 1274 - SHIFT_X
const PREDICTION = 1119 - SHIFT_X
const INSIGHTS = 1429 - SHIFT_X

/* ================================================================
   PAGE
================================================================ */

export default function Page() {
  const [selected, setSelected] = React.useState<NodeId | null>(null)
  const [showInfo, setShowInfo] = React.useState(true)
  const [infoPosition, setInfoPosition] = React.useState({ x: 0, y: 0 })
  const infoBoundsRef = React.useRef<HTMLDivElement | null>(null)
  const infoDragRef = React.useRef<{
    pointerId: number
    clientX: number
    clientY: number
    x: number
    y: number
  } | null>(null)

  function handleInfoPointerDown(event: React.PointerEvent<HTMLTableCellElement>) {
    if ((event.target as HTMLElement).closest("button")) return

    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    infoDragRef.current = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      x: infoPosition.x,
      y: infoPosition.y,
    }
  }

  function handleInfoPointerMove(event: React.PointerEvent<HTMLTableCellElement>) {
    const drag = infoDragRef.current
    const bounds = infoBoundsRef.current?.getBoundingClientRect()
    if (!drag || drag.pointerId !== event.pointerId || !bounds) return

    setInfoPosition({
      x: Math.max(0, Math.min(bounds.width - 190, drag.x + event.clientX - drag.clientX)),
      y: Math.max(0, Math.min(bounds.height - 76, drag.y + event.clientY - drag.clientY)),
    })
  }

  function handleInfoPointerUp(event: React.PointerEvent<HTMLTableCellElement>) {
    if (infoDragRef.current?.pointerId === event.pointerId) {
      infoDragRef.current = null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ==========================================================
          HEADER
      ========================================================== */}

      <header className="border-b ">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">

          <div>
            <h1 className="tracking-tight">
              Crimegraph Detailed Dcoumentation
            </h1>
          </div>

        </div>
      </header>

      {/* ==========================================================
          MAIN
      ========================================================== */}

      <main className="mx-auto max-w-7xl overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8">

        <div ref={infoBoundsRef} className="relative w-full">

          

          {/* ======================================================
              SINGLE SVG COORDINATE SYSTEM
          ====================================================== */}

          <div className="w-full overflow-x-auto">

            <svg
              viewBox="74 0 800 1080"
              className="mx-auto block min-w-[760px] w-full max-w-[900px]"
              preserveAspectRatio="xMidYMin meet"
            >

              {/* ==================================================
                  ARROW DEFINITION
              ================================================== */}

              <defs>

                <marker
                  id="classicArrow"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto"
                >
                  <path
                    d="M 0 0 L 10 5 L 0 10 Z"
                    fill="black"
                  />
                  <path
                    d="M 0 0 L 10 5 L 0 10 Z"
                    className="fill-white/30"
                  />
                </marker>

              </defs>

              {/* ==================================================
                  FLOW LINES
              ================================================== */}

              <g
                fill="none"
                className="stroke-white/30"
                strokeWidth={FLOW_LINE_WIDTH}
                markerEnd="url(#classicArrow)"
              >

                {/* ------------------------------------------------
                    NEW DATA → GOVT CRIMINAL DB
                ------------------------------------------------ */}

                <line
                  x1={CENTER + 30}
                  y1="127"
                  x2={CENTER + 30}
                  y2="155"
                />

                <line
                  x1={CENTER + 60}
                  y1="127"
                  x2={CENTER + 60}
                  y2="155"
                />

                <line
                  x1={CENTER + 90}
                  y1="127"
                  x2={CENTER + 90}
                  y2="155"
                />

                {/* ------------------------------------------------
                    GOVT CRIMINAL DB → INGESTION
                ------------------------------------------------ */}

                <line
                  x1={CENTER + 60}
                  y1="215"
                  x2={CENTER + 60}
                  y2="295"
                />

                {/* ------------------------------------------------
                    INGESTION → GRAPH DB
                ------------------------------------------------ */}

                <line
                  x1={CENTER + 60}
                  y1="355"
                  x2={CENTER + 60}
                  y2="435"
                />

                {/* =================================================
                    GRAPH DB → THREE BRANCHES
                ================================================= */}

                {/* Graph DB → Prediction */}

                <path
                  className="stroke-white/30"
                  d={`
                    M ${CENTER + 30} 495
                    L ${PREDICTION + 60} 495
                    L ${PREDICTION + 60} 555
                  `}
                />

                {/* Graph DB → Graph View */}

                <line
                  x1={CENTER + 60}
                  y1="495"
                  x2={CENTER + 60}
                  y2="555"
                  className="stroke-white/30"
                />

                {/* Graph DB → Insights */}

                <path
                  className="stroke-white/30"
                  d={`
                    M ${CENTER + 90} 495
                    L ${INSIGHTS + 60} 495
                    L ${INSIGHTS + 60} 555
                  `}
                />

                {/* =================================================
                    PREDICTION → WEBAPP
                ================================================= */}

                <path
                  className="stroke-white/30"
                  d={`
                    M ${PREDICTION + 60} 615
                    L ${PREDICTION + 60} 720
                    L ${CENTER} 720
                  `}
                />

                {/* =================================================
                    GRAPH VIEW → WEBAPP
                ================================================= */}

                <line
                  x1={CENTER + 60}
                  y1="615"
                  x2={CENTER + 60}
                  y2="690"
                  className="stroke-white/30"
                />

                {/* =================================================
                    INSIGHTS → WEBAPP
                ================================================= */}

                <path
                  className="stroke-white/30"
                  d={`
                    M ${INSIGHTS + 60} 615
                    L ${INSIGHTS + 60} 720
                    L ${CENTER + 120} 720
                  `}
                />

                {/* =================================================
                    WEBAPP → ADMIN
                ================================================= */}

                <line
                  x1={CENTER + 60}
                  y1="750"
                  x2={CENTER + 60}
                  y2="793"
                />

              </g>

              {/* ==================================================
                  ADMIN → POLICE STATION
              ================================================== */}

              <line
                x1={CENTER + 60}
                y1="853"
                x2={CENTER + 60}
                y2="943"
                className="stroke-white/30"
                strokeWidth={FLOW_LINE_WIDTH}
                strokeDasharray="3 3"
                markerEnd="url(#classicArrow)"
              />

              {/* ==================================================
                  LOWER ACCESS AND CONTROL
              ================================================== */}

              <line
                x1={1209 - SHIFT_X}
                y1="833"
                x2={1209 - SHIFT_X}
                y2="943"
                className="stroke-white/30"
                strokeWidth={FLOW_LINE_WIDTH}
                markerEnd="url(#classicArrow)"
              />

              {/* ==================================================
                  NODES
              ================================================== */}

              <FlowNode
                x={CENTER}
                y={67}
                width={120}
                height={60}
                text="New Data"
                onClick={() => setSelected("newData")}
              />

              <FlowNode
                x={CENTER}
                y={155}
                width={120}
                height={60}
                text="Govt Criminal DB"
                onClick={() => setSelected("criminalDB")}
              />

              <FlowNode
                x={CENTER}
                y={295}
                width={120}
                height={60}
                text="Ingestion Pipeline"
                onClick={() => setSelected("ingestion")}
              />

              <FlowNode
                x={CENTER}
                y={435}
                width={120}
                height={60}
                text="Graph DB"
                onClick={() => setSelected("graphDB")}
              />

              {/* Prediction */}

              <FlowNode
                x={PREDICTION}
                y={555}
                width={120}
                height={60}
                text="Prediction pipeline"
                onClick={() => setSelected("prediction")}
              />

              {/* Graph View */}

              <FlowNode
                x={CENTER}
                y={555}
                width={120}
                height={60}
                text="Graph View"
                onClick={() => setSelected("graphView")}
              />

              {/* Insights */}

              <FlowNode
                x={INSIGHTS}
                y={555}
                width={120}
                height={60}
                text="Insights"
                onClick={() => setSelected("insights")}
              />

              {/* Webapp */}

              <FlowNode
                x={CENTER}
                y={690}
                width={120}
                height={60}
                text={
                  <>
                    Crimegraph
                    <br />
                    Webapp
                  </>
                }
                onClick={() => setSelected("webapp")}
              />

              {/* Admin */}

              <FlowNode
                x={CENTER}
                y={793}
                width={120}
                height={60}
                text={
                  <>
                    Highest Level
                    <br />
                    Admin
                  </>
                }
                onClick={() => setSelected("admin")}
              />

              {/* ==================================================
                  POLICE STATION
              ================================================== */}

              <foreignObject
                x={1264 - SHIFT_X}
                y="943"
                width="140"
                height="90"
              >

                <div className="h-[90px] w-[140px] overflow-hidden rounded-2xl bg-linear-to-t from-primary/5 to-card text-card-foreground ring-inset ring-1 ring-white/30 shadow-xs transition-shadow hover:ring-white/50 dark:bg-card">

                  {/* Police Station */}

                  <button
                    onClick={() => setSelected("policeStation")}
                    className="
                      flex
                      h-[30px]
                      w-full
                      items-center
                      justify-center
                      border-b
                      border-border
                      text-[11px]
                      font-normal
                      text-card-foreground
                      transition-colors
                      hover:bg-muted/60
                    "
                  >
                    Police Station
                  </button>

                  {/* SHO */}

                  <button
                    onClick={() => setSelected("sho")}
                    className="
                      flex
                      h-[30px]
                      w-full
                      items-center
                      justify-center
                      border-b
                      border-border
                      text-[11px]
                      font-normal
                      text-card-foreground
                      transition-colors
                      hover:bg-muted/60
                    "
                  >
                    SHO
                  </button>

                  {/* IO */}

                  <button
                    onClick={() => setSelected("io")}
                    className="
                      flex
                      h-[30px]
                      w-full
                      items-center
                      justify-center
                      text-[11px]
                      font-normal
                      text-card-foreground
                      transition-colors
                      hover:bg-muted/60
                    "
                  >
                    IO
                  </button>

                </div>

              </foreignObject>

              {/* ==================================================
                  LABELS
              ================================================== */}

              <FlowText
                x={1259 - SHIFT_X}
                y={240}
                width={60}
                height={30}
                text="API"
              />

              <FlowText
                x={1099 - SHIFT_X}
                y={660}
                width={80}
                height={30}
                text="Hidden Links"
              />

              <FlowText
                x={1059 - SHIFT_X}
                y={505}
                width={110}
                height={30}
                text="Rag + Vector DB"
              />

              <FlowText
                x={1239 - SHIFT_X}
                y={375}
                width={80}
                height={30}
                text="Continuous Updation"
              />

              <FlowText
                x={1359 - SHIFT_X}
                y={883}
                width={90}
                height={30}
                text="Multiple Levels in between"
              />

              <FlowText
                x={1099 - SHIFT_X}
                y={863}
                width={80}
                height={30}
                text="Lower Access and control"
              />

              {/* ==================================================
                  CURRENT DEMO
              ================================================== */}

              <RightCurlyBrace
                x={1409 - SHIFT_X}
                y={973}
                width={20}
                height={30}
              />

              <FlowText
                x={1429 - SHIFT_X}
                y={973}
                width={60}
                height={30}
                text="Current Demo"
              />

            </svg>

          </div>

          {showInfo && (
            <div
              className="absolute z-20 h-[76px] w-[190px] overflow-hidden rounded-md border border-white/20 bg-black/80"
              style={{ left: infoPosition.x, top: infoPosition.y }}
            >
              <table className="w-full border-collapse text-left text-xs leading-4 text-white/60">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="border-b border-white/15 px-2 py-1.5 font-medium text-white/75"
                      onPointerDown={handleInfoPointerDown}
                      onPointerMove={handleInfoPointerMove}
                      onPointerUp={handleInfoPointerUp}
                      onPointerCancel={handleInfoPointerUp}
                      style={{ touchAction: "none" }}
                    >
                      <span className="flex cursor-grab items-center justify-between gap-2 active:cursor-grabbing">
                        <span>Info</span>
                        <button
                          type="button"
                          aria-label="Close information table"
                          className="rounded p-0.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
                          onPointerDown={(event) => event.stopPropagation()}
                          onClick={() => setShowInfo(false)}
                        >
                          <X aria-hidden="true" size={14} />
                        </button>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-1.5">Click on any block to know more</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

        </div>

      </main>

      {/* ============================================================
          MODAL
      ============================================================ */}

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null)
          }
        }}
      >

        <DialogContent className="p-0 sm:max-w-3xl">

          {selected && (
            <>
              <ScrollArea className="max-h-[calc(100vh-8rem)]">
                <div className="space-y-6 p-6 sm:p-7">
                  <DialogHeader>
                    <DialogTitle>
                      {nodeText[selected]}
                    </DialogTitle>
                  </DialogHeader>

                  <NodeDetails node={selected} />
                </div>
              </ScrollArea>
            </>
          )}

        </DialogContent>

      </Dialog>

    </div>
  )
}

/* eslint-disable react/no-unescaped-entities */
function NodeDetails({ node }: { node: NodeId }) {
  switch (node) {
    case "newData":
      return <DetailContent><p>New criminal data is continuously being generated and uploaded in large volumes.</p><p>The system needs to continuously process this incoming data and convert it into a format that can be analyzed, connected, and queried by CrimeGraph AI.</p></DetailContent>
    case "criminalDB":
      return <DetailContent><p>The Government Criminal Database acts as the primary source of criminal and law-enforcement data.</p><p>The Indian government already has a well-developed <strong>ERP system for police officers</strong>, which enables authorized officers to manage, access, and update the uploaded data.</p><p>CrimeGraph AI will not replace this existing system. Instead, it will securely access relevant data from the government database through <strong>authorized APIs</strong> and use it for graph-based analysis and AI-powered intelligence.</p></DetailContent>
    case "ingestion":
      return <DetailContent><p>This is where <strong>CrimeGraph AI starts</strong>.</p><p>The system will securely fetch data directly from the Government Criminal Database using <strong>authorized APIs</strong>. Since the volume of incoming data can be very large, the data will be fetched and processed in <strong>chunks</strong>.</p><DetailSection title="Structured Data"><p>Structured data follows a predefined format or schema.</p><p>Examples include:</p><BulletList items={["Call Detail Records (CDRs)", "Financial transaction records", "FIRs", "Criminal history databases"]} /></DetailSection><DetailSection title="Unstructured Data"><p>Unstructured data does not follow a fixed format and requires AI-based processing to extract useful information.</p><p>Examples include:</p><BulletList items={["Police reports", "Surveillance reports", "Social media intelligence", "Intelligence agency reports"]} /></DetailSection><DetailSection title="Other Case Data"><p>A case may also contain:</p><BulletList items={["Biometrics", "Audio", "Images / Videos", "Geospatial data"]} /></DetailSection><DetailSection title="Data Processing"><FlowList items={["Structured data → Rule-based processing using tools such as Pandas → Entity and relationship extraction → Node → Edge → Node", "Unstructured data → AI / NLP → Entity and relationship extraction → Node → Edge → Node"]} /></DetailSection><DetailSection title="Media Processing"><h4>Images</h4><p>Images are processed using image/video AI models to identify entities and their <strong>bounding boxes (BBox)</strong>.</p><p>Based on the detected entity type, the appropriate model is then executed:</p><BulletList items={["Object → Object Detection", "Text → OCR", "Person → Face Detection / Recognition", "Vehicle → Number Plate Recognition", "Scene / Location → Scene and Location Classification"]} /><p>The extracted information is then converted into:</p><p className="font-medium">Node → Edge → Node</p><h4>Video</h4><p>For video data, the system detects entities across frames and assigns a unique <strong>ID</strong> to each detected entity.</p><p>The system then runs the relevant image-processing pipeline for each entity ID to extract information and relationships.</p><h4>Audio</h4><p>Audio is first converted into text using <strong>Speech-to-Text / ASR</strong>.</p><p>The resulting text is then passed through the NLP and AI pipeline:</p><p className="font-medium">Audio → Speech-to-Text → NLP → AI → Node → Edge → Node</p></DetailSection></DetailContent>
    case "graphDB":
      return <DetailContent><p>Once the incoming data has been processed and converted into the required <strong>Node–Edge</strong> format, it is stored in our <strong>Neo4j Graph Database</strong>.</p><p>Since new criminal data is continuously being uploaded, the Graph Database will also be continuously updated.</p><p>The system follows an <strong>incremental architecture</strong> rather than rebuilding the entire database every time new data arrives.</p><p>For example:</p><FlowList items={["First data chunk → Ingest → Update Graph DB", "Second data chunk → Ingest → Update Graph DB", "Third data chunk → Ingest → Update Graph DB"]} /><p>This allows the graph to continuously grow and incorporate newly available information while maintaining existing relationships and historical data.</p></DetailContent>
    case "prediction":
      return <DetailContent><p>The Prediction Pipeline takes relevant data from the Graph Database and prepares it for AI-based analysis.</p><p>The graph data is optimized for AI processing and combined with <strong>RAG (Retrieval-Augmented Generation)</strong> and a <strong>Vector Database</strong> to provide the AI models with relevant context.</p><p>The AI system can run on <strong>government-controlled servers / infrastructure</strong>, ensuring that sensitive criminal data remains within the authorized government environment.</p><p>The system analyzes the available information to identify:</p><BulletList items={["Hidden or previously unidentified links", "Key entities", "Important relationships", "Connections between cases", "Relevant patterns", "Important alerts", "Potential investigative leads"]} /><p>The output of this pipeline is provided to authorized officers through the CrimeGraph WebApp.</p></DetailContent>
    case "graphView":
      return <DetailContent><p>The Graph View provides a visual representation of the information stored in the Graph Database.</p><p>Instead of viewing criminal data only as individual records, officers can visually explore the relationships between entities.</p><p>For example:</p><p className="font-medium">Person → Phone → Person → Vehicle → Location → FIR</p><p>Officers can expand, filter, and explore the graph to understand how different entities, cases, locations, communications, and other data points are connected.</p></DetailContent>
    case "insights":
      return <DetailContent><p>The Insights layer converts complex graph relationships and AI analysis into information that can be easily understood and investigated by authorized officers.</p><p>It can provide:</p><BulletList items={["Key entity summaries", "Connections between different cases", "Relationship analysis", "Timeline-based insights", "Location-based patterns", "Communication patterns", "Financial relationship patterns", "Entities appearing across multiple cases", "Newly identified relationships", "Important alerts", "AI-generated investigative leads"]} /><p>Each insight should also be linked back to the underlying source data so that officers can verify the information that produced the insight.</p></DetailContent>
    case "webapp":
      return <DetailContent><p>The CrimeGraph WebApp is the <strong>user-facing component</strong> of the system.</p><p>It will be accessible to authorized police officers and will provide a centralized interface for accessing the graph, insights, cases, and other information available to them.</p><p>Depending on the officer's role and permissions, the WebApp can allow users to:</p><BulletList items={["Search for people, vehicles, phone numbers, locations, cases, and other entities", "Explore relationships using the Graph View", "View case information", "View timelines and connections", "Access authorized documents and media", "View AI-generated insights", "Investigate connections between cases", "Generate reports", "Request access to restricted cases"]} /><p>The WebApp will obtain access-control information from the existing <strong>government ERP system</strong> and use it to determine what information the officer is allowed to access.</p></DetailContent>
    case "admin":
      return <DetailContent><p>This is where <strong>RBAC (Role-Based Access Control)</strong> comes into the system.</p><p>The highest-level administrator will be defined by the government and will have the highest level of authorized access and administrative control.</p><p>Depending on the permissions defined by the government, this role may have access to:</p><BulletList items={["Full Graph Database", "Complete case information", "System-wide insights", "Hidden / newly identified links", "Cross-case relationships", "Administrative controls", "Other system-level functionality"]} /><p>Lower-level users will only be able to access information that they are legally and administratively permitted to access.</p><p>The CrimeGraph WebApp will fetch the user's access permissions from the <strong>government ERP system</strong>, ensuring that CrimeGraph follows the existing government authorization structure.</p></DetailContent>
    case "policeStation":
      return <DetailContent><p>The Police Station is the organizational scope that contains station-associated cases, officers, and permitted investigative data.</p><p>Access within the station remains subject to the permissions defined by the government system.</p></DetailContent>
    case "sho":
      return <DetailContent><p>The <strong>SHO (Station House Officer)</strong> manages a police station and can access the data associated with that police station, subject to the permissions defined by the government system.</p><p>The SHO can:</p><BulletList items={["View cases belonging to the police station", "Explore the graph for those cases", "View relevant entities and relationships", "Access authorized documents and media", "View AI-generated insights", "Manage access for Investigating Officers (IOs) within the permitted scope"]} /><p>If an IO needs access to a case that they are not assigned to, but the case belongs to the same police station, the SHO can authorize access where permitted by the government's rules and authorization system.</p></DetailContent>
    case "io":
      return <DetailContent><p>The <strong>Investigating Officer (IO)</strong> will have a similar CrimeGraph WebApp interface, but with a more restricted data scope.</p><p>By default, the IO can only access information related to the cases assigned to them.</p><p>This includes:</p><BulletList items={["Assigned case data", "Related entities", "Authorized documents and media", "Graph relationships within their permitted scope", "AI-generated insights based on their accessible data"]} /><p>If the Prediction Pipeline identifies a potential connection between the IO's assigned case and another case outside their access permissions, the system will <strong>not expose the restricted case's full information</strong>.</p><p>Instead, it can provide generic information indicating that a potentially relevant connection exists.</p><p>For example:</p><p className="font-medium">Assigned Case → Person X → Phone Y → Another Case</p><p>The IO may be informed that a potentially relevant connection to another case has been identified, without being shown the restricted case details.</p><p>The IO can then request access to that case.</p><p>Once the required legal/administrative permission is granted, the CrimeGraph WebApp will fetch the updated access information from the <strong>government ERP system</strong>, after which the IO can access the additional data permitted by that authorization.</p></DetailContent>
  }
}
/* eslint-enable react/no-unescaped-entities */

function DetailContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 text-sm leading-6 text-muted-foreground [&_h3]:text-base [&_h3]:font-medium [&_h3]:text-foreground [&_h4]:pt-2 [&_h4]:text-sm [&_h4]:font-semibold [&_h4]:text-foreground [&_strong]:font-medium [&_strong]:text-foreground [&_p.font-medium]:font-normal">
      {formatArrowContent(children)}
    </div>
  )
}

function formatArrowContent(content: React.ReactNode): React.ReactNode {
  return React.Children.map(content, (child) => {
    if (typeof child === "string" && child.includes("→")) {
      return <ArrowSequence text={child} />
    }

    if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
      return React.cloneElement(child, {}, formatArrowContent(child.props.children))
    }

    return child
  })
}

function ArrowSequence({ text }: { text: string }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 align-middle text-muted-foreground">
      {text.split("→").map((part, index, parts) => (
        <React.Fragment key={`${part}-${index}`}>
          <span>{part.trim()}</span>
          {index < parts.length - 1 && <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />}
        </React.Fragment>
      ))}
    </span>
  )
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3 border-t border-border/70 pt-5">
      <h3>{title}</h3>
      {children}
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/60">
      {items.map((item) => <li key={item} className="pl-1">{item}</li>)}
    </ul>
  )
}

function FlowList({ items }: { items: string[] }) {
  const isDataProcessing = items[0]?.startsWith("Structured data →")

  return (
    <ol className="space-y-2 border-s border-border/70 ps-4">
      {items.map((item, index) => (
        <li key={item} className={`relative ${isDataProcessing ? "font-normal text-muted-foreground" : "font-medium text-foreground"} before:absolute before:-start-[1.3rem] before:top-2 before:size-2 before:rounded-full before:bg-foreground/50`}>
          {items.length > 2 && <span className="me-2 text-xs font-normal text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>}
          <ArrowSequence text={item} />
        </li>
      ))}
    </ol>
  )
}

/* ================================================================
   RECTANGULAR FLOWCHART NODE

   No icons.
   No extra text.
================================================================ */

function FlowNode({
  x,
  y,
  width,
  height,
  text,
  onClick,
}: {
  x: number
  y: number
  width: number
  height: number
  text: React.ReactNode
  onClick: () => void
}) {
  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
    >

      <div className="h-full w-full">

        <button
          onClick={onClick}
          className={`
            h-full
            w-full
            rounded-2xl
            px-2
            text-center
            text-[12px]
            font-normal
            leading-tight
            bg-linear-to-t
            from-primary/5
            to-card
            text-card-foreground
            ring-inset
            ring-1
            ring-white/30
            shadow-xs
            cursor-pointer
            transition-colors
            dark:bg-card
            hover:bg-none
            hover:bg-muted/60
            hover:ring-white/50
            focus-visible:outline-none
            focus-visible:ring-inset
            focus-visible:ring-2
            focus-visible:ring-ring
          `}
        >
          {text}
        </button>

      </div>

    </foreignObject>
  )
}

/* ================================================================
   TEXT LABEL
================================================================ */

function FlowText({
  x,
  y,
  width,
  height,
  text,
}: {
  x: number
  y: number
  width: number
  height: number
  text: string
}) {
  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
    >

      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-center
          rounded-sm
          bg-black/95
          px-1
          text-center
          text-[10px]
          font-medium
          text-white/80
          shadow-sm
        "
      >
        {text}
      </div>

    </foreignObject>
  )
}

/* ================================================================
   RIGHT CURLY BRACE

   Recreates draw.io:

   shape=curlyBracket
   flipH=1
   labelPosition=right

   Positioned directly beside Police Station.
================================================================ */

function RightCurlyBrace({
  x,
  y,
  width,
  height,
}: {
  x: number
  y: number
  width: number
  height: number
}) {
  return (
    <text
      x={x + width / 2}
      y={y + height * 0.82}
      textAnchor="middle"
      fontSize={height}
      fontWeight={400}
      className="fill-white/30"
    >
      {"}"}
    </text>

  )
}
