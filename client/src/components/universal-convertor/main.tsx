import { useState } from "react";
import api from "../../lib/axios";

import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { MainWorkspace } from "./main-workspace/main";
import { ResultsPanel } from "./results-panel";
import { useAuth } from "../../context/auth";

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
  used: number;
}

export function UniversalConverterDashboard() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [processingJobs, setProcessingJobs] = useState<ProcessingJob[]>([]);
  const { user, deductCredits } = useAuth();
  const [userCredits] = useState<UserCredits>({
    current: user?.credits || 0,
    used: 500 - (user?.credits || 0),
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
          // PDF conversions
          "pdf-to-html": ".html",
          "pdf-to-word": ".docx",
          "pdf-to-text": ".txt",
          "pdf-to-image": ".json", // returns JSON with image paths
          "pdf-to-markdown": ".md",

          // Word conversions
          "word-to-pdf": ".pdf",
          "word-to-html": ".html",
          "word-to-text": ".txt",
          "word-to-markdown": ".md",

          // Markdown conversions
          "markdown-to-html": ".html",
          "markdown-to-plaintext": ".txt",
          "markdown-to-pdf": ".pdf",
          "markdown-to-word": ".docx",

          // HTML conversions
          "html-to-markdown": ".md",
          "html-to-pdf": ".pdf",
          "html-to-word": ".docx",

          // Excel conversions
          "excel-to-csv": ".csv",
          "excel-to-json": ".json",
          "excel-to-pdf": ".pdf",

          // Image conversions
          "image-to-pdf": ".pdf",
          "image-to-grayscale": ".png",
          "image-to-jpg": ".jpg",
          "image-to-png": ".png",
          "image-to-bmp": ".bmp",
          "image-to-tiff": ".tiff",
          "image-to-webp": ".webp",
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

    deductCredits(newJobs.length, 10);

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
