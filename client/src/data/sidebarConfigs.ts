import {
  FileText,
  ImageIcon,
  Binary,
  Globe,
  Hash,
  Code,
  Key,
  QrCode,
  Type,
  Database,
} from "lucide-react";

export const decodingTools = [
  { id: "base64-decode", name: "Base64 to Text", Icon: Binary },
  { id: "base64-to-image", name: "Base64 to Image", Icon: ImageIcon },
  { id: "base64-to-file", name: "Base64 to File", Icon: FileText },
  { id: "base64-to-pdf", name: "Base64 to PDF", Icon: FileText },
  { id: "base32-decode", name: "Base32 Decoder", Icon: Binary },
  { id: "url-decode", name: "URL Decoder", Icon: Globe },
  { id: "html-decode", name: "HTML Entity Decoder", Icon: Code },
  { id: "unicode-decode", name: "Unicode Decoder", Icon: Type },
  { id: "hex-decode", name: "Hex Decoder", Icon: Hash },
  { id: "binary-decode", name: "Binary Decoder", Icon: Binary },
  { id: "jwt-decode", name: "JWT Decoder", Icon: Key },
  { id: "json-decode", name: "JSON Decoder", Icon: Code },
  { id: "xml-decode", name: "XML Decoder", Icon: Code },
];

// Comprehensive Encoding Tools
export const encodingTools = [
  { id: "base64-encode", name: "Text to Base64", Icon: Binary },
  { id: "image-to-base64", name: "Image to Base64", Icon: ImageIcon },
  { id: "file-to-base64", name: "File to Base64", Icon: FileText },
  { id: "pdf-to-base64", name: "PDF to Base64", Icon: FileText },
  { id: "base32-encode", name: "Base32 Encoder", Icon: Binary },
  { id: "url-encode", name: "URL Encoder", Icon: Globe },
  { id: "html-encode", name: "HTML Entity Encoder", Icon: Code },
  { id: "unicode-encode", name: "Unicode Encoder", Icon: Type },
  { id: "hex-encode", name: "Hex Encoder", Icon: Hash },
  { id: "binary-encode", name: "Binary Encoder", Icon: Binary },
  { id: "hash-md5", name: "MD5 Hash Generator", Icon: Hash },
  { id: "hash-sha256", name: "SHA256 Hash Generator", Icon: Hash },
  { id: "qr-generate", name: "QR Code Generator", Icon: QrCode },
];

// File Conversion Categories
export const fileConversionCategories = [
  {
    id: "pdf-conversion",
    name: "PDF Conversion",
    Icon: FileText,
    description: "Convert from PDF format",
  },
  {
    id: "word-conversion",
    name: "Word Conversion",
    Icon: FileText,
    description: "Convert from Word format",
  },
  {
    id: "excel-conversion",
    name: "Excel Conversion",
    Icon: Database,
    description: "Convert from Excel format",
  },
  {
    id: "image-conversion",
    name: "Image Conversion",
    Icon: ImageIcon,
    description: "Convert between image formats",
  },
  {
    id: "html-conversion",
    name: "HTML Conversion",
    Icon: FileText,
    description: "Convert from HTML formats",
  },
  {
    id: "markdown-conversion",
    name: "Markdown Conversion",
    Icon: FileText,
    description: "Convert from Markdown formats",
  },
];
