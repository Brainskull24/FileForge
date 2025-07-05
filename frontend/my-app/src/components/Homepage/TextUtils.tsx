import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { X, ArrowRight, ClipboardCopy } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useNavigate } from "react-router-dom";

const TextUtils = () => {
  const [demoInput, setDemoInput] = useState("");
  const [demoOutput, setDemoOutput] = useState("");
  const [demoDecodeInput, setDemoDecodeInput] = useState("");
  const [demoDecodeOutput, setDemoDecodeOutput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (demoInput) {
      setDemoOutput(btoa(demoInput));
    } else {
      setDemoOutput("");
    }
  }, [demoInput]);

  useEffect(() => {
    if (demoDecodeInput) {
      try {
        setDemoDecodeOutput(atob(demoDecodeInput));
      } catch (error) {
        setDemoDecodeOutput("Invalid Base64 string");
      }
    } else {
      setDemoDecodeOutput("");
    }
  }, [demoDecodeInput]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Try It Now</h2>
          <p className="text-gray-600">
            See our Base64 encoder and decoder in action
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-lg">Base64 Encoder</CardTitle>
              <CardDescription>
                Enter text to see real-time encoding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Textarea
                  className="h-24 pr-20"
                  placeholder="Try encoding this text..."
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                />
                {demoInput && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => setDemoInput("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="relative bg-gray-100 p-3 rounded-md min-h-[60px]">
                <p className="text-sm text-gray-600 mb-1">Encoded Output:</p>
                <p className="font-mono text-sm break-all">
                  {demoOutput || "Encoded text will appear here..."}
                </p>
                {demoOutput && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => navigator.clipboard.writeText(demoOutput)}
                  >
                    <ClipboardCopy className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => navigate("/convertor")}
              >
                See Full Tool <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Decoder Card */}
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-lg">Base64 Decoder</CardTitle>
              <CardDescription>
                Enter Base64 text to decode it in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Textarea
                  className="h-24 pr-20"
                  placeholder="Paste Base64 string here..."
                  value={demoDecodeInput}
                  onChange={(e) => setDemoDecodeInput(e.target.value)}
                />
                {demoDecodeInput && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => setDemoDecodeInput("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="relative bg-gray-100 p-3 rounded-md min-h-[60px]">
                <p className="text-sm text-gray-600 mb-1">Decoded Output:</p>
                <p className="font-mono text-sm break-all">
                  {demoDecodeOutput || "Decoded text will appear here..."}
                </p>
                {demoDecodeOutput && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      navigator.clipboard.writeText(demoDecodeOutput)
                    }
                  >
                    <ClipboardCopy className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => navigate("/convertor")}
              >
                See Full Tool <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TextUtils;
