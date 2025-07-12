"use client"

import React from "react"
import { Button } from "../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Textarea } from "../../ui/textarea"
import { Badge } from "../../ui/badge"
import { Copy, Download, FileText, ImageIcon, FileVideo, Music } from "lucide-react"
import { FilePreview } from "./file-preview"

interface OutputDisplayProps {
  outputText: string
  outputBlob: Blob | null
  downloadFilename: string | null
  outputFileInfo: {
    name: string
    size: number
    type: string
    lastModified?: number
  } | null
}

export function OutputDisplay({ outputText, outputBlob, downloadFilename, outputFileInfo }: OutputDisplayProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleDownloadText = () => {
    const blob = new Blob([outputText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = downloadFilename || "output.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const getFileTypeIcon = (type: string) => {
    if (type.startsWith("image/")) return ImageIcon
    if (type.startsWith("video/")) return FileVideo
    if (type.startsWith("audio/")) return Music
    return FileText
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Output</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {outputBlob && outputFileInfo ? (
          <div className="space-y-4">
            {/* File Info */}
            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                {React.createElement(getFileTypeIcon(outputFileInfo.type), {
                  className: "h-5 w-5",
                })}
                <span className="font-medium">{outputFileInfo.name}</span>
              </div>

              <div className="flex gap-4">
                <div>
                  <span className="text-muted-foreground">Size:</span>
                  <Badge variant="outline" className="ml-2">
                    {formatFileSize(outputFileInfo.size)}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <Badge variant="outline" className="ml-2">
                    {outputFileInfo.type}
                  </Badge>
                </div>
                {outputFileInfo.lastModified && (
                  <div className="">
                    <span className="text-muted-foreground">Created:</span>
                    <Badge variant="outline" className="ml-2">
                      {new Date(outputFileInfo.lastModified).toLocaleString()}
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* File Preview */}
            <FilePreview blob={outputBlob} fileInfo={outputFileInfo} />

            {/* Download Button */}
            <Button asChild variant="default" className="w-full">
              <a href={URL.createObjectURL(outputBlob)} download={downloadFilename || "download"}>
                <Download className="h-4 w-4 mr-2" />
                Download File
              </a>
            </Button>
          </div>
        ) : (
          <>
            <Textarea
              value={outputText}
              readOnly
              className="min-h-[160px] font-mono resize-none"
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
              <Button
                variant="outline"
                onClick={handleDownloadText}
                disabled={!outputText}
                className="flex-1 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
