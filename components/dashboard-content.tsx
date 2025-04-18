"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AlertCircle, ArrowRight, Factory, Thermometer, VibrateIcon as Vibration, Zap } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TemperatureChart } from "@/components/charts/temperature-chart"
import { VibrationChart } from "@/components/charts/vibration-chart"
import { PowerChart } from "@/components/charts/power-chart"
import { MachineStatusGrid } from "@/components/machine-status-grid"
import { generateMockData } from "@/lib/mock-data"

export function DashboardContent() {
  const [data, setData] = useState(generateMockData())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateMockData())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const activeAlerts = data.alerts.filter((alert) => alert.status === "active")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Monitor machine health parameters in real-time</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export Data</Button>
          <Button>Configure Alerts</Button>
        </div>
      </div>

      {activeAlerts.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Critical Alerts</AlertTitle>
          <AlertDescription>
            There are {activeAlerts.length} active alerts that require attention.
            <Button variant="link" asChild className="h-auto p-0 ml-2">
              <Link href="/alerts">View Alerts</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Machines</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.machines.length}</div>
            <p className="text-xs text-muted-foreground">
              {data.machines.filter((m) => m.status === "operational").length} operational
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(data.machines.reduce((acc, m) => acc + m.temperature, 0) / data.machines.length)}°C
            </div>
            <p className="text-xs text-muted-foreground">+2.5% from last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Vibration</CardTitle>
            <Vibration className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(data.machines.reduce((acc, m) => acc + m.vibration, 0) / data.machines.length).toFixed(2)} Hz
            </div>
            <p className="text-xs text-muted-foreground">-0.8% from last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Power Consumption</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(data.machines.reduce((acc, m) => acc + m.power, 0))} kW
            </div>
            <p className="text-xs text-muted-foreground">+12% from last hour</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="status" className="space-y-4">
        <TabsList>
          <TabsTrigger value="status">Machine Status</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="vibration">Vibration</TabsTrigger>
          <TabsTrigger value="power">Power Consumption</TabsTrigger>
        </TabsList>
        <TabsContent value="status" className="space-y-4">
          <MachineStatusGrid machines={data.machines} />
        </TabsContent>
        <TabsContent value="temperature">
          <Card>
            <CardHeader>
              <CardTitle>Temperature Trends</CardTitle>
              <CardDescription>Machine temperature readings over the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <TemperatureChart data={data.temperatureHistory} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vibration">
          <Card>
            <CardHeader>
              <CardTitle>Vibration Analysis</CardTitle>
              <CardDescription>Machine vibration readings over the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <VibrationChart data={data.vibrationHistory} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="power">
          <Card>
            <CardHeader>
              <CardTitle>Power Consumption</CardTitle>
              <CardDescription>Machine power consumption over the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <PowerChart data={data.powerHistory} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest alerts from all machines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.alerts.slice(0, 5).map((alert, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Badge variant={alert.status === "active" ? "destructive" : "outline"}>
                    {alert.status === "active" ? "Active" : "Resolved"}
                  </Badge>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{alert.title}</p>
                    <p className="text-sm text-muted-foreground">{alert.machine}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{alert.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/alerts">
                View All Alerts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
            <CardDescription>Upcoming maintenance tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.maintenance.map((task, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Badge
                    variant={
                      task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"
                    }
                  >
                    {task.priority}
                  </Badge>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.machine}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{task.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Schedule Maintenance
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
