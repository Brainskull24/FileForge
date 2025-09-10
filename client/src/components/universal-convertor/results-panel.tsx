import { useMemo, Fragment, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import type { ProcessingJob } from "./main";
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
} from "lucide-react";
import { useAuth } from "../../context/auth";

interface ResultsPanelProps {
  processingJobs: ProcessingJob[];
  totalCredits?: number;
}

const STATUS_META = {
  queued: {
    label: "Queued",
    color: "text-muted-foreground",
    badgeVariant: "secondary" as const,
    Icon: Clock,
    spin: false,
  },
  processing: {
    label: "Processing",
    color: "text-gray-300",
    badgeVariant: "default" as const,
    Icon: Loader2,
    spin: true,
  },
  completed: {
    label: "Completed",
    color: "text-green-600",
    badgeVariant: "default" as const,
    Icon: CheckCircle,
    spin: false,
  },
  failed: {
    label: "Failed",
    color: "text-red-600",
    badgeVariant: "destructive" as const,
    Icon: XCircle,
    spin: false,
  },
};

const MAX_COMPLETED_VISIBLE = 10;
const MAX_FAILED_VISIBLE = 5;

export function ResultsPanel({
  processingJobs,
  totalCredits = 500,
}: ResultsPanelProps) {
  const { user } = useAuth();
  const remainingCredits = user?.credits ?? 0;
  const usedCredits = totalCredits - remainingCredits;
  const usedPercentage = (usedCredits / totalCredits) * 100;

  const { activeJobs, completedJobs, failedJobs } = useMemo(() => {
    const active: ProcessingJob[] = [];
    const completed: ProcessingJob[] = [];
    const failed: ProcessingJob[] = [];
    for (const j of processingJobs) {
      if (j.status === "processing" || j.status === "queued") active.push(j);
      else if (j.status === "completed") completed.push(j);
      else if (j.status === "failed") failed.push(j);
    }
    return { activeJobs: active, completedJobs: completed, failedJobs: failed };
  }, [processingJobs]);

  const formatFileSize = (bytes: number) => {
    if (!Number.isFinite(bytes) || bytes < 0) return "—";
    if (bytes === 0) return "0 B";
    const units = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      units.length - 1
    );
    const val = bytes / Math.pow(1024, i);
    return `${val.toFixed(val >= 100 ? 0 : val >= 10 ? 1 : 2)} ${units[i]}`;
  };

  const formatTimeAgo = (d: Date) => {
    const date = d instanceof Date ? d : new Date(d);
    const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diffSec < 60) return "Just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return `${Math.floor(diffSec / 86400)}d ago`;
  };

  const renderStatusBadge = (status: ProcessingJob["status"]) => {
    const meta = STATUS_META[status];
    return (
      <Badge variant={meta.badgeVariant} className={meta.color}>
        {meta.label}
      </Badge>
    );
  };

  const renderStatusIcon = (status: ProcessingJob["status"]) => {
    const meta = STATUS_META[status];
    const Icon = meta.Icon;
    return (
      <Icon
        className={`h-4 w-4 ${meta.color} ${meta.spin ? "animate-spin" : ""}`}
      />
    );
  };

  const handleDownload = (job: ProcessingJob) => {
    if (!job.downloadUrl) return;
    const a = document.createElement("a");
    a.href = job.downloadUrl;
    a.download = `converted-${job.fileName}`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(job.downloadUrl!), 2000);
  };

  const [showAllCompleted, setShowAllCompleted] = useState(false);

  return (
    <div className="w-[350px] border-l bg-muted/30 flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Credit Usage</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Used</span>
              <span>{usedPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={usedPercentage} className="h-2" />
            <div className="text-xs text-muted-foreground">
              {remainingCredits} credits remaining
            </div>
          </div>

          {remainingCredits < 100 && (
            <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <span className="text-xs text-orange-600 dark:text-orange-400">
                Running low on credits
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col w-full h-0">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Processing Queue</h3>
            <Badge variant="outline">{activeJobs.length} active</Badge>
          </div>
        </div>

        <ScrollArea className="flex-1 w-full">
          <div className="p-4 space-y-4 w-full">
            {activeJobs.length > 0 && (
              <div className="space-y-3 w-full">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Currently Processing
                </h4>
                {activeJobs.map((job) => (
                  <Card key={job.id} className="p-3 w-[100%]">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between ">
                        <div className="flex items-center gap-2">
                          {renderStatusIcon(job.status)}
                          <span className="text-sm font-medium truncate max-w-[200px]">
                            {job.fileName}
                          </span>
                        </div>
                        <div className="shrink-0">
                          {renderStatusBadge(job.status)}
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {formatFileSize(job.fileSize)} • {job.operation}
                      </div>

                      {(job.status === "processing" ||
                        job.status === "queued") && (
                        <div className="space-y-1">
                          <Progress value={job.progress} className="h-1" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{Math.round(job.progress)}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {completedJobs.length > 0 && (
              <Fragment>
                {activeJobs.length > 0 && <Separator />}
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Completed ({completedJobs.length})
                  </h4>
                  <div className="space-y-2">
                    {(showAllCompleted
                      ? completedJobs
                      : completedJobs.slice(0, MAX_COMPLETED_VISIBLE)
                    ).map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-background w-full border "
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <FileText className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm truncate max-w-[200px]">
                              {job.fileName}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatTimeAgo(job.createdAt)}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDownload(job)}
                          disabled={!job.downloadUrl}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {completedJobs.length > MAX_COMPLETED_VISIBLE && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAllCompleted(!showAllCompleted)}
                      >
                        {showAllCompleted ? "Show Less" : "Show More"}
                      </Button>
                    )}
                  </div>
                </div>
              </Fragment>
            )}

            {failedJobs.length > 0 && (
              <Fragment>
                {(activeJobs.length > 0 || completedJobs.length > 0) && (
                  <Separator />
                )}
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-muted-foreground">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Failed ({failedJobs.length})
                  </h4>
                  <div className="space-y-2">
                    {failedJobs.slice(0, MAX_FAILED_VISIBLE).map((job) => (
                      <div
                        key={job.id}
                        className="p-2 rounded-lg bg-red-50 dark:bg-red-950/20 w-full border "
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-3 w-3 text-red-500" />
                          <span className="text-sm truncate max-w-[200px]">
                            {job.fileName}
                          </span>
                        </div>
                        <div className="text-xs text-red-600 dark:text-red-400">
                          Processing failed • {formatTimeAgo(job.createdAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Fragment>
            )}

            {processingJobs.length === 0 && (
              <div className="text-center py-8">
                <History className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No processing jobs yet
                </p>
                <p className="text-xs text-muted-foreground">
                  Select a tool and upload files to get started
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
