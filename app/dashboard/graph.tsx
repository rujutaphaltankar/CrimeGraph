"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import cytoscape, {
  type Core,
  type ElementDefinition,
} from "cytoscape"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HelpCircleIcon,
  KeyboardIcon,
  Layers3Icon,
  Maximize2Icon,
  MinusIcon,
  PlusIcon,
  RouteIcon,
  RotateCcwIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"

type GraphNodeData = {
  label: string
  type: string
  designation: string
  year: number
}

type GraphNode = {
  id: string
  type?: string
  position: {
    x: number
    y: number
  }
  data: GraphNodeData
}

type GraphEdge = {
  source: string
  target: string
  relation: string
  weak?: boolean
  ai?: boolean
}

const nodeDefinitions: GraphNode[] = [
  {
    id: "Vikram Malhotra",
    position: { x: 80, y: 170 },
    data: {
      label: "Vikram Malhotra",
      type: "Person",
      designation: "Suspect",
      year: 2020,
    },
  },
  {
    id: "Rohan Verma",
    position: { x: 430, y: 120 },
    data: {
      label: "Rohan Verma",
      type: "Person",
      designation: "Suspect",
      year: 2021,
    },
  },
  {
    id: "Apex Shell Corp",
    position: { x: 780, y: 170 },
    data: {
      label: "Apex Shell Corp",
      type: "Organization",
      designation: "Shell Company",
      year: 2023,
    },
  },
  {
    id: "Inspector Suresh Patil",
    position: { x: 70, y: 500 },
    data: {
      label: "Inspector Suresh Patil",
      type: "Person",
      designation: "Law Enforcement",
      year: 2022,
    },
  },

  {
    id: "+919823011111",
    position: { x: 220, y: 280 },
    data: {
      label: "+919823011111",
      type: "Phone Number",
      designation: "Primary Device",
      year: 2020,
    },
  },
  {
    id: "+919876543210",
    position: { x: 420, y: 280 },
    data: {
      label: "+919876543210",
      type: "Phone Number",
      designation: "Secondary Device",
      year: 2021,
    },
  },
  {
    id: "+919911223344",
    position: { x: 620, y: 280 },
    data: {
      label: "+919911223344",
      type: "Phone Number",
      designation: "Associate Device",
      year: 2023,
    },
  },
  {
    id: "+919700011122",
    position: { x: 170, y: 410 },
    data: {
      label: "+919700011122",
      type: "Phone Number",
      designation: "Unknown Contact",
      year: 2024,
    },
  },

  {
    id: "ACC-4491-IN",
    position: { x: 120, y: 20 },
    data: {
      label: "ACC-4491-IN",
      type: "Bank Account",
      designation: "Origin Account",
      year: 2020,
    },
  },
  {
    id: "ACC-8823-KY",
    position: { x: 430, y: 20 },
    data: {
      label: "ACC-8823-KY",
      type: "Bank Account",
      designation: "Intermediary Account",
      year: 2022,
    },
  },
  {
    id: "ACC-1102-BS",
    position: { x: 780, y: 20 },
    data: {
      label: "ACC-1102-BS",
      type: "Bank Account",
      designation: "Offshore Account",
      year: 2025,
    },
  },

  {
    id: "MH-12-AB-4521",
    position: { x: 20, y: 300 },
    data: {
      label: "MH-12-AB-4521",
      type: "Vehicle",
      designation: "White Sedan",
      year: 2021,
    },
  },
  {
    id: "MH-14-XZ-9988",
    position: { x: 700, y: 90 },
    data: {
      label: "MH-14-XZ-9988",
      type: "Vehicle",
      designation: "Suspect Vehicle",
      year: 2024,
    },
  },

  {
    id: "Hinjewadi Phase 3",
    position: { x: 410, y: 500 },
    data: {
      label: "Hinjewadi Phase 3",
      type: "Location",
      designation: "Meeting Area",
      year: 2022,
    },
  },
  {
    id: "Koregaon Park",
    position: { x: 680, y: 500 },
    data: {
      label: "Koregaon Park",
      type: "Location",
      designation: "Tower Region",
      year: 2025,
    },
  },
  {
    id: "Café Coffee Day, Hinjewadi Phase 3",
    position: { x: 520, y: 400 },
    data: {
      label: "Café Coffee Day, Hinjewadi Phase 3",
      type: "Location",
      designation: "Surveillance Spot",
      year: 2023,
    },
  },

  {
    id: "T_MUM_04",
    position: { x: 300, y: 400 },
    data: {
      label: "T_MUM_04",
      type: "Cell Tower",
      designation: "Tower West",
      year: 2022,
    },
  },
  {
    id: "T_PUN_12",
    position: { x: 700, y: 390 },
    data: {
      label: "T_PUN_12",
      type: "Cell Tower",
      designation: "Tower East",
      year: 2025,
    },
  },

  {
    id: "FIR 042/2026",
    position: { x: 210, y: 520 },
    data: {
      label: "FIR 042/2026",
      type: "Legal Event",
      designation: "Police Report",
      year: 2026,
    },
  },
  {
    id: "SURV-2026-089",
    position: { x: 520, y: 210 },
    data: {
      label: "SURV-2026-089",
      type: "Surveillance Event",
      designation: "Field Operation",
      year: 2026,
    },
  },
]

