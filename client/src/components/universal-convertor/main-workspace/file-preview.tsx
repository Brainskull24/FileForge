"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Eye, EyeOff } from "lucide-react"

interface FilePreviewProps {
  blob: Blob
  fileInfo: {
    name: string
    size: number
    type: string
  }
}

export function FilePreview({ blob, fileInfo }: FilePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(true)

  useEffect(() => {
    if (blob && canPreview(fileInfo.type)) {
      const url = URL.createObjectURL(blob)
      setPreviewUrl(url)

      return () => {
        URL.revokeObjectURL(url)
      }
    }
  }, [blob, fileInfo.type])

  const canPreview = (type: string) => {
    return (
      type.startsWith("image/") || type === "application/pdf" || type.startsWith("text/") || type === "application/json"
    )
  }

  if (!canPreview(fileInfo.type)) {
    return null
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Preview</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </CardHeader>
      {showPreview && (
        <CardContent>
          <div className="max-h-96 overflow-auto">
            {fileInfo.type.startsWith("image/") && previewUrl && (
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                className="max-w-full h-auto rounded-lg border"
              />
            )}

            {fileInfo.type === "application/pdf" && previewUrl && (
              <iframe src={previewUrl} className="w-full h-96 border rounded-lg" title="PDF Preview" />
            )}

            {(fileInfo.type.startsWith("text/") || fileInfo.type === "application/json") && <PreviewText blob={blob} />}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function PreviewText({ blob }: { blob: Blob }) {
  const [text, setText] = useState<string>("")

  useEffect(() => {
    blob.text().then(setText)
  }, [blob])

  return <pre className="text-sm bg-muted p-4 rounded-lg overflow-auto max-h-64 whitespace-pre-wrap">{text}</pre>
}
