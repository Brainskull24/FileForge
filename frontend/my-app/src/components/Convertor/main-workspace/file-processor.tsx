"use client";

import { useState, useCallback, type SetStateAction } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { Slider } from "../../ui/slider";
import { Checkbox } from "../../ui/checkbox";
import { FileUploadArea } from "./file-upload-area";
import { FormatSelector } from "./format-selector";
import { UploadedFilesList } from "./uploaded-files-list";
import { Play, Copy, Download } from "lucide-react";
import { FileEncodingLogic } from "./file-encoding";
import { Textarea } from "../../ui/textarea";

interface UploadedFile {
  file: File;
  preview?: string;
}

interface FileProcessorProps {
  selectedTool: string;
  currentTool: any;
  onFileProcess: (files: File[], operation: string) => void;
}

export function FileProcessor({
  selectedTool,
  currentTool,
  onFileProcess,
}: FileProcessorProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFormat, setSelectedFormat] = useState("");
  const [processingOptions, setProcessingOptions] = useState({
    quality: [80],
    maintainAspectRatio: true,
    removeMetadata: false,
  });

  const [encodingOutput, setEncodingOutput] = useState<string>("");
  const [showEncodingOutput, setShowEncodingOutput] = useState(false);

  const handleFiles = useCallback((files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => {
      const uploadedFile: UploadedFile = { file };

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedFile.preview = e.target?.result as string;
          setUploadedFiles((prev) => [...prev]);
        };
        reader.readAsDataURL(file);
      }
      return uploadedFile;
    });

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleFileProcess = () => {
    if (uploadedFiles.length === 0) return;

    const files = uploadedFiles.map((uf) => uf.file);

    // Check if this is an encoding tool (file to text conversion)
    const encodingTools = [
      "file-to-base64",
      "image-to-base64",
      "pdf-to-base64",
      "file-to-base32",
      "file-to-hex",
      "file-to-binary",
    ];

    if (encodingTools.includes(selectedTool)) {
      // Handle encoding (file to text)
      FileEncodingLogic.encodeFiles(files, selectedTool)
        .then((result: SetStateAction<string>) => {
          setEncodingOutput(result);
          setShowEncodingOutput(true);
        })
        .catch((error: { message: any }) => {
          setEncodingOutput(`Error: ${error.message}`);
          setShowEncodingOutput(true);
        });
    } else {
      // Handle regular file processing (file to file)
      const operation = selectedFormat
        ? `Convert to ${selectedFormat}`
        : currentTool?.name || "Process";
      onFileProcess(files, operation);
    }

    setUploadedFiles([]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <FileUploadArea currentTool={currentTool} onFilesSelected={handleFiles} />

      {/* Format Selection */}
      {currentTool.formats && (
        <FormatSelector
          selectedTool={selectedTool}
          currentTool={currentTool}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
        />
      )}

      {/* Processing Options */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Processing Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(selectedTool?.includes("image") ||
              selectedTool?.includes("video")) && (
              <div>
                <Label>Quality: {processingOptions.quality[0]}%</Label>
                <Slider
                  value={processingOptions.quality}
                  onValueChange={(value) =>
                    setProcessingOptions({
                      ...processingOptions,
                      quality: value,
                    })
                  }
                  max={100}
                  min={10}
                  step={10}
                  className="w-full"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="aspect-ratio"
                checked={processingOptions.maintainAspectRatio}
                onCheckedChange={(checked) =>
                  setProcessingOptions({
                    ...processingOptions,
                    maintainAspectRatio: checked as boolean,
                  })
                }
              />
              <Label htmlFor="aspect-ratio">Maintain aspect ratio</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="metadata"
                checked={processingOptions.removeMetadata}
                onCheckedChange={(checked) =>
                  setProcessingOptions({
                    ...processingOptions,
                    removeMetadata: checked as boolean,
                  })
                }
              />
              <Label htmlFor="metadata">Remove metadata</Label>
            </div>

            <Button
              onClick={handleFileProcess}
              disabled={currentTool.formats && !selectedFormat}
              className="w-full"
            >
              <Play className="h-4 w-4 mr-2" />
              {currentTool.formats ? "Convert Files" : "Process Files"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Encoding Output */}
      {showEncodingOutput && (
        <Card>
          <CardHeader>
            <CardTitle>Encoded Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={encodingOutput}
              readOnly
              className="min-h-[200px] font-mono resize-none"
              placeholder="Encoded output will appear here..."
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText(encodingOutput)}
                disabled={!encodingOutput}
                className="flex-1"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const blob = new Blob([encodingOutput], {
                    type: "text/plain",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `encoded-output.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                disabled={!encodingOutput}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <UploadedFilesList
          uploadedFiles={uploadedFiles}
          onRemoveFile={removeFile}
        />
      )}
    </div>
  );
}
