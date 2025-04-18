export type MachineStatus = "operational" | "warning" | "critical" | "maintenance"

export interface Machine {
  id: string
  name: string
  location: string
  status: MachineStatus
  temperature: number
  vibration: number
  power: number
}

export interface Alert {
  title: string
  description: string
  machine: string
  status: "active" | "resolved"
  time: string
}

export interface MaintenanceTask {
  title: string
  machine: string
  date: string
  priority: "low" | "medium" | "high"
}

export interface Log {
  message: string
  timestamp: string
  level: "info" | "warning" | "error"
}
