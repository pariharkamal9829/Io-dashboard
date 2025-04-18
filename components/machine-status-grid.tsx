import Link from "next/link"
import { AlertCircle, CheckCircle2, Clock } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Machine } from "@/lib/types"

export function MachineStatusGrid({ machines }: { machines: Machine[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {machines.map((machine) => (
        <Card key={machine.id} className={machine.status === "critical" ? "border-destructive" : ""}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{machine.name}</CardTitle>
              {machine.status === "operational" && (
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Operational
                </Badge>
              )}
              {machine.status === "warning" && (
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                  <Clock className="mr-1 h-3 w-3" />
                  Warning
                </Badge>
              )}
              {machine.status === "critical" && (
                <Badge variant="destructive">
                  <AlertCircle className="mr-1 h-3 w-3" />
                  Critical
                </Badge>
              )}
              {machine.status === "maintenance" && (
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  <Clock className="mr-1 h-3 w-3" />
                  Maintenance
                </Badge>
              )}
            </div>
            <CardDescription>{machine.location}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Temperature</span>
                  <span className={machine.temperature > 75 ? "text-destructive" : ""}>{machine.temperature}°C</span>
                </div>
                <Progress
                  value={(machine.temperature / 100) * 100}
                  className={machine.temperature > 75 ? "bg-destructive/20" : ""}
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Vibration</span>
                  <span className={machine.vibration > 8 ? "text-destructive" : ""}>
                    {machine.vibration.toFixed(1)} Hz
                  </span>
                </div>
                <Progress
                  value={(machine.vibration / 10) * 100}
                  className={machine.vibration > 8 ? "bg-destructive/20" : ""}
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Power</span>
                  <span>{machine.power} kW</span>
                </div>
                <Progress value={(machine.power / 100) * 100} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href={`/machines/${machine.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
