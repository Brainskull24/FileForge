import { useState, useEffect } from "react";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { MainWorkspace } from "./main-workspace/main";
import { ResultsPanel } from "./results-panel";
import { useAuth } from "../../context/auth";
import { toast } from "sonner";
import { extMap } from "../../data/toolConfigs";
import api from "../../lib/axios";

export interface ProcessingJob {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  operation: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number;
  downloadUrl?: string;
  createdAt: Date;
}

export function UniversalConverterDashboard() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [processingJobs, setProcessingJobs] = useState<ProcessingJob[]>([]);
  const { user, deductCredits } = useAuth();
  const CONVERSION_CREDIT_COST = 10;

  const addNewJob = (file: File, operation: string): ProcessingJob => {
    const job: ProcessingJob = {
      id: crypto.randomUUID(),
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      operation,
      status: "queued",
      progress: 0,
      createdAt: new Date(),
    };
    setProcessingJobs((prev) => [job, ...prev]);
    return job;
  };

  const updateJob = (jobId: string, updates: Partial<ProcessingJob>) => {
    setProcessingJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, ...updates } : job))
    );
  };

  const resolveDownloadName = (
    file: File,
    disposition: string | undefined,
    operation: string
  ): string => {
    if (disposition?.includes("filename=")) {
      const match = disposition.match(/filename="?([^"]+)"?/);
      if (match?.[1]) return match[1];
    }

    const ext = extMap[operation] || "";
    const baseName = file.name.replace(/\.[^.]+$/, "");
    return `${baseName}${ext}`;
  };

  const uploadFile = async (
    job: ProcessingJob,
    file: File,
    operation: string
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data, headers } = await api.post(
        `/file-conversion/${operation}`,
        formData,
        {
          responseType: "blob",
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / (e.total || 1));
            updateJob(job.id, { progress: percent, status: "processing" });
          },
        }
      );

      const blob = new Blob([data], {
        type: headers["content-type"] || "application/octet-stream",
      });

      const downloadUrl = URL.createObjectURL(blob);
      const downloadName = resolveDownloadName(
        file,
        headers["content-disposition"],
        operation
      );

      updateJob(job.id, {
        status: "completed",
        progress: 100,
        downloadUrl,
        fileName: downloadName,
      });
      deductCredits(1, CONVERSION_CREDIT_COST);
    } catch (error) {
      toast.error(`Failed to process ${job.fileName}` + error);
      updateJob(job.id, { status: "failed" });
    }
  };

  const handleFileProcess = async (files: File[], operation: string) => {
    if (!user?.credits || user.credits < CONVERSION_CREDIT_COST) {
      toast.error("You don't have enough credits to perform this operation!");
      return;
    }

    await Promise.all(
      files.map(async (file) => {
        const job = addNewJob(file, operation);
        await uploadFile(job, file, operation);
      })
    );
  };

  // Cleanup blob URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      processingJobs.forEach((job) => {
        if (job.downloadUrl) {
          URL.revokeObjectURL(job.downloadUrl);
        }
      });
    };
  }, [processingJobs]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-background">
        <AppSidebar
          selectedTool={selectedTool}
          onToolSelect={setSelectedTool}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex flex-1 overflow-hidden">
            <MainWorkspace
              selectedTool={selectedTool}
              onFileProcess={handleFileProcess}
            />
            <ResultsPanel processingJobs={processingJobs} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
