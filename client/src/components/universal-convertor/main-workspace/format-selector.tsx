"use client";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Output Format</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* PDF Conversion */}
          {selectedTool === "pdf-conversion" && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Convert TO PDF
                </Label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {currentTool.formats.toPdf?.map((format: string) => (
                    <Button
                      key={format}
                      variant={
                        selectedFormat === `to-pdf-${format}`
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedFormat(`to-pdf-${format}`)}
                    >
                      {format} → PDF
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Word Conversion */}
          {selectedTool === "word-conversion" && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Convert TO Word
                </Label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {currentTool.formats.toWord?.map((format: string) => (
                    <Button
                      key={format}
                      variant={
                        selectedFormat === `to-word-${format}`
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedFormat(`to-word-${format}`)}
                    >
                      {format} → Word
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Excel Conversion */}
          {selectedTool === "excel-conversion" && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Convert TO Excel
                </Label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {currentTool.formats.toExcel?.map((format: string) => (
                    <Button
                      key={format}
                      variant={
                        selectedFormat === `to-excel-${format}`
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedFormat(`to-excel-${format}`)}
                    >
                      {format} → Excel
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other conversion tools */}
          {currentTool.formats.supported && (
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Select Output Format
              </Label>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {currentTool.formats.supported.map((format: string) => (
                  <Button
                    key={format}
                    variant={selectedFormat === format ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFormat(format)}
                  >
                    {format}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
