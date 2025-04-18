import { Badge } from "@/components/ui/badge"
import type { Log } from "@/lib/types"

export function MachineLogs({ logs }: { logs: Log[] }) {
  if (logs.length === 0) {
    return <p className="text-sm text-muted-foreground">No logs found.</p>
  }

  return (
    <div className="space-y-4">
      {logs.map((log, i) => (
        <div key={i} className="flex items-start gap-4">
          <Badge
            variant="outline"
            className={
              log.level === "info"
                ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                : log.level === "warning"
                  ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                  : log.level === "error"
                    ? "bg-destructive/10 text-destructive border-destructive/20"
                    : ""
            }
          >
            {log.level}
          </Badge>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{log.message}</p>
            <p className="text-sm text-muted-foreground">{log.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
