import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Alert, AlertDescription } from "../ui/alert";
import {
  Cloud,
  CheckCircle,
  XCircle,
  Settings,
  Folder,
  Upload,
  Download,
  FolderSyncIcon as Sync,
  Shield,
  BarChart3,
  Webhook,
  AlertTriangle,
  Crown,
  Play,
  Pause,
  RefreshCw,
  Eye,
  Trash2,
  Plus,
  ArrowRight,
  FileText,
  ImageIcon,
  Lock,
} from "lucide-react";
import {
  services,
  integrationServices,
  workflows,
} from "../../data/cloudConfigs";

export default function CloudIntegrationPage() {
  const [connectedServices] = useState(services);
  const [activeTab, setActiveTab] = useState("overview");
  const [setupStep, setSetupStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Cloud Storage Integration</h1>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              <Crown className="w-3 h-3 mr-1" />
              Enterprise
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            Connect your favorite cloud storage services for seamless file
            management
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="manage">Manage</TabsTrigger>
            <TabsTrigger value="sync">Sync</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {integrationServices.map((service) => (
                <Card key={service.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.logo}</span>
                        <CardTitle>{service.name}</CardTitle>
                      </div>
                      {service.connected ? (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <XCircle className="w-3 h-3 mr-1" />
                          Disconnected
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {service.connected && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Usage Statistics:</h4>
                        <div className="text-sm text-muted-foreground">
                          <p>Files processed: {service.stats.files}</p>
                          <p>Storage used: {service.stats.storage}</p>
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full"
                      variant={service.connected ? "outline" : "default"}
                    >
                      {service.connected ? (
                        <>
                          <Settings className="w-4 h-4 mr-2" />
                          Manage Connection
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Connect {service.name}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Setup Tab */}
          <TabsContent value="setup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connection Setup Wizard</CardTitle>
                <CardDescription>
                  Follow these steps to connect your cloud storage service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          setupStep >= step
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`w-20 h-0.5 ${
                            setupStep > step ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {setupStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Step 1: Service Selection
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {integrationServices.map((service) => (
                        <Card
                          key={service.id}
                          className={`cursor-pointer transition-colors ${
                            selectedService === service.id
                              ? "ring-2 ring-primary"
                              : ""
                          }`}
                          onClick={() => setSelectedService(service.id)}
                        >
                          <CardContent className="p-4 text-center">
                            <span className="text-3xl mb-2 block">
                              {service.logo}
                            </span>
                            <h4 className="font-medium">{service.name}</h4>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label>Account Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={() => setSetupStep(2)}
                      disabled={!selectedService}
                      className="w-full"
                    >
                      Continue with{" "}
                      {selectedService
                        ? integrationServices.find(
                            (s) => s.id === selectedService
                          )?.name
                        : "Service"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}

                {setupStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Step 2: OAuth Authorization
                    </h3>
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        You will be redirected to authorize the following
                        permissions:
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                      <h4 className="font-medium">Required Permissions:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <Eye className="w-3 h-3" />
                          Read access to files
                        </li>
                        <li className="flex items-center gap-2">
                          <Upload className="w-3 h-3" />
                          Write access for processed files
                        </li>
                        <li className="flex items-center gap-2">
                          <Folder className="w-3 h-3" />
                          Folder creation permissions
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="w-3 h-3" />
                          Metadata access
                        </li>
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setSetupStep(1)}>
                        Back
                      </Button>
                      <Button
                        onClick={() => setSetupStep(3)}
                        className="flex-1"
                      >
                        Authorize Connection
                      </Button>
                    </div>
                  </div>
                )}

                {setupStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Step 3: Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Input Folder</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select input folder" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="root">Root Directory</SelectItem>
                            <SelectItem value="documents">Documents</SelectItem>
                            <SelectItem value="uploads">Uploads</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Output Folder</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select output folder" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="processed">Processed</SelectItem>
                            <SelectItem value="output">Output</SelectItem>
                            <SelectItem value="results">Results</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Archive Folder</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select archive folder" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="archive">Archive</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="backup">Backup</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>File Naming Convention</Label>
                      <Input placeholder="e.g., processed_{filename}_{timestamp}" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-cleanup" />
                      <Label htmlFor="auto-cleanup">
                        Enable automatic cleanup of processed files
                      </Label>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setSetupStep(2)}>
                        Back
                      </Button>
                      <Button className="flex-1">Complete Setup</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Tab */}
          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Services</CardTitle>
                <CardDescription>
                  Manage your connected cloud storage services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Connected</TableHead>
                      <TableHead>Last Sync</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {connectedServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="flex items-center gap-2">
                          <span className="text-lg">
                            {service.name === "Google Drive"
                              ? "🔵"
                              : service.name === "Dropbox"
                              ? "🔷"
                              : "🔶"}
                          </span>
                          {service.name}
                        </TableCell>
                        <TableCell>{service.email}</TableCell>
                        <TableCell>
                          {service.connected ? (
                            <Badge variant="default" className="bg-green-500">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                        </TableCell>
                        <TableCell>{service.lastSync}</TableCell>
                        <TableCell>
                          {service.connected ? (
                            <Badge variant="outline" className="text-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-red-600">
                              <XCircle className="w-3 h-3 mr-1" />
                              Error
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Settings className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sync Tab */}
          <TabsContent value="sync" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sync Settings</CardTitle>
                  <CardDescription>
                    Configure global synchronization preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-sync">Auto-sync processed files</Label>
                    <Switch id="auto-sync" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Sync Frequency</Label>
                    <Select defaultValue="realtime">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Conflict Resolution</Label>
                    <Select defaultValue="rename">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="overwrite">Overwrite</SelectItem>
                        <SelectItem value="rename">Rename</SelectItem>
                        <SelectItem value="skip">Skip</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>File Size Limit (MB)</Label>
                    <Input type="number" defaultValue="100" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Folder Mapping</CardTitle>
                  <CardDescription>
                    Configure folder assignments for file operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4" />
                        <span className="font-medium">Source Folders</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="ml-6 space-y-2 text-sm text-muted-foreground">
                      <div>/Documents/Uploads</div>
                      <div>/Shared/Incoming</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span className="font-medium">Destination Folders</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="ml-6 space-y-2 text-sm text-muted-foreground">
                      <div>/Processed/Output</div>
                      <div>/Results/Final</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Workflows</CardTitle>
                  <CardDescription>
                    Cloud-triggered automation workflows
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {workflows.map((workflow, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{workflow.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {workflow.triggers} triggers this month
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={workflow.active} />
                        {workflow.active ? (
                          <Play className="w-4 h-4 text-green-500" />
                        ) : (
                          <Pause className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Workflow Templates</CardTitle>
                  <CardDescription>
                    Pre-built automation templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4" />
                        <span className="font-medium">
                          Auto-convert uploaded PDFs
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Automatically convert PDF files to text when uploaded to
                        specified folders
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        Use Template
                      </Button>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="w-4 h-4" />
                        <span className="font-medium">
                          Batch process images in folder
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Resize and optimize images automatically when added to
                        watched folders
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        Use Template
                      </Button>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4" />
                        <span className="font-medium">
                          Encode sensitive documents
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Automatically encrypt and secure sensitive files upon
                        upload
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Permission Audit</CardTitle>
                  <CardDescription>
                    Review and manage granted permissions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Read file contents</span>
                      <Badge variant="outline" className="text-green-600">
                        Granted
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Write to folders</span>
                      <Badge variant="outline" className="text-green-600">
                        Granted
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Create folders</span>
                      <Badge variant="outline" className="text-green-600">
                        Granted
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Delete files</span>
                      <Badge variant="outline" className="text-red-600">
                        Revoked
                      </Badge>
                    </div>
                  </div>
                  <Separator />
                  <Button variant="outline" className="w-full bg-transparent">
                    Revoke All Permissions
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Handling Policies</CardTitle>
                  <CardDescription>
                    Security and compliance information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm">
                        File encryption in transit
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm">
                        Secure temporary file handling
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm">
                        30-day data retention policy
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm">SOC 2 Type II compliant</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Files Processed
                      </p>
                      <p className="text-2xl font-bold">2,139</p>
                    </div>
                    <FileText className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Storage Used
                      </p>
                      <p className="text-2xl font-bold">4.1 GB</p>
                    </div>
                    <Cloud className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Avg Processing Time
                      </p>
                      <p className="text-2xl font-bold">2.3s</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Error Rate
                      </p>
                      <p className="text-2xl font-bold">0.2%</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Usage by Service</CardTitle>
                <CardDescription>
                  File processing breakdown by cloud service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Google Drive</span>
                    <span className="text-sm text-muted-foreground">
                      1,247 files (58%)
                    </span>
                  </div>
                  <Progress value={58} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dropbox</span>
                    <span className="text-sm text-muted-foreground">
                      892 files (42%)
                    </span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">OneDrive</span>
                    <span className="text-sm text-muted-foreground">
                      0 files (0%)
                    </span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Webhook className="w-5 h-5" />
                    Webhook Configuration
                    <Badge variant="secondary">Enterprise</Badge>
                  </CardTitle>
                  <CardDescription>
                    Configure webhooks for real-time notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Webhook URL</Label>
                    <Input placeholder="https://your-app.com/webhooks/cloud" />
                  </div>

                  <div className="space-y-2">
                    <Label>Events</Label>
                    <div className="space-y-2">
                      {[
                        "File uploaded",
                        "File modified",
                        "File deleted",
                        "Folder changes",
                      ].map((event) => (
                        <div
                          key={event}
                          className="flex items-center space-x-2"
                        >
                          <Switch id={event} />
                          <Label htmlFor={event} className="text-sm">
                            {event}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Test Webhook
                    </Button>
                    <Button className="flex-1">Save Configuration</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Troubleshooting</CardTitle>
                  <CardDescription>
                    Diagnostic tools and common issues
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Test All Connections
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Validate Permissions
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                    >
                      <Sync className="w-4 h-4 mr-2" />
                      Check Sync Status
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium">Common Issues:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Authentication token expired</li>
                      <li>• Insufficient permissions</li>
                      <li>• Rate limiting exceeded</li>
                      <li>• File size limits reached</li>
                    </ul>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
