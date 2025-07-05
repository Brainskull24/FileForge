import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  AlertTriangle,
  Shield,
  CreditCard,
  FileText,
  Scale,
  Download,
  PrinterIcon as Print,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
const sections = [
  { id: "acceptance", title: "Acceptance of Terms", number: 1 },
  { id: "description", title: "Description of Service", number: 2 },
  { id: "accounts", title: "User Accounts and Registration", number: 3 },
  { id: "acceptable-use", title: "Acceptable Use Policy", number: 4 },
  { id: "billing", title: "Credit System and Billing", number: 5 },
  { id: "ip-rights", title: "Intellectual Property Rights", number: 6 },
  { id: "privacy", title: "Privacy and Data Protection", number: 7 },
  {
    id: "availability",
    title: "Service Availability and Modifications",
    number: 8,
  },
  { id: "liability", title: "Limitation of Liability", number: 9 },
  { id: "termination", title: "Termination", number: 10 },
  { id: "disputes", title: "Dispute Resolution", number: 11 },
  { id: "governing-law", title: "Governing Law", number: 12 },
  { id: "contact", title: "Contact Information", number: 13 },
];

interface HighlightBoxProps {
  children: React.ReactNode;
  type?: "warning" | "info" | "important";
  icon?: React.ReactNode;
}

