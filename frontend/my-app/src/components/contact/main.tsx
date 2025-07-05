import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Label } from "../ui/label"
import { Link } from "react-router-dom"
import {
  MessageCircle,
  Mail,
  Phone,
  Users,
  Clock,
  Globe,
  CheckCircle,
  AlertCircle,
  Upload,
  Search,
  Play,
  FileText,
  Settings,
  Zap,
  Star,
  MessageSquare,
  BookOpen,
  HelpCircle,
  Bug,
  Lightbulb,
  User,
  Building,
  ArrowRight,
  ExternalLink,
} from "lucide-react"

export default function ContactSupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    accountType: "",
    category: "",
    priority: "",
    subject: "",
    description: "",
  })
  const [chatStatus, ] = useState("online")
  const [suggestedFAQs, setSuggestedFAQs] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  // Simulate FAQ suggestions based on description
  useEffect(() => {
    if (formData.description.length > 10) {
      const suggestions = [
        "How to upload large files?",
        "API rate limits explained",
        "Troubleshooting conversion errors",
      ]
      setSuggestedFAQs(suggestions)
    } else {
      setSuggestedFAQs([])
    }
  }, [formData.description])

  const supportChannels = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Live Chat Support",
      availability: "Monday-Friday, 9 AM - 6 PM EST",
      responseTime: "Immediate during business hours",
      bestFor: "Quick questions, technical issues, account help",
      languages: "English, Spanish (more coming soon)",
      status: chatStatus,
      action: "Start Chat",
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email Support",
      availability: "support@fileforge.com",
      responseTime: "Within 4 hours (business days)",
      bestFor: "Detailed questions, feature requests, billing issues",
      languages: "Automatic ticket numbers and status updates",
      status: "available",
      action: "Send Email",
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Phone Support",
      availability: "Monday-Friday, 9 AM - 5 PM EST",
      responseTime: "+1 (555) 123-4567",
      bestFor: "Urgent issues, complex technical problems",
      languages: "Pro/Enterprise only",
      status: "pro-only",
      action: "Call Now",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Forum",
      availability: "Community-driven support",
      responseTime: "Varies (community + staff moderation)",
      bestFor: "General questions, feature discussions, tips",
      languages: "Free for all users",
      status: "available",
      action: "Visit Forum",
    },
  ]

  const teamMembers = [
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
  ]

  const planFeatures = {
    free: [
      "Community forum",
      "Email support (48-hour response)",
      "Self-service resources",
      "Basic troubleshooting tools",
    ],
    pro: [
      "All Free features",
      "Priority email support (4-hour response)",
      "Live chat during business hours",
      "Phone support for urgent issues",
      "Advanced troubleshooting tools",
    ],
    enterprise: [
      "All Pro features",
      "Dedicated account manager",
      "1-hour response time SLA",
      "24/7 phone support",
      "Custom training and onboarding",
      "Direct engineering escalation",
    ],
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800"
      case "available":
        return "bg-blue-100 text-blue-800"
      case "pro-only":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <div className="absolute top-4 right-4 z-10">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            ← Back to Home
          </Button>
        </Link>
      </div>
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact & Support</h1>
            <p className="text-xl text-gray-600 mb-4">Get help when you need it - we're here to support your success</p>
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Average response time: 2 hours (business days)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Support Channel Overview */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Choose Your Support Channel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportChannels.map((channel, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-blue-600">{channel.icon}</div>
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
                  <Button className="w-full mt-4" variant={channel.status === "pro-only" ? "outline" : "default"}>
                    {channel.action}
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
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
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
                    onValueChange={(value) => handleInputChange("accountType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="not-customer">Not a customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Issue Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
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
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (General inquiry)</SelectItem>
                      <SelectItem value="medium">Medium (Non-urgent issue)</SelectItem>
                      <SelectItem value="high">High (Service impacting)</SelectItem>
                      <SelectItem value="urgent">Urgent (Service down/critical)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Brief description of your issue"
                    maxLength={100}
                    required
                  />
                  <p className="text-xs text-gray-500">{formData.subject.length}/100 characters</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Please provide detailed information about your issue..."
                  rows={6}
                  maxLength={2000}
                  required
                />
                <p className="text-xs text-gray-500">{formData.description.length}/2000 characters</p>
              </div>

              {/* Suggested FAQs */}
              {suggestedFAQs.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Suggested FAQ Articles:</h4>
                  <ul className="space-y-1">
                    {suggestedFAQs.map((faq, index) => (
                      <li key={index}>
                        <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                          <HelpCircle className="h-4 w-4 mr-2" />
                          {faq}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to select</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.txt,.log"
                  />
                  <Button variant="outline" size="sm" onClick={() => document.getElementById("file-upload")?.click()}>
                    Choose Files
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Supported: JPG, PNG, GIF, PDF, TXT, LOG (max 10MB each)</p>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedFiles((prev) => prev.filter((_, i) => i !== index))}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button className="w-full" size="lg">
                Submit Support Request
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Self-Service Resources */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Self-Service Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Getting Started Guide</h3>
                <p className="text-sm text-gray-600 mb-4">Step-by-step onboarding</p>
                <Button variant="outline" size="sm">
                  Read Guide
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Play className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Video Tutorials</h3>
                <p className="text-sm text-gray-600 mb-4">Common tasks explained</p>
                <Button variant="outline" size="sm">
                  Watch Videos
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Search className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">FAQ Search</h3>
                <p className="text-sm text-gray-600 mb-4">Searchable knowledge base</p>
                <Button variant="outline" size="sm">
                  Search FAQ
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Status Page</h3>
                <p className="text-sm text-gray-600 mb-4">Service status & incidents</p>
                <Button variant="outline" size="sm">
                  Check Status
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Troubleshooting Tools */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Troubleshooting Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                <Zap className="h-6 w-6" />
                <span className="text-sm">Connection Test</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                <FileText className="h-6 w-6" />
                <span className="text-sm">Format Checker</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                <User className="h-6 w-6" />
                <span className="text-sm">Account Diagnostics</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                <Settings className="h-6 w-6" />
                <span className="text-sm">Browser Check</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Support Team Information */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Meet Our Support Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Specialties:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.specialties.map((specialty, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Languages:</span>
                      <p className="text-gray-600">{member.languages.join(", ")}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                    Ask {member.name.split(" ")[0]}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Support Plans Comparison */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Support by Plan</h2>
          <Tabs defaultValue="free" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="free">Free Plan</TabsTrigger>
              <TabsTrigger value="pro">Pro Plan</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise Plan</TabsTrigger>
            </TabsList>
            {Object.entries(planFeatures).map(([plan, features]) => (
              <TabsContent key={plan} value={plan}>
                <Card>
                  <CardHeader>
                    <CardTitle className="capitalize">{plan} Plan Support</CardTitle>
                    <CardDescription>
                      {plan === "free" && "Community-driven support with self-service resources"}
                      {plan === "pro" && "Priority support with multiple channels"}
                      {plan === "enterprise" && "Dedicated support with guaranteed response times"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6">
                      {plan === "free" ? "Current Plan" : `Upgrade to ${plan.charAt(0).toUpperCase() + plan.slice(1)}`}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
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
                    <p className="text-gray-600">123 Innovation Drive, Suite 400</p>
                    <p className="text-gray-600">San Francisco, CA 94105</p>
                    <p className="text-gray-600">United States</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">Business Hours:</p>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM EST (Limited)</p>
                    <p className="text-gray-600">Sunday: Closed (Emergency support available)</p>
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
                  { dept: "Partnership Opportunities", email: "partnerships@fileforge.com" },
                  { dept: "Security Issues", email: "security@fileforge.com" },
                  { dept: "Privacy Concerns", email: "privacy@fileforge.com" },
                  { dept: "Press Inquiries", email: "press@fileforge.com" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{contact.dept}:</span>
                    <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800">
                      {contact.email}
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feedback Section */}
        <section>
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Feedback & Suggestions</CardTitle>
              <CardDescription>Help us improve FileForge by sharing your ideas and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                  <Lightbulb className="h-6 w-6" />
                  <span className="text-sm">Feature Request</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                  <Bug className="h-6 w-6" />
                  <span className="text-sm">Bug Report</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-sm">General Feedback</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                  <Star className="h-6 w-6" />
                  <span className="text-sm">Rate Experience</span>
                </Button>
              </div>
              <Button className="w-full">
                Submit Feedback
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Service Level Agreements */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Service Level Agreements</CardTitle>
              <CardDescription>Our commitment to response and resolution times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Plan</th>
                      <th className="text-left py-3 px-4">Email Response</th>
                      <th className="text-left py-3 px-4">Chat Response</th>
                      <th className="text-left py-3 px-4">Phone Support</th>
                      <th className="text-left py-3 px-4">Resolution Goal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Free</td>
                      <td className="py-3 px-4">48 hours</td>
                      <td className="py-3 px-4">—</td>
                      <td className="py-3 px-4">—</td>
                      <td className="py-3 px-4">Best effort</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Pro</td>
                      <td className="py-3 px-4">4 hours</td>
                      <td className="py-3 px-4">Immediate</td>
                      <td className="py-3 px-4">2 hours callback</td>
                      <td className="py-3 px-4">Same day</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Enterprise</td>
                      <td className="py-3 px-4">1 hour</td>
                      <td className="py-3 px-4">Immediate</td>
                      <td className="py-3 px-4">15 minutes</td>
                      <td className="py-3 px-4">4 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
