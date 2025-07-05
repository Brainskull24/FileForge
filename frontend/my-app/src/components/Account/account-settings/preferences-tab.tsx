"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Label } from "../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Switch } from "../../ui/switch"
import { Checkbox } from "../../ui/checkbox"
import { Separator } from "../../ui/separator"
import { Settings, Bell, Palette } from "lucide-react"

export function PreferencesTab() {
  const [preferences, setPreferences] = useState({
    encodingFormat: "mp4",
    quality: "high",
    autoDelete: "30",
    downloadFormat: "original",
    batchDefaults: "medium",
    theme: "system",
    sidebarCollapsed: false,
    showPreviews: true,
    keyboardShortcuts: true,
    compactView: false,
    emailNotifications: {
      processingComplete: true,
      creditWarnings: true,
      planRenewal: true,
      announcements: false,
      securityAlerts: true,
    },
    inAppNotifications: true,
    smsNotifications: false,
  })

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const handleEmailNotificationChange = (key: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [key]: checked,
      },
    }))
  }

  return (
    <div className="space-y-6">
      {/* Default Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Default Settings
          </CardTitle>
          <CardDescription>Configure your default processing preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="encodingFormat">Preferred Encoding Format</Label>
              <Select
                value={preferences.encodingFormat}
                onValueChange={(value) => handlePreferenceChange("encodingFormat", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp4">MP4</SelectItem>
                  <SelectItem value="avi">AVI</SelectItem>
                  <SelectItem value="mov">MOV</SelectItem>
                  <SelectItem value="mkv">MKV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quality">Default Conversion Quality</Label>
              <Select value={preferences.quality} onValueChange={(value) => handlePreferenceChange("quality", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Fast)</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High (Best Quality)</SelectItem>
                  <SelectItem value="ultra">Ultra (Lossless)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="autoDelete">Auto-delete Processed Files</Label>
              <Select
                value={preferences.autoDelete}
                onValueChange={(value) => handlePreferenceChange("autoDelete", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="7">After 7 days</SelectItem>
                  <SelectItem value="30">After 30 days</SelectItem>
                  <SelectItem value="90">After 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="downloadFormat">Download Format Preference</Label>
              <Select
                value={preferences.downloadFormat}
                onValueChange={(value) => handlePreferenceChange("downloadFormat", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="original">Keep Original Format</SelectItem>
                  <SelectItem value="mp4">Always MP4</SelectItem>
                  <SelectItem value="zip">ZIP Archive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="batchDefaults">Batch Processing Defaults</Label>
              <Select
                value={preferences.batchDefaults}
                onValueChange={(value) => handlePreferenceChange("batchDefaults", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority (Slower, Less Resources)</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority (Faster, More Resources)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">Email Notifications</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="processingComplete"
                  checked={preferences.emailNotifications.processingComplete}
                  onCheckedChange={(checked) => handleEmailNotificationChange("processingComplete", checked as boolean)}
                />
                <Label htmlFor="processingComplete" className="text-sm font-normal">
                  Processing completion notifications
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="creditWarnings"
                  checked={preferences.emailNotifications.creditWarnings}
                  onCheckedChange={(checked) => handleEmailNotificationChange("creditWarnings", checked as boolean)}
                />
                <Label htmlFor="creditWarnings" className="text-sm font-normal">
                  Credit balance warnings
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="planRenewal"
                  checked={preferences.emailNotifications.planRenewal}
                  onCheckedChange={(checked) => handleEmailNotificationChange("planRenewal", checked as boolean)}
                />
                <Label htmlFor="planRenewal" className="text-sm font-normal">
                  Plan renewal reminders
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="announcements"
                  checked={preferences.emailNotifications.announcements}
                  onCheckedChange={(checked) => handleEmailNotificationChange("announcements", checked as boolean)}
                />
                <Label htmlFor="announcements" className="text-sm font-normal">
                  Feature announcements
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="securityAlerts"
                  checked={preferences.emailNotifications.securityAlerts}
                  onCheckedChange={(checked) => handleEmailNotificationChange("securityAlerts", checked as boolean)}
                />
                <Label htmlFor="securityAlerts" className="text-sm font-normal">
                  Security alerts
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>In-app Notifications</Label>
                <p className="text-sm text-muted-foreground">Show notifications within the application</p>
              </div>
              <Switch
                checked={preferences.inAppNotifications}
                onCheckedChange={(checked) => handlePreferenceChange("inAppNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>SMS Notifications (Pro/Enterprise)</Label>
                <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
              </div>
              <Switch
                checked={preferences.smsNotifications}
                onCheckedChange={(checked) => handlePreferenceChange("smsNotifications", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interface Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Interface Preferences
          </CardTitle>
          <CardDescription>Customize your application interface</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme Selection</Label>
            <Select value={preferences.theme} onValueChange={(value) => handlePreferenceChange("theme", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Sidebar Collapsed by Default</Label>
                <p className="text-sm text-muted-foreground">Start with a collapsed sidebar</p>
              </div>
              <Switch
                checked={preferences.sidebarCollapsed}
                onCheckedChange={(checked) => handlePreferenceChange("sidebarCollapsed", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Show File Previews</Label>
                <p className="text-sm text-muted-foreground">Display thumbnail previews of files</p>
              </div>
              <Switch
                checked={preferences.showPreviews}
                onCheckedChange={(checked) => handlePreferenceChange("showPreviews", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Enable Keyboard Shortcuts</Label>
                <p className="text-sm text-muted-foreground">Use keyboard shortcuts for quick actions</p>
              </div>
              <Switch
                checked={preferences.keyboardShortcuts}
                onCheckedChange={(checked) => handlePreferenceChange("keyboardShortcuts", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Compact View Mode</Label>
                <p className="text-sm text-muted-foreground">Show more items in less space</p>
              </div>
              <Switch
                checked={preferences.compactView}
                onCheckedChange={(checked) => handlePreferenceChange("compactView", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
