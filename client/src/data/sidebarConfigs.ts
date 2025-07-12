import {
  FileText,
  ImageIcon,
  Music,
  Video,
  Archive,
  // Workflow,
  // Settings,
  Binary,
  Globe,
  Hash,
  Code,
  Key,
  QrCode,
  Type,
  // Scissors,
  // Layers,
  Database,
  // FolderOpen,
  // Sparkles,
} from "lucide-react";

export const decodingTools = [
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
];

// Comprehensive Encoding Tools
export const encodingTools = [
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
];

// File Conversion Categories
export const fileConversionCategories = [
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
];

// Advanced Tools
// export const advancedTools = [
//   // { id: "batch-processor", name: "Batch Processor", icon: Layers, isPro: true },
//   // {
//   //   id: "workflow-builder",
//   //   name: "Workflow Builder",
//   //   icon: Workflow,
//   //   isPro: true,
//   // },
//   // { id: "api-tools", name: "API Tools", icon: Code, isPro: true },
//   // { id: "file-analyzer", name: "File Analyzer", icon: Sparkles },
//   // { id: "bulk-rename", name: "Bulk File Rename", icon: FolderOpen },
//   // { id: "file-splitter", name: "File Splitter", icon: Scissors },
//   // { id: "file-merger", name: "File Merger", icon: Layers },
//   // { id: "metadata-editor", name: "Metadata Editor", icon: Settings },
// ];
