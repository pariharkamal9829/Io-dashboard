"use client"

import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function SettingsPanel() {
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
    }, 1500)
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
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Configure system settings and preferences</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Save className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="alerts">Alert Settings</TabsTrigger>
          <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input id="system-name" defaultValue="Machine Health Monitoring System" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="Acme Manufacturing" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    <SelectItem value="cst">Central Time (CST)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="iso">
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iso">ISO (YYYY-MM-DD)</SelectItem>
                    <SelectItem value="us">US (MM/DD/YYYY)</SelectItem>
                    <SelectItem value="eu">EU (DD/MM/YYYY)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="real-time-updates">Real-time Updates</Label>
                <Switch id="real-time-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sound-alerts">Sound Alerts</Label>
                <Switch id="sound-alerts" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Alert Settings</CardTitle>
              <CardDescription>Configure how alerts are handled and delivered</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="alert-email">Email Notifications</Label>
                <Input id="alert-email" type="email" placeholder="admin@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alert-phone">SMS Notifications</Label>
                <Input id="alert-phone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-critical">Email for Critical Alerts</Label>
                <Switch id="email-critical" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-warning">Email for Warning Alerts</Label>
                <Switch id="email-warning" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-critical">SMS for Critical Alerts</Label>
                <Switch id="sms-critical" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-warning">SMS for Warning Alerts</Label>
                <Switch id="sms-warning" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alert-frequency">Alert Frequency</Label>
                <Select defaultValue="immediate">
                  <SelectTrigger id="alert-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="5min">Every 5 minutes</SelectItem>
                    <SelectItem value="15min">Every 15 minutes</SelectItem>
                    <SelectItem value="hourly">Hourly digest</SelectItem>
                    <SelectItem value="daily">Daily digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="thresholds">
          <Card>
            <CardHeader>
              <CardTitle>Threshold Settings</CardTitle>
              <CardDescription>Configure alert thresholds for machine parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Temperature Warning Threshold (°C)</Label>
                  <span className="w-12 rounded-md border border-input px-2 py-0.5 text-center text-sm">65</span>
                </div>
                <Slider defaultValue={[65]} max={100} step={1} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Temperature Critical Threshold (°C)</Label>
                  <span className="w-12 rounded-md border border-input px-2 py-0.5 text-center text-sm">80</span>
                </div>
                <Slider defaultValue={[80]} max={100} step={1} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Vibration Warning Threshold (Hz)</Label>
                  <span className="w-12 rounded-md border border-input px-2 py-0.5 text-center text-sm">6.5</span>
                </div>
                <Slider defaultValue={[65]} max={100} step={1} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Vibration Critical Threshold (Hz)</Label>
                  <span className="w-12 rounded-md border border-input px-2 py-0.5 text-center text-sm">8.0</span>
                </div>
                <Slider defaultValue={[80]} max={100} step={1} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Power Warning Threshold (kW)</Label>
                  <span className="w-12 rounded-md border border-input px-2 py-0.5 text-center text-sm">85</span>
                </div>
                <Slider defaultValue={[85]} max={100} step={1} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Power Critical Threshold (kW)</Label>
                  <span className="w-12 rounded-md border border-input px-2 py-0.5 text-center text-sm">95</span>
                </div>
                <Slider defaultValue={[95]} max={100} step={1} />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Reset to Defaults
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage system users and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-[2fr_2fr_1fr_1fr] gap-4 p-4 font-medium">
                  <div>Name</div>
                  <div>Email</div>
                  <div>Role</div>
                  <div>Actions</div>
                </div>
                <div className="grid grid-cols-[2fr_2fr_1fr_1fr] gap-4 border-t p-4">
                  <div className="font-medium">John Smith</div>
                  <div>john.smith@example.com</div>
                  <div>Admin</div>
                  <div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_2fr_1fr_1fr] gap-4 border-t p-4">
                  <div className="font-medium">Sarah Johnson</div>
                  <div>sarah.j@example.com</div>
                  <div>Manager</div>
                  <div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_2fr_1fr_1fr] gap-4 border-t p-4">
                  <div className="font-medium">Michael Chen</div>
                  <div>m.chen@example.com</div>
                  <div>Technician</div>
                  <div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add New User</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage API keys and integration settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input id="api-key" value="sk_live_51NZXr5ABCdEfGhIjKlMnOpQrStUvWxYz" readOnly />
                  <Button variant="outline">Regenerate</Button>
                </div>
                <p className="text-sm text-muted-foreground">Use this key to authenticate API requests</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" placeholder="https://your-server.com/webhook" />
                <p className="text-sm text-muted-foreground">We'll send event notifications to this URL</p>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="api-enabled">API Access Enabled</Label>
                <Switch id="api-enabled" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="webhook-enabled">Webhook Notifications</Label>
                <Switch id="webhook-enabled" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate-limit">Rate Limit (requests per minute)</Label>
                <Select defaultValue="100">
                  <SelectTrigger id="rate-limit">
                    <SelectValue placeholder="Select rate limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="500">500</SelectItem>
                    <SelectItem value="1000">1000</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
