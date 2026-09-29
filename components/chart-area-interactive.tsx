"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useLanguage } from "@/components/language-provider"

export const description = "An interactive intelligence activity chart"

const chartData = [
  { date: "2024-04-01", cases: 222, entities: 150 },
  { date: "2024-04-02", cases: 97, entities: 180 },
  { date: "2024-04-03", cases: 167, entities: 120 },
  { date: "2024-04-04", cases: 242, entities: 260 },
  { date: "2024-04-05", cases: 373, entities: 290 },
  { date: "2024-04-06", cases: 301, entities: 340 },
  { date: "2024-04-07", cases: 245, entities: 180 },
  { date: "2024-04-08", cases: 409, entities: 320 },
  { date: "2024-04-09", cases: 59, entities: 110 },
  { date: "2024-04-10", cases: 261, entities: 190 },
  { date: "2024-04-11", cases: 327, entities: 350 },
  { date: "2024-04-12", cases: 292, entities: 210 },
  { date: "2024-04-13", cases: 342, entities: 380 },
  { date: "2024-04-14", cases: 137, entities: 220 },
  { date: "2024-04-15", cases: 120, entities: 170 },
  { date: "2024-04-16", cases: 138, entities: 190 },
  { date: "2024-04-17", cases: 446, entities: 360 },
  { date: "2024-04-18", cases: 364, entities: 410 },
  { date: "2024-04-19", cases: 243, entities: 180 },
  { date: "2024-04-20", cases: 89, entities: 150 },
  { date: "2024-04-21", cases: 137, entities: 200 },
  { date: "2024-04-22", cases: 224, entities: 170 },
  { date: "2024-04-23", cases: 138, entities: 230 },
  { date: "2024-04-24", cases: 387, entities: 290 },
  { date: "2024-04-25", cases: 215, entities: 250 },
  { date: "2024-04-26", cases: 75, entities: 130 },
  { date: "2024-04-27", cases: 383, entities: 420 },
  { date: "2024-04-28", cases: 122, entities: 180 },
  { date: "2024-04-29", cases: 315, entities: 240 },
  { date: "2024-04-30", cases: 454, entities: 380 },
  { date: "2024-05-01", cases: 165, entities: 220 },
  { date: "2024-05-02", cases: 293, entities: 310 },
  { date: "2024-05-03", cases: 247, entities: 190 },
  { date: "2024-05-04", cases: 385, entities: 420 },
  { date: "2024-05-05", cases: 481, entities: 390 },
  { date: "2024-05-06", cases: 498, entities: 520 },
  { date: "2024-05-07", cases: 388, entities: 300 },
  { date: "2024-05-08", cases: 149, entities: 210 },
  { date: "2024-05-09", cases: 227, entities: 180 },
  { date: "2024-05-10", cases: 293, entities: 330 },
  { date: "2024-05-11", cases: 335, entities: 270 },
  { date: "2024-05-12", cases: 197, entities: 240 },
  { date: "2024-05-13", cases: 197, entities: 160 },
  { date: "2024-05-14", cases: 448, entities: 490 },
  { date: "2024-05-15", cases: 473, entities: 380 },
  { date: "2024-05-16", cases: 338, entities: 400 },
  { date: "2024-05-17", cases: 499, entities: 420 },
  { date: "2024-05-18", cases: 315, entities: 350 },
  { date: "2024-05-19", cases: 235, entities: 180 },
  { date: "2024-05-20", cases: 177, entities: 230 },
  { date: "2024-05-21", cases: 82, entities: 140 },
  { date: "2024-05-22", cases: 81, entities: 120 },
  { date: "2024-05-23", cases: 252, entities: 290 },
  { date: "2024-05-24", cases: 294, entities: 220 },
  { date: "2024-05-25", cases: 201, entities: 250 },
  { date: "2024-05-26", cases: 213, entities: 170 },
  { date: "2024-05-27", cases: 420, entities: 460 },
  { date: "2024-05-28", cases: 233, entities: 190 },
  { date: "2024-05-29", cases: 78, entities: 130 },
  { date: "2024-05-30", cases: 340, entities: 280 },
  { date: "2024-05-31", cases: 178, entities: 230 },
  { date: "2024-06-01", cases: 178, entities: 200 },
  { date: "2024-06-02", cases: 470, entities: 410 },
  { date: "2024-06-03", cases: 103, entities: 160 },
  { date: "2024-06-04", cases: 439, entities: 380 },
  { date: "2024-06-05", cases: 88, entities: 140 },
  { date: "2024-06-06", cases: 294, entities: 250 },
  { date: "2024-06-07", cases: 323, entities: 370 },
  { date: "2024-06-08", cases: 385, entities: 320 },
  { date: "2024-06-09", cases: 438, entities: 480 },
  { date: "2024-06-10", cases: 155, entities: 200 },
  { date: "2024-06-11", cases: 92, entities: 150 },
  { date: "2024-06-12", cases: 492, entities: 420 },
  { date: "2024-06-13", cases: 81, entities: 130 },
  { date: "2024-06-14", cases: 426, entities: 380 },
  { date: "2024-06-15", cases: 307, entities: 350 },
  { date: "2024-06-16", cases: 371, entities: 310 },
  { date: "2024-06-17", cases: 475, entities: 520 },
  { date: "2024-06-18", cases: 107, entities: 170 },
  { date: "2024-06-19", cases: 341, entities: 290 },
  { date: "2024-06-20", cases: 408, entities: 450 },
  { date: "2024-06-21", cases: 169, entities: 210 },
  { date: "2024-06-22", cases: 317, entities: 270 },
  { date: "2024-06-23", cases: 480, entities: 530 },
  { date: "2024-06-24", cases: 132, entities: 180 },
  { date: "2024-06-25", cases: 141, entities: 190 },
  { date: "2024-06-26", cases: 434, entities: 380 },
  { date: "2024-06-27", cases: 448, entities: 490 },
  { date: "2024-06-28", cases: 149, entities: 200 },
  { date: "2024-06-29", cases: 103, entities: 160 },
  { date: "2024-06-30", cases: 446, entities: 400 },
]

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")
  const { translations } = useLanguage()

  const chartConfig = {
    cases: {
      label: translations.cases,
      color: "#0D99FF",
    },
    entities: {
      label: translations.entities,
      color: "#66BFFF",
    },
  } satisfies ChartConfig

  React.useEffect(() => {
    if (isMobile) {
      React.startTransition(() => setTimeRange("7d"))
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")

    let daysToSubtract = 90

    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{translations.intelligenceActivity}</CardTitle>

        <CardDescription>
          <span className="hidden @[540px]/card:block">
            {translations.totalLast3Months}
          </span>

          <span className="@[540px]/card:hidden">
            {translations.last3Months}
          </span>
        </CardDescription>

        <CardAction>
          <ToggleGroup
            multiple={false}
            value={timeRange ? [timeRange] : []}
            onValueChange={(value) => {
              setTimeRange(value[0] ?? "90d")
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">
              {translations.last3Months}
            </ToggleGroupItem>

            <ToggleGroupItem value="30d">
              {translations.last30Days}
            </ToggleGroupItem>

            <ToggleGroupItem value="7d">
              {translations.last7Days}
            </ToggleGroupItem>
          </ToggleGroup>

          <Select
            value={timeRange}
            onValueChange={(value) => {
              if (value !== null) {
                setTimeRange(value)
              }
            }}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label={translations.selectValue}
            >
              <SelectValue placeholder={translations.last3Months} />
            </SelectTrigger>

            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                {translations.last3Months}
              </SelectItem>

              <SelectItem value="30d" className="rounded-lg">
                {translations.last30Days}
              </SelectItem>

              <SelectItem value="7d" className="rounded-lg">
                {translations.last7Days}
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient
                id="fillCases"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#0D99FF"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#0D99FF"
                  stopOpacity={0.05}
                />
              </linearGradient>

              <linearGradient
                id="fillEntities"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#66BFFF"
                  stopOpacity={0.7}
                />

                <stop
                  offset="95%"
                  stopColor="#66BFFF"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)

                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="entities"
              type="natural"
              fill="url(#fillEntities)"
              stroke="#66BFFF"
              stackId="a"
            />

            <Area
              dataKey="cases"
              type="natural"
              fill="url(#fillCases)"
              stroke="#0D99FF"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
