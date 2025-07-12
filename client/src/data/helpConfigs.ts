import {
  Rocket,
  RefreshCw,
  CreditCard,
  Code,
  Settings,
  HelpCircle,
} from "lucide-react";

export const quickHelpTopics = [
  {
    title: "Getting Started",
    icon: Rocket,
    description: "Learn the basics of FileForge",
  },
  {
    title: "File Conversion Issues",
    icon: RefreshCw,
    description: "Troubleshoot conversion problems",
  },
  {
    title: "Billing & Credits",
    icon: CreditCard,
    description: "Manage your subscription",
  },
  {
    title: "API Integration",
    icon: Code,
    description: "Integrate with your apps",
  },
  {
    title: "Account Settings",
    icon: Settings,
    description: "Customize your account",
  },
  {
    title: "Contact Support",
    icon: HelpCircle,
    description: "Get help from our team",
  },
];

export const helpCategories = [
  {
    title: "Getting Started",
    count: 12,
    articles: [
      "How to create an account",
      "Understanding the dashboard",
      "Your first file conversion",
      "Free vs Pro features",
      "Setting up your profile",
      "Mobile app usage",
      "Keyboard shortcuts guide",
    ],
  },
  {
    title: "File Processing",
    count: 18,
    articles: [
      "Supported file formats",
      "File size limitations",
      "Quality settings explained",
      "Batch processing guide",
      "Error troubleshooting",
      "Processing time optimization",
      "File security and privacy",
    ],
  },
  {
    title: "Encoding & Decoding",
    count: 15,
    articles: [
      "Base64 encoding explained",
      "When to use different encodings",
      "Encoding binary files",
      "Custom encoding options",
      "Hash functions guide",
      "Encoding best practices",
      "Common encoding errors",
    ],
  },
  {
    title: "Account & Billing",
    count: 10,
    articles: [
      "Managing your subscription",
      "Understanding credits",
      "Payment methods",
      "Billing cycle changes",
      "Refund policy",
      "Account deletion",
      "Plan comparisons",
    ],
  },
  {
    title: "API Documentation",
    count: 22,
    articles: [
      "API authentication",
      "Rate limiting",
      "Error codes reference",
      "SDK installation",
      "Webhook setup",
      "Best practices",
      "Code examples",
    ],
  },
  {
    title: "Troubleshooting",
    count: 14,
    articles: [
      "Common error messages",
      "Upload failures",
      "Processing stuck",
      "Download issues",
      "Browser compatibility",
      "Network problems",
      "Performance optimization",
    ],
  },
];

export const faqData = [
  {
    category: "General Questions",
    questions: [
      {
        question: "What file formats do you support?",
        answer:
          "FileForge supports over 200 file formats including PDF, DOCX, XLSX, images (JPG, PNG, GIF), videos (MP4, AVI, MOV), audio files (MP3, WAV, FLAC), and many more. Check our complete format list in the documentation.",
      },
      {
        question: "How secure is my data?",
        answer:
          "We use enterprise-grade encryption (AES-256) for all file transfers and storage. Files are automatically deleted after 24 hours, and we never access or share your content. All processing happens on secure servers with SOC 2 compliance.",
      },
      {
        question: "Can I use FileForge offline?",
        answer:
          "FileForge is a cloud-based service that requires an internet connection. However, our mobile app offers limited offline functionality for previously converted files and basic encoding operations.",
      },
      {
        question: "What's the difference between plans?",
        answer:
          "Free plan includes 10 conversions per month with basic features. Pro plan offers unlimited conversions, batch processing, API access, and priority support. Enterprise includes custom integrations and dedicated support.",
      },
    ],
  },
  {
    category: "Technical Questions",
    questions: [
      {
        question: "Why is my file conversion taking so long?",
        answer:
          "Processing time depends on file size, format complexity, and current server load. Large files (>100MB) or complex formats like video may take several minutes. Pro users get priority processing for faster results.",
      },
      {
        question: "What are the file size limits?",
        answer:
          "Free users can upload files up to 50MB. Pro users have a 500MB limit per file. Enterprise customers can request higher limits. For very large files, consider using our batch processing API.",
      },
      {
        question: "How do I integrate with my application?",
        answer:
          "Use our REST API or SDKs available for Python, JavaScript, PHP, and more. Start with our API documentation and authentication guide. We also provide webhook support for automated workflows.",
      },
      {
        question: "Can I automate file processing?",
        answer:
          "Yes! Use our API for automated processing, set up webhooks for real-time notifications, or integrate with tools like Zapier. Enterprise customers get access to custom automation workflows.",
      },
    ],
  },
  {
    category: "Billing Questions",
    questions: [
      {
        question: "How do credits work?",
        answer:
          "Credits are consumed based on file size and complexity. Simple conversions use 1 credit, while complex operations may use 2-5 credits. Credits reset monthly and unused credits don't roll over.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "We offer a 30-day money-back guarantee for Pro subscriptions. Enterprise contracts have custom refund terms. Contact support with your refund request and reason.",
      },
      {
        question: "How do I change my plan?",
        answer:
          "Upgrade or downgrade anytime from your account settings. Changes take effect immediately for upgrades, or at the next billing cycle for downgrades. Prorated billing applies.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise customers. All payments are processed securely through Stripe.",
      },
    ],
  },
];

export const videoTutorials = [
  {
    category: "Getting Started",
    count: 5,
    videos: [
      {
        title: "FileForge Overview",
        duration: "3:45",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
      {
        title: "Creating Your Account",
        duration: "2:30",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
      {
        title: "First File Conversion",
        duration: "4:15",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
    ],
  },
  {
    category: "Advanced Features",
    count: 8,
    videos: [
      {
        title: "Batch Processing",
        duration: "6:20",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
      {
        title: "Custom Quality Settings",
        duration: "5:10",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
      {
        title: "API Integration",
        duration: "8:45",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
    ],
  },
];
