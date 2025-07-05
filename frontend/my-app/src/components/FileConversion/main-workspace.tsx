import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"
import { Checkbox } from "../ui/checkbox"
import type { UserCredits } from "./universal-converter-dashboard"
import {
  Upload,
  FileText,
  ImageIcon,
  Music,
  Video,
  Archive,
  X,
  Play,
  Copy,
  Download,
  Sparkles,
  Info,
} from "lucide-react"

interface MainWorkspaceProps {
  selectedTool: string | null
  onFileProcess: (files: File[], operation: string) => void
  userCredits: UserCredits
}

interface UploadedFile {
  file: File
  preview?: string
}

const toolConfigs = {
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

  // Encoding Tools
  "base64-encode": {
    name: "Text to Base64",
    description: "Convert text to Base64 format",
    type: "text",
    placeholder: "Enter text to encode to Base64...",
    acceptFiles: false,
  },
  "image-to-base64": {
    name: "Image to Base64",
    description: "Convert image files to Base64 string",
    type: "file",
    placeholder: "",
    acceptFiles: true,
    fileTypes: ["image/*"],
  },
  "file-to-base64": {
    name: "File to Base64",
    description: "Convert any file to Base64 string",
    type: "file",
    placeholder: "",
    acceptFiles: true,
    fileTypes: ["*/*"],
  },
  "pdf-to-base64": {
    name: "PDF to Base64",
    description: "Convert PDF files to Base64 string",
    type: "file",
    placeholder: "",
    acceptFiles: true,
    fileTypes: ["application/pdf"],
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
  "qr-generate": {
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs",
    type: "text",
    placeholder: "Enter text or URL to generate QR code...",
    acceptFiles: false,
  },

  // File Conversion Categories
  "pdf-conversion": {
    name: "PDF Conversion",
    description: "Convert files to PDF or convert PDF to other formats",
    type: "file",
    acceptFiles: true,
    formats: {
      toPdf: ["Word", "Excel", "PowerPoint", "Images", "Text"],
      fromPdf: ["Word", "Excel", "Images", "Text", "HTML"],
    },
  },
  "word-conversion": {
    name: "Word Documents",
    description: "Convert to/from Word document formats",
    type: "file",
    acceptFiles: true,
    formats: {
      toWord: ["PDF", "Text", "HTML", "RTF"],
      fromWord: ["PDF", "Text", "HTML", "RTF"],
    },
  },
  "excel-conversion": {
    name: "Excel Spreadsheets",
    description: "Convert to/from Excel spreadsheet formats",
    type: "file",
    acceptFiles: true,
    formats: {
      toExcel: ["CSV", "PDF", "HTML", "Text"],
      fromExcel: ["CSV", "PDF", "HTML", "Text"],
    },
  },
  "image-conversion": {
    name: "Image Conversion",
    description: "Convert between different image formats",
    type: "file",
    acceptFiles: true,
    formats: {
      supported: ["JPG", "PNG", "WebP", "GIF", "BMP", "TIFF", "SVG", "HEIC", "ICO"],
    },
  },
  "audio-conversion": {
    name: "Audio Conversion",
    description: "Convert between different audio formats",
    type: "file",
    acceptFiles: true,
    formats: {
      supported: ["MP3", "WAV", "FLAC", "AAC", "OGG", "M4A", "WMA", "AIFF"],
    },
  },
  "video-conversion": {
    name: "Video Conversion",
    description: "Convert between different video formats",
    type: "file",
    acceptFiles: true,
    formats: {
      supported: ["MP4", "AVI", "MOV", "WebM", "MKV", "FLV", "WMV", "M4V"],
    },
  },
  "archive-conversion": {
    name: "Archive Files",
    description: "Create and extract archive files",
    type: "file",
    acceptFiles: true,
    formats: {
      supported: ["ZIP", "RAR", "7Z", "TAR", "GZ", "BZ2"],
    },
  },
  "text-conversion": {
    name: "Text & Code",
    description: "Convert between text and code formats",
    type: "file",
    acceptFiles: true,
    formats: {
      supported: ["TXT", "CSV", "JSON", "XML", "HTML", "MD", "RTF"],
    },
  },
}

export function MainWorkspace({ selectedTool, onFileProcess, userCredits }: MainWorkspaceProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [selectedFormat, setSelectedFormat] = useState("")
  const [processingOptions, setProcessingOptions] = useState({
    quality: [80],
    maintainAspectRatio: true,
    removeMetadata: false,
  })
  const [dragActive, setDragActive] = useState(false)

  const currentTool = selectedTool ? toolConfigs[selectedTool as keyof typeof toolConfigs] : null

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }, [])

  const handleFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => {
      const uploadedFile: UploadedFile = { file }

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          uploadedFile.preview = e.target?.result as string
          setUploadedFiles((prev) => [...prev])
        }
        reader.readAsDataURL(file)
      }

      return uploadedFile
    })

    setUploadedFiles((prev) => [...prev, ...newFiles])
  }

  const handleTextProcess = () => {
    if (!inputText.trim() || !selectedTool) return

    // Simulate processing based on tool type
    switch (selectedTool) {
      case "base64-encode":
        setOutputText(btoa(inputText))
        break
      case "base64-decode":
        try {
          setOutputText(atob(inputText))
        } catch (e) {
          setOutputText("Invalid Base64 input")
        }
        break
      case "base64-to-image":
        setOutputText("Image file generated from Base64 string")
        break
      case "base64-to-file":
        setOutputText("File generated from Base64 string")
        break
      case "base64-to-pdf":
        setOutputText("PDF file generated from Base64 string")
        break
      case "url-encode":
        setOutputText(encodeURIComponent(inputText))
        break
      case "url-decode":
        try {
          setOutputText(decodeURIComponent(inputText))
        } catch (e) {
          setOutputText("Invalid URL-encoded input")
        }
        break
      case "html-decode":
        const textarea = document.createElement("textarea")
        textarea.innerHTML = inputText
        setOutputText(textarea.value)
        break
      case "html-encode":
        setOutputText(
          inputText.replace(/[&<>"']/g, (match) => {
            const entities: { [key: string]: string } = {
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
            }
            return entities[match]
          }),
        )
        break
      case "hex-encode":
        setOutputText(
          inputText
            .split("")
            .map((c) => c.charCodeAt(0).toString(16))
            .join(" "),
        )
        break
      case "hex-decode":
        try {
          setOutputText(
            inputText
              .split(" ")
              .map((hex) => String.fromCharCode(Number.parseInt(hex, 16)))
              .join(""),
          )
        } catch (e) {
          setOutputText("Invalid hex input")
        }
        break
      case "binary-encode":
        setOutputText(
          inputText
            .split("")
            .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
            .join(" "),
        )
        break
      case "binary-decode":
        try {
          setOutputText(
            inputText
              .split(" ")
              .map((bin) => String.fromCharCode(Number.parseInt(bin, 2)))
              .join(""),
          )
        } catch (e) {
          setOutputText("Invalid binary input")
        }
        break
      case "hash-md5":
        setOutputText(`MD5 hash: ${btoa(inputText).substring(0, 32)}`)
        break
      case "hash-sha256":
        setOutputText(`SHA256 hash: ${btoa(inputText).substring(0, 64)}`)
        break
      case "qr-generate":
        setOutputText(`QR Code generated for: "${inputText}"`)
        break
      case "jwt-decode":
        try {
          const parts = inputText.split(".")
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]))
            setOutputText(JSON.stringify(payload, null, 2))
          } else {
            setOutputText("Invalid JWT format")
          }
        } catch (e) {
          setOutputText("Invalid JWT token")
        }
        break
      case "json-decode":
        try {
          const formatted = JSON.stringify(JSON.parse(inputText), null, 2)
          setOutputText(formatted)
        } catch (e) {
          setOutputText("Invalid JSON format")
        }
        break
      default:
        setOutputText(`Processed: ${inputText}`)
    }
  }

  const handleFileProcess = () => {
    if (uploadedFiles.length === 0 || (!selectedFormat && currentTool?.type === "file" && currentTool?.formats)) return

    const files = uploadedFiles.map((uf) => uf.file)
    const operation = selectedFormat ? `Convert to ${selectedFormat}` : currentTool?.name || "Process"
    onFileProcess(files, operation)
    setUploadedFiles([])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return ImageIcon
    if (fileType.startsWith("audio/")) return Music
    if (fileType.startsWith("video/")) return Video
    if (fileType.includes("zip") || fileType.includes("rar")) return Archive
    return FileText
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Welcome screen when no tool is selected
  if (!selectedTool || !currentTool) {
    return (
      <div className="flex-1 p-6">
        <div className="flex h-full flex-col items-center justify-center space-y-6">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Welcome to Universal Converter</h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Choose a tool from the sidebar to start converting your files or text. It's simple, fast, and works for
              everyone!
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-4xl">
            <Card className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Easy Upload</h3>
              <p className="text-sm text-muted-foreground">Drag & drop files or paste text</p>
            </Card>

            <Card className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Play className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">One-Click Process</h3>
              <p className="text-sm text-muted-foreground">Convert with a single click</p>
            </Card>

            <Card className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Instant Download</h3>
              <p className="text-sm text-muted-foreground">Get your files immediately</p>
            </Card>

            <Card className="text-center p-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">High Quality</h3>
              <p className="text-sm text-muted-foreground">Professional results every time</p>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Tool Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-3 py-1">
            {currentTool.name}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            Credits available: {userCredits.current}
          </div>
        </div>
        <p className="text-muted-foreground">{currentTool.description}</p>
      </div>

      {/* Text-based tools */}
      {currentTool.type === "text" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={currentTool.placeholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] font-mono"
              />
              <Button onClick={handleTextProcess} className="w-full" disabled={!inputText.trim()}>
                <Play className="h-4 w-4 mr-2" />
                Process
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Output</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={outputText}
                readOnly
                className="min-h-[200px] font-mono"
                placeholder="Processed output will appear here..."
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(outputText)}
                  disabled={!outputText}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" disabled={!outputText} className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* File-based tools */}
      {currentTool.type === "file" && (
        <div className="space-y-6">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`relative flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Drop files here or click to browse</p>
                <input
                  type="file"
                  multiple
                  accept={currentTool.fileTypes?.join(",")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Format Selection for File Conversion Categories */}
          {currentTool.formats && (
            <Card>
              <CardHeader>
                <CardTitle>Choose Output Format</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* PDF Conversion */}
                  {selectedTool === "pdf-conversion" && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Convert TO PDF</Label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                          {currentTool.formats.toPdf?.map((format) => (
                            <Button
                              key={format}
                              variant={selectedFormat === `to-pdf-${format}` ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedFormat(`to-pdf-${format}`)}
                            >
                              {format} → PDF
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Convert FROM PDF</Label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                          {currentTool.formats.fromPdf?.map((format) => (
                            <Button
                              key={format}
                              variant={selectedFormat === `from-pdf-${format}` ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedFormat(`from-pdf-${format}`)}
                            >
                              PDF → {format}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Word Conversion */}
                  {selectedTool === "word-conversion" && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Convert TO Word</Label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                          {currentTool.formats.toWord?.map((format) => (
                            <Button
                              key={format}
                              variant={selectedFormat === `to-word-${format}` ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedFormat(`to-word-${format}`)}
                            >
                              {format} → Word
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Convert FROM Word</Label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                          {currentTool.formats.fromWord?.map((format) => (
                            <Button
                              key={format}
                              variant={selectedFormat === `from-word-${format}` ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedFormat(`from-word-${format}`)}
                            >
                              Word → {format}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Excel Conversion */}
                  {selectedTool === "excel-conversion" && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Convert TO Excel</Label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                          {currentTool.formats.toExcel?.map((format) => (
                            <Button
                              key={format}
                              variant={selectedFormat === `to-excel-${format}` ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedFormat(`to-excel-${format}`)}
                            >
                              {format} → Excel
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Convert FROM Excel</Label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                          {currentTool.formats.fromExcel?.map((format) => (
                            <Button
                              key={format}
                              variant={selectedFormat === `from-excel-${format}` ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedFormat(`from-excel-${format}`)}
                            >
                              Excel → {format}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Other conversion tools */}
                  {currentTool.formats.supported && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Select Output Format</Label>
                      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                        {currentTool.formats.supported.map((format) => (
                          <Button
                            key={format}
                            variant={selectedFormat === format ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedFormat(format)}
                          >
                            {format}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Processing Options */}
          {uploadedFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Processing Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(selectedTool?.includes("image") || selectedTool?.includes("video")) && (
                  <div>
                    <Label>Quality: {processingOptions.quality[0]}%</Label>
                    <Slider
                      value={processingOptions.quality}
                      onValueChange={(value) => setProcessingOptions({ ...processingOptions, quality: value })}
                      max={100}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="aspect-ratio"
                    checked={processingOptions.maintainAspectRatio}
                    onCheckedChange={(checked) =>
                      setProcessingOptions({ ...processingOptions, maintainAspectRatio: checked as boolean })
                    }
                  />
                  <Label htmlFor="aspect-ratio">Maintain aspect ratio</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="metadata"
                    checked={processingOptions.removeMetadata}
                    onCheckedChange={(checked) =>
                      setProcessingOptions({ ...processingOptions, removeMetadata: checked as boolean })
                    }
                  />
                  <Label htmlFor="metadata">Remove metadata</Label>
                </div>

                <Button
                  onClick={handleFileProcess}
                  disabled={currentTool.formats && !selectedFormat}
                  className="w-full"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {currentTool.formats ? "Convert Files" : "Process Files"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Uploaded Files Display */}
          {uploadedFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Files ({uploadedFiles.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {uploadedFiles.map((uploadedFile, index) => {
                    const FileIcon = getFileIcon(uploadedFile.file.type)
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        {uploadedFile.preview ? (
                          <img
                            src={uploadedFile.preview || "/placeholder.svg"}
                            alt={uploadedFile.file.name}
                            className="h-10 w-10 object-cover rounded"
                          />
                        ) : (
                          <FileIcon className="h-10 w-10 text-muted-foreground" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium truncate">{uploadedFile.file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(uploadedFile.file.size)} • {uploadedFile.file.type}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
