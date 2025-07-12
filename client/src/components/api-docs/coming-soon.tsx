import { ComingSoon } from "../coming-soon/main";
import { FileText } from "lucide-react";

export default function APIDocsComingSoon() {
  return (
    <>
      <ComingSoon
        title="Enhanced API Docs"
        subtitle="Interactive Documentation"
        description="Next-generation API documentation with interactive examples, live testing, and comprehensive guides. Everything you need to integrate Universal Converter into your applications."
        expectedDate="February 2026"
        icon={
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <FileText className=" text-white" />
          </div>
        }
        gradient="from-blue-600 to-indigo-600"
        features={[
          "Interactive API explorer",
          "Live code examples",
          "Multiple language SDKs",
          "Comprehensive tutorials",
          "Real-time testing interface",
          "Authentication playground",
          "Response schema validation",
          "Community examples gallery",
        ]}
      />
    </>
  );
}
