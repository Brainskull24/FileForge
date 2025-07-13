"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Upload } from "lucide-react";

interface FileUploadAreaProps {
  currentTool: any;
  onFilesSelected: (files: File[]) => void;
}

export function FileUploadArea({
  currentTool,
  onFilesSelected,
}: FileUploadAreaProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const files = Array.from(e.dataTransfer.files);
      onFilesSelected(files);
    },
    [onFilesSelected]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`relative flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Drop files here or click to browse
          </p>
          <input
            type="file"
            multiple={false}
            accept={
              "fileTypes" in currentTool && currentTool.fileTypes
                ? currentTool.fileTypes.join(",")
                : undefined
            }
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) =>
              e.target.files && onFilesSelected(Array.from(e.target.files))
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