const edgeDefinitions: GraphEdge[] = [
  {
    source: "Vikram Malhotra",
    target: "+919823011111",
    relation: "OWNS_PHONE",
  },
  {
    source: "Rohan Verma",
    target: "+919876543210",
    relation: "OWNS_PHONE",
  },

  {
    source: "Vikram Malhotra",
    target: "ACC-4491-IN",
    relation: "OWNS_ACCOUNT",
  },
  {
    source: "Rohan Verma",
    target: "ACC-8823-KY",
    relation: "OWNS_ACCOUNT",
  },
  {
    source: "Apex Shell Corp",
    target: "ACC-1102-BS",
    relation: "OWNS_ACCOUNT",
  },

  {
    source: "Vikram Malhotra",
    target: "MH-12-AB-4521",
    relation: "USES_VEHICLE",
  },
  {
    source: "Rohan Verma",
    target: "MH-14-XZ-9988",
    relation: "USES_VEHICLE",
  },

  {
    source: "ACC-4491-IN",
    target: "ACC-8823-KY",
    relation: "TRANSFERS_TO",
  },
  {
    source: "ACC-8823-KY",
    target: "ACC-1102-BS",
    relation: "TRANSFERS_TO",
  },

  {
    source: "+919823011111",
    target: "+919876543210",
    relation: "CALLS",
  },
  {
    source: "+919876543210",
    target: "+919911223344",
    relation: "CALLS",
  },
  {
    source: "+919823011111",
    target: "+919700011122",
    relation: "CALLS",
  },
  {
    source: "+919911223344",
    target: "+919823011111",
    relation: "CALLS",
  },

  {
    source: "+919823011111",
    target: "T_MUM_04",
    relation: "CONNECTED_TO",
  },
  {
    source: "+919876543210",
    target: "T_MUM_04",
    relation: "CONNECTED_TO",
  },
  {
    source: "+919823011111",
    target: "T_PUN_12",
    relation: "CONNECTED_TO",
  },
  {
    source: "+919911223344",
    target: "T_PUN_12",
    relation: "CONNECTED_TO",
  },

  {
    source: "T_MUM_04",
    target: "Hinjewadi Phase 3",
    relation: "LOCATED_AT",
    weak: true,
  },
  {
    source: "T_PUN_12",
    target: "Koregaon Park",
    relation: "LOCATED_AT",
    weak: true,
  },

  {
    source: "Vikram Malhotra",
    target: "Rohan Verma",
    relation: "MEETS_WITH",
  },

  {
    source: "Vikram Malhotra",
    target: "SURV-2026-089",
    relation: "OBSERVED_IN",
  },
  {
    source: "Rohan Verma",
    target: "SURV-2026-089",
    relation: "OBSERVED_IN",
  },

  {
    source: "SURV-2026-089",
    target: "Café Coffee Day, Hinjewadi Phase 3",
    relation: "OCCURRED_AT",
  },

  {
    source: "Inspector Suresh Patil",
    target: "FIR 042/2026",
    relation: "FILED_BY",
  },
  {
    source: "Vikram Malhotra",
    target: "FIR 042/2026",
    relation: "MENTIONED_IN",
    weak: true,
  },
  {
    source: "Rohan Verma",
    target: "FIR 042/2026",
    relation: "MENTIONED_IN",
    weak: true,
  },
]

/*
 * AI-PREDICTED RELATIONSHIPS
 *
 * These are intentionally separate from standard relationships.
 * They receive the "ai-edge" Cytoscape class below, which makes
 * the pink styling reliable regardless of Cytoscape's data
 * attribute selector behavior.
 */
const aiPredictedEdges: GraphEdge[] = [
  {
    source: "Vikram Malhotra",
    target: "+919911223344",
    relation: "PREDICTED_ASSOCIATION",
    ai: true,
  },
  {
    source: "Rohan Verma",
    target: "ACC-1102-BS",
    relation: "PREDICTED_TRANSFER",
    ai: true,
  },
  {
    source: "MH-14-XZ-9988",
    target: "Koregaon Park",
    relation: "PREDICTED_LOCATION",
    ai: true,
  },
]

const allEdges: GraphEdge[] = [
  ...edgeDefinitions,
  ...aiPredictedEdges,
]

const typeStyles: Record<string, string> = {
  Person:
    "border-sky-400/70 bg-sky-950 text-sky-100",
  Organization:
    "border-indigo-400/70 bg-indigo-950 text-indigo-100",
  "Phone Number":
    "border-emerald-400/70 bg-emerald-950 text-emerald-100",
  "Bank Account":
    "border-fuchsia-300/70 bg-fuchsia-950 text-fuchsia-100",
  Vehicle:
    "border-amber-400/70 bg-amber-950 text-amber-100",
  Location:
    "border-teal-400/70 bg-teal-950 text-teal-100",
  "Cell Tower":
    "border-lime-400/70 bg-lime-950 text-lime-100",
  "Legal Event":
    "border-red-400/70 bg-red-950 text-red-100",
  "Surveillance Event":
    "border-stone-400/70 bg-stone-950 text-stone-100",
}

const typeColors: Record<
  string,
  {
    background: string
    border: string
    foreground: string
  }
> = {
  Person: {
    background: "#082f49",
    border: "#38bdf8",
    foreground: "#e0f2fe",
  },
  Organization: {
    background: "#1e1b4b",
    border: "#818cf8",
    foreground: "#e0e7ff",
  },
  "Phone Number": {
    background: "#022c22",
    border: "#34d399",
    foreground: "#d1fae5",
  },
  "Bank Account": {
    background: "#4a044e",
    border: "#f0abfc",
    foreground: "#fae8ff",
  },
  Vehicle: {
    background: "#451a03",
    border: "#fbbf24",
    foreground: "#fef3c7",
  },
  Location: {
    background: "#134e4a",
    border: "#2dd4bf",
    foreground: "#ccfbf1",
  },
  "Cell Tower": {
    background: "#1a2e05",
    border: "#a3e635",
    foreground: "#ecfccb",
  },
  "Legal Event": {
    background: "#450a0a",
    border: "#f87171",
    foreground: "#fee2e2",
  },
  "Surveillance Event": {
    background: "#1c1917",
    border: "#a8a29e",
    foreground: "#f5f5f4",
  },
}

const graphLabels = {
  English: {
    selected: "Selected entity",
    reset: "Reset graph",
    search: "Filter by entity or case...",
    all: "All",
    noSelection: "No entity selected.",
    nodeType: "Node Type",
    designation: "Designation Label",
    connections: "Direct Connections",
    relationships: "Relationships",
    links: "links",
  },

  Marathi: {
    selected: "निवडलेला घटक",
    reset: "ग्राफ रीसेट करा",
    search: "घटक किंवा प्रकरणानुसार फिल्टर करा...",
    all: "सर्व",
    noSelection: "कोणताही घटक निवडलेला नाही.",
    nodeType: "नोड प्रकार",
    designation: "ओळख लेबल",
    connections: "थेट जोडणी",
    relationships: "संबंध",
    links: "दुवे",
  },
} as const

