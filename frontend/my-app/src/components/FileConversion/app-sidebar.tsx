import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "../ui/sidebar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import {
  Lock,
  Unlock,
  FileText,
  ImageIcon,
  Music,
  Video,
  Archive,
  Zap,
  Workflow,
  Settings,
  HelpCircle,
  ChevronDown,
  Binary,
  Globe,
  Hash,
  Code,
  Key,
  QrCode,
  Type,
  Scissors,
  Layers,
  Database,
  FolderOpen,
  Sparkles,
} from "lucide-react"
import { useState } from "react"

interface AppSidebarProps {
  selectedTool: string | null
  onToolSelect: (toolId: string) => void
}

// Comprehensive Decoding Tools
const decodingTools = [
  { id: "base64-decode", name: "Base64 to Text", icon: Binary },
  { id: "base64-to-image", name: "Base64 to Image", icon: ImageIcon },
  { id: "base64-to-file", name: "Base64 to File", icon: FileText },
  { id: "base64-to-pdf", name: "Base64 to PDF", icon: FileText },
  { id: "base32-decode", name: "Base32 Decoder", icon: Binary },
  { id: "url-decode", name: "URL Decoder", icon: Globe },
  { id: "html-decode", name: "HTML Entity Decoder", icon: Code },
  { id: "unicode-decode", name: "Unicode Decoder", icon: Type },
  { id: "hex-decode", name: "Hex Decoder", icon: Hash },
  { id: "binary-decode", name: "Binary Decoder", icon: Binary },
  { id: "jwt-decode", name: "JWT Decoder", icon: Key },
  { id: "json-decode", name: "JSON Decoder", icon: Code },
  { id: "xml-decode", name: "XML Decoder", icon: Code },
]

// Comprehensive Encoding Tools
const encodingTools = [
  { id: "base64-encode", name: "Text to Base64", icon: Binary },
  { id: "image-to-base64", name: "Image to Base64", icon: ImageIcon },
  { id: "file-to-base64", name: "File to Base64", icon: FileText },
  { id: "pdf-to-base64", name: "PDF to Base64", icon: FileText },
  { id: "base32-encode", name: "Base32 Encoder", icon: Binary },
  { id: "url-encode", name: "URL Encoder", icon: Globe },
  { id: "html-encode", name: "HTML Entity Encoder", icon: Code },
  { id: "unicode-encode", name: "Unicode Encoder", icon: Type },
  { id: "hex-encode", name: "Hex Encoder", icon: Hash },
  { id: "binary-encode", name: "Binary Encoder", icon: Binary },
  { id: "hash-md5", name: "MD5 Hash Generator", icon: Hash },
  { id: "hash-sha256", name: "SHA256 Hash Generator", icon: Hash },
  { id: "qr-generate", name: "QR Code Generator", icon: QrCode },
]

// File Conversion Categories
const fileConversionCategories = [
  {
    id: "pdf-conversion",
    name: "PDF Conversion",
    icon: FileText,
    description: "Convert to/from PDF format",
  },
  {
    id: "word-conversion",
    name: "Word Documents",
    icon: FileText,
    description: "Convert to/from Word format",
  },
  {
    id: "excel-conversion",
    name: "Excel Spreadsheets",
    icon: Database,
    description: "Convert to/from Excel format",
  },
  {
    id: "image-conversion",
    name: "Image Formats",
    icon: ImageIcon,
    description: "Convert between image formats",
  },
  {
    id: "audio-conversion",
    name: "Audio Files",
    icon: Music,
    description: "Convert between audio formats",
  },
  {
    id: "video-conversion",
    name: "Video Files",
    icon: Video,
    description: "Convert between video formats",
  },
  {
    id: "archive-conversion",
    name: "Archive Files",
    icon: Archive,
    description: "Create and extract archives",
  },
  {
    id: "text-conversion",
    name: "Text & Code",
    icon: Code,
    description: "Convert text and code formats",
  },
]

// Advanced Tools
const advancedTools = [
  { id: "batch-processor", name: "Batch Processor", icon: Layers, isPro: true },
  { id: "workflow-builder", name: "Workflow Builder", icon: Workflow, isPro: true },
  { id: "api-tools", name: "API Tools", icon: Code, isPro: true },
  { id: "file-analyzer", name: "File Analyzer", icon: Sparkles },
  { id: "bulk-rename", name: "Bulk File Rename", icon: FolderOpen },
  { id: "file-splitter", name: "File Splitter", icon: Scissors },
  { id: "file-merger", name: "File Merger", icon: Layers },
  { id: "metadata-editor", name: "Metadata Editor", icon: Settings },
]

export function AppSidebar({ selectedTool, onToolSelect }: AppSidebarProps) {
  const [openSections, setOpenSections] = useState({
    decoding: true,
    encoding: true,
    fileConversion: true,
    advanced: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const renderToolItem = (tool: any) => (
    <SidebarMenuItem key={tool.id}>
      <SidebarMenuButton
        isActive={selectedTool === tool.id}
        onClick={() => onToolSelect(tool.id)}
        className="group relative"
      >
        <tool.icon className="h-4 w-4" />
        <span className="flex-1 truncate">{tool.name}</span>
        {tool.isPro && (
          <Badge variant="secondary" className="ml-2 text-xs">
            Pro
          </Badge>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  )

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Universal Converter</h2>
            <p className="text-xs text-muted-foreground">Simple • Fast • Reliable</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        {/* Decoding Tools */}
        <Collapsible open={openSections.decoding} onOpenChange={() => toggleSection("decoding")}>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Unlock className="h-4 w-4" />
                  Decoding Tools
                </div>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>{decodingTools.map(renderToolItem)}</SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Encoding Tools */}
        <Collapsible open={openSections.encoding} onOpenChange={() => toggleSection("encoding")}>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Encoding Tools
                </div>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>{encodingTools.map(renderToolItem)}</SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* File Conversion */}
        <Collapsible open={openSections.fileConversion} onOpenChange={() => toggleSection("fileConversion")}>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  File Conversion
                </div>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>{fileConversionCategories.map(renderToolItem)}</SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Advanced Tools */}
        <Collapsible open={openSections.advanced} onOpenChange={() => toggleSection("advanced")}>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Advanced Tools
                </div>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>{advancedTools.map(renderToolItem)}</SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
