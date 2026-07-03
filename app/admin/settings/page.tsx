"use client"

import { useState } from "react"
import { Settings, Save, Database, Key, Bot } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import AdminLayout from "@/components/admin/admin-layout"

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    siteName: "Nexa AI Systems",
    siteDescription: "AI-Powered Business Solutions",
    contactEmail: "contact@nexaai.com",
    supportEmail: "support@nexaai.com",
    chatbotEnabled: true,
    chatbotWelcomeMessage: "Hello! I'm Nexa AI assistant. How can I help you today?",
    maintenanceMode: false,
  })

  const handleSave = async () => {
    setSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic site configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable to show a maintenance page to visitors
                  </p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, maintenanceMode: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Chatbot Settings
              </CardTitle>
              <CardDescription>Configure the AI chatbot behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Enable Chatbot</Label>
                  <p className="text-sm text-muted-foreground">
                    Show the AI chatbot widget on the site
                  </p>
                </div>
                <Switch
                  checked={settings.chatbotEnabled}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, chatbotEnabled: checked })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Textarea
                  id="welcomeMessage"
                  value={settings.chatbotWelcomeMessage}
                  onChange={(e) =>
                    setSettings({ ...settings, chatbotWelcomeMessage: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Information
              </CardTitle>
              <CardDescription>Connection and status information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <p className="font-medium">Database Status</p>
                    <p className="text-sm text-muted-foreground">PostgreSQL via Prisma ORM</p>
                  </div>
                  <span className="flex items-center gap-2 text-sm text-green-500">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Connected
                  </span>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">
                    Database connection is configured via the DATABASE_URL environment variable.
                    Run <code className="rounded bg-muted px-1 py-0.5">npx prisma db push</code> to
                    sync your schema with the database.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </CardTitle>
              <CardDescription>External service integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">OpenAI API</p>
                    <span className="flex items-center gap-2 text-sm text-green-500">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Configured
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    OpenAI API key is configured via the OPENAI_API_KEY environment variable.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">JWT Secret</p>
                    <span className="flex items-center gap-2 text-sm text-green-500">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Configured
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    JWT secret is configured via the JWT_SECRET environment variable.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}
