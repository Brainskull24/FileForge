import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import {
  Key,
  Plus,
  Copy,
  Trash2,
  BarChart3,
  Book,
  Code,
  Download,
} from "lucide-react";
import { apiKey } from "../../data/accountConfigs";

export function ApiKeysTab() {
  const [apiKeys] = useState(apiKey);

  const [newKeyData, setNewKeyData] = useState({
    name: "",
    permissions: [] as string[],
    rateLimit: "1000",
    expiration: "",
  });

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setNewKeyData((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permission]
        : prev.permissions.filter((p) => p !== permission),
    }));
  };

  return (
    <div className="space-y-6">
      {/* API Keys List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys
          </CardTitle>
          <CardDescription>
            Manage your API keys for programmatic access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Requests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {apiKey.key}
                      </code>
                      <Button variant="outline" size="sm">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{apiKey.created}</TableCell>
                  <TableCell>{apiKey.lastUsed}</TableCell>
                  <TableCell>{apiKey.requests}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        apiKey.status === "Active" ? "secondary" : "outline"
                      }
                    >
                      {apiKey.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New API Key
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
                <DialogDescription>
                  Configure your new API key with specific permissions and
                  settings
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="keyName">Key Name</Label>
                  <Input
                    id="keyName"
                    placeholder="e.g., Production API"
                    value={newKeyData.name}
                    onChange={(e) =>
                      setNewKeyData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Permission Scopes</Label>
                  <div className="space-y-2">
                    {["read", "write", "delete", "admin"].map((permission) => (
                      <div
                        key={permission}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={permission}
                          checked={newKeyData.permissions.includes(permission)}
                          onCheckedChange={(checked) =>
                            handlePermissionChange(
                              permission,
                              checked as boolean
                            )
                          }
                        />
                        <Label
                          htmlFor={permission}
                          className="text-sm font-normal capitalize"
                        >
                          {permission} access
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
                  <Select
                    value={newKeyData.rateLimit}
                    onValueChange={(value) =>
                      setNewKeyData((prev) => ({ ...prev, rateLimit: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100 requests/hour</SelectItem>
                      <SelectItem value="1000">1,000 requests/hour</SelectItem>
                      <SelectItem value="10000">
                        10,000 requests/hour
                      </SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiration">Expiration Date (Optional)</Label>
                  <Input
                    id="expiration"
                    type="date"
                    value={newKeyData.expiration}
                    onChange={(e) =>
                      setNewKeyData((prev) => ({
                        ...prev,
                        expiration: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create API Key</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* API Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            API Documentation
          </CardTitle>
          <CardDescription>
            Resources to help you integrate with our API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
            >
              <div className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span className="font-medium">Quick Start Guide</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                Get started with our API in minutes
              </p>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
            >
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span className="font-medium">Full API Reference</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                Complete documentation of all endpoints
              </p>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
            >
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span className="font-medium">Code Examples</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                Sample code in multiple languages
              </p>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
            >
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className="font-medium">SDKs Download</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                Official SDKs for popular languages
              </p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
