import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { MainWorkspace } from "./main-workspace/main";
import { ResultsPanel } from "./results-panel";
import { useState, useEffect } from "react";

export interface ProcessingJob {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  operation: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number;
  estimatedTime?: number;
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

  // Simulate real-time processing updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingJobs((prev) =>
        prev.map((job) => {
          if (job.status === "processing" && job.progress < 100) {
            const newProgress = Math.min(
              job.progress + Math.random() * 15,
              100
            );
            return {
              ...job,
              progress: newProgress,
              status: newProgress >= 100 ? "completed" : "processing",
              downloadUrl:
                newProgress >= 100 ? `/downloads/${job.id}` : undefined,
            };
          }
          return job;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handleFileProcess = (files: File[], operation: string) => {
    const newJobs: ProcessingJob[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      operation,
      status: "queued",
      progress: 0,
      createdAt: new Date(),
    }));

    setProcessingJobs((prev) => [...newJobs, ...prev]);

    // Start processing after a short delay
    setTimeout(() => {
      setProcessingJobs((prev) =>
        prev.map((job) =>
          newJobs.find((newJob) => newJob.id === job.id)
            ? { ...job, status: "processing" as const }
            : job
        )
      );
    }, 500);

    // Deduct credits
    const creditCost = newJobs.length * 5;
    setUserCredits((prev) => ({
      ...prev,
      current: Math.max(0, prev.current - creditCost),
      used: prev.used + creditCost,
    }));
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-background">
        <AppSidebar
          selectedTool={selectedTool}
          onToolSelect={handleToolSelect}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader userCredits={userCredits} />

          <div className="flex flex-1 overflow-hidden">
            <MainWorkspace
              selectedTool={selectedTool}
              onFileProcess={handleFileProcess}
              userCredits={userCredits}
            />

            <ResultsPanel
              processingJobs={processingJobs}
              userCredits={userCredits}
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
