import type React from "react"
import { useState, useCallback, useEffect, useRef } from "react"
import {
  Upload,
  Copy,
  Download,
  Share2,
  Plus,
  ArrowUpDown,
  RotateCcw,
  X,
  ChevronDown,
  ChevronRight,
  ImageIcon,
  Play,
  Home,
  ChevronRightIcon as BreadcrumbChevron,
} from "lucide-react"

import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Switch } from "./ui/switch"
import { Checkbox } from "./ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { Alert, AlertDescription } from "./ui/alert"
import { Progress } from "./ui/progress"

export default function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [textInput, setTextInput] = useState("")
  const [output, setOutput] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState("text")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [dragOver, setDragOver] = useState(false)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Advanced options
  const [lineWrapping, setLineWrapping] = useState(true)
  const [charsPerLine, setCharsPerLine] = useState(76)
  const [urlSafe, setUrlSafe] = useState(false)
  const [removePadding, setRemovePadding] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLTextAreaElement>(null)

  // Real-time processing with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (textInput || file) {
        processData()
      } else {
        setOutput("")
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [textInput, file, mode, lineWrapping, charsPerLine, urlSafe, removePadding])

  const processData = useCallback(async () => {
    if (!textInput && !file) return

    setIsProcessing(true)
    setError("")

    try {
      let result = ""

      if (activeTab === "text") {
        if (mode === "encode") {
          result = btoa(unescape(encodeURIComponent(textInput)))
        } else {
          try {
            result = decodeURIComponent(escape(atob(textInput)))
          } catch {
            throw new Error("Invalid Base64 string")
          }
        }
      } else if (file) {
        if (mode === "encode") {
          result = await fileToBase64(file)
        } else {
          throw new Error("File decoding not supported in this demo")
        }
      }

      // Apply formatting options
      if (mode === "encode" && result) {
        if (urlSafe) {
          result = result.replace(/\+/g, "-").replace(/\//g, "_")
        }
        if (removePadding) {
          result = result.replace(/=/g, "")
        }
        if (lineWrapping && charsPerLine > 0) {
          result = result.match(new RegExp(`.{1,${charsPerLine}}`, "g"))?.join("\n") || result
        }
      }

      setOutput(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed")
      setOutput("")
    } finally {
      setIsProcessing(false)
    }
  }, [textInput, file, mode, activeTab, lineWrapping, charsPerLine, urlSafe, removePadding])

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        resolve(result.split(",")[1]) // Remove data URL prefix
      }
      reader.onerror = reject
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress((e.loaded / e.total) * 100)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const file = files[0]
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("File size exceeds 5MB limit")
        return
      }
      setFile(file)
      setActiveTab("file")
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit")
        return
      }
      setFile(file)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const downloadOutput = () => {
    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `base64-${mode}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const swapInputOutput = () => {
    if (activeTab === "text") {
      setTextInput(output)
      setMode(mode === "encode" ? "decode" : "encode")
    }
  }

  const resetAll = () => {
    setTextInput("")
    setOutput("")
    setFile(null)
    setError("")
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const loadExample = (example: string) => {
    setTextInput(example)
    setActiveTab("text")
    setMode("encode")
  }

  const examples = [
    { name: "Hello World", value: "Hello, World!" },
    { name: "JSON Object", value: '{"name": "John", "age": 30, "city": "New York"}' },
    { name: "Binary Data", value: "This is binary data: \x00\x01\x02\x03" },
    { name: "Unicode Text", value: "Hello 世界 🌍" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Home className="w-4 h-4 mr-1" />
            <span>Dashboard</span>
            <BreadcrumbChevron className="w-4 h-4 mx-2" />
            <span>Encoding Tools</span>
            <BreadcrumbChevron className="w-4 h-4 mx-2" />
            <span className="text-foreground">Base64</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Base64 Encoder & Decoder</h1>
          <p className="text-muted-foreground">Convert text and files to/from Base64 encoding</p>
        </div>

        {/* Mode Selection */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-4">
              <Label
                htmlFor="mode-switch"
                className={`text-lg font-medium ${mode === "encode" ? "text-primary" : "text-muted-foreground"}`}
              >
                Encode
              </Label>
              <Switch
                id="mode-switch"
                checked={mode === "decode"}
                onCheckedChange={(checked) => setMode(checked ? "decode" : "encode")}
                className="scale-125"
              />
              <Label
                htmlFor="mode-switch"
                className={`text-lg font-medium ${mode === "decode" ? "text-primary" : "text-muted-foreground"}`}
              >
                Decode
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Input</span>
                <Badge variant="outline">{mode === "encode" ? "Encoding" : "Decoding"}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">Text Input</TabsTrigger>
                  <TabsTrigger value="file">File Input</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4">
                  <div className="relative">
                    <Textarea
                      placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string to decode..."}
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      className="min-h-[300px] font-mono text-sm resize-none"
                    />
                    <div className="absolute top-2 right-2 flex items-center space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => setTextInput("")} className="h-6 w-6 p-0">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                      {textInput.length} characters
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="file" className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                    }`}
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragOver(true)
                    }}
                    onDragLeave={() => setDragOver(false)}
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                    <p className="text-sm text-muted-foreground mb-4">Supported formats: All file types</p>
                    <Button onClick={() => fileInputRef.current?.click()}>Browse Files</Button>
                    <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} />
                    <div className="mt-4 text-xs text-muted-foreground">
                      <Badge variant="secondary">Free: 5MB</Badge>
                      <Badge variant="outline" className="ml-2">
                        Pro: 100MB
                      </Badge>
                    </div>
                  </div>

                  {file && (
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <ImageIcon className="w-8 h-8 text-blue-500" />
                        <div className="flex-1">
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => setFile(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <Progress value={uploadProgress} className="mt-2" />
                      )}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Output</span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={copyToClipboard} disabled={!output}>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadOutput} disabled={!output}>
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  ref={outputRef}
                  value={output}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-muted/50 resize-none"
                  placeholder={`${mode === "encode" ? "Encoded" : "Decoded"} output will appear here...`}
                />
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                  {output.length} characters / {new Blob([output]).size} bytes
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Processing Controls */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={processData}
                disabled={isProcessing || (!textInput && !file)}
                className="min-w-[150px]"
              >
                {isProcessing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {mode === "encode" ? "Encode" : "Decode"}
              </Button>

              <Button variant="outline" onClick={swapInputOutput} disabled={!output || activeTab !== "text"}>
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Swap
              </Button>

              <Button variant="outline" onClick={resetAll}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset All
              </Button>

              <Button variant="outline" disabled>
                <Share2 className="w-4 h-4 mr-2" />
                Share Link
              </Button>

              <Button variant="outline" disabled>
                <Plus className="w-4 h-4 mr-2" />
                Add to Batch
                <Badge variant="secondary" className="ml-2">
                  Pro
                </Badge>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert className="mt-6" variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Advanced Options */}
        <Card className="mt-6">
          <Collapsible open={optionsOpen} onOpenChange={setOptionsOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <span>Advanced Options</span>
                  {optionsOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="line-wrapping"
                      checked={lineWrapping}
                      onCheckedChange={(checked) => setLineWrapping(checked === true)}
                    />
                    <Label htmlFor="line-wrapping">Line wrapping</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chars-per-line">Characters per line</Label>
                    <Input
                      id="chars-per-line"
                      type="number"
                      value={charsPerLine}
                      onChange={(e) => setCharsPerLine(Number(e.target.value))}
                      min="1"
                      max="200"
                      disabled={!lineWrapping}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="url-safe"
                      checked={urlSafe}
                      onCheckedChange={(checked) => setUrlSafe(checked === true)}
                    />
                    <Label htmlFor="url-safe">URL-safe Base64</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remove-padding"
                      checked={removePadding}
                      onCheckedChange={(checked) => setRemovePadding(checked === true)}
                    />
                    <Label htmlFor="remove-padding">Remove padding</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-alphabet">Custom alphabet</Label>
                    <Input id="custom-alphabet" placeholder="Enterprise feature" disabled />
                    <Badge variant="outline">Enterprise</Badge>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Examples Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {examples.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => loadExample(example.value)}
                  className="h-auto p-3 text-left justify-start"
                >
                  <div>
                    <div className="font-medium text-sm">{example.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{example.value.substring(0, 30)}...</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* About Base64 */}
        <Card className="mt-6">
          <Collapsible open={aboutOpen} onOpenChange={setAboutOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <span>About Base64</span>
                  {aboutOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What is Base64 encoding?</h4>
                  <p className="text-sm text-muted-foreground">
                    Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
                    It's commonly used to encode data that needs to be stored and transferred over media designed to
                    deal with text.
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Common use cases</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Email attachments (MIME)</li>
                    <li>• Embedding images in HTML/CSS</li>
                    <li>• API data transmission</li>
                    <li>• Configuration files</li>
                    <li>• URL-safe data encoding</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Character set</h4>
                  <p className="text-sm text-muted-foreground font-mono">
                    A-Z, a-z, 0-9, +, / (standard)
                    <br />
                    A-Z, a-z, 0-9, -, _ (URL-safe)
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Padding</h4>
                  <p className="text-sm text-muted-foreground">
                    Base64 uses '=' characters for padding to ensure the encoded string length is a multiple of 4. This
                    can be removed in some applications where the decoder can handle variable-length strings.
                  </p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>
    </div>
  )
}
