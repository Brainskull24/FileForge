import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Shield, Database } from "lucide-react";

export function PrivacyTab() {
  const [privacySettings, setPrivacySettings] = useState({
    processingHistory: "60",
    fileStorage: "30",
    analyticsOptOut: false,
    marketingCommunications: true,
    dataSharing: false,
    cookiePreferences: "essential",
  });

  const handleSettingChange = (key: string, value: any) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>
            Control how your data is stored and managed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="processingHistory">
                Processing History Retention
              </Label>
              <Select
                value={privacySettings.processingHistory}
                onValueChange={(value) =>
                  handleSettingChange("processingHistory", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                How long to keep your file processing history
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fileStorage">File Storage Preferences</Label>
              <Select
                value={privacySettings.fileStorage}
                onValueChange={(value) =>
                  handleSettingChange("fileStorage", value)
                }
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
              <p className="text-sm text-muted-foreground">
                When to automatically delete uploaded files
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Controls
          </CardTitle>
          <CardDescription>
            Manage your privacy preferences and data sharing
          </CardDescription>
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
                onCheckedChange={(checked) =>
                  handleSettingChange("analyticsOptOut", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Marketing Communications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive promotional emails and product updates
                </p>
              </div>
              <Switch
                checked={privacySettings.marketingCommunications}
                onCheckedChange={(checked) =>
                  handleSettingChange("marketingCommunications", checked)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
