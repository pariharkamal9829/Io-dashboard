import { AlertCircle, CheckCircle2, Clock, Info } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { MachineStatus } from "@/lib/types"

export function MachineStatusIndicator({
  status,
  lastUpdated,
}: {
  status: MachineStatus
  lastUpdated: string
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start gap-2">
          {status === "operational" && (
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              <CheckCircle2 className="mr-1 h-4 w-4" />
              Operational
            </Badge>
          )}
          {status === "warning" && (
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
              <Info className="mr-1 h-4 w-4" />
              Warning
            </Badge>
          )}
          {status === "critical" && (
            <Badge variant="destructive">
              <AlertCircle className="mr-1 h-4 w-4" />
              Critical
            </Badge>
          )}
          {status === "maintenance" && (
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
              <Clock className="mr-1 h-4 w-4" />
              Maintenance
            </Badge>
          )}
          <CardDescription>Last updated: {lastUpdated}</CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}
