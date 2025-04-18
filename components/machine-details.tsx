"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Download, RefreshCcw } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TemperatureChart } from "@/components/charts/temperature-chart"
import { VibrationChart } from "@/components/charts/vibration-chart"
import { PowerChart } from "@/components/charts/power-chart"
import { MachineStatusIndicator } from "@/components/machine-status-indicator"
import { MachineParameterCard } from "@/components/machine-parameter-card"
import { MachineAlertsList } from "@/components/machine-alerts-list"
import { MachineLogs } from "@/components/machine-logs"
import { generateMockMachineData } from "@/lib/mock-data"

export function MachineDetails({ id }: { id: string }) {
  const [data, setData] = useState(generateMockMachineData(id))
  const [loading, setLoading] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateMockMachineData(id))
    }, 5000)

    return () => clearInterval(interval)
  }, [id])

  const refreshData = () => {
    setLoading(true)
    setTimeout(() => {
      setData(generateMockMachineData(id))
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{data.name}</h1>
            <p className="text-muted-foreground">
              {data.location} • Machine ID: {id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={refreshData} disabled={loading}>
            {loading ? (
              <>
                <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Refresh Data
              </>
            )}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MachineStatusIndicator status={data.status} lastUpdated={data.lastUpdated} />
        <MachineParameterCard
          title="Temperature"
          value={`${data.temperature}°C`}
          change={data.temperatureChange}
          critical={data.temperature > 75}
        />
        <MachineParameterCard
          title="Vibration"
          value={`${data.vibration.toFixed(1)} Hz`}
          change={data.vibrationChange}
          critical={data.vibration > 8}
        />
        <MachineParameterCard
          title="Power Consumption"
          value={`${data.power} kW`}
          change={data.powerChange}
          critical={false}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="vibration">Vibration</TabsTrigger>
          <TabsTrigger value="power">Power</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Temperature Trend</CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <TemperatureChart data={data.temperatureHistory} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Machine Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Model</dt>
                    <dd>{data.model}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Serial Number</dt>
                    <dd>{data.serialNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Manufacturer</dt>
                    <dd>{data.manufacturer}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Installation Date</dt>
                    <dd>{data.installationDate}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Last Maintenance</dt>
                    <dd>{data.lastMaintenance}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Next Maintenance</dt>
                    <dd>{data.nextMaintenance}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Last 5 alerts for this machine</CardDescription>
              </CardHeader>
              <CardContent>
                <MachineAlertsList alerts={data.alerts.slice(0, 5)} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Current operational metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Operational Efficiency</dt>
                    <dd>{data.metrics.efficiency}%</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Uptime</dt>
                    <dd>{data.metrics.uptime}%</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Production Rate</dt>
                    <dd>{data.metrics.productionRate} units/hour</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Quality Rate</dt>
                    <dd>{data.metrics.qualityRate}%</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Overall Equipment Effectiveness</dt>
                    <dd>{data.metrics.oee}%</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="temperature">
          <Card>
            <CardHeader>
              <CardTitle>Temperature Analysis</CardTitle>
              <CardDescription>Detailed temperature readings over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <TemperatureChart data={data.temperatureHistory} detailed />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vibration">
          <Card>
            <CardHeader>
              <CardTitle>Vibration Analysis</CardTitle>
              <CardDescription>Detailed vibration readings over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <VibrationChart data={data.vibrationHistory} detailed />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="power">
          <Card>
            <CardHeader>
              <CardTitle>Power Consumption Analysis</CardTitle>
              <CardDescription>Detailed power consumption readings over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <PowerChart data={data.powerHistory} detailed />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Machine Alerts</CardTitle>
              <CardDescription>All alerts for this machine</CardDescription>
            </CardHeader>
            <CardContent>
              <MachineAlertsList alerts={data.alerts} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Machine Logs</CardTitle>
              <CardDescription>System logs and events</CardDescription>
            </CardHeader>
            <CardContent>
              <MachineLogs logs={data.logs} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
