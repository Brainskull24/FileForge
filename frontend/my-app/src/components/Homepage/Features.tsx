import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { FileText, Code, Upload, Zap, Cloud, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Universal Encoding",
      description:
        "Base64, Hex, Binary, URL encoding and more formats supported",
      badge: { text: "Free", variant: "secondary" as const },
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "File Conversion",
      description: "Convert between PDF, Word, Images, and 100+ file formats",
      badge: { text: "Free", variant: "secondary" as const },
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Storage",
      description: "Secure cloud storage with automatic backups and sync",
      badge: { text: "Account", variant: "secondary" as const },
    },
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Batch Processing",
      description: "Process multiple files simultaneously with drag & drop",
      badge: { text: "Pro", variant: "default" as const },
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "API Integration",
      description:
        "RESTful API for seamless integration into your applications",
      badge: { text: "Enterprise", variant: "destructive" as const },
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy First",
      description: "End-to-end encryption with zero-knowledge architecture",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for file processing and encoding in one platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow relative"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-blue-600">{feature.icon}</div>
                  {feature.badge && (
                    <Badge variant={feature.badge.variant} className="text-xs">
                      {feature.badge.text}
                    </Badge>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
