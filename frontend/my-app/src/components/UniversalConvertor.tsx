import * as React from "react";
import {
  Archive,
  Binary,
  ChevronDown,
  Cloud,
  CreditCard,
  FileAudio,
  FileImage,
  FileText,
  FileVideo,
  Hash,
  History,
  Link,
  Settings,
  Star,
  Upload,
  Zap,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Crown,
  Code,
  Wrench,
} from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./ui/sidebar";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useNavigate } from "react-router-dom";

// Tool categories and items
const toolCategories = [
  {
    title: "Encoding Tools",
    icon: Code,
    items: [
      {
        title: "Base64 Encoder/Decoder",
        icon: Binary,
        id: "base64",
        link: "/tools/base64",
      },
      { title: "Base32 Encoder/Decoder", icon: Binary, id: "base32" },
      { title: "Hexadecimal Converter", icon: Hash, id: "hex" },
      { title: "URL Encoder/Decoder", icon: Link, id: "url" },
      { title: "HTML Entity Encoder", icon: Code, id: "html" },
      { title: "Binary Converter", icon: Binary, id: "binary" },
      { title: "Hash Generators (MD5, SHA256)", icon: Hash, id: "hash" },
    ],
  },
  {
    title: "File Converters",
    icon: FileText,
    items: [
      { title: "Document Converter", icon: FileText, id: "document" },
      { title: "Image Converter", icon: FileImage, id: "image" },
      { title: "Audio Converter", icon: FileAudio, id: "audio" },
      { title: "Video Converter", icon: FileVideo, id: "video" },
      { title: "Archive Tools", icon: Archive, id: "archive" },
    ],
  },
  {
    title: "Advanced Tools",
    icon: Wrench,
    items: [
      { title: "Batch Processor", icon: Zap, id: "batch", isPro: true },
      {
        title: "Workflow Builder",
        icon: Settings,
        id: "workflow",
        isPro: true,
      },
      { title: "API Tester", icon: Code, id: "api", isPro: true },
      { title: "File Analyzer", icon: FileText, id: "analyzer" },
    ],
  },
];

// Mock data for processing queue
const mockProcessingQueue = [
  {
    id: "1",
    name: "document.pdf",
    status: "completed",
    progress: 100,
    type: "PDF to Word",
  },
  {
    id: "2",
    name: "image.jpg",
    status: "processing",
    progress: 65,
    type: "JPG to PNG",
  },
  {
    id: "3",
    name: "audio.mp3",
    status: "queued",
    progress: 0,
    type: "MP3 to WAV",
  },
  {
    id: "4",
    name: "video.mp4",
    status: "failed",
    progress: 0,
    type: "MP4 to WebM",
  },
];

const recentTools = ["base64", "image", "document", "hash", "url"];

