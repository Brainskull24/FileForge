import { Card } from "../ui/card";
import { Upload, Play, Download, Sparkles } from "lucide-react";

export const Welcome = () => {
  return (
    <div className="flex-1 p-6">
      <div className="flex h-full flex-col items-center justify-center space-y-6">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Welcome to Universal Converter</h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Choose a tool from the sidebar to start converting your files or
            text. It's simple, fast, and works for everyone!
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-4xl">
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Upload className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Easy Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drag & drop files or paste text
            </p>
          </Card>

          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Play className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">One-Click Process</h3>
            <p className="text-sm text-muted-foreground">
              Convert with a single click
            </p>
          </Card>

          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Download className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Instant Download</h3>
            <p className="text-sm text-muted-foreground">
              Get your files immediately
            </p>
          </Card>

          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">High Quality</h3>
            <p className="text-sm text-muted-foreground">
              Professional results every time
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
