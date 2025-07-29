import type React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import {
  Clock,
  Globe,
  CheckCircle,
  Upload,
  Zap,
  Building,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { supportChannels } from "../../data/contactConfigs";
import { toast } from "sonner";
import api from "../../lib/axios";

export default function ContactSupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    accountType: "",
    category: "",
    priority: "",
    subject: "",
    description: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      // Append uploaded files
      uploadedFiles.forEach((file) => {
        form.append("attachments", file); // Backend should accept `attachments[]`
      });

      await api.post("/support/contact-form", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Support request submitted successfully!");
      setFormData({
        name: "",
        email: "",
        accountType: "",
        category: "",
        priority: "",
        subject: "",
        description: "",
      });
      setUploadedFiles([]);
    } catch (error) {
      toast.error("Failed to submit support request. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800";
      case "available":
        return "bg-blue-100 text-blue-800";
      case "pro-only":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Contact & Support
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Get help when you need it - we're here to support your success
            </p>
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <Clock className="h-5 w-5" />
              <span className="font-medium">
                Average response time: 4 hours (business days)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Support Channel Overview */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Choose Your Support Channel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportChannels.map((channel, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-blue-600">
                      <channel.icon className="w-8 h-8" />
                    </div>
                    <Badge className={getStatusColor(channel.status)}>
                      {channel.status === "online"
                        ? "Online"
                        : channel.status === "pro-only"
                        ? "Pro/Enterprise"
                        : "Available"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{channel.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">Availability:</p>
                        <p className="text-gray-600">{channel.availability}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Zap className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">Response Time:</p>
                        <p className="text-gray-600">{channel.responseTime}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">Best For:</p>
                        <p className="text-gray-600">{channel.bestFor}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Globe className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">Languages/Features:</p>
                        <p className="text-gray-600">{channel.languages}</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4"
                    variant={
                      channel.status === "pro-only" ? "outline" : "default"
                    }
                    disabled={
                      channel.action !== "Send Email" &&
                      channel.action !== "Visit Forum"
                    }
                    onClick={() => {
                      if (channel.action === "Send Email") {
                        window.open("mailto:support@fileforge.com");
                      } else if (channel.action === "Visit Forum") {
                        window.open(
                          "https://discord.gg/YOUR_COMMUNITY_LINK",
                          "_blank"
                        );
                      }
                    }}
                  >
                    {["Send Email", "Visit Forum"].includes(channel.action)
                      ? channel.action
                      : "Coming Soon"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Support Request Form</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as
                possible
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select
                    value={formData.accountType}
                    onValueChange={(value) =>
                      handleInputChange("accountType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="not-customer">
                        Not a customer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Issue Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="account">Account Access</SelectItem>
                      <SelectItem value="api">API/Integration Help</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      handleInputChange("priority", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (General inquiry)</SelectItem>
                      <SelectItem value="medium">
                        Medium (Non-urgent issue)
                      </SelectItem>
                      <SelectItem value="high">
                        High (Service impacting)
                      </SelectItem>
                      <SelectItem value="urgent">
                        Urgent (Service down/critical)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    placeholder="Brief description of your issue"
                    maxLength={100}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    {formData.subject.length}/100 characters
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Please provide detailed information about your issue..."
                  rows={6}
                  maxLength={2000}
                  required
                />
                <p className="text-xs text-gray-500">
                  {formData.description.length}/2000 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop files here, or click to select
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.txt,.log"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    Choose Files
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported: JPG, PNG, GIF, PDF, TXT, LOG (max 10MB each)
                  </p>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span className="text-sm">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setUploadedFiles((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button className="w-full" size="lg" onClick={handleSubmit}>
                Submit Support Request
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Contact Information */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">FileForge Technologies Inc.</p>
                    <p className="text-gray-600">
                      123 Innovation Drive, Suite 400
                    </p>
                    <p className="text-gray-600">San Francisco, CA 94105</p>
                    <p className="text-gray-600">United States</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">Business Hours:</p>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM EST
                    </p>
                    <p className="text-gray-600">
                      Saturday: 10:00 AM - 2:00 PM EST (Limited)
                    </p>
                    <p className="text-gray-600">
                      Sunday: Closed (Emergency support available)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { dept: "General Support", email: "support@fileforge.com" },
                  { dept: "Sales Inquiries", email: "sales@fileforge.com" },
                  {
                    dept: "Partnership Opportunities",
                    email: "partnerships@fileforge.com",
                  },
                  { dept: "Security Issues", email: "security@fileforge.com" },
                  { dept: "Privacy Concerns", email: "privacy@fileforge.com" },
                  { dept: "Press Inquiries", email: "press@fileforge.com" },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{contact.dept}:</span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {contact.email}
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