function GraphContent() {
  const { language } = useLanguage()
  const labels = graphLabels[language]

  const containerRef = useRef<HTMLDivElement>(null)
  const cyRef = useRef<Core | null>(null)

  const selectedIdRef = useRef<string | null>(null)
  const pathIdsRef = useRef<string[]>([])

  const [selectedId, setSelectedId] =
    useState<string | null>(null)

  const [query, setQuery] = useState("")

  const [filter, setFilter] = useState("All")

  const [showHiddenClusters, setShowHiddenClusters] =
    useState(false)

  const [viewMode, setViewMode] =
    useState<"persons" | "all">("all")

  const [filterMode, setFilterMode] =
    useState<"dim" | "hide">("dim")

  const [activeCategories, setActiveCategories] =
    useState(
      () =>
        new Set(
          nodeDefinitions.map(
            (node) => node.data.type,
          ),
        ),
    )

  const [maxYear, setMaxYear] = useState(2026)

  const [showWeakLinks, setShowWeakLinks] =
    useState(true)

  const [showAiPredictions, setShowAiPredictions] =
    useState(true)

  const [sourceId, setSourceId] = useState("")
  const [targetId, setTargetId] = useState("")

  const [pathMode, setPathMode] =
    useState<"lowest" | "highest">("lowest")

  const [pathIds, setPathIds] = useState<string[]>([])
  const [pathIndex, setPathIndex] = useState(0)
  const [showShortcuts, setShowShortcuts] =
    useState(false)

  const [showGraphFilters, setShowGraphFilters] =
    useState(true)

  const [showSelectedEntity, setShowSelectedEntity] =
    useState(true)

  const [mobileGraphSidebar, setMobileGraphSidebar] =
    useState<"filters" | "selected" | null>(null)

  const allCategories = useMemo(
    () =>
      Array.from(
        new Set(
          nodeDefinitions.map(
            (node) => node.data.type,
          ),
        ),
      ),
    [],
  )

  const selectedNode = nodeDefinitions.find(
    (node) => node.id === selectedId,
  )

  const connections = selectedId
    ? allEdges.filter(
        ({ source, target }) =>
          source === selectedId ||
          target === selectedId,
      )
    : []

  /*
   * Create Cytoscape graph.
   */
  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    const elements: ElementDefinition[] = [
      ...nodeDefinitions.map((node) => ({
        data: {
          id: node.id,
          label: node.data.label,
          type: node.data.type,
          designation: node.data.designation,
          year: node.data.year,
          background:
            typeColors[node.data.type].background,
          border:
            typeColors[node.data.type].border,
          foreground:
            typeColors[node.data.type].foreground,
        },
        position: node.position,
      })),

      ...allEdges.map((edge, index) => ({
        data: {
          id: `edge-${index}`,
          source: edge.source,
          target: edge.target,
          label: edge.relation,
          weak: Boolean(edge.weak),
          ai: Boolean(edge.ai),
        },

        /*
         * IMPORTANT:
         *
         * AI edges receive a dedicated class.
         * This guarantees the pink styling is applied.
         */
        classes: edge.ai
          ? "ai-edge"
          : undefined,
      })),
    ]

    const cy = cytoscape({
      container,
      elements,

      layout: {
        name: "preset",
        fit: false,
        padding: 40,
      },

      minZoom: 0.25,
      maxZoom: 3,

      style: [
        {
          selector: "node",
          style: {
            shape: "ellipse",
            width: "82px",
            height: "82px",
            label: "data(label)",
            color: "data(foreground)",
            "background-color": "data(background)",
            "border-width": "2px",
            "border-color": "data(border)",
            "font-size": "10px",
            "font-weight": 600,
            "text-wrap": "wrap",
            "text-max-width": "68px",
            "text-valign": "center",
            "text-halign": "center",
            "overlay-opacity": 0,
          },
        },

        {
          selector: "edge",
          style: {
            width: "1.2px",
            "line-color": "#64748b",
            "target-arrow-color": "#64748b",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            label: "data(label)",
            color: "#cbd5e1",
            "font-size": "8px",
            "text-background-color": "#0f172a",
            "text-background-opacity": 0.9,
            "text-background-padding": "2px",
          },
        },

        /*
         * DEFINITIVE AI EDGE STYLE
         *
         * These edges are always pink while AI predictions
         * are enabled.
         */
        {
          selector: ".ai-edge",
          style: {
            width: "4px",
"line-color": "#3b82f6",
"target-arrow-color": "#3b82f6",
            "target-arrow-shape": "triangle",
            "line-style": "solid",
color: "#93c5fd",
            "font-size": "9px",
            "font-weight": 700,
"text-background-color": "#172554",
            "text-background-opacity": 0.98,
            "text-background-padding": "3px",
            "text-border-width": 1,
            "text-border-color": "#ec4899",
          },
        },

        {
          selector: "edge[weak = 1]",
          style: {
            "line-style": "dashed",
            "line-dash-pattern": [6, 4],
            "line-color": "#64748b",
            "target-arrow-color": "#64748b",
          },
        },

        {
          selector: ".filtered-out",
          style: {
            display: "none",
          },
        },

        {
          selector: ".filtered-dimmed",
          style: {
            opacity: 0.14,
          },
        },

        {
          selector: ".hidden-cluster",
          style: {
            "border-width": 4,
            "border-color": "#f59e0b",
          },
        },

        {
          selector: ".selected",
          style: {
            "border-width": 4,
            "border-color": "#ffffff",
          },
        },

        {
          selector: ".connected",
          style: {
            opacity: 1,
            "border-width": 3,
            "border-color": "#facc15",
          },
        },

        {
          selector: ".connected-edge",
          style: {
            "line-color": "#facc15",
            "target-arrow-color": "#facc15",
            width: "3px",
            opacity: 1,
          },
        },

        {
          selector: ".path-flow",
          style: {
            "line-color": "#facc15",
            "target-arrow-color": "#facc15",
            width: "4px",
            opacity: 1,
          },
        },
      ],
    })

    cyRef.current = cy

    cy.on("tap", "node", (event) => {
      const originalEvent =
        event.originalEvent as MouseEvent | undefined

      if (originalEvent?.altKey) {
        setSourceId(event.target.id())
        return
      }

      setSelectedId(event.target.id())
    })

    cy.on("cxttap", "node", (event) => {
      setTargetId(event.target.id())
    })

    cy.on("tap", (event) => {
      if (event.target === cy) {
        setSelectedId(null)
      }
    })

    /*
     * Initial graph view:
     *
     * 1. Fit the entire graph.
     * 2. Zoom out an additional 12%.
     *
     * This prevents the graph from initially feeling too zoomed in.
     */
    const frame = requestAnimationFrame(() => {
      if (!cy.destroyed()) {
        cy.resize()
        cy.fit(cy.elements(), 40)

        const fittedZoom = cy.zoom()

        cy.zoom({
          level: Math.max(
            0.25,
            fittedZoom * 0.5,
          ),
          renderedPosition: {
            x: cy.width() / 2,
            y: cy.height() / 2,
          },
        })
      }
    })

    const resizeObserver =
      new ResizeObserver(() => {
        if (cy.destroyed()) return
        cy.resize()
      })

    resizeObserver.observe(container)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()

      if (!cy.destroyed()) {
        cy.destroy()
      }

      cyRef.current = null
    }
  }, [])

  /*
   * Apply filters, timeline, person-only mode,
   * AI visibility and weak-link visibility.
   */
  useEffect(() => {
    const cy = cyRef.current

    if (!cy) return

    const normalizedQuery =
      query.trim().toLowerCase()

    const timelineVisibleIds = new Set<string>()

    for (const node of nodeDefinitions) {
      if (node.data.year <= maxYear) {
        timelineVisibleIds.add(node.id)
      }
    }

    const visibleIds = new Set<string>()

    for (const node of nodeDefinitions) {
      const typeMatch =
        activeCategories.has(node.data.type) &&
        (filter === "All" ||
          node.data.type === filter)

      /*
       * PERSONS ONLY
       *
       * This is intentionally a hard visibility rule.
       * Non-person nodes are completely hidden.
       */
      const viewMatch =
        viewMode === "all" ||
        node.data.type === "Person"

      const timelineMatch =
        timelineVisibleIds.has(node.id)

      const searchMatch =
        !normalizedQuery ||
        `${node.data.label} ${node.data.type} ${node.data.designation}`
          .toLowerCase()
          .includes(normalizedQuery)

      if (
        typeMatch &&
        viewMatch &&
        timelineMatch &&
        searchMatch
      ) {
        visibleIds.add(node.id)
      }
    }

    const degree = new Map<string, number>()

    for (const node of nodeDefinitions) {
      degree.set(
        node.id,
        allEdges.filter(
          ({ source, target }) =>
            source === node.id ||
            target === node.id,
        ).length,
      )
    }

    cy.nodes().forEach((node) => {
      const id = node.id()
      const graphNode = nodeDefinitions.find(
        (item) => item.id === id,
      )

      const visible = visibleIds.has(id)

      const hiddenCluster =
        showHiddenClusters &&
        (degree.get(id) ?? 0) <= 1

      node.removeClass(
        "filtered-out filtered-dimmed hidden-cluster",
      )

      /*
       * Persons-only mode ALWAYS hides non-person nodes.
       *
       * This is different from normal filtering, where
       * "Dim" is allowed.
       */
      const mustCompletelyHide =
        viewMode === "persons" &&
        graphNode?.data.type !== "Person"

      if (mustCompletelyHide) {
        node.addClass("filtered-out")
      } else if (!visible) {
        node.addClass(
          filterMode === "dim"
            ? "filtered-dimmed"
            : "filtered-out",
        )
      }

      if (hiddenCluster) {
        node.addClass("hidden-cluster")
      }
    })

    cy.edges().forEach((edge) => {
      const source = edge.source().id()
      const target = edge.target().id()

      const sourceVisible =
        visibleIds.has(source)

      const targetVisible =
        visibleIds.has(target)

      const weak = Boolean(edge.data("weak"))
      const ai = Boolean(edge.data("ai"))

      /*
       * AI predictions are controlled independently.
       *
       * When showAiPredictions === false:
       * every AI edge gets hidden.
       */
      const shouldShow =
        sourceVisible &&
        targetVisible &&
        (showWeakLinks || !weak) &&
        (showAiPredictions || !ai)

      edge.removeClass(
        "filtered-out filtered-dimmed",
      )

      if (!shouldShow) {
        edge.addClass(
          filterMode === "dim"
            ? "filtered-dimmed"
            : "filtered-out",
        )
      }
    })

    cy.elements().removeClass(
      "selected connected connected-edge",
    )

    if (selectedIdRef.current) {
      const selected =
        cy.getElementById(
          selectedIdRef.current,
        )

      if (selected.length > 0) {
        selected.addClass("selected")

        selected
          .neighborhood("node")
          .addClass("connected")

        selected
          .connectedEdges()
          .addClass("connected-edge")
      }
    }

    cy.elements().removeClass("path-flow")

    const currentPath = pathIdsRef.current

    for (
      let index = 0;
      index < currentPath.length - 1;
      index++
    ) {
      const source = currentPath[index]
      const target = currentPath[index + 1]

      const edgeIndex =
        allEdges.findIndex(
          ({ source: edgeSource, target: edgeTarget }) =>
            (edgeSource === source &&
              edgeTarget === target) ||
            (edgeSource === target &&
              edgeTarget === source),
        )

      if (edgeIndex >= 0) {
        cy.getElementById(
          `edge-${edgeIndex}`,
        ).addClass("path-flow")
      }
    }
  }, [
    activeCategories,
    filter,
    filterMode,
    maxYear,
    query,
    showAiPredictions,
    showHiddenClusters,
    showWeakLinks,
    viewMode,
  ])

  useEffect(() => {
    selectedIdRef.current = selectedId

    const cy = cyRef.current

    if (!cy) return

    cy.elements().removeClass(
      "selected connected connected-edge",
    )

    if (!selectedId) return

    const selected =
      cy.getElementById(selectedId)

    if (selected.length === 0) return

    selected.addClass("selected")

    selected
      .neighborhood("node")
      .addClass("connected")

    selected
      .connectedEdges()
      .addClass("connected-edge")
  }, [selectedId])

  useEffect(() => {
    pathIdsRef.current = pathIds

    const cy = cyRef.current

    if (!cy) return

    cy.elements().removeClass("path-flow")

    for (
      let index = 0;
      index < pathIds.length - 1;
      index++
    ) {
      const source = pathIds[index]
      const target = pathIds[index + 1]

      const edgeIndex =
        allEdges.findIndex(
          ({ source: edgeSource, target: edgeTarget }) =>
            (edgeSource === source &&
              edgeTarget === target) ||
            (edgeSource === target &&
              edgeTarget === source),
        )

      if (edgeIndex >= 0) {
        cy.getElementById(
          `edge-${edgeIndex}`,
        ).addClass("path-flow")
      }
    }
  }, [pathIds])

  useEffect(() => {
    function handleShortcut(
      event: KeyboardEvent,
    ) {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLSelectElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      if (event.key.toLowerCase() === "v") {
        setViewMode((current) =>
          current === "persons"
            ? "all"
            : "persons",
        )
      }

      if (event.key.toLowerCase() === "w") {
        setShowWeakLinks((current) => !current)
      }

      if (event.key.toLowerCase() === "f") {
        document
          .querySelector<HTMLSelectElement>(
            "select",
          )
          ?.focus()
      }

      if (event.key === "Escape") {
        setSelectedId(null)
        setPathIds([])
        setPathIndex(0)
        setShowShortcuts(false)
      }

      if (
        event.shiftKey &&
        event.key === "?"
      ) {
        setShowShortcuts((current) => !current)
      }
    }

    document.addEventListener(
      "keydown",
      handleShortcut,
    )

    return () => {
      document.removeEventListener(
        "keydown",
        handleShortcut,
      )
    }
  }, [])

  function toggleCategory(type: string) {
    setActiveCategories((current) => {
      const next = new Set(current)

      if (next.has(type)) {
        next.delete(type)
      } else {
        next.add(type)
      }

      return next
    })
  }

  function clearPath() {
    setPathIds([])
    setPathIndex(0)

    cyRef.current
      ?.elements()
      .removeClass("path-flow")
  }

  function findPath() {
    if (
      !sourceId ||
      !targetId ||
      sourceId === targetId
    ) {
      return
    }

    const adjacency = new Map<
      string,
      string[]
    >()

    allEdges.forEach(
      ({ source, target }) => {
        if (!adjacency.has(source)) {
          adjacency.set(source, [])
        }

        if (!adjacency.has(target)) {
          adjacency.set(target, [])
        }

        adjacency
          .get(source)
          ?.push(target)

        adjacency
          .get(target)
          ?.push(source)
      },
    )

    const queue: string[][] = [[sourceId]]

    const visited = new Set<string>([
      sourceId,
    ])

    let result: string[] = []

    while (queue.length) {
      const path =
        pathMode === "lowest"
          ? queue.shift()!
          : queue.pop()!

      const current =
        path[path.length - 1]

      if (current === targetId) {
        result = path
        break
      }

      for (const next of
        adjacency.get(current) ?? []) {
        if (!visited.has(next)) {
          visited.add(next)
          queue.push([...path, next])
        }
      }
    }

    setPathIds(result)
    setPathIndex(0)
  }

  function resetGraph() {
    setQuery("")
    setFilter("All")

    setActiveCategories(
      new Set(
        nodeDefinitions.map(
          (node) => node.data.type,
        ),
      ),
    )

    setMaxYear(2026)
    setShowWeakLinks(true)
    setShowAiPredictions(true)
    setShowHiddenClusters(false)
    setFilterMode("dim")
    setViewMode("all")
    setSelectedId(null)
    setPathIds([])
    setPathIndex(0)

    requestAnimationFrame(() => {
      const cy = cyRef.current

      if (!cy) return

      cy.resize()
      cy.fit(cy.elements(), 40)

      /*
       * Keep reset consistent with initial load:
       * fit first, then zoom out slightly.
       */
      const fittedZoom = cy.zoom()

      cy.zoom({
        level: Math.max(
          0.25,
          fittedZoom * 0.88,
        ),
        renderedPosition: {
          x: cy.width() / 2,
          y: cy.height() / 2,
        },
      })
    })
  }

  function fitGraph() {
    const cy = cyRef.current

    if (!cy) return

    cy.resize()
    cy.fit(cy.elements(), 40)
  }

  function toggleGraphFilters() {
    setShowGraphFilters((current) => !current)
    if (mobileGraphSidebar === "filters") {
      setMobileGraphSidebar(null)
    }
  }

  function toggleSelectedEntity() {
    setShowSelectedEntity((current) => !current)
    if (mobileGraphSidebar === "selected") {
      setMobileGraphSidebar(null)
    }
  }

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-background">
      {/* HEADER */}

      <header className="flex shrink-0 flex-wrap items-center gap-3 border-b px-3 py-2">
        <div className="order-1 flex items-center gap-2 lg:hidden">
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 text-xs"
            onClick={() => {
              setShowGraphFilters(true)
              setMobileGraphSidebar((current) => current === "filters" ? null : "filters")
            }}
          >
            <SlidersHorizontalIcon className="size-3.5" />
            Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 text-xs"
            onClick={() => {
              setShowSelectedEntity(true)
              setMobileGraphSidebar((current) => current === "selected" ? null : "selected")
            }}
          >
            <Layers3Icon className="size-3.5" />
            Selected
          </Button>
        </div>

        {/* ENTITY CATEGORIES */}

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="order-3 h-7 w-36 justify-between gap-2 rounded-4xl border-input bg-input/30 px-3 text-xs hover:bg-input/50 lg:order-2"
              />
            }
          >
            <span className="flex items-center gap-1.5">
              <SlidersHorizontalIcon className="size-3.5" />
              Entities
            </span>
            <ChevronDownIcon className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-52">
            <DropdownMenuItem onClick={() => setFilter("All")}>
              <CheckIcon
                className={filter === "All" ? "size-4" : "invisible size-4"}
              />
              {labels.all}
            </DropdownMenuItem>
            {allCategories.map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => {
                  toggleCategory(type)
                  setFilter("All")
                }}
              >
                <CheckIcon
                  className={activeCategories.has(type) ? "size-4" : "invisible size-4"}
                />
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* PATH CONTROLS */}

        <div className="order-4 flex w-full flex-wrap items-center gap-2 rounded-md border bg-muted/30 p-1 lg:order-3 lg:w-auto">
          <GraphDropdown
            label="Source node"
            value={sourceId}
            options={nodeDefinitions.map((node) => ({
              value: node.id,
              label: node.data.label,
            }))}
            onChange={setSourceId}
          />

          <GraphDropdown
            label="Target node"
            value={targetId}
            options={nodeDefinitions.map((node) => ({
              value: node.id,
              label: node.data.label,
            }))}
            onChange={setTargetId}
          />

          <GraphDropdown
            label="Lowest hops"
            value={pathMode}
            options={[
              { value: "lowest", label: "Lowest hops" },
              { value: "highest", label: "Highest hops" },
            ]}
            onChange={(value) =>
              setPathMode(value as "lowest" | "highest")
            }
          />

          <Button
            size="sm"
            className="h-7 gap-1"
            onClick={findPath}
          >
            <RouteIcon className="size-3.5" />
            Find path
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="h-7"
            onClick={clearPath}
          >
            Clear
          </Button>
        </div>

        {/* HEADER ACTIONS */}

        <div className="order-2 ml-auto flex items-center gap-1 lg:order-4 lg:ml-0">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5"
            onClick={() =>
              setViewMode((current) =>
                current === "persons"
                  ? "all"
                  : "persons",
              )
            }
          >
            <Layers3Icon className="size-3.5" />

            <span className="hidden xl:inline">
              {/*
               * Labels intentionally swapped as requested.
               *
               * Persons mode -> button says "Persons only"
               * All mode     -> button says "All entities"
               */}
              {viewMode === "persons"
                ? "Persons only"
                : "All entities"}
            </span>
          </Button>

          <Button
            variant="outline"
            size="icon-sm"
            onClick={() =>
              setShowShortcuts(true)
            }
            aria-label="Keyboard shortcuts"
          >
            <HelpCircleIcon />
          </Button>
        </div>
      </header>

      {/* MAIN */}

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {mobileGraphSidebar && (
          <button
            type="button"
            aria-label="Close graph sidebar"
            className="absolute inset-0 z-20 bg-black/45 lg:hidden"
            onClick={() => setMobileGraphSidebar(null)}
          />
        )}

        {/* LEFT SIDEBAR */}

        <aside className={`hidden shrink-0 overflow-y-auto border-l border-r border-border/40 bg-muted/10 transition-[width] duration-200 lg:flex max-lg:absolute max-lg:inset-y-0 max-lg:left-0 max-lg:z-30 max-lg:shadow-xl ${mobileGraphSidebar === "filters" ? "max-lg:flex max-lg:w-64" : "max-lg:hidden"} ${showGraphFilters ? "w-64" : "w-10"}`}>
          <Card className="h-full min-h-0 w-full min-w-0 rounded-none border-0">
          <div className={`relative flex items-center border-b py-3 ${showGraphFilters ? "justify-between px-4" : "justify-center px-1"}`}>
            <Button
              variant="ghost"
              size="icon-sm"
              className="size-7 shrink-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
              onClick={toggleGraphFilters}
              aria-expanded={showGraphFilters}
              aria-label={showGraphFilters ? "Collapse graph filters" : "Expand graph filters"}
            >
              {showGraphFilters ? (
                <ChevronLeftIcon className="size-4" />
              ) : (
                <ChevronRightIcon className="size-4" />
              )}
            </Button>

            {showGraphFilters && (
              <CardTitle className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-sm">
                <SlidersHorizontalIcon className="size-3.5" />
                Graph filters
              </CardTitle>
            )}


          </div>

          {showGraphFilters && <CardContent className="space-y-5 pt-5">
            {/* FILTER BEHAVIOR */}

            <div>
              <p className="mb-2 text-xs font-medium">
                Filter behavior
              </p>

              <div className="grid grid-cols-2 gap-1 rounded-md border bg-background p-1">
                <Button
                  size="sm"
                  variant={
                    filterMode === "dim"
                      ? "secondary"
                      : "ghost"
                  }
                  className="h-7 text-xs"
                  onClick={() =>
                    setFilterMode("dim")
                  }
                >
                  Dim
                </Button>

                <Button
                  size="sm"
                  variant={
                    filterMode === "hide"
                      ? "secondary"
                      : "ghost"
                  }
                  className="h-7 text-xs"
                  onClick={() =>
                    setFilterMode("hide")
                  }
                >
                  Hide
                </Button>
              </div>
            </div>

            {/* TIMELINE */}

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-xs font-medium">
                  Timeline
                </p>

                <span className="font-mono text-[11px] text-primary">
                  2020 - {maxYear}
                </span>
              </div>

              <input
                type="range"
                min="2020"
                max="2026"
                step="1"
                value={maxYear}
                onChange={(event) =>
                  setMaxYear(
                    Number(
                      event.target.value,
                    ),
                  )
                }
                className="w-full accent-primary"
              />

              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>2020</span>
                <span>2021</span>
                <span>2022</span>
                <span>2023</span>
                <span>2024</span>
                <span>2025</span>
                <span>2026</span>
              </div>

              <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                Nodes enter the graph according to
                their assigned year.
              </p>
            </div>

            <ToggleRow
              label="Weak link visibility"
              description="Show dashed location and case links"
              active={showWeakLinks}
              onClick={() =>
                setShowWeakLinks(
                  (current) => !current,
                )
              }
            />

            <ToggleRow
              label="AI predictions"
              description="Show pink predicted relationships"
              active={showAiPredictions}
              onClick={() =>
                setShowAiPredictions(
                  (current) => !current,
                )
              }
            />

            {/* EDGE LEGEND */}

            <div className="rounded-md border bg-background p-3">
              <p className="mb-2 text-xs font-semibold">
                Edge legend
              </p>

              <div className="space-y-2 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-0.5 w-5 rounded-full bg-slate-500" />
                  <span>Solid · standard</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-block h-0.5 w-5 border-t-2 border-dashed border-slate-500" />
                  <span>Dashed · weak link</span>
                </div>

<div className="flex items-center gap-2 text-blue-400">
  <span className="inline-block h-0.5 w-5 rounded-full bg-blue-500" />

  <span>Blue · AI prediction</span>

  <span className="ml-auto rounded border border-blue-400/40 bg-blue-400/10 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-blue-300">
    AI
  </span>
</div>

              </div>
            </div>
          </CardContent>}
          </Card>
        </aside>

        {/* GRAPH AREA */}

        <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
          <div
            ref={containerRef}
            className="absolute inset-0 h-full w-full bg-muted/10"
          />

          {/* SEARCH */}

          <div className="absolute left-3 top-3 z-10 rounded-md border bg-background/90 p-1 backdrop-blur">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder={labels.search}
                className="h-8 w-52 pl-7 text-xs"
              />
            </div>
          </div>

          {/* CURRENT TIMELINE YEAR */}

          <div className="absolute bottom-3 left-3 z-10 rounded-md border bg-background/90 px-3 py-2 shadow backdrop-blur">
            <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
              Timeline
            </div>

            <div className="font-mono text-sm font-semibold text-primary">
              {maxYear}
            </div>
          </div>

          {/* ZOOM */}

          <div className="absolute right-3 top-3 z-10 flex gap-1 rounded-md border bg-background/90 p-1 backdrop-blur">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => {
                const cy = cyRef.current

                if (!cy) return

                cy.zoom({
                  level: cy.zoom() * 1.2,
                  renderedPosition: {
                    x: cy.width() / 2,
                    y: cy.height() / 2,
                  },
                })
              }}
            >
              <PlusIcon />
            </Button>

            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => {
                const cy = cyRef.current

                if (!cy) return

                cy.zoom({
                  level: cy.zoom() / 1.2,
                  renderedPosition: {
                    x: cy.width() / 2,
                    y: cy.height() / 2,
                  },
                })
              }}
            >
              <MinusIcon />
            </Button>

            <Button
              variant="outline"
              size="icon-sm"
              onClick={fitGraph}
            >
              <Maximize2Icon />
            </Button>

            <Button
              variant="outline"
              size="icon-sm"
              onClick={resetGraph}
            >
              <RotateCcwIcon />
            </Button>
          </div>

          {/* PATH NAVIGATION */}

          {pathIds.length > 0 && (
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-lg border bg-background/95 px-3 py-2 text-xs shadow-lg backdrop-blur">
              <span className="font-medium">
                Path {pathIndex + 1} /{" "}
                {pathIds.length}
              </span>

              <Button
                variant="ghost"
                size="icon-xs"
                disabled={pathIndex === 0}
                onClick={() =>
                  setPathIndex((current) =>
                    Math.max(
                      0,
                      current - 1,
                    ),
                  )
                }
              >
                <ChevronLeftIcon />
              </Button>

              <span className="max-w-48 truncate text-muted-foreground">
                {
                  nodeDefinitions.find(
                    (node) =>
                      node.id ===
                      pathIds[pathIndex],
                  )?.data.label
                }
              </span>

              <Button
                variant="ghost"
                size="icon-xs"
                disabled={
                  pathIndex ===
                  pathIds.length - 1
                }
                onClick={() =>
                  setPathIndex((current) =>
                    Math.min(
                      pathIds.length - 1,
                      current + 1,
                    ),
                  )
                }
              >
                <ChevronRightIcon />
              </Button>
            </div>
          )}

          {/* PATH SUMMARY */}

          {pathIds.length > 0 && (
            <Card className="absolute right-3 top-16 z-10 w-64 shadow-lg">
              <CardHeader className="flex flex-row items-center gap-2 py-3">
                <RouteIcon className="size-4 text-amber-500" />

                <CardTitle className="text-xs">
                  Discovered flow summary
                </CardTitle>

                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="ms-auto"
                  onClick={clearPath}
                >
                  <XIcon />
                </Button>
              </CardHeader>

              <CardContent className="space-y-2 pt-0 text-xs">
                <Detail
                  label="Total hop count"
                  value={String(
                    pathIds.length - 1,
                  )}
                />

                <Detail
                  label="Sequence traversal"
                  value={pathIds
                    .map(
                      (id) =>
                        nodeDefinitions.find(
                          (node) =>
                            node.id === id,
                        )?.data.label,
                    )
                    .join(" → ")}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT SIDEBAR */}

        <aside className={`hidden shrink-0 overflow-y-auto border-l bg-muted/10 transition-[width] duration-200 lg:flex max-lg:absolute max-lg:inset-y-0 max-lg:right-0 max-lg:z-30 max-lg:shadow-xl ${mobileGraphSidebar === "selected" ? "max-lg:flex max-lg:flex-none max-lg:!w-[calc(100vw-1rem)] max-lg:!min-w-[calc(100vw-1rem)]" : "max-lg:hidden"} ${showSelectedEntity ? "w-72" : "w-10"}`}>
          <Card className="h-full min-h-0 w-full min-w-0 rounded-none border-0">
            <div className={`relative flex items-center border-b py-3 ${showSelectedEntity ? "justify-between px-4" : "justify-center px-1"}`}>
              <Button
                variant="ghost"
                size="icon-sm"
                className={`size-7 shrink-0 text-muted-foreground hover:bg-transparent hover:text-foreground ${showSelectedEntity ? "ms-auto max-lg:ms-0" : ""}`}
                onClick={toggleSelectedEntity}
                aria-expanded={showSelectedEntity}
                aria-label={showSelectedEntity ? "Collapse selected entity" : "Expand selected entity"}
              >
                {showSelectedEntity ? (
                  <ChevronRightIcon className="size-4" />
                ) : (
                  <ChevronLeftIcon className="size-4" />
                )}
              </Button>
              {showSelectedEntity && (
                <CardTitle className="absolute left-1/2 -translate-x-1/2 text-sm">
                  {labels.selected}
                </CardTitle>
              )}
            </div>

            {showSelectedEntity && <CardContent className="pt-5">
              {!selectedNode ? (
                <p className="text-sm text-muted-foreground">
                  {labels.noSelection}
                </p>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-10 items-center justify-center rounded-full border text-xs font-bold ${
                        typeStyles[
                          selectedNode.data.type
                        ]
                      }`}
                    >
                      {selectedNode.data.label
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {
                          selectedNode
                            .data.label
                        }
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {
                          selectedNode
                            .data.type
                        }
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <Detail
                      label={labels.nodeType}
                      value={
                        selectedNode.data
                          .type
                      }
                    />

                    <Detail
                      label={labels.designation}
                      value={
                        selectedNode.data
                          .designation
                      }
                    />

                    <Detail
                      label="Year introduced"
                      value={String(
                        selectedNode.data.year,
                      )}
                    />

                    <Detail
                      label={
                        labels.connections
                      }
                      value={`${connections.length} ${labels.links}`}
                    />
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                      {labels.relationships}
                    </p>

                    <div className="space-y-2">
                      {connections.map(
                        ({
                          source,
                          target,
                          relation,
                          ai,
                          weak,
                        }) => (
<div
  key={`${source}-${target}-${relation}`}
  className={`rounded-md border px-2 py-1.5 text-[11px] ${
    ai
      ? "border-blue-500/40 bg-blue-500/5"
      : ""
  }`}
>

                            <div className="flex items-center gap-1.5">
<span
  className={`font-medium ${
    ai
      ? "text-blue-400"
      : ""
  }`}
>
  {relation}
</span>

{ai && (
  <span className="rounded border border-blue-400/40 bg-blue-400/10 px-1 py-0.5 text-[8px] font-semibold uppercase text-blue-300">
    AI
  </span>
)}


                              {weak && !ai && (
                                <span className="text-[9px] text-muted-foreground">
                                  weak
                                </span>
                              )}
                            </div>

                            <span className="text-muted-foreground">
                              {" "}
                              ·{" "}
                              {source ===
                              selectedId
                                ? target
                                : source}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>}
          </Card>
        </aside>
      </div>

      {/* FOOTER */}

      <div className="flex shrink-0 items-center justify-between border-t bg-muted/20 px-3 py-1.5 font-mono text-[10px] text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
            System ready
          </span>

          <span>
            Visible year: {maxYear}
          </span>

          <span>
            Nodes: {nodeDefinitions.length}
          </span>

          <span>
            Edges: {allEdges.length}
          </span>

          <span>
            Mode:{" "}
            {viewMode === "persons"
              ? "Persons only"
              : "All entities"}
          </span>
        </div>

        <span className="hidden md:inline">
          Shift + ? for shortcuts
        </span>
      </div>

      {/* SHORTCUTS */}

      {showShortcuts && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="flex flex-row items-center gap-2 border-b">
              <KeyboardIcon className="size-4 text-primary" />

              <CardTitle className="text-sm">
                Keyboard shortcuts
              </CardTitle>

              <Button
                variant="ghost"
                size="icon-xs"
                className="ms-auto"
                onClick={() =>
                  setShowShortcuts(false)
                }
              >
                <XIcon />
              </Button>
            </CardHeader>

            <CardContent className="space-y-3 pt-5 text-xs">
              <Shortcut
                keyName="V"
                label="Switch between persons and all entities"
              />

              <Shortcut
                keyName="W"
                label="Toggle weak links"
              />

              <Shortcut
                keyName="F"
                label="Focus path source"
              />

              <Shortcut
                keyName="Esc"
                label="Clear path and selection"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function GraphDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}) {
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? label

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-7 w-36 justify-between gap-2 rounded-4xl border-input bg-input/30 px-3 text-xs hover:bg-input/50"
            aria-label={label}
          />
        }
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDownIcon className="size-3.5 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-52">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ToggleRow({
  label,
  description,
  active,
  onClick,
}: {
  label: string
  description: string
  active: boolean
  onClick: () => void
}) {
  return (
    <div className="flex items-center justify-between border-t pt-3">
      <div>
        <p className="text-xs font-medium">
          {label}
        </p>

        <p className="text-[10px] text-muted-foreground">
          {description}
        </p>
      </div>

      <Button
        variant={
          active ? "secondary" : "outline"
        }
        size="icon-sm"
        onClick={onClick}
        aria-label={label}
      >
        {active ? <CheckIcon /> : <XIcon />}
      </Button>
    </div>
  )
}

function Shortcut({
  keyName,
  label,
}: {
  keyName: string
  label: string
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="rounded border bg-muted px-2 py-1 font-mono">
        {keyName}
      </span>

      <span className="text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

function Detail({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b pb-2 last:border-0">
      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="max-w-[65%] text-right font-medium">
        {value}
      </span>
    </div>
  )
}

export function Graph() {
  return <GraphContent />
}
