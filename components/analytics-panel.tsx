"use client"

import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TemperatureChart } from "@/components/charts/temperature-chart"
import { VibrationChart } from "@/components/charts/vibration-chart"
import { PowerChart } from "@/components/charts/power-chart"
import { EfficiencyChart } from "@/components/charts/efficiency-chart"
import { generateMockAnalyticsData } from "@/lib/mock-data"

export function AnalyticsPanel() {
  const data = generateMockAnalyticsData()

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
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Advanced analytics and insights</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.averageTemperature}°C</div>
            <p className="text-xs text-muted-foreground">
              {data.temperatureTrend > 0 ? "+" : ""}
              {data.temperatureTrend}% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Vibration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.averageVibration.toFixed(2)} Hz</div>
            <p className="text-xs text-muted-foreground">
              {data.vibrationTrend > 0 ? "+" : ""}
              {data.vibrationTrend}% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Power Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPowerConsumption} kWh</div>
            <p className="text-xs text-muted-foreground">
              {data.powerTrend > 0 ? "+" : ""}
              {data.powerTrend}% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overallEfficiency}%</div>
            <p className="text-xs text-muted-foreground">
              {data.efficiencyTrend > 0 ? "+" : ""}
              {data.efficiencyTrend}% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="temperature" className="space-y-4">
        <TabsList>
          <TabsTrigger value="temperature">Temperature Analysis</TabsTrigger>
          <TabsTrigger value="vibration">Vibration Analysis</TabsTrigger>
          <TabsTrigger value="power">Power Analysis</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="temperature">
          <Card>
            <CardHeader>
              <CardTitle>Temperature Trends</CardTitle>
              <CardDescription>Average temperature across all machines over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <TemperatureChart data={data.temperatureData} detailed />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vibration">
          <Card>
            <CardHeader>
              <CardTitle>Vibration Analysis</CardTitle>
              <CardDescription>Average vibration across all machines over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <VibrationChart data={data.vibrationData} detailed />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="power">
          <Card>
            <CardHeader>
              <CardTitle>Power Consumption Analysis</CardTitle>
              <CardDescription>Total power consumption across all machines over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <PowerChart data={data.powerData} detailed />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="efficiency">
          <Card>
            <CardHeader>
              <CardTitle>Efficiency Analysis</CardTitle>
              <CardDescription>Overall equipment efficiency over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <EfficiencyChart data={data.efficiencyData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Machine Comparison</CardTitle>
            <CardDescription>Performance comparison across machines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 p-4 font-medium">
                <div>Machine</div>
                <div>Temp (°C)</div>
                <div>Vibration (Hz)</div>
                <div>Power (kW)</div>
                <div>Efficiency (%)</div>
              </div>
              {data.machineComparison.map((machine, i) => (
                <div key={i} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 border-t p-4">
                  <div className="font-medium">{machine.name}</div>
                  <div className={machine.temperature > 75 ? "text-destructive" : ""}>{machine.temperature}</div>
                  <div className={machine.vibration > 8 ? "text-destructive" : ""}>{machine.vibration.toFixed(1)}</div>
                  <div>{machine.power}</div>
                  <div>{machine.efficiency}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Insights</CardTitle>
            <CardDescription>Key insights and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.insights.map((insight, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="font-medium">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
