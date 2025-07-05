"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Label } from "../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Switch } from "../../ui/switch"
import { Separator } from "../../ui/separator"
import { Alert, AlertDescription } from "../../ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import { Input } from "../../ui/input"
import { Shield, Download, Trash2, AlertTriangle, Database } from "lucide-react"

export function PrivacyTab() {
  const [privacySettings, setPrivacySettings] = useState({
    dataRetention: "90",
    processingHistory: "365",
    fileStorage: "30",
    analyticsOptOut: false,
    marketingCommunications: true,
    dataSharing: false,
    cookiePreferences: "essential",
  })

  const [deleteConfirmation, setDeleteConfirmation] = useState("")

  const handleSettingChange = (key: string, value: any) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>Control how your data is stored and managed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dataRetention">Data Retention Period</Label>
              <Select
                value={privacySettings.dataRetention}
                onValueChange={(value) => handleSettingChange("dataRetention", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="forever">Keep forever</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">How long to keep your account data and activity logs</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="processingHistory">Processing History Retention</Label>
              <Select
                value={privacySettings.processingHistory}
                onValueChange={(value) => handleSettingChange("processingHistory", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="forever">Keep forever</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">How long to keep your file processing history</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fileStorage">File Storage Preferences</Label>
              <Select
                value={privacySettings.fileStorage}
                onValueChange={(value) => handleSettingChange("fileStorage", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Delete after 7 days</SelectItem>
                  <SelectItem value="30">Delete after 30 days</SelectItem>
                  <SelectItem value="90">Delete after 90 days</SelectItem>
                  <SelectItem value="manual">Manual deletion only</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">When to automatically delete uploaded files</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Button variant="outline" className="w-full bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download All Account Data
            </Button>
            <p className="text-sm text-muted-foreground">
              Export all your data including account information, processing history, and settings
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Controls
          </CardTitle>
          <CardDescription>Manage your privacy preferences and data sharing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Analytics Opt-out</Label>
                <p className="text-sm text-muted-foreground">
                  Prevent collection of usage analytics and performance data
                </p>
              </div>
              <Switch
                checked={privacySettings.analyticsOptOut}
                onCheckedChange={(checked) => handleSettingChange("analyticsOptOut", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Marketing Communications</Label>
                <p className="text-sm text-muted-foreground">Receive promotional emails and product updates</p>
              </div>
              <Switch
                checked={privacySettings.marketingCommunications}
                onCheckedChange={(checked) => handleSettingChange("marketingCommunications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Data Sharing with Partners</Label>
                <p className="text-sm text-muted-foreground">Allow sharing anonymized data with trusted partners</p>
              </div>
              <Switch
                checked={privacySettings.dataSharing}
                onCheckedChange={(checked) => handleSettingChange("dataSharing", checked)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cookiePreferences">Cookie Preferences</Label>
              <Select
                value={privacySettings.cookiePreferences}
                onValueChange={(value) => handleSettingChange("cookiePreferences", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="essential">Essential cookies only</SelectItem>
                  <SelectItem value="functional">Essential + Functional</SelectItem>
                  <SelectItem value="analytics">Essential + Functional + Analytics</SelectItem>
                  <SelectItem value="all">All cookies</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">Control which types of cookies we can use</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Deletion */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Account Deletion
          </CardTitle>
          <CardDescription>Permanently delete your account and all associated data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Warning:</strong> Account deletion is permanent and cannot be undone. All your data, files, and
              settings will be permanently removed.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>What happens when you delete your account:</Label>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• All uploaded files will be permanently deleted</li>
                <li>• Processing history will be removed</li>
                <li>• API keys will be revoked</li>
                <li>• Billing information will be archived for legal compliance</li>
                <li>• Account cannot be recovered after deletion</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Alternative options:</Label>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Suspend Account Temporarily
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Downgrade to Free Plan
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Export Data Only
                </Button>
              </div>
            </div>

            <Separator />

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-destructive">Delete Account</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove all your data
                    from our servers.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Please type <strong>DELETE</strong> to confirm account deletion.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    <Label htmlFor="deleteConfirmation">Confirmation</Label>
                    <Input
                      id="deleteConfirmation"
                      placeholder="Type DELETE to confirm"
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive" disabled={deleteConfirmation !== "DELETE"}>
                    Delete Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
