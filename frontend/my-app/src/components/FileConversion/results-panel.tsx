import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import type { ProcessingJob, UserCredits } from "./universal-converter-dashboard"
import {
  Download,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  History,
  TrendingUp,
  FileText,
  AlertCircle,
} from "lucide-react"

interface ResultsPanelProps {
  processingJobs: ProcessingJob[]
  userCredits: UserCredits
}

export function ResultsPanel({ processingJobs, userCredits }: ResultsPanelProps) {
  const activeJobs = processingJobs.filter((job) => job.status === "processing" || job.status === "queued")
  const completedJobs = processingJobs.filter((job) => job.status === "completed")
  const failedJobs = processingJobs.filter((job) => job.status === "failed")

  const getStatusIcon = (status: ProcessingJob["status"]) => {
    switch (status) {
      case "queued":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      case "processing":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusBadge = (status: ProcessingJob["status"]) => {
    const variants = {
      queued: "secondary",
      processing: "default",
      completed: "default",
      failed: "destructive",
    } as const

    const colors = {
      queued: "text-muted-foreground",
      processing: "text-blue-600",
      completed: "text-green-600",
      failed: "text-red-600",
    }

    return (
      <Badge variant={variants[status]} className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  return (
    <div className="w-[350px] border-l bg-muted/30 flex flex-col">
      {/* Credits Usage */}
      <div className="p-4 border-b">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Credit Usage</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Used</span>
              <span>
                {userCredits.used} / {userCredits.total}
              </span>
            </div>
            <Progress value={(userCredits.used / userCredits.total) * 100} className="h-2" />
            <div className="text-xs text-muted-foreground">{userCredits.current} credits remaining</div>
          </div>

          {userCredits.current < 100 && (
            <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <span className="text-xs text-orange-600 dark:text-orange-400">Running low on credits</span>
            </div>
          )}
        </div>
      </div>

      {/* Processing Queue */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Processing Queue</h3>
            <Badge variant="outline">{activeJobs.length} active</Badge>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {/* Active Jobs */}
            {activeJobs.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Currently Processing</h4>
                {activeJobs.map((job) => (
                  <Card key={job.id} className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(job.status)}
                          <span className="text-sm font-medium truncate">{job.fileName}</span>
                        </div>
                        {getStatusBadge(job.status)}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {formatFileSize(job.fileSize)} • {job.operation}
                      </div>

                      {job.status === "processing" && (
                        <div className="space-y-1">
                          <Progress value={job.progress} className="h-1" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{job.progress.toFixed(0)}%</span>
                            {job.estimatedTime && <span>{job.estimatedTime}s remaining</span>}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Completed Jobs */}
            {completedJobs.length > 0 && (
              <>
                {activeJobs.length > 0 && <Separator />}
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Completed ({completedJobs.length})
                  </h4>
                  <div className="space-y-2">
                    {completedJobs.slice(0, 10).map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-2 rounded-lg bg-background">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <FileText className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm truncate">{job.fileName}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{formatTimeAgo(job.createdAt)}</div>
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Failed Jobs */}
            {failedJobs.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-muted-foreground">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Failed ({failedJobs.length})
                  </h4>
                  <div className="space-y-2">
                    {failedJobs.slice(0, 5).map((job) => (
                      <div key={job.id} className="p-2 rounded-lg bg-red-50 dark:bg-red-950/20">
                        <div className="flex items-center gap-2">
                          <FileText className="h-3 w-3 text-red-500" />
                          <span className="text-sm truncate">{job.fileName}</span>
                        </div>
                        <div className="text-xs text-red-600 dark:text-red-400">
                          Processing failed • {formatTimeAgo(job.createdAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Empty State */}
            {processingJobs.length === 0 && (
              <div className="text-center py-8">
                <History className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No processing jobs yet</p>
                <p className="text-xs text-muted-foreground">Select a tool and upload files to get started</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
