import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MachineParameterCard({
  title,
  value,
  change,
  critical,
}: {
  title: string
  value: string
  change: number
  critical: boolean
}) {
  return (
    <Card className={critical ? "border-destructive" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <div className={`text-2xl font-bold ${critical ? "text-destructive" : ""}`}>{value}</div>
          <div className="flex items-center text-xs">
            {change > 0 ? (
              <>
                <ArrowUpIcon className="mr-1 h-3 w-3 text-destructive" />
                <span className="text-destructive">+{change}%</span>
              </>
            ) : (
              <>
                <ArrowDownIcon className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">{change}%</span>
              </>
            )}
            <span className="ml-1 text-muted-foreground">from last hour</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
