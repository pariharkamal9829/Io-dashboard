"use client"

import { useState } from "react"
import { AlertCircle, ArrowLeft, Filter, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { generateMockAlerts } from "@/lib/mock-data"

export function AlertsPanel() {
  const [alerts] = useState(generateMockAlerts())
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [machineFilter, setMachineFilter] = useState("all")

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter
    const matchesMachine = machineFilter === "all" || alert.machine === machineFilter

    return matchesSearch && matchesStatus && matchesMachine
  })

  const activeAlerts = alerts.filter((alert) => alert.status === "active")
  const machines = [...new Set(alerts.map((alert) => alert.machine))]

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
            <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
            <p className="text-muted-foreground">Monitor and manage system alerts</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button>Configure Alert Rules</Button>
        </div>
      </div>

      {activeAlerts.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Critical Alerts</AlertTitle>
          <AlertDescription>There are {activeAlerts.length} active alerts that require attention.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Alert Management</CardTitle>
          <CardDescription>View and manage all system alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="w-[180px]">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-[180px]">
                  <Select value={machineFilter} onValueChange={setMachineFilter}>
                    <SelectTrigger>
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by machine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Machines</SelectItem>
                      {machines.map((machine) => (
                        <SelectItem key={machine} value={machine}>
                          {machine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 p-4 font-medium">
                <div>Status</div>
                <div>Alert</div>
                <div>Machine</div>
                <div>Time</div>
              </div>
              {filteredAlerts.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">No alerts found.</div>
              ) : (
                filteredAlerts.map((alert, i) => (
                  <div key={i} className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 border-t p-4">
                    <div>
                      <Badge variant={alert.status === "active" ? "destructive" : "outline"}>
                        {alert.status === "active" ? "Active" : "Resolved"}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-sm text-muted-foreground">{alert.description}</div>
                    </div>
                    <div>{alert.machine}</div>
                    <div className="text-muted-foreground">{alert.time}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
