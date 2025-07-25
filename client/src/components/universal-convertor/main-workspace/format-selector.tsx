"use client";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";

interface FormatOption {
  id: string;
  label: string;
}

interface FormatSelectorProps {
  selectedTool: string;
  currentTool: any;
  selectedFormat: string;
  setSelectedFormat: (format: string) => void;
}

export function FormatSelector({
  selectedTool,
  currentTool,
  selectedFormat,
  setSelectedFormat,
}: FormatSelectorProps) {
  const renderFormatButtons = (
    title: string,
    formats: FormatOption[] | undefined,
    prefixLabel: string
  ) => {
    if (!formats || formats.length === 0) return null;

    return (
      <div className="space-y-4">
        <Label className="text-sm font-medium mb-2 block">{title}</Label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {formats.map((format) => (
            <Button
              key={format.id}
              variant={selectedFormat === format.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFormat(format.id)}
            >
              {prefixLabel} → {format.label}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Output Format</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {selectedTool === "pdf-conversion" &&
            renderFormatButtons(
              "Convert From PDF",
              currentTool.formats.fromPdf,
              "PDF"
            )}

          {selectedTool === "word-conversion" &&
            renderFormatButtons(
              "Convert From Word",
              currentTool.formats.fromWord,
              "Word"
            )}

          {selectedTool === "excel-conversion" &&
            renderFormatButtons(
              "Convert From Excel",
              currentTool.formats.fromExcel,
              "Excel"
            )}

{selectedTool === "markdown-conversion" &&
            renderFormatButtons(
              "Convert From Markdown",
              currentTool.formats.fromMarkdown,
              "Markdown"
            )}

{selectedTool === "image-conversion" &&
            renderFormatButtons(
              "Convert From Image",
              currentTool.formats.fromImage,
              "Image"
            )}

{selectedTool === "html-conversion" &&
            renderFormatButtons(
              "Convert From HTML",
              currentTool.formats.fromHTML,
              "HTML"
            )}

        </div>
      </CardContent>
    </Card>
  );
}
