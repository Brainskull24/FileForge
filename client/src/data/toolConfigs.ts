export const extMap: Record<string, string> = {
  "pdf-to-html": ".html",
  "pdf-to-word": ".docx",
  "pdf-to-text": ".txt",
  "pdf-to-image": ".json",
  "pdf-to-markdown": ".md",
  "word-to-pdf": ".pdf",
  "word-to-html": ".html",
  "word-to-text": ".txt",
  "word-to-markdown": ".md",
  "markdown-to-html": ".html",
  "markdown-to-plaintext": ".txt",
  "markdown-to-pdf": ".pdf",
  "markdown-to-word": ".docx",
  "html-to-markdown": ".md",
  "html-to-pdf": ".pdf",
  "html-to-word": ".docx",
  "excel-to-csv": ".csv",
  "excel-to-json": ".json",
  "excel-to-pdf": ".pdf",
  "image-to-pdf": ".pdf",
  "image-to-grayscale": ".png",
  "image-to-jpg": ".jpg",
  "image-to-png": ".png",
  "image-to-bmp": ".bmp",
  "image-to-tiff": ".tiff",
  "image-to-webp": ".webp",
};

export type ToolType = "text" | "file" | "coming-soon";

interface FormatOption {
  id: string;
  label: string;
}

interface BaseToolConfig {
  name: string;
  description: string;
  type: ToolType;
  placeholder?: string;
  acceptFiles: boolean;
  fileTypes?: string[];
  category?: string;
  formats?: {
    fromPdf?: FormatOption[];
    fromWord?: FormatOption[];
    fromExcel?: FormatOption[];
    fromMarkdown?: FormatOption[];
    fromHTML?: FormatOption[];
    fromImage?: FormatOption[];
    supported?: string[];
  };
}

