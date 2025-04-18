import type { Alert, Log, Machine, MaintenanceTask, MachineStatus } from "@/lib/types"

// Helper function to generate random number within range
function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Helper function to generate random decimal within range
function randomDecimal(min: number, max: number): number {
  return +(Math.random() * (max - min) + min).toFixed(1)
}

// Helper function to generate random time series data
function generateTimeSeriesData(
  count: number,
  minValue: number,
  maxValue: number,
  isDecimal = false,
): { time: string; value: number }[] {
  const now = new Date()
  const data: { time: string; value: number }[] = []

  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 3600000) // hourly data
    const time = `${date.getHours().toString().padStart(2, "0")}:00`
    const value = isDecimal ? randomDecimal(minValue, maxValue) : randomNumber(minValue, maxValue)

    data.push({
      time: `${date.getMonth() + 1}/${date.getDate()} ${time}`,
      value,
    })
  }

  return data
}

// Generate random machine status
function generateMachineStatus(temperature: number, vibration: number): MachineStatus {
  if (temperature > 80 || vibration > 8.5) {
    return "critical"
  } else if (temperature > 70 || vibration > 7) {
    return "warning"
  } else if (Math.random() < 0.1) {
    return "maintenance"
  } else {
    return "operational"
  }
}

// Generate mock machines
function generateMachines(count: number): Machine[] {
  const machines: Machine[] = []

  for (let i = 1; i <= count; i++) {
    const temperature = randomNumber(50, 85)
    const vibration = randomDecimal(3, 9)

    machines.push({
      id: i.toString(),
      name: `Machine ${i}`,
      location: `Production Line ${Math.ceil(i / 3)}`,
      status: generateMachineStatus(temperature, vibration),
      temperature,
      vibration,
      power: randomNumber(40, 95),
    })
  }

  return machines
}

// Generate mock alerts
function generateAlerts(count: number): Alert[] {
  const alerts: Alert[] = []
  const alertTypes = [
    "High Temperature",
    "Excessive Vibration",
    "Power Surge",
    "Pressure Drop",
    "Coolant Level Low",
    "Oil Pressure Warning",
    "Bearing Wear Detected",
    "Motor Overload",
  ]

  const now = new Date()

  for (let i = 0; i < count; i++) {
    const date = new Date(now.getTime() - randomNumber(0, 72) * 3600000)
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const time = `${date.getMonth() + 1}/${date.getDate()} ${hours}:${minutes}`

    const alertType = alertTypes[randomNumber(0, alertTypes.length - 1)]
    const machine = `Machine ${randomNumber(1, 9)}`

    alerts.push({
      title: alertType,
      description: `${alertType} detected on ${machine}`,
      machine,
      status: i < count / 3 ? "active" : "resolved",
      time,
    })
  }

  // Sort by time (most recent first)
  return alerts.sort((a, b) => {
    return new Date(b.time).getTime() - new Date(a.time).getTime()
  })
}

// Generate mock maintenance tasks
function generateMaintenanceTasks(count: number): MaintenanceTask[] {
  const tasks: MaintenanceTask[] = []
  const taskTypes = [
    "Routine Inspection",
    "Oil Change",
    "Filter Replacement",
    "Calibration",
    "Belt Replacement",
    "Software Update",
    "Bearing Replacement",
    "Motor Service",
  ]

  const now = new Date()

  for (let i = 0; i < count; i++) {
    const date = new Date(now.getTime() + randomNumber(1, 30) * 86400000)
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    const taskType = taskTypes[randomNumber(0, taskTypes.length - 1)]
    const machine = `Machine ${randomNumber(1, 9)}`

    tasks.push({
      title: taskType,
      machine,
      date: formattedDate,
      priority: i < count / 5 ? "high" : i < count / 2 ? "medium" : "low",
    })
  }

  // Sort by date (soonest first)
  return tasks.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
}

// Generate mock data for the dashboard
export function generateMockData() {
  const machines = generateMachines(9)
  const alerts = generateAlerts(15)
  const maintenance = generateMaintenanceTasks(5)

  const temperatureHistory = generateTimeSeriesData(24, 50, 85)
  const vibrationHistory = generateTimeSeriesData(24, 3, 9, true)
  const powerHistory = generateTimeSeriesData(24, 40, 95)

  return {
    machines,
    alerts,
    maintenance,
    temperatureHistory,
    vibrationHistory,
    powerHistory,
  }
}

