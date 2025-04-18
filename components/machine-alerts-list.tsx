import { Badge } from "@/components/ui/badge"
import type { Alert } from "@/lib/types"

export function MachineAlertsList({ alerts }: { alerts: Alert[] }) {
  if (alerts.length === 0) {
    return <p className="text-sm text-muted-foreground">No alerts found.</p>
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert, i) => (
        <div key={i} className="flex items-center gap-4">
          <Badge variant={alert.status === "active" ? "destructive" : "outline"}>
            {alert.status === "active" ? "Active" : "Resolved"}
          </Badge>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{alert.title}</p>
            <p className="text-sm text-muted-foreground">{alert.description}</p>
          </div>
          <div className="text-sm text-muted-foreground">{alert.time}</div>
        </div>
      ))}
    </div>
  )
}
