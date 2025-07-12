import { ComingSoon } from "../coming-soon/main";

export default function CLIPage() {
  return (
    <ComingSoon
      title="CLI Tool"
      subtitle="Command Line Interface"
      description="A powerful command-line interface for Universal Converter. Convert files, encode data, and automate workflows directly from your terminal with our intuitive CLI tool."
      expectedDate="July 2026"
      gradient="from-green-600 to-teal-600"
      features={[
        "Convert files from command line",
        "Batch processing with glob patterns",
        "Pipeline integration support",
        "Progress bars and detailed output",
        "Configuration file support",
        "Cross-platform compatibility",
        "Auto-completion for commands",
        "Integration with CI/CD workflows",
      ]}
    />
  );
}
