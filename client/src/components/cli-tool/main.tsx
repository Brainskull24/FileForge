import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Copy,
  Download,
  Star,
  Github,
  Terminal,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Shield,
  Cpu,
  HardDrive,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CLIDocsPage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const router = useNavigate();
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const CodeBlock = ({
    children,
    copyable = true,
  }: {
    children: string;
    language?: string;
    copyable?: boolean;
  }) => (
    <div className="relative group">
      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono text-sm border border-gray-700">
        <code>{children}</code>
      </pre>
      {copyable && (
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-green-400"
          onClick={() => copyToClipboard(children)}
        >
          {copiedCommand === children ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}

      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          className="text-black"
          onClick={() => {
            router("/");
          }}
        >
          <ArrowLeft />
          Back to Home
        </Button>
      </div>
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            {/* ASCII Art Logo */}
            <div className="font-mono text-green-400 text-sm">
              <pre>{`
    ███████╗██╗██╗     ███████╗███████╗ ██████╗ ██████╗  ██████╗ ███████╗
    ██╔════╝██║██║     ██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
    █████╗  ██║██║     █████╗  █████╗  ██║   ██║██████╔╝██║  ███╗█████╗  
    ██╔══╝  ██║██║     ██╔══╝  ██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  
    ██║     ██║███████╗███████╗██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
    ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
              `}</pre>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-mono font-bold text-green-400">
                FileForge CLI
              </h1>
              <p className="text-gray-400 text-lg">
                Command-line interface for file processing and encoding
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Badge
                variant="secondary"
                className="bg-green-900 text-green-100 border-green-700"
              >
                v2.1.0
              </Badge>
              <Badge
                variant="outline"
                className="border-green-600 text-green-400"
              >
                Latest
              </Badge>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Star className="h-4 w-4" />
                <span>2.3k stars</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Download className="h-4 w-4" />
                <span>45k downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Installation Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Terminal className="h-6 w-6 text-green-400" />
            Installation
          </h2>

          <Tabs defaultValue="macos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800 border border-gray-700">
              <TabsTrigger
                value="macos"
                className="data-[state=active]:bg-green-900 data-[state=active]:text-green-100"
              >
                macOS
              </TabsTrigger>
              <TabsTrigger
                value="windows"
                className="data-[state=active]:bg-green-900 data-[state=active]:text-green-100"
              >
                Windows
              </TabsTrigger>
              <TabsTrigger
                value="linux"
                className="data-[state=active]:bg-green-900 data-[state=active]:text-green-100"
              >
                Linux
              </TabsTrigger>
            </TabsList>

            <TabsContent value="macos" className="space-y-4">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400">
                    macOS Installation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-300">
                      Homebrew (Recommended)
                    </h4>
                    <CodeBlock>
                      {`# Homebrew (Recommended)
brew install fileforge/tap/fileforge-cli`}
                    </CodeBlock>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-green-300">
                      Manual Download
                    </h4>
                    <CodeBlock>
                      {`# Manual Download
curl -L https://github.com/fileforge/cli/releases/latest/download/fileforge-macos.tar.gz | tar xz
sudo mv fileforge /usr/local/bin/`}
                    </CodeBlock>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="windows" className="space-y-4">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400">
                    Windows Installation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-300">
                      Chocolatey
                    </h4>
                    <CodeBlock language="powershell">
                      {`# Chocolatey
choco install fileforge-cli`}
                    </CodeBlock>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-green-300">Scoop</h4>
                    <CodeBlock language="powershell">
                      {`# Scoop
scoop bucket add fileforge https://github.com/fileforge/scoop-bucket
scoop install fileforge`}
                    </CodeBlock>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-green-300">
                      Manual Download
                    </h4>
                    <CodeBlock language="powershell">
                      {`# Manual Download
# Download fileforge-windows.exe from releases`}
                    </CodeBlock>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="linux" className="space-y-4">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400">
                    Linux Installation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-300">
                      Debian/Ubuntu
                    </h4>
                    <CodeBlock>
                      {`# Debian/Ubuntu
wget https://github.com/fileforge/cli/releases/latest/download/fileforge_linux_amd64.deb
sudo dpkg -i fileforge_linux_amd64.deb`}
                    </CodeBlock>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-green-300">
                      RPM-based (CentOS/RHEL/Fedora)
                    </h4>
                    <CodeBlock>
                      {`# RPM-based (CentOS/RHEL/Fedora)
wget https://github.com/fileforge/cli/releases/latest/download/fileforge_linux_amd64.rpm
sudo rpm -i fileforge_linux_amd64.rpm`}
                    </CodeBlock>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-green-300">
                      Binary Download
                    </h4>
                    <CodeBlock>
                      {`# Binary Download
curl -L https://github.com/fileforge/cli/releases/latest/download/fileforge-linux.tar.gz | tar xz
sudo mv fileforge /usr/local/bin/`}
                    </CodeBlock>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Quick Start Guide */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-green-400" />
            Quick Start Guide
          </h2>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <CodeBlock>
                {`# Authenticate with your API key
fileforge auth login

# Encode text to Base64
fileforge encode base64 "Hello World"

# Convert PDF to Word
fileforge convert document.pdf --to docx

# Batch process multiple files
fileforge batch convert *.jpg --to png --quality 90

# Create and run a workflow
fileforge workflow create pdf-to-images
fileforge workflow run pdf-to-images input.pdf`}
              </CodeBlock>
            </CardContent>
          </Card>
        </section>

        {/* Command Reference */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Terminal className="h-6 w-6 text-green-400" />
            Command Reference
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Authentication Commands */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Authentication Commands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`fileforge auth login              # Login with API key
fileforge auth logout             # Logout and clear credentials
fileforge auth status             # Show current authentication status
fileforge auth whoami             # Display current user info`}
                </CodeBlock>
              </CardContent>
            </Card>

            {/* Encoding Commands */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  Encoding Commands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`fileforge encode base64 <input>   # Encode to Base64
fileforge decode base64 <input>   # Decode from Base64
fileforge encode hex <input>      # Encode to hexadecimal
fileforge encode url <input>      # URL encode
fileforge hash md5 <input>        # Generate MD5 hash
fileforge hash sha256 <input>     # Generate SHA256 hash`}
                </CodeBlock>
              </CardContent>
            </Card>

            {/* File Conversion Commands */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <HardDrive className="h-5 w-5" />
                  File Conversion Commands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`fileforge convert <file> --to <format>     # Convert single file
fileforge convert <file> --to <format> --quality <1-100>
fileforge convert <file> --to <format> --output <path>`}
                </CodeBlock>
              </CardContent>
            </Card>

            {/* Batch Processing Commands */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">
                  Batch Processing Commands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`fileforge batch convert <pattern> --to <format>
fileforge batch encode <pattern> --type base64
fileforge batch --parallel <number>        # Set parallel processing
fileforge batch --progress                 # Show progress bar`}
                </CodeBlock>
              </CardContent>
            </Card>

            {/* Workflow Commands */}
            <Card className="bg-gray-900 border-gray-700 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-green-400">
                  Workflow Commands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`fileforge workflow list                    # List saved workflows
fileforge workflow create <name>           # Create new workflow
fileforge workflow edit <name>             # Edit existing workflow
fileforge workflow run <name> <input>      # Run workflow
fileforge workflow delete <name>           # Delete workflow`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Configuration */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Configuration</h2>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-green-400">
                Configuration File
              </CardTitle>
              <CardDescription className="text-gray-400">
                ~/.fileforge/config.yml
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="yaml">
                {`# ~/.fileforge/config.yml
api_key: "your-api-key-here"
default_output_dir: "./output"
parallel_jobs: 4
auto_cleanup: true
progress_bar: true

# Default conversion settings
defaults:
  image_quality: 85
  pdf_dpi: 300
  video_codec: "h264"`}
              </CodeBlock>
            </CardContent>
          </Card>
        </section>

        {/* Advanced Usage Examples */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Advanced Usage Examples</h2>

          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">
                  Batch Image Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`# Resize and convert all images in a directory
fileforge batch convert photos/*.jpg \\
  --to webp \\
  --resize 1920x1080 \\
  --quality 80 \\
  --output ./optimized/`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">
                  Document Processing Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`# Convert PDFs to images, then encode to Base64
fileforge workflow create pdf-pipeline
fileforge workflow add pdf-pipeline convert --to png --dpi 300
fileforge workflow add pdf-pipeline encode --type base64
fileforge workflow run pdf-pipeline documents/*.pdf`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">
                  Automated Backup Encoding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`# Encode sensitive files and upload to cloud
fileforge batch encode backups/*.txt --type base64 | \\
  fileforge upload --service s3 --bucket my-backups`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Integration Examples */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Integration Examples</h2>

          <Tabs defaultValue="github" className="w-full">
            <TabsList className="bg-gray-800 border border-gray-700">
              <TabsTrigger
                value="github"
                className="data-[state=active]:bg-green-900 data-[state=active]:text-green-100"
              >
                GitHub Actions
              </TabsTrigger>
              <TabsTrigger
                value="docker"
                className="data-[state=active]:bg-green-900 data-[state=active]:text-green-100"
              >
                Docker
              </TabsTrigger>
            </TabsList>

            <TabsContent value="github">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    GitHub Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock language="yaml">
                    {`name: Process Files
on: [push]
jobs:
  process:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install FileForge CLI
        run: |
          curl -L https://github.com/fileforge/cli/releases/latest/download/fileforge-linux.tar.gz | tar xz
          sudo mv fileforge /usr/local/bin/
      - name: Process files
        run: fileforge batch convert assets/*.png --to webp
        env:
          FILEFORGE_API_KEY: \${{ secrets.FILEFORGE_API_KEY }}`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="docker">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400">Docker Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock language="dockerfile">
                    {`FROM alpine:latest
RUN apk add --no-cache curl
RUN curl -L https://github.com/fileforge/cli/releases/latest/download/fileforge-linux.tar.gz | tar xz && \\
    mv fileforge /usr/local/bin/
COPY . /app
WORKDIR /app
CMD ["fileforge", "batch", "convert", "*.pdf", "--to", "png"]`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-green-400" />
            Troubleshooting
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Authentication Problems
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-300">
                <ul className="space-y-2">
                  <li>• Verify API key is correct</li>
                  <li>• Check network connectivity</li>
                  <li>
                    • Clear cached credentials:{" "}
                    <code className="bg-gray-800 px-1 rounded">
                      fileforge auth logout
                    </code>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  File Permission Errors
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-300">
                <ul className="space-y-2">
                  <li>• Run with sudo for system directories</li>
                  <li>• Check file ownership and permissions</li>
                  <li>
                    • Use{" "}
                    <code className="bg-gray-800 px-1 rounded">--output</code>{" "}
                    flag for custom paths
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Large File Processing
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-300">
                <ul className="space-y-2">
                  <li>
                    • Increase timeout:{" "}
                    <code className="bg-gray-800 px-1 rounded">
                      --timeout 300
                    </code>
                  </li>
                  <li>• Use streaming for large files</li>
                  <li>• Consider batch processing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Memory Usage Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-300">
                <ul className="space-y-2">
                  <li>
                    • Reduce parallel jobs:{" "}
                    <code className="bg-gray-800 px-1 rounded">
                      --parallel 2
                    </code>
                  </li>
                  <li>• Enable auto-cleanup in config</li>
                  <li>• Process files in smaller batches</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Download Links */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Download className="h-6 w-6 text-green-400" />
            Download Links
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">macOS</CardTitle>
                <CardDescription>Intel & Apple Silicon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download for macOS
                </Button>
                <p className="text-xs text-gray-400 font-mono">
                  SHA256: a1b2c3d4...
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">Windows</CardTitle>
                <CardDescription>x64 Architecture</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download for Windows
                </Button>
                <p className="text-xs text-gray-400 font-mono">
                  SHA256: e5f6g7h8...
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">Linux</CardTitle>
                <CardDescription>x64 Architecture</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download for Linux
                </Button>
                <p className="text-xs text-gray-400 font-mono">
                  SHA256: i9j0k1l2...
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex gap-4 justify-center">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <Github className="h-4 w-4 mr-2" />
              View on GitHub
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <Info className="h-4 w-4 mr-2" />
              Release Notes
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              Previous Versions
            </Button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p>© 2024 FileForge CLI. Open source under MIT License.</p>
            <p className="mt-2">
              Need help? Visit our{" "}
              <a href="#" className="text-green-400 hover:underline">
                documentation
              </a>{" "}
              or{" "}
              <a href="#" className="text-green-400 hover:underline">
                open an issue
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
