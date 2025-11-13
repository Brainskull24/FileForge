import { useState, useCallback } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { FileUploadArea } from "./file-upload-area";
import { UploadedFilesList } from "./uploaded-files-list";
import { Loader2, Sparkles, Copy, Download, FileText } from "lucide-react";
import { Textarea } from "../../ui/textarea";
import { toast } from "sonner";
import api from "../../../lib/axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface AISummarizerProps {
  currentTool: any;
}

export function AISummarizer({ currentTool }: AISummarizerProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [summary, setSummary] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleFiles = useCallback((files: File[]) => {
    setUploadedFiles(files);
    setShowResults(false);
    setExtractedText("");
    setSummary("");
  }, []);

  const extractTextFromFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Determine the conversion operation based on file type
      let operation = "";
      if (file.type === "application/pdf") {
        operation = "pdf-to-text";
      } else if (
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        operation = "word-to-text";
      } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        // For text files, just read directly
        return await file.text();
      } else if (
        file.type === "text/markdown" ||
        file.name.endsWith(".md")
      ) {
        operation = "markdown-to-plaintext";
      } else {
        throw new Error("Unsupported file type");
      }

      const { data } = await api.post(
        `/file-conversion/${operation}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
        }
      );

      // Convert blob to text
      const text = await data.text();
      return text;
    } catch (error: any) {
      throw new Error(`Failed to extract text: ${error.message}`);
    }
  };

  const generateSummary = async (text: string): Promise<string> => {
    try {
      const apiKey = "AIzaSyABXBmAeY5TT8B6l13KtO0rcEfx8aRhj44";
      if (!apiKey) {
        throw new Error("Gemini API key not configured");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Summarize the following text in a single short paragraph.
      - No headings
      - No lists
      - No markdown
      - Keep the summary concise and easy to read.

      Text:
      ${text}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      throw new Error(`Failed to generate summary: ${error.message}`);
    }
  };

  const handleSummarize = async () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please upload a file first");
      return;
    }

    setIsProcessing(true);
    setShowResults(false);

    try {
      const file = uploadedFiles[0]; // Process first file only
      toast.info("Extracting text from document...");

      // Step 1: Extract text from file
      const text = await extractTextFromFile(file);
      setExtractedText(text);

      if (!text || text.trim().length === 0) {
        throw new Error("No text could be extracted from the file");
      }

      toast.info("Generating AI summary...");

      // Step 2: Generate summary using Gemini
      const summaryText = await generateSummary(text);
      setSummary(summaryText);
      setShowResults(true);

      toast.success("Summary generated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to process file");
      console.error("Summarization error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleDownload = (text: string, filename: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully");
  };

  return (
    <div className="space-y-6">
      <FileUploadArea currentTool={currentTool} onFilesSelected={handleFiles} />

      <Button
        onClick={handleSummarize}
        disabled={uploadedFiles.length === 0 || isProcessing}
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            Generate AI Summary
          </>
        )}
      </Button>

      {uploadedFiles.length > 0 && (
        <UploadedFilesList
          uploadedFiles={uploadedFiles.map((file) => ({ file }))}
          onRemoveFile={(index) =>
            setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
          }
        />
      )}

      {showResults && (
        <div className="space-y-4">
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                AI-Generated Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={summary}
                readOnly
                className="min-h-[300px] resize-none"
                placeholder="Summary will appear here..."
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleCopy(summary, "Summary")}
                  disabled={!summary}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Summary
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    handleDownload(
                      summary,
                      `summary-${uploadedFiles[0]?.name || "document"}.txt`
                    )
                  }
                  disabled={!summary}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Summary
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Extracted Text Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Extracted Text
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={extractedText}
                readOnly
                className="min-h-[200px] font-mono text-sm resize-none"
                placeholder="Extracted text will appear here..."
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleCopy(extractedText, "Text")}
                  disabled={!extractedText}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Text
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    handleDownload(
                      extractedText,
                      `extracted-${uploadedFiles[0]?.name || "document"}.txt`
                    )
                  }
                  disabled={!extractedText}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Text
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