export const toolConfigs: Record<string, BaseToolConfig> = {
  "base64-decode": {
    name: "Base64 to Text",
    description: "Convert Base64 encoded text back to original format",
    type: "text",
    placeholder: "Paste your Base64 encoded text here...",
    acceptFiles: false,
  },
  "base64-to-image": {
    name: "Base64 to Image",
    description: "Convert Base64 encoded string to image file",
    type: "text",
    placeholder: "Paste your Base64 image string here...",
    acceptFiles: false,
  },
  "base64-to-file": {
    name: "Base64 to File",
    description: "Convert Base64 encoded string to any file format",
    type: "text",
    placeholder: "Paste your Base64 file string here...",
    acceptFiles: false,
  },
  "base64-to-pdf": {
    name: "Base64 to PDF",
    description: "Convert Base64 encoded string to PDF file",
    type: "text",
    placeholder: "Paste your Base64 PDF string here...",
    acceptFiles: false,
  },
  "base32-decode": {
    name: "Base32 Decoder",
    description: "Convert Base32 encoded text back to original format",
    type: "text",
    placeholder: "Paste your Base32 encoded text here...",
    acceptFiles: false,
  },
  "url-decode": {
    name: "URL Decoder",
    description: "Decode URL-encoded text to readable format",
    type: "text",
    placeholder: "Paste your URL-encoded text here...",
    acceptFiles: false,
  },
  "html-decode": {
    name: "HTML Entity Decoder",
    description: "Convert HTML entities back to regular characters",
    type: "text",
    placeholder: "Paste your HTML entities here...",
    acceptFiles: false,
  },
  "unicode-decode": {
    name: "Unicode Decoder",
    description: "Convert Unicode sequences to readable text",
    type: "text",
    placeholder: "Paste your Unicode sequences here...",
    acceptFiles: false,
  },
  "hex-decode": {
    name: "Hex Decoder",
    description: "Convert hexadecimal values to text",
    type: "text",
    placeholder: "Paste your hex values here...",
    acceptFiles: false,
  },
  "binary-decode": {
    name: "Binary Decoder",
    description: "Convert binary values to text",
    type: "text",
    placeholder: "Paste your binary values here...",
    acceptFiles: false,
  },
  "jwt-decode": {
    name: "JWT Decoder",
    description: "Decode JWT tokens to readable format",
    type: "text",
    placeholder: "Paste your JWT token here...",
    acceptFiles: false,
  },
  "json-decode": {
    name: "JSON Decoder",
    description: "Format and decode JSON strings",
    type: "text",
    placeholder: "Paste your JSON string here...",
    acceptFiles: false,
  },
  "xml-decode": {
    name: "XML Decoder",
    description: "Format and decode XML strings",
    type: "text",
    placeholder: "Paste your XML string here...",
    acceptFiles: false,
  },

  // Text-based Encoders
  "base64-encode": {
    name: "Text to Base64",
    description: "Convert text to Base64 encoding",
    type: "text",
    placeholder: "Enter text to encode to Base64...",
    acceptFiles: false,
  },
  "base32-encode": {
    name: "Base32 Encoder",
    description: "Convert text to Base32 format",
    type: "text",
    placeholder: "Enter text to encode to Base32...",
    acceptFiles: false,
  },
  "url-encode": {
    name: "URL Encoder",
    description: "Encode text for safe use in URLs",
    type: "text",
    placeholder: "Enter text to URL encode...",
    acceptFiles: false,
  },
  "html-encode": {
    name: "HTML Entity Encoder",
    description: "Convert text to HTML entities",
    type: "text",
    placeholder: "Enter text to HTML encode...",
    acceptFiles: false,
  },
  "unicode-encode": {
    name: "Unicode Encoder",
    description: "Convert text to Unicode sequences",
    type: "text",
    placeholder: "Enter text to Unicode encode...",
    acceptFiles: false,
  },
  "hex-encode": {
    name: "Hex Encoder",
    description: "Convert text to hexadecimal format",
    type: "text",
    placeholder: "Enter text to hex encode...",
    acceptFiles: false,
  },
  "binary-encode": {
    name: "Binary Encoder",
    description: "Convert text to binary format",
    type: "text",
    placeholder: "Enter text to binary encode...",
    acceptFiles: false,
  },

  // Hash Generators
  "hash-md5": {
    name: "MD5 Hash Generator",
    description: "Generate MD5 hash from text",
    type: "text",
    placeholder: "Enter text to generate MD5 hash...",
    acceptFiles: false,
  },
  "hash-sha256": {
    name: "SHA256 Hash Generator",
    description: "Generate SHA256 hash from text",
    type: "text",
    placeholder: "Enter text to generate SHA256 hash...",
    acceptFiles: false,
  },

  // QR Code & Barcode
  "qr-generate": {
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs",
    type: "text",
    placeholder: "Enter text or URL to generate QR code...",
    acceptFiles: false,
  },

  // File-to-Encoding Tools
  "file-to-base64": {
    name: "File to Base64",
    description: "Convert any file to Base64 encoding",
    type: "file",
    category: "encoding",
    acceptFiles: true,
    fileTypes: ["*/*"], // Accept all file types
    placeholder: "Upload files to convert to Base64",
  },
  "image-to-base64": {
    name: "Image to Base64",
    description: "Convert images to Base64 encoding with data URL format",
    type: "file",
    category: "encoding",
    acceptFiles: true,
    fileTypes: ["image/*"],
    placeholder: "Upload images to convert to Base64",
  },
  "pdf-to-base64": {
    name: "PDF to Base64",
    description: "Convert PDF files to Base64 encoding",
    type: "file",
    category: "encoding",
    acceptFiles: true,
    fileTypes: ["application/pdf"],
    placeholder: "Upload PDF files to convert to Base64",
  },

  // File Conversion Categories
  "pdf-conversion": {
    name: "PDF Conversion",
    description: "Convert files to PDF or convert PDF to other formats",
    type: "file",
    acceptFiles: true,
    fileTypes: ["application/pdf"],
    formats: {
      fromPdf: [
        { id: "pdf-to-word", label: "Word" },
        { id: "pdf-to-markdown", label: "Markdown" },
        { id: "pdf-to-image", label: "Image" },
        { id: "pdf-to-text", label: "Text" },
        { id: "pdf-to-html", label: "HTML" },
      ],
    },
  },

  "word-conversion": {
    name: "Word Conversion",
    description: "Convert to/from Word document formats",
    type: "file",
    acceptFiles: true,
    fileTypes: [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    formats: {
      fromWord: [
        { id: "word-to-pdf", label: "PDF" },
        { id: "word-to-text", label: "Text" },
        { id: "word-to-html", label: "HTML" },
        { id: "word-to-markdown", label: "Markdown" },
      ],
    },
  },

  "excel-conversion": {
    name: "Excel Conversion",
    description: "Convert to/from Excel spreadsheet formats",
    type: "file",
    acceptFiles: true,
    fileTypes: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    formats: {
      fromExcel: [
        { id: "excel-to-csv", label: "CSV" },
        { id: "excel-to-pdf", label: "PDF" },
        { id: "excel-to-json", label: "JSON" },
        { id: "excel-to-text", label: "Text" },
      ],
    },
  },

  "markdown-conversion": {
    name: "Markdown Conversion",
    description: "Convert from Markdown (.md) format",
    type: "file",
    acceptFiles: true,
    fileTypes: ["text/markdown", ".md"],
    formats: {
      fromMarkdown: [
        { id: "markdown-to-html", label: "HTML" },
        { id: "markdown-to-plaintext", label: "PlainText" },
        { id: "markdown-to-pdf", label: "PDF" },
        { id: "markdown-to-word", label: "Word" },
      ],
    },
  },

  "html-conversion": {
    name: "HTML Conversion",
    description: "Convert from HTML (.html) format",
    type: "file",
    acceptFiles: true,
    fileTypes: ["text/html", ".html"],
    formats: {
      fromHTML: [
        { id: "html-to-markdown", label: "Markdown" },
        { id: "html-to-pdf", label: "PDF" },
        { id: "html-to-word", label: "Word" },
      ],
    },
  },

  "image-conversion": {
    name: "Image Conversion",
    description: "Convert image files to other formats or grayscale",
    type: "file",
    acceptFiles: true,
    fileTypes: [
      "image/jpeg",
      "image/png",
      "image/bmp",
      "image/tiff",
      "image/webp",
    ],
    formats: {
      fromImage: [
        { id: "image-to-pdf", label: "PDF" },
        { id: "image-to-grayscale", label: "Grayscale" },
        { id: "image-to-jpg", label: "JPG" },
        { id: "image-to-png", label: "PNG" },
        { id: "image-to-webp", label: "WEBP" },
        { id: "image-to-bmp", label: "BMP" },
        { id: "image-to-tiff", label: "TIFF" },
      ],
    },
  },

  "ai-summarizer": {
    name: "AI Summarizer",
    description: "Upload documents (PDF, DOCX, TXT) and get AI-powered summaries using Gemini",
    type: "file",
    category: "ai-tools",
    acceptFiles: true,
    fileTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "text/markdown",
      ".md",
    ],
  },
};

// Helper function to get tools by category
export function getToolsByCategory(
  category?: string
): Record<string, BaseToolConfig> {
  if (!category) return toolConfigs;

  return Object.fromEntries(
    Object.entries(toolConfigs).filter(
      ([_, config]) => config.category === category
    )
  );
}

// Helper function to get tools by type
export function getToolsByType(type: ToolType): Record<string, BaseToolConfig> {
  return Object.fromEntries(
    Object.entries(toolConfigs).filter(([_, config]) => config.type === type)
  );
}

// Helper function to get all categories
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  Object.values(toolConfigs).forEach((config) => {
    if (config.category) {
      categories.add(config.category);
    }
  });
  return Array.from(categories).sort();
}

// Helper function to check if tool accepts files
export function toolAcceptsFiles(toolId: string): boolean {
  return toolConfigs[toolId]?.acceptFiles || false;
}

// Helper function to get accepted file types for a tool
export function getAcceptedFileTypes(toolId: string): string[] {
  return toolConfigs[toolId]?.fileTypes || [];
}