function HighlightBox({ children, type = "info", icon }: HighlightBoxProps) {
  const bgColor = {
    warning: "bg-yellow-50 border-yellow-200",
    info: "bg-blue-50 border-blue-200",
    important: "bg-red-50 border-red-200",
  }[type];

  const textColor = {
    warning: "text-yellow-800",
    info: "text-blue-800",
    important: "text-red-800",
  }[type];

  return (
    <div className={`p-4 rounded-lg border-l-4 ${bgColor} my-4`}>
      <div className={`flex items-start gap-3 ${textColor}`}>
        {icon && <div className="mt-0.5">{icon}</div>}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function ExpandableSection({
  title,
  children,
  defaultOpen = false,
}: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-lg mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
      >
        <span className="font-medium">{title}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {isOpen && <div className="px-4 pb-4 border-t">{children}</div>}
    </div>
  );
}

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState("acceptance");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections
        .map((section) => document.getElementById(section.id))
        .filter(Boolean);

      const currentSection = sectionElements.find((element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="absolute top-4 right-4 z-10">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            ← Back to Home
          </Button>
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Last updated: {currentDate}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Effective immediately upon publication
          </p>
          <Button variant="outline" size="sm" className="mr-2 bg-transparent">
            <ExternalLink className="h-4 w-4 mr-2" />
            Previous versions
          </Button>
          <Button variant="outline" size="sm" className="mr-2 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm">
            <Print className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Sticky Sidebar Navigation */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          activeSection === section.id
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {section.number}. {section.title}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <Card>
              <CardContent className="p-8">
                {/* Section 1: Acceptance of Terms */}
                <section id="acceptance" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    1. Acceptance of Terms
                  </h2>

                  <p className="text-gray-700 mb-4">
                    Welcome to FileForge! These Terms of Service ("Terms")
                    govern your use of our file processing and encoding
                    platform. By accessing or using FileForge, you agree to be
                    bound by these Terms.
                  </p>

                  <HighlightBox
                    type="important"
                    icon={<AlertTriangle className="h-5 w-5" />}
                  >
                    <p className="font-semibold mb-2">
                      By using FileForge, you agree to these terms
                    </p>
                    <p>
                      If you do not agree to these Terms, please do not use our
                      service.
                    </p>
                  </HighlightBox>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Age Requirements</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>
                        <strong>13+ with parental consent:</strong> Users aged
                        13-17 may use FileForge with verifiable parental consent
                      </li>
                      <li>
                        <strong>18+ for full access:</strong> Users must be 18
                        or older for unrestricted access to all features
                      </li>
                    </ul>

                    <h3 className="text-lg font-semibold">Usage Types</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium text-green-700">
                          Personal Use
                        </h4>
                        <p className="text-sm text-gray-600">
                          Individual file processing for personal projects
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium text-blue-700">
                          Business Use
                        </h4>
                        <p className="text-sm text-gray-600">
                          Commercial file processing with additional compliance
                          requirements
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator className="my-8" />

                {/* Section 2: Description of Service */}
                <section id="description" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    2. Description of Service
                  </h2>

                  <p className="text-gray-700 mb-6">
                    FileForge is a comprehensive file processing platform that
                    provides encoding, conversion, and manipulation services for
                    various file formats.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Core Capabilities
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>File format conversion</li>
                        <li>Media encoding and compression</li>
                        <li>Batch processing operations</li>
                        <li>Quality optimization</li>
                        <li>Metadata extraction and editing</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Supported Formats
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "MP4",
                          "AVI",
                          "MOV",
                          "PDF",
                          "DOCX",
                          "JPG",
                          "PNG",
                          "MP3",
                          "WAV",
                        ].map((format) => (
                          <Badge key={format} variant="secondary">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <HighlightBox
                    type="info"
                    icon={<Shield className="h-5 w-5" />}
                  >
                    <p className="font-semibold">Service Level Agreement</p>
                    <p>
                      We maintain 99.9% uptime availability with 24/7 monitoring
                      and support.
                    </p>
                  </HighlightBox>

                  <ExpandableSection title="API Access and Integrations">
                    <div className="pt-4 space-y-4">
                      <p className="text-gray-700">
                        FileForge provides RESTful API access for developers and
                        businesses to integrate our file processing capabilities
                        into their applications.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>RESTful API with comprehensive documentation</li>
                        <li>SDKs for popular programming languages</li>
                        <li>Webhook support for real-time notifications</li>
                        <li>Rate limiting and authentication</li>
                      </ul>
                    </div>
                  </ExpandableSection>
                </section>

                <Separator className="my-8" />

                {/* Section 3: User Accounts and Registration */}
                <section id="accounts" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    3. User Accounts and Registration
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Registration Requirements
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>
                          Provide accurate and complete registration information
                        </li>
                        <li>Maintain current contact information</li>
                        <li>
                          Use a valid email address for account verification
                        </li>
                        <li>
                          Choose a secure password meeting our requirements
                        </li>
                      </ul>
                    </div>

                    <HighlightBox
                      type="important"
                      icon={<Shield className="h-5 w-5" />}
                    >
                      <p className="font-semibold">
                        Important: Account Security
                      </p>
                      <p>
                        You are responsible for maintaining the confidentiality
                        of your account credentials and for all activities under
                        your account.
                      </p>
                    </HighlightBox>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Account Responsibilities
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium text-green-700 mb-2">
                            ✓ Allowed
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>Personal use of account</li>
                            <li>Team collaboration features</li>
                            <li>API access within limits</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium text-red-700 mb-2">
                            ✗ Prohibited
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>Account sharing or selling</li>
                            <li>Multiple accounts per user</li>
                            <li>Automated account creation</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <ExpandableSection title="Account Suspension and Termination">
                      <div className="pt-4 space-y-4">
                        <p className="text-gray-700">
                          We may suspend or terminate accounts under the
                          following conditions:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          <li>Violation of Terms of Service</li>
                          <li>Fraudulent or suspicious activity</li>
                          <li>Non-payment of fees</li>
                          <li>Abuse of service resources</li>
                          <li>Legal compliance requirements</li>
                        </ul>
                        <p className="text-sm text-gray-600">
                          <strong>Data Retention:</strong> Account data is
                          retained for 30 days after termination to allow for
                          account recovery or data export.
                        </p>
                      </div>
                    </ExpandableSection>
                  </div>
                </section>

                <Separator className="my-8" />

                {/* Section 4: Acceptable Use Policy */}
                <section id="acceptable-use" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    4. Acceptable Use Policy
                  </h2>

                  <p className="text-gray-700 mb-6">
                    This section outlines prohibited activities and content
                    restrictions when using FileForge.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Content Restrictions
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border-l-4 border-red-500 bg-red-50">
                          <h4 className="font-medium text-red-700 mb-2">
                            Prohibited Content
                          </h4>
                          <ul className="text-sm text-red-600 space-y-1">
                            <li>Illegal, harmful, or malicious content</li>
                            <li>Copyrighted material without permission</li>
                            <li>Personal information without consent</li>
                            <li>Spam or unsolicited communications</li>
                            <li>Adult content in public workflows</li>
                          </ul>
                        </div>
                        <div className="p-4 border-l-4 border-green-500 bg-green-50">
                          <h4 className="font-medium text-green-700 mb-2">
                            Acceptable Content
                          </h4>
                          <ul className="text-sm text-green-600 space-y-1">
                            <li>Personal files and media</li>
                            <li>Business documents and assets</li>
                            <li>Educational materials</li>
                            <li>Creative projects and portfolios</li>
                            <li>Open source and public domain content</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Technical Restrictions
                      </h3>
                      <div className="space-y-3">
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-medium text-gray-800">
                            Service Integrity
                          </h4>
                          <p className="text-sm text-gray-600">
                            No attempts to reverse engineer, hack, or compromise
                            our service
                          </p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-medium text-gray-800">
                            Resource Usage
                          </h4>
                          <p className="text-sm text-gray-600">
                            No automated abuse, excessive API usage, or
                            circumvention of rate limits
                          </p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-medium text-gray-800">
                            System Security
                          </h4>
                          <p className="text-sm text-gray-600">
                            No interference with service operations or other
                            users' access
                          </p>
                        </div>
                      </div>
                    </div>

                    <HighlightBox
                      type="warning"
                      icon={<AlertTriangle className="h-5 w-5" />}
                    >
                      <p className="font-semibold">Violation Notice</p>
                      <p>
                        Violations may result in immediate account suspension or
                        termination without refund. Serious violations may be
                        reported to appropriate authorities.
                      </p>
                    </HighlightBox>
                  </div>
                </section>

                <Separator className="my-8" />

                {/* Section 5: Credit System and Billing */}
                <section id="billing" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    5. Credit System and Billing
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Credit Usage
                      </h3>
                      <p className="text-gray-700 mb-4">
                        FileForge operates on a credit-based system where
                        different operations consume varying amounts of credits.
                      </p>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="p-4 border rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            1
                          </div>
                          <div className="text-sm text-gray-600">
                            Basic Conversion
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            5
                          </div>
                          <div className="text-sm text-gray-600">
                            HD Video Processing
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            10
                          </div>
                          <div className="text-sm text-gray-600">
                            Batch Operations
                          </div>
                        </div>
                      </div>

                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>
                          <strong>Credit Expiration:</strong> Credits expire 12
                          months after purchase
                        </li>
                        <li>
                          <strong>Refund Policy:</strong> Unused credits are
                          refundable within 30 days of purchase
                        </li>
                        <li>
                          <strong>Plan Changes:</strong> Upgrades are prorated;
                          downgrades take effect at next billing cycle
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Billing Terms
                      </h3>

                      <HighlightBox
                        type="info"
                        icon={<CreditCard className="h-5 w-5" />}
                      >
                        <p className="font-semibold">Auto-Renewal Notice</p>
                        <p>
                          Subscriptions automatically renew unless cancelled 24
                          hours before the billing cycle ends.
                        </p>
                      </HighlightBox>

                      <ExpandableSection title="Payment and Billing Details">
                        <div className="pt-4 space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              Payment Methods
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                              <li>
                                Credit and debit cards (Visa, MasterCard,
                                American Express)
                              </li>
                              <li>PayPal and digital wallets</li>
                              <li>Bank transfers for enterprise accounts</li>
                              <li>
                                Cryptocurrency (Bitcoin, Ethereum) for annual
                                plans
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">
                              Failed Payment Handling
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                              <li>3 automatic retry attempts over 7 days</li>
                              <li>Email notifications for payment failures</li>
                              <li>
                                Grace period of 5 days before service suspension
                              </li>
                              <li>
                                Account reactivation upon successful payment
                              </li>
                            </ul>
                          </div>
                        </div>
                      </ExpandableSection>
                    </div>
                  </div>
                </section>

                <Separator className="my-8" />

                {/* Section 6: Intellectual Property Rights */}
                <section id="ip-rights" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    6. Intellectual Property Rights
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        User Content
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border-l-4 border-green-500 bg-green-50">
                          <h4 className="font-medium text-green-700 mb-2">
                            Your Rights
                          </h4>
                          <ul className="text-sm text-green-600 space-y-1">
                            <li>You retain full ownership of uploaded files</li>
                            <li>No claim by FileForge to your content</li>
                            <li>Right to delete content at any time</li>
                            <li>Control over sharing and privacy settings</li>
                          </ul>
                        </div>
                        <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                          <h4 className="font-medium text-blue-700 mb-2">
                            Limited License to FileForge
                          </h4>
                          <ul className="text-sm text-blue-600 space-y-1">
                            <li>Process and convert your files</li>
                            <li>Store temporarily for processing</li>
                            <li>Provide technical support</li>
                            <li>Comply with legal requirements</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        FileForge Intellectual Property
                      </h3>
                      <p className="text-gray-700 mb-4">
                        FileForge owns all rights to our service technology,
                        including but not limited to:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                          <li>Processing algorithms and software</li>
                          <li>User interface and design</li>
                          <li>API and technical documentation</li>
                        </ul>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                          <li>Trademarks and branding</li>
                          <li>Workflow templates and presets</li>
                          <li>Service improvements and innovations</li>
                        </ul>
                      </div>
                    </div>

                    <HighlightBox
                      type="important"
                      icon={<FileText className="h-5 w-5" />}
                    >
                      <p className="font-semibold">
                        IP Compliance Responsibility
                      </p>
                      <p>
                        Users are solely responsible for ensuring they have the
                        right to upload and process all content through
                        FileForge.
                      </p>
                    </HighlightBox>
                  </div>
                </section>

                <Separator className="my-8" />

                {/* Section 7: Privacy and Data Protection */}
                <section id="privacy" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    7. Privacy and Data Protection
                  </h2>

                  <p className="text-gray-700 mb-6">
                    Your privacy is important to us. This section outlines how
                    we handle your data in conjunction with our comprehensive
                    Privacy Policy.
                  </p>

                  <HighlightBox
                    type="info"
                    icon={<Shield className="h-5 w-5" />}
                  >
                    <p className="font-semibold">Data Protection Commitment</p>
                    <p>
                      We process your data in accordance with our Privacy Policy
                      and applicable data protection laws including GDPR and
                      CCPA.
                    </p>
                  </HighlightBox>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Data Processing Purposes
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Service Delivery</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            <li>File processing and conversion</li>
                            <li>Account management</li>
                            <li>Technical support</li>
                            <li>Service improvements</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">
                            Legal and Security
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            <li>Fraud prevention</li>
                            <li>Legal compliance</li>
                            <li>Security monitoring</li>
                            <li>Dispute resolution</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <ExpandableSection title="Your Data Rights">
                      <div className="pt-4 space-y-4">
                        <p className="text-gray-700">
                          Under applicable data protection laws, you have the
                          following rights:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            <li>
                              <strong>Access:</strong> Request copies of your
                              data
                            </li>
                            <li>
                              <strong>Rectification:</strong> Correct inaccurate
                              data
                            </li>
                            <li>
                              <strong>Erasure:</strong> Request deletion of your
                              data
                            </li>
                            <li>
                              <strong>Portability:</strong> Export your data
                            </li>
                          </ul>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            <li>
                              <strong>Restriction:</strong> Limit processing of
                              your data
                            </li>
                            <li>
                              <strong>Objection:</strong> Object to certain
                              processing
                            </li>
                            <li>
                              <strong>Withdraw consent:</strong> For
                              consent-based processing
                            </li>
                            <li>
                              <strong>Lodge complaints:</strong> With
                              supervisory authorities
                            </li>
                          </ul>
                        </div>
                      </div>
                    </ExpandableSection>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Data Retention and Deletion
                      </h3>
                      <div className="space-y-2 text-gray-700 text-sm">
                        <p>
                          <strong>Processed Files:</strong> Deleted within 24
                          hours of processing completion
                        </p>
                        <p>
                          <strong>Account Data:</strong> Retained while account
                          is active plus 30 days
                        </p>
                        <p>
                          <strong>Billing Records:</strong> Retained for 7 years
                          for tax and legal compliance
                        </p>
                        <p>
                          <strong>Support Communications:</strong> Retained for
                          2 years
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator className="my-8" />

                {/* Section 8: Service Availability and Modifications */}
                <section id="availability" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    8. Service Availability and Modifications
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Service Level Commitments
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="p-4 border rounded-lg">
                          <div className="text-3xl font-bold text-green-600 mb-2">
                            99.9%
                          </div>
                          <div className="text-sm text-gray-600">
                            Uptime SLA
                          </div>
                          <div className="text-xs text-gray-500">
                            (excluding scheduled maintenance)
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            24/7
                          </div>
                          <div className="text-sm text-gray-600">
                            System Monitoring
                          </div>
                          <div className="text-xs text-gray-500">
                            Automated alerts and response
                          </div>
                        </div>
                      </div>

                      <ExpandableSection title="Maintenance and Downtime">
                        <div className="pt-4 space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              Scheduled Maintenance
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                              <li>Advance notice of at least 48 hours</li>
                              <li>
                                Typically performed during low-usage hours
                              </li>
                              <li>Maximum 4 hours per month</li>
                              <li>
                                Status page updates throughout maintenance
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">
                              Unplanned Outages
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                              <li>
                                Immediate investigation and resolution efforts
                              </li>
                              <li>Real-time status updates</li>
                              <li>
                                Service credits for extended outages &gt;4 hours
                              </li>
                              <li>Post-incident reports for major outages</li>
                            </ul>
                          </div>
                        </div>
                      </ExpandableSection>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Service Modifications
                      </h3>
                      <p className="text-gray-700 mb-4">
                        We continuously improve FileForge and may modify
                        features, pricing, or terms with appropriate notice.
                      </p>

                      <div className="space-y-3">
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-medium text-gray-800">
                            Feature Updates
                          </h4>
                          <p className="text-sm text-gray-600">
                            New features and improvements are added regularly
                            with release notes
                          </p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-medium text-gray-800">
                            Breaking Changes
                          </h4>
                          <p className="text-sm text-gray-600">
                            30-day advance notice with migration guides and
                            support
                          </p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-medium text-gray-800">
                            Pricing Changes
                          </h4>
                          <p className="text-sm text-gray-600">
                            60-day notice for existing customers with
                            grandfathering options
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator className="my-8" />

                {/* Section 9: Limitation of Liability */}
                <section id="liability" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    9. Limitation of Liability
                  </h2>

                  <HighlightBox
                    type="important"
                    icon={<Scale className="h-5 w-5" />}
                  >
                    <p className="font-semibold">Important Legal Notice</p>
                    <p>
                      FileForge's liability is limited to the amount you paid
                      for the service in the 12 months preceding any claim.
                    </p>
                  </HighlightBox>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Service Limitations
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                          <h4 className="font-medium text-yellow-700 mb-2">
                            "As-Is" Service
                          </h4>
                          <ul className="text-sm text-yellow-600 space-y-1">
                            <li>No warranty for specific outcomes</li>
                            <li>Service provided without guarantees</li>
                            <li>User assumes risk of use</li>
                            <li>No guarantee of error-free operation</li>
                          </ul>
                        </div>
                        <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                          <h4 className="font-medium text-blue-700 mb-2">
                            User Responsibilities
                          </h4>
                          <ul className="text-sm text-blue-600 space-y-1">
                            <li>Maintain backups of important data</li>
                            <li>Verify processing results</li>
                            <li>Use appropriate file formats</li>
                            <li>Follow best practices</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <ExpandableSection title="Liability Exclusions and Caps">
                      <div className="pt-4 space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Excluded Damages</h4>
                          <p className="text-gray-700 text-sm mb-2">
                            FileForge is not liable for:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            <li>
                              Indirect, incidental, or consequential damages
                            </li>
                            <li>
                              Loss of profits, data, or business opportunities
                            </li>
                            <li>Third-party claims or actions</li>
                            <li>Force majeure events beyond our control</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">
                            Business Use Acknowledgment
                          </h4>
                          <p className="text-gray-700 text-sm">
                            Business users acknowledge they have appropriate
                            insurance coverage and understand the limitations of
                            our service for mission-critical operations.
                          </p>
                        </div>
                      </div>
                    </ExpandableSection>
                  </div>
                </section>

                <Separator className="my-8" />

                {/* Section 10: Termination */}
                <section id="termination" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    10. Termination
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        User-Initiated Termination
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">
                            Cancellation Process
                          </h4>
                          <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
                            <li>Access account settings</li>
                            <li>Select "Cancel Subscription"</li>
                            <li>Confirm cancellation</li>
                            <li>Receive confirmation email</li>
                          </ol>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Data Export</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            <li>Download processed files</li>
                            <li>Export workflow configurations</li>
                            <li>Save account preferences</li>
                            <li>Request data archive</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        FileForge-Initiated Termination
                      </h3>
                      <p className="text-gray-700 mb-4">
                        We may terminate accounts for violations of these Terms
                        or other legitimate reasons.
                      </p>

                      <ExpandableSection title="Termination Procedures and Appeals">
                        <div className="pt-4 space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              Notice Requirements
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                              <li>Email notification to registered address</li>
                              <li>Reason for termination specified</li>
                              <li>Effective date of termination</li>
                              <li>Data retention period information</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Appeal Process</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                              <li>Submit appeal within 14 days</li>
                              <li>Provide relevant documentation</li>
                              <li>Review by senior team member</li>
                              <li>Response within 5 business days</li>
                            </ul>
                          </div>
                        </div>
                      </ExpandableSection>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Post-Termination
                      </h3>
                      <div className="space-y-2 text-gray-700 text-sm">
                        <p>
                          <strong>Service Access:</strong> Immediate suspension
                          of service access
                        </p>
                        <p>
                          <strong>Data Retention:</strong> 30-day grace period
                          for data recovery
                        </p>
                        <p>
                          <strong>Refunds:</strong> Pro-rated refunds for
                          prepaid services (if applicable)
                        </p>
                        <p>
                          <strong>Outstanding Charges:</strong> Remain due and
                          payable
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator className="my-8" />

                {/* Section 11: Dispute Resolution */}
                <section id="disputes" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    11. Dispute Resolution
                  </h2>

                  <p className="text-gray-700 mb-6">
                    We prefer to resolve disputes amicably and have established
                    a structured process for addressing concerns.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Informal Resolution
                      </h3>
                      <div className="p-4 border-l-4 border-green-500 bg-green-50">
                        <h4 className="font-medium text-green-700 mb-2">
                          Step 1: Direct Communication
                        </h4>
                        <ul className="text-sm text-green-600 space-y-1">
                          <li>
                            Contact our support team at legal@fileforge.com
                          </li>
                          <li>Provide detailed description of the issue</li>
                          <li>
                            Include relevant account information and
                            documentation
                          </li>
                          <li>
                            Allow 30 days for good faith resolution attempts
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Formal Arbitration
                      </h3>
                      <p className="text-gray-700 mb-4">
                        If informal resolution fails, disputes will be resolved
                        through binding arbitration.
                      </p>

                      <ExpandableSection title="Arbitration Details">
                        <div className="pt-4 space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              Arbitration Rules
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                              <li>
                                Administered by American Arbitration Association
                                (AAA)
                              </li>
                              <li>
                                Conducted under AAA Commercial Arbitration Rules
                              </li>
                              <li>
                                Single arbitrator unless parties agree otherwise
                              </li>
                              <li>Decision is final and binding</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">
                              Location and Costs
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                              <li>
                                Arbitration held in San Francisco, California
                              </li>
                              <li>Each party bears their own legal costs</li>
                              <li>Arbitrator fees split equally</li>
                              <li>
                                Small claims court option for disputes under
                                $10,000
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">
                              Class Action Waiver
                            </h4>
                            <p className="text-gray-700 text-sm">
                              You agree to resolve disputes individually and
                              waive the right to participate in class actions or
                              collective proceedings.
                            </p>
                          </div>
                        </div>
                      </ExpandableSection>
                    </div>
                  </div>
                </section>

                <Separator className="my-8" />

                {/* Section 12: Governing Law */}
                <section id="governing-law" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    12. Governing Law
                  </h2>

                  <div className="space-y-6">
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-lg font-semibold mb-3">
                        Legal Jurisdiction
                      </h3>
                      <div className="space-y-2 text-gray-700 text-sm">
                        <p>
                          <strong>Governing Law:</strong> State of California,
                          United States
                        </p>
                        <p>
                          <strong>Federal Jurisdiction:</strong> U.S. Federal
                          Courts for federal matters
                        </p>
                        <p>
                          <strong>State Jurisdiction:</strong> California State
                          Courts for state law matters
                        </p>
                        <p>
                          <strong>Venue:</strong> San Francisco County,
                          California
                        </p>
                      </div>
                    </div>

                    <ExpandableSection title="International Users">
                      <div className="pt-4 space-y-4">
                        <p className="text-gray-700">
                          For users outside the United States, these Terms are
                          governed by California law, but we recognize certain
                          local law requirements may apply.
                        </p>
                        <div>
                          <h4 className="font-medium mb-2">EU Users</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            <li>GDPR rights and protections apply</li>
                            <li>
                              Local data protection authority jurisdiction
                            </li>
                            <li>Consumer protection laws remain in effect</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">
                            Other Jurisdictions
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            <li>Local consumer protection laws may apply</li>
                            <li>
                              Mandatory local law provisions take precedence
                            </li>
                            <li>
                              Contact us for jurisdiction-specific questions
                            </li>
                          </ul>
                        </div>
                      </div>
                    </ExpandableSection>
                  </div>
                </section>

                <Separator className="my-8" />

                {/* Section 13: Contact Information */}
                <section id="contact" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    13. Contact Information
                  </h2>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">
                          Legal Department
                        </h3>
                        <div className="space-y-2 text-gray-700 text-sm">
                          <p>
                            <strong>Email:</strong> legal@fileforge.com
                          </p>
                          <p>
                            <strong>Response Time:</strong> 5 business days
                          </p>
                          <p>
                            <strong>Languages:</strong> English, Spanish
                          </p>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">
                          Mailing Address
                        </h3>
                        <div className="space-y-1 text-gray-700 text-sm">
                          <p>FileForge Legal Department</p>
                          <p>123 Tech Street, Suite 400</p>
                          <p>San Francisco, CA 94105</p>
                          <p>United States</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3">
                        Other Contact Options
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium">General Support</p>
                          <p className="text-gray-600">support@fileforge.com</p>
                        </div>
                        <div>
                          <p className="font-medium">Privacy Concerns</p>
                          <p className="text-gray-600">privacy@fileforge.com</p>
                        </div>
                        <div>
                          <p className="font-medium">Business Inquiries</p>
                          <p className="text-gray-600">
                            business@fileforge.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t">
                  <div className="text-center text-gray-600">
                    <p className="mb-4">
                      These Terms of Service are effective as of {currentDate}{" "}
                      and supersede all previous versions.
                    </p>
                    <div className="flex justify-center gap-4 text-sm">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Print className="h-4 w-4 mr-2" />
                        Print Terms
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Previous Versions
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
