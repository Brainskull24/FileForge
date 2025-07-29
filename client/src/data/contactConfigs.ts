import type { LucideIcon } from "lucide-react";
import { MessageCircle, Mail, Phone, Users } from "lucide-react";
export type BadgeVariant = "default" | "destructive";

export interface SupportChannel {
  icon: LucideIcon;
  title: string;
  availability: string;
  responseTime: string;
  bestFor: string;
  languages: string;
  status: "online" | "available" | "unavailable" | "pro-only";
  action: string;
}

export const supportChannels: SupportChannel[] = [
  {
    icon: MessageCircle,
    title: "Live Chat Support",
    availability: "Monday-Friday, 9 AM - 6 PM IST",
    responseTime: "Immediate during business hours",
    bestFor: "Quick questions, technical issues, account help",
    languages: "English, Spanish (more coming soon)",
    status: "online",
    action: "Start Chat",
  },
  {
    icon: Mail,
    title: "Email Support",
    availability: "support@fileforge.com",
    responseTime: "Within 4 hours (business days)",
    bestFor: "Detailed questions, feature requests, billing issues",
    languages: "Automatic ticket numbers and status updates",
    status: "available",
    action: "Send Email",
  },
  {
    icon: Phone,
    title: "Phone Support",
    availability: "Monday-Friday, 9 AM - 5 PM EST",
    responseTime: "+1 (555) 123-4567",
    bestFor: "Urgent issues, complex technical problems",
    languages: "Pro/Enterprise only",
    status: "pro-only",
    action: "Call Now",
  },
  {
    icon: Users,
    title: "Community Forum",
    availability: "Community-driven support",
    responseTime: "Varies (community + staff moderation)",
    bestFor: "General questions, feature discussions, tips",
    languages: "Free for all users",
    status: "available",
    action: "Visit Forum",
  },
];

export const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Support Lead",
    avatar: "/placeholder.svg?height=80&width=80",
    specialties: ["API integration", "Technical troubleshooting"],
    languages: ["English", "Mandarin"],
    bio: "10+ years in technical support with expertise in API integrations and complex troubleshooting.",
  },
  {
    name: "Mike Rodriguez",
    role: "Solutions Engineer",
    avatar: "/placeholder.svg?height=80&width=80",
    specialties: ["Enterprise workflows", "Custom integrations"],
    languages: ["English", "Spanish"],
    bio: "Specializes in enterprise solutions and custom workflow implementations.",
  },
  {
    name: "Alex Kim",
    role: "Developer Advocate",
    avatar: "/placeholder.svg?height=80&width=80",
    specialties: ["API documentation", "SDK support"],
    languages: ["English", "Korean"],
    bio: "Developer advocate focused on API documentation and community engagement.",
  },
];
