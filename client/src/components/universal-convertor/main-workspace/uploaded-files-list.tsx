"use client"
import { Button } from "../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { X, FileText, ImageIcon, Music, Video, Archive } from "lucide-react"

interface UploadedFile {
  file: File
  preview?: string
}

interface UploadedFilesListProps {
  uploadedFiles: UploadedFile[]
  onRemoveFile: (index: number) => void
}

export function UploadedFilesList({ uploadedFiles, onRemoveFile }: UploadedFilesListProps) {
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

  return (
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
                <Button variant="ghost" size="sm" onClick={() => onRemoveFile(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