// Generate mock data for a specific machine
export function generateMockMachineData(id: string) {
  const temperature = randomNumber(50, 85)
  const vibration = randomDecimal(3, 9)
  const power = randomNumber(40, 95)

  return {
    id,
    name: `Machine ${id}`,
    model: `MX-${randomNumber(1000, 9999)}`,
    serialNumber: `SN-${randomNumber(10000, 99999)}`,
    manufacturer: "Acme Industrial Equipment",
    location: `Production Line ${Math.ceil(Number.parseInt(id) / 3)}`,
    installationDate: "03/15/2022",
    lastMaintenance: "05/10/2023",
    nextMaintenance: "11/10/2023",
    status: generateMachineStatus(temperature, vibration),
    temperature,
    vibration,
    power,
    temperatureChange: randomNumber(-5, 8),
    vibrationChange: randomNumber(-3, 6),
    powerChange: randomNumber(-2, 12),
    lastUpdated: "Just now",
    temperatureHistory: generateTimeSeriesData(24, 50, 85),
    vibrationHistory: generateTimeSeriesData(24, 3, 9, true),
    powerHistory: generateTimeSeriesData(24, 40, 95),
    alerts: generateAlerts(10),
    logs: generateMachineLogs(20),
    metrics: {
      efficiency: randomNumber(75, 98),
      uptime: randomNumber(90, 99),
      productionRate: randomNumber(80, 120),
      qualityRate: randomNumber(92, 99),
      oee: randomNumber(70, 95),
    },
  }
}

// Generate mock logs for a machine
function generateMachineLogs(count: number): Log[] {
  const logs: Log[] = []
  const logMessages = [
    "System startup",
    "Parameter check completed",
    "Maintenance mode activated",
    "Maintenance completed",
    "Temperature threshold adjusted",
    "Vibration threshold adjusted",
    "Firmware updated",
    "Sensor calibration",
    "Warning: Temperature spike detected",
    "Warning: Vibration increase detected",
    "Error: Communication failure",
    "Error: Sensor malfunction",
    "Error: Emergency shutdown initiated",
    "Production cycle started",
    "Production cycle completed",
  ]

  const now = new Date()

  for (let i = 0; i < count; i++) {
    const date = new Date(now.getTime() - randomNumber(0, 72) * 3600000)
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")
    const timestamp = `${date.getMonth() + 1}/${date.getDate()} ${hours}:${minutes}:${seconds}`

    const messageIndex = randomNumber(0, logMessages.length - 1)
    const message = logMessages[messageIndex]

    let level: "info" | "warning" | "error" = "info"
    if (message.startsWith("Warning")) {
      level = "warning"
    } else if (message.startsWith("Error")) {
      level = "error"
    }

    logs.push({
      message,
      timestamp,
      level,
    })
  }

  // Sort by timestamp (most recent first)
  return logs.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })
}

// Generate mock analytics data
export function generateMockAnalyticsData() {
  return {
    averageTemperature: randomNumber(60, 75),
    averageVibration: randomDecimal(4, 7),
    totalPowerConsumption: randomNumber(2500, 3500),
    overallEfficiency: randomNumber(75, 95),
    temperatureTrend: randomNumber(-3, 5),
    vibrationTrend: randomNumber(-5, 3),
    powerTrend: randomNumber(2, 15),
    efficiencyTrend: randomNumber(-2, 4),
    temperatureData: generateTimeSeriesData(30, 50, 85),
    vibrationData: generateTimeSeriesData(30, 3, 9, true),
    powerData: generateTimeSeriesData(30, 40, 95),
    efficiencyData: generateTimeSeriesData(30, 70, 98),
    machineComparison: Array.from({ length: 9 }, (_, i) => ({
      name: `Machine ${i + 1}`,
      temperature: randomNumber(50, 85),
      vibration: randomDecimal(3, 9),
      power: randomNumber(40, 95),
      efficiency: randomNumber(70, 98),
    })),
    insights: [
      {
        title: "Temperature Anomaly Detected",
        description: "Machine 3 shows an unusual temperature pattern that may indicate a cooling system issue.",
      },
      {
        title: "Maintenance Recommendation",
        description:
          "Based on vibration analysis, Machine 5 should be scheduled for bearing inspection within the next 2 weeks.",
      },
      {
        title: "Efficiency Improvement",
        description: "Overall efficiency has improved by 3.2% after the recent software update.",
      },
      {
        title: "Power Consumption Alert",
        description:
          "Power consumption has increased by 12% compared to last month. Consider energy optimization measures.",
      },
    ],
  }
}

// Generate mock alerts for the alerts panel
export function generateMockAlerts() {
  return generateAlerts(30)
}
