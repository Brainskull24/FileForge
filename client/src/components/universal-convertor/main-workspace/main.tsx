"use client";
import { useState, useCallback, useEffect } from "react";
import { Badge } from "../../ui/badge";
import type { UserCredits } from "../main";
import { Info } from "lucide-react";
import { toolConfigs } from "../../../data/toolConfigs";
import { Welcome } from "../welcome-page";
import { TextProcessor } from "./text-processor";
import { FileProcessor } from "./file-processor";

interface MainWorkspaceProps {
  selectedTool: string | null;
  onFileProcess: (files: File[], operation: string) => void;
  userCredits: UserCredits;
}

export function MainWorkspace({
  selectedTool,
  onFileProcess,
  userCredits,
}: MainWorkspaceProps) {
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

  const currentTool = selectedTool
    ? toolConfigs[selectedTool as keyof typeof toolConfigs]
    : null;

  const resetState = useCallback(() => {
    setInputText("");
    setOutputText("");
    setOutputBlob(null);
    setDownloadFilename(null);
    setOutputFileInfo(null);
    setShowOutput(false);
  }, []);

  useEffect(() => {
    resetState();
  }, [selectedTool, resetState]);

  if (!selectedTool || !currentTool) {
    return <Welcome />;
  }

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
              Credits available: {userCredits.current}
            </div>
          </div>
          <p className="text-muted-foreground">{currentTool.description}</p>
        </div>

        {/* Text-based tools */}
        {currentTool.type === "text" && (
          <TextProcessor
            selectedTool={selectedTool}
            currentTool={currentTool}
            inputText={inputText}
            setInputText={setInputText}
            outputText={outputText}
            setOutputText={setOutputText}
            outputBlob={outputBlob}
            setOutputBlob={setOutputBlob}
            downloadFilename={downloadFilename}
            setDownloadFilename={setDownloadFilename}
            outputFileInfo={outputFileInfo}
            setOutputFileInfo={setOutputFileInfo}
            showOutput={showOutput}
            setShowOutput={setShowOutput}
          />
        )}

        {/* File-based tools */}
        {currentTool.type === "file" && (
          <FileProcessor
            selectedTool={selectedTool}
            currentTool={currentTool}
            onFileProcess={onFileProcess}
          />
        )}
      </div>
    </div>
  );
}
