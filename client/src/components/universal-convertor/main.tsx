import { useState } from "react";
import api from "../../lib/axios";

import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { MainWorkspace } from "./main-workspace/main";
import { ResultsPanel } from "./results-panel";

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

export interface UserCredits {
  current: number;
  total: number;
  used: number;
}

export function UniversalConverterDashboard() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [processingJobs, setProcessingJobs] = useState<ProcessingJob[]>([]);
  const [userCredits, setUserCredits] = useState<UserCredits>({
    current: 850,
    total: 1000,
    used: 150,
  });

  const addNewJobs = (files: File[], operation: string): ProcessingJob[] => {
    const newJobs = files.map((file) => ({
      id: Math.random().toString(36).slice(2),
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      operation,
      status: "queued" as const,
      progress: 0,
      createdAt: new Date(),
    }));

    setProcessingJobs((prev) => [...newJobs, ...prev]);
    return newJobs;
  };

  const updateJob = (jobId: string, updates: Partial<ProcessingJob>) => {
    setProcessingJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, ...updates } : j))
    );
  };

  const deductCredits = (count: number) => {
    const creditCost = count * 5;
    setUserCredits((prev) => ({
      ...prev,
      current: Math.max(0, prev.current - creditCost),
      used: prev.used + creditCost,
    }));
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

      // --- Determine File Type & Name ---
      const mimeType = headers["content-type"] || "application/octet-stream";
      const blob = new Blob([data], { type: mimeType });
      const downloadUrl = URL.createObjectURL(blob);

      // Extract filename from Content-Disposition header if available
      let downloadName = `converted-${file.name}`;
      const disposition = headers["content-disposition"];
      if (disposition && disposition.includes("filename=")) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match?.[1]) downloadName = match[1];
      } else {
        // Fallback mapping based on operation
        const extMap: Record<string, string> = {
          "pdf-to-word": ".docx",
          "word-to-pdf": ".pdf",
          "html-to-pdf": ".pdf",
          "markdown-to-html": ".html",
        };
        const fallbackExt = extMap[operation] || "";
        if (!file.name.endsWith(fallbackExt)) {
          const base = file.name.replace(/\.[^.]+$/, "");
          downloadName = `${base}${fallbackExt}`;
        }
      }

      updateJob(job.id, {
        status: "completed",
        progress: 100,
        downloadUrl,
        fileName: downloadName,
      });
    } catch (error) {
      console.error(`Failed to process ${job.fileName}`, error);
      updateJob(job.id, { status: "failed" });
    }
  };

  const handleFileProcess = async (files: File[], operation: string) => {
    const newJobs = addNewJobs(files, operation);

    deductCredits(newJobs.length);

    for (const job of newJobs) {
      const file = files.find((f) => f.name === job.fileName);
      if (file) await uploadFile(job, file, operation);
    }
  };

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
              userCredits={userCredits}
            />
            <ResultsPanel processingJobs={processingJobs} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
