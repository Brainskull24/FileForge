import { FileText, Code, Upload, Zap, Cloud, Shield } from "lucide-react";
import { TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type BadgeVariant = "default" | "destructive";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: {
    text: string;
    variant: BadgeVariant;
  };
}

export const features: FeatureItem[] = [
  {
    icon: Code,
    title: "Universal Encoding",
    description: "Base64, Hex, Binary, URL encoding and more formats supported",
  },
  {
    icon: FileText,
    title: "File Conversion",
    description: "Convert between PDF, Word, Images, and 100+ file formats",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Secure cloud storage with automatic backups and sync",
    badge: { text: "Pro", variant: "default" },
  },
  {
    icon: Upload,
    title: "Batch Processing",
    description: "Process multiple files simultaneously with drag & drop",
    badge: { text: "Pro", variant: "default" },
  },
  {
    icon: Zap,
    title: "API Integration",
    description: "RESTful API for seamless integration into your applications",
    badge: { text: "Enterprise", variant: "destructive" },
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "End-to-end encryption with zero-knowledge architecture",
  },
];

export const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    features: ["5 files/day", "Basic encoding", "Community support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    features: [
      "Unlimited files",
      "All formats",
      "Priority support",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Custom integrations",
      "SLA guarantee",
      "Dedicated support",
      "On-premise",
    ],
    popular: false,
  },
];

export const stats = [
  {
    value: 500,
    label: "Active Developers",
    suffix: "+",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: 2.5,
    label: "Files Converted Daily",
    suffix: "k+",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-500",
  },
  {
    value: 99.9,
    label: "Uptime Guarantee",
    suffix: "%",
    icon: Zap,
    color: "from-green-500 to-emerald-500",
  },
];
