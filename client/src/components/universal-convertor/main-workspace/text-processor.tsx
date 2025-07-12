"use client";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import { Play } from "lucide-react";
import { TextProcessingLogic } from "./text-processing";
import { OutputDisplay } from "./output-display";

interface TextProcessorProps {
  selectedTool: string;
  currentTool: any;
  inputText: string;
  setInputText: (text: string) => void;
  outputText: string;
  setOutputText: (text: string) => void;
  outputBlob: Blob | null;
  setOutputBlob: (blob: Blob | null) => void;
  downloadFilename: string | null;
  setDownloadFilename: (filename: string | null) => void;
  outputFileInfo: any;
  setOutputFileInfo: (info: any) => void;
  showOutput: boolean;
  setShowOutput: (show: boolean) => void;
}

export function TextProcessor({
  selectedTool,
  currentTool,
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
}: TextProcessorProps) {
  const handleTextProcess = async () => {
    if (!inputText.trim() || !selectedTool) return;

    // Reset outputs
    setOutputText("");
    setOutputBlob(null);
    setDownloadFilename(null);
    setOutputFileInfo(null);

    const result = await TextProcessingLogic.processText(selectedTool, inputText);

    if (result.type === "text") {
      setOutputText(result.content!);
    } else if (result.type === "file") {
      setOutputBlob(result.blob!);
      setDownloadFilename(result.filename!);
      setOutputFileInfo({
        name: result.filename,
        size: result.blob!.size,
        type: result.blob!.type,
        lastModified: Date.now(),
      });
    }

    setShowOutput(true);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-1">
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          <div className="relative">
            <Textarea
              placeholder={currentTool.placeholder ?? undefined}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="h-[160px] font-mono pr-10 resize-none"
            />
            {inputText && (
              <button
                onClick={() => setInputText("")}
                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition"
                aria-label="Clear input"
              >
                ✕
              </button>
            )}
            <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
              {inputText.length} characters
            </div>
          </div>
          <Button
            onClick={handleTextProcess}
            className="w-full"
            disabled={!inputText.trim()}
          >
            <Play className="h-4 w-4 mr-2" />
            Process
          </Button>
        </CardContent>
      </Card>

      {showOutput && (
        <OutputDisplay
          outputText={outputText}
          outputBlob={outputBlob}
          downloadFilename={downloadFilename}
          outputFileInfo={outputFileInfo}
        />
      )}
    </div>
  );
}