export function UniversalConverterDashboard() {
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [processingQueue] = React.useState(mockProcessingQueue);
  const navigate = useNavigate();
  const [credits] = React.useState(1250);
  const [favorites, setFavorites] = React.useState<string[]>([
    "base64",
    "image",
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "processing":
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const renderMainWorkspace = () => {
    if (!selectedTool) {
      return (
        <div className="flex-1 p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ minHeight: "400px" }}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <Cloud className="h-16 w-16 text-gray-400" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Drag files here or click to browse
                </h3>
                <p className="text-gray-500 mt-2">
                  Supports all major file formats
                </p>
              </div>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Browse Files
                </label>
              </Button>
            </div>

            {/* File type icons around border */}
            <div className="absolute inset-0 pointer-events-none">
              <FileText className="absolute top-4 left-4 h-6 w-6 text-gray-300" />
              <FileImage className="absolute top-4 right-4 h-6 w-6 text-gray-300" />
              <FileAudio className="absolute bottom-4 left-4 h-6 w-6 text-gray-300" />
              <FileVideo className="absolute bottom-4 right-4 h-6 w-6 text-gray-300" />
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadedFiles.map((file, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-blue-500" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="operation">Select Operation</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose conversion type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf-word">PDF to Word</SelectItem>
                      <SelectItem value="jpg-png">JPG to PNG</SelectItem>
                      <SelectItem value="mp3-wav">MP3 to WAV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quality Settings</Label>
                  <Slider defaultValue={[80]} max={100} step={1} />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="batch" />
                  <Label htmlFor="batch">Enable batch processing</Label>
                </div>

                <Button size="lg" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Process Files
                </Button>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {
                toolCategories
                  .flatMap((cat) => cat.items)
                  .find((item) => item.id === selectedTool)?.title
              }
            </CardTitle>
            <CardDescription>
              Configure your conversion settings and process files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Tool-specific interface would be rendered here based on the
              selected tool.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="w-80">
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-4 py-2">
              <Zap className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold">Universal Converter</span>
            </div>
            <Separator />
          </SidebarHeader>

          <SidebarContent>
            {/* Quick Actions */}
            <SidebarGroup>
              <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="flex flex-wrap gap-2 p-2">
                  {recentTools.map((toolId) => {
                    const tool = toolCategories
                      .flatMap((cat) => cat.items)
                      .find((item) => item.id === toolId);
                    if (!tool) return null;
                    return (
                      <Button
                        key={toolId}
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTool(toolId)}
                        className="text-xs"
                      >
                        <tool.icon className="h-3 w-3 mr-1" />
                        {tool.title.split(" ")[0]}
                      </Button>
                    );
                  })}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Tool Categories */}
            {toolCategories.map((category) => (
              <Collapsible key={category.title} defaultOpen>
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex w-full items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <category.icon className="h-4 w-4" />
                        <span>{category.title}</span>
                      </div>
                      <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {category.items.map((item) => (
                          <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton
                              onClick={() => setSelectedTool(item.id)}
                              isActive={selectedTool === item.id}
                              className="flex items-center justify-between"
                            >
                              <div
                                className="flex items-center space-x-2"
                                onClick={() => {
                                  navigate("/tools/" + item.id);
                                }}
                              >
                                <item.icon className="h-4 w-4" />
                                <span className="truncate">{item.title}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {item.isPro && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    <Crown className="h-3 w-3 mr-1" />
                                    Pro
                                  </Badge>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(item.id);
                                  }}
                                  className="h-6 w-6 p-0"
                                >
                                  <Star
                                    className={`h-3 w-3 ${
                                      favorites.includes(item.id)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-400"
                                    }`}
                                  />
                                </Button>
                              </div>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ))}
          </SidebarContent>

          <SidebarFooter>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Credits</span>
                <span className="text-sm text-blue-600 font-bold">
                  {credits}
                </span>
              </div>
              <Progress value={75} className="h-2" />
              <Button variant="outline" size="sm" className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Upgrade Plan
              </Button>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center space-x-4 flex-1">
              <h1 className="text-xl font-semibold">Universal Converter</h1>
              <div className="flex items-center space-x-2 ml-auto">
                <Button variant="ghost" size="sm">
                  <History className="h-4 w-4 mr-2" />
                  History
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <div className="flex items-center space-x-2 text-sm">
                  <CreditCard className="h-4 w-4" />
                  <span>{credits} credits</span>
                </div>
              </div>
            </div>
          </header>

          <div className="flex flex-1">
            {/* Main Workspace */}
            {renderMainWorkspace()}

            {/* Results Panel */}
            <div className="w-80 border-l bg-gray-50/50">
              <div className="p-4">
                <h3 className="font-semibold mb-4">Processing Queue</h3>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {processingQueue.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium truncate">
                              {item.name}
                            </span>
                            {getStatusIcon(item.status)}
                          </div>
                          <p className="text-xs text-gray-500 mb-2">
                            {item.type}
                          </p>
                          {item.status === "processing" && (
                            <Progress value={item.progress} className="h-1" />
                          )}
                          {item.status === "completed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-medium mb-2">Credit Usage</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Used today:</span>
                      <span>45 credits</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining:</span>
                      <span className="text-blue-600 font-medium">
                        {credits}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
