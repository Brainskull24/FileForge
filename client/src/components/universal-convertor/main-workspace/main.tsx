"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { Badge } from "../../ui/badge";
import { Info } from "lucide-react";
import { toolConfigs } from "../../../data/toolConfigs";
import { Welcome } from "../welcome-page";
import { TextProcessor } from "./text-processor";
import { FileProcessor } from "./file-processor";
import { AISummarizer } from "./ai-summarizer";
import { useAuth } from "../../../context/auth";

interface MainWorkspaceProps {
  selectedTool: string | null;
  onFileProcess: (files: File[], operation: string) => void;
}

type ToolConfigs = typeof toolConfigs;
type ToolKey = keyof ToolConfigs;
type ToolConfig = ToolConfigs[ToolKey];

function getToolConfig(id: string | null): ToolConfig | null {
  if (!id) return null;
  return (toolConfigs as Record<string, ToolConfig>)[id] ?? null;
}

export function MainWorkspace({
  selectedTool,
  onFileProcess,
}: MainWorkspaceProps) {
  // --- Text tool state ---
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string | null>(null);
  const [outputFileInfo, setOutputFileInfo] = useState<{
    name: string;
    size: number;
    type: string;
    lastModified?: number;
  } | null>(null);
  const [showOutput, setShowOutput] = useState(false);
  const { user } = useAuth();

  // --- File tool state ---
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileMeta, setFileMeta] = useState<{
    name: string;
    size: string;
    type: string;
  } | null>(null);
  const [base64Output, setBase64Output] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [showEncodingOutput, setShowEncodingOutput] = useState(false);

  // --- Resolve current tool ---
  const currentTool = useMemo(
    () => getToolConfig(selectedTool),
    [selectedTool]
  );

  // --- Reset when switching tools ---
  const resetState = useCallback(() => {
    // text
    setInputText("");
    setOutputText("");
    setOutputBlob(null);
    setDownloadFilename(null);
    setOutputFileInfo(null);
    setShowOutput(false);
    // file
    setUploadedFiles([]);
    setFileMeta(null);
    setBase64Output("");
    setSelectedFormat("");
    setShowEncodingOutput(false);
  }, []);

  useEffect(() => {
    resetState();
  }, [selectedTool, resetState]);

  // --- Early return ---
  if (!selectedTool || !currentTool) return <Welcome />;

  // --- Grouped prop bundles (cleaner children) ---
  const textState = {
    inputText,
    setInputText,
    outputText,
    setOutputText,
    outputBlob,
    setOutputBlob,
    downloadFilename,
    setDownloadFilename,
    outputFileInfo,
    setOutputFileInfo,
    showOutput,
    setShowOutput,
  };

  const fileState = {
    uploadedFiles,
    setUploadedFiles,
    fileMeta,
    setFileMeta,
    base64Output,
    setBase64Output,
    selectedFormat,
    setSelectedFormat,
    showEncodingOutput,
    setShowEncodingOutput,
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6 min-h-full">
        {/* Tool Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1">
              {currentTool.name}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              Credits available: {user?.credits}
            </div>
          </div>
          <p className="text-muted-foreground">{currentTool.description}</p>
        </div>

        {/* Conditional Tool Body */}
        {currentTool.type === "text" && (
          <TextProcessor
            selectedTool={selectedTool}
            currentTool={currentTool}
            {...textState}
          />
        )}

        {currentTool.type === "file" && selectedTool === "ai-summarizer" && (
          <AISummarizer currentTool={currentTool} />
        )}

        {currentTool.type === "file" && selectedTool !== "ai-summarizer" && (
          <FileProcessor
            selectedTool={selectedTool}
            currentTool={currentTool}
            onFileProcess={onFileProcess}
            {...fileState}
          />
        )}
      </div>
    </div>
  );
}
