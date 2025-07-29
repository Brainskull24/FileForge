"use client";

import { useCallback } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { FileUploadArea } from "./file-upload-area";
import { FormatSelector } from "./format-selector";
import { UploadedFilesList } from "./uploaded-files-list";
import { Play, Copy, Download } from "lucide-react";
import { FileEncodingLogic } from "./file-encoding";
import { Textarea } from "../../ui/textarea";

interface FileProcessorProps {
  selectedTool: string;
  currentTool: any;
  onFileProcess: (files: File[], operation: string) => void;
  uploadedFiles: File[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  fileMeta: { name: string; size: string; type: string } | null;
  setFileMeta: React.Dispatch<
    React.SetStateAction<{ name: string; size: string; type: string } | null>
  >;
  base64Output: string;
  setBase64Output: React.Dispatch<React.SetStateAction<string>>;
  selectedFormat: string;
  setSelectedFormat: React.Dispatch<React.SetStateAction<string>>;
  showEncodingOutput: boolean;
  setShowEncodingOutput: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FileProcessor({
  selectedTool,
  currentTool,
  onFileProcess,
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
}: FileProcessorProps) {
  const handleFiles = useCallback(
    (files: File[]) => {
      const file = files[0]; // Only 1 file allowed
      setUploadedFiles([file]);
    },
    [setUploadedFiles]
  );

  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileProcess = () => {
    if (uploadedFiles.length === 0) return;

    const file = uploadedFiles[0];

    // Encoding tools (special local processing)
    const encodingTools = [
      "file-to-base64",
      "image-to-base64",
      "pdf-to-base64",
      "file-to-base32",
      "file-to-hex",
      "file-to-binary",
    ];

    if (encodingTools.includes(selectedTool)) {
      // Local encoding logic
      FileEncodingLogic.encodeFiles([file], selectedTool)
        .then((result: string) => {
          const lines = result.split("\n");
          const cleanStart = lines.findIndex((l) => l === "Clean Base64:");
          const cleanBase64 =
            cleanStart !== -1
              ? lines.slice(cleanStart + 1).join("\n")
              : "";

          setFileMeta({
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type || "unknown",
          });

          setBase64Output(cleanBase64);
          setShowEncodingOutput(true);
        })
        .catch((error: { message: any }) => {
          setBase64Output(`Error: ${error.message}`);
          setFileMeta(null);
          setShowEncodingOutput(true);
        });
    } else {
      const operation =
        selectedFormat || currentTool?.formats?.supported?.[0]?.id || "process";

      onFileProcess([file], operation);
    }
  };

  return (
    <div className="space-y-6">
      <FileUploadArea currentTool={currentTool} onFilesSelected={handleFiles} />

      {currentTool.formats && (
        <FormatSelector
          selectedTool={selectedTool}
          currentTool={currentTool}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
        />
      )}

      <Button
        onClick={handleFileProcess}
        disabled={currentTool.formats && !selectedFormat}
        className="w-full"
      >
        <Play className="h-4 w-4 mr-2" />
        {currentTool.formats ? "Convert File" : "Process File"}
      </Button>

      {showEncodingOutput && (
        <Card>
          <CardHeader>
            <CardTitle>Encoded Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fileMeta && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>File Name:</strong>
                  <p className="text-muted-foreground truncate max-w-[200px]">
                    {fileMeta.name}
                  </p>
                </div>
                <div>
                  <strong>File Size:</strong>
                  <p className="text-muted-foreground">{fileMeta.size}</p>
                </div>
                <div>
                  <strong>File Type:</strong>
                  <p className="text-muted-foreground">{fileMeta.type}</p>
                </div>
              </div>
            )}

            <Textarea
              value={base64Output}
              readOnly
              className="min-h-[200px] font-mono resize-none"
              placeholder="Clean Base64 will appear here..."
            />

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText(base64Output)}
                disabled={!base64Output}
                className="flex-1"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const blob = new Blob([base64Output], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "encoded-output.txt";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                disabled={!base64Output}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {uploadedFiles.length > 0 && (
        <UploadedFilesList
          uploadedFiles={uploadedFiles.map((file) => ({ file }))}
          onRemoveFile={() => setUploadedFiles([])}
        />
      )}
    </div>
  );
}
