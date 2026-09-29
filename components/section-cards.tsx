"use client"

import {
Card,
CardAction,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function SectionCards() {
const { translations } = useLanguage()
return (
<div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
<Card className="@container/card">
<CardHeader>
<CardDescription>{translations.activeCases}</CardDescription>
<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
1250
</CardTitle>
<CardAction>
<TrendingUpIcon className="size-5" />
</CardAction>
</CardHeader>
<CardFooter />
</Card>

  <Card className="@container/card">
    <CardHeader>
      <CardDescription>{translations.totalEntities}</CardDescription>
      <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
        1234
      </CardTitle>
      <CardAction>
        <TrendingDownIcon className="size-5" />
      </CardAction>
    </CardHeader>
    <CardFooter />
  </Card>

  <Card className="@container/card">
    <CardHeader>
      <CardDescription>{translations.totalLinks}</CardDescription>
      <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
        45678
      </CardTitle>
      <CardAction>
        <TrendingUpIcon className="size-5" />
      </CardAction>
    </CardHeader>
    <CardFooter />
  </Card>

  <Card className="@container/card">
    <CardHeader>
      <CardDescription>{translations.totalDocs}</CardDescription>
      <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
        4500
      </CardTitle>
      <CardAction>
        <TrendingUpIcon className="size-5" />
      </CardAction>
    </CardHeader>
    <CardFooter />
  </Card>
</div>


)
}