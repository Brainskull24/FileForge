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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import {
  Shield,
  Lock,
  Key,
  Eye,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Mail,
  FileText,
  Settings,
  Globe,
  Smartphone,
  Cloud,
  Zap,
  Award,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
export default function SecurityPrivacyPage() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [retentionPeriod, setRetentionPeriod] = useState("30");

  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4 z-10">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            ← Back to Home
          </Button>
        </Link>
      </div>
      {/* Page Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Security & Privacy</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your data security and privacy are our top priorities
            </p>

            {/* Security Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <Award className="w-4 h-4 mr-2" />
                SOC 2 Type II
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <Shield className="w-4 h-4 mr-2" />
                GDPR Compliant
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                ISO 27001
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <Globe className="w-4 h-4 mr-2" />
                CCPA Compliant
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground flex items-center justify-center">
              <Clock className="w-4 h-4 mr-2" />
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Security Overview Section */}
          <section className="mb-16">
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 mr-2" />
                  Security Overview
                </CardTitle>
                <CardDescription>
                  Enterprise-grade security measures protecting your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4">
                    <Lock className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">
                      Bank-level encryption
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      for all data
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <Eye className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Zero-knowledge</h3>
                    <p className="text-sm text-muted-foreground">
                      architecture
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <Trash2 className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Automatic data</h3>
                    <p className="text-sm text-muted-foreground">deletion</p>
                  </div>
                  <div className="text-center p-4">
                    <Smartphone className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Local processing</h3>
                    <p className="text-sm text-muted-foreground">options</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Main Content Tabs */}
          <Tabs defaultValue="data-protection" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="data-protection">Data Protection</TabsTrigger>
              <TabsTrigger value="privacy-controls">
                Privacy Controls
              </TabsTrigger>
              <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            {/* Data Protection Tab */}
            <TabsContent value="data-protection" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="w-5 h-5 mr-2" />
                    Encryption Standards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="data-in-transit">
                      <AccordionTrigger>Data in Transit</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li>• TLS 1.3 encryption for all connections</li>
                          <li>• Certificate pinning for mobile apps</li>
                          <li>• Perfect Forward Secrecy (PFS)</li>
                          <li>• HSTS (HTTP Strict Transport Security)</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="data-at-rest">
                      <AccordionTrigger>Data at Rest</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li>• AES-256 encryption for stored files</li>
                          <li>• Encrypted database storage</li>
                          <li>• Hardware Security Modules (HSMs)</li>
                          <li>• Key rotation every 90 days</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="end-to-end">
                      <AccordionTrigger>
                        End-to-End Encryption (Enterprise)
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li>• Client-side encryption before upload</li>
                          <li>• Zero-knowledge architecture</li>
                          <li>• User-controlled encryption keys</li>
                          <li>• Secure key management</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    File Processing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Temporary Storage</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Files stored only during processing</li>
                        <li>• Automatic deletion after 24 hours</li>
                        <li>• Secure deletion (DoD 5220.22-M standard)</li>
                        <li>• No permanent file storage (unless opted-in)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Local-Only Mode</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Client-side processing option</li>
                        <li>• No data leaves your device</li>
                        <li>• WebAssembly-based processing</li>
                        <li>• Available for basic operations</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Controls Tab */}
            <TabsContent value="privacy-controls" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Data Collection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">
                        What We Collect
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Account information (email, name)</li>
                        <li>• Usage analytics (anonymized)</li>
                        <li>• Error logs (no personal data)</li>
                        <li>• Payment information (via Stripe)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-red-600">
                        What We Don't Collect
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li>• File contents (unless explicitly stored)</li>
                        <li>• Personal documents content</li>
                        <li>• Browsing history outside our service</li>
                        <li>• Location data</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Rights (GDPR/CCPA)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 border rounded-lg">
                      <Download className="w-8 h-8 mx-auto mb-3 text-primary" />
                      <h4 className="font-semibold mb-2">Right to Access</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Download all your data
                      </p>
                      <Button size="sm" variant="outline">
                        Export Data
                      </Button>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Trash2 className="w-8 h-8 mx-auto mb-3 text-primary" />
                      <h4 className="font-semibold mb-2">Right to Deletion</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Delete account and all data
                      </p>
                      <Button size="sm" variant="outline">
                        Delete Account
                      </Button>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Globe className="w-8 h-8 mx-auto mb-3 text-primary" />
                      <h4 className="font-semibold mb-2">
                        Right to Portability
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Transfer to other services
                      </p>
                      <Button size="sm" variant="outline">
                        Transfer Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>
                    Control how your data is used and stored
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Usage Analytics</h4>
                      <p className="text-sm text-muted-foreground">
                        Help us improve our service with anonymized usage data
                      </p>
                    </div>
                    <Switch
                      checked={analyticsEnabled}
                      onCheckedChange={setAnalyticsEnabled}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Marketing Communications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and improvements
                      </p>
                    </div>
                    <Switch
                      checked={marketingEnabled}
                      onCheckedChange={setMarketingEnabled}
                    />
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3">Data Retention Period</h4>
                    <div className="flex gap-2">
                      {["7", "30", "90", "365"].map((days) => (
                        <Button
                          key={days}
                          variant={
                            retentionPeriod === days ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setRetentionPeriod(days)}
                        >
                          {days} days
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Infrastructure Tab */}
            <TabsContent value="infrastructure" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cloud className="w-5 h-5 mr-2" />
                    Cloud Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3">AWS Security</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• VPC isolation</li>
                        <li>• Security groups and NACLs</li>
                        <li>• CloudTrail logging</li>
                        <li>• GuardDuty threat detection</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Database Security</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Encrypted RDS instances</li>
                        <li>• Regular security patches</li>
                        <li>• Access logging and monitoring</li>
                        <li>• Backup encryption</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Key className="w-5 h-5 mr-2" />
                    Access Controls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="authentication">
                      <AccordionTrigger>
                        Multi-Factor Authentication
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li>• TOTP (Time-based One-Time Password)</li>
                          <li>• SMS verification (optional)</li>
                          <li>• Hardware security keys (FIDO2/WebAuthn)</li>
                          <li>• Backup codes</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="authorization">
                      <AccordionTrigger>
                        Role-Based Access Control
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li>• User roles and permissions</li>
                          <li>• API key scoping</li>
                          <li>• Team access controls (Enterprise)</li>
                          <li>• Audit logging</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Regulatory Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">GDPR</h4>
                      <p className="text-sm text-muted-foreground">
                        General Data Protection Regulation compliance with EU
                        data protection standards
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">CCPA</h4>
                      <p className="text-sm text-muted-foreground">
                        California Consumer Privacy Act compliance with consumer
                        privacy rights
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">SOC 2 Type II</h4>
                      <p className="text-sm text-muted-foreground">
                        Annual third-party audits for security, availability,
                        and confidentiality
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Industry Standards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">ISO 27001</h4>
                      <p className="text-sm text-muted-foreground">
                        Information security management with continuous
                        monitoring
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">PCI DSS</h4>
                      <p className="text-sm text-muted-foreground">
                        Payment Card Industry Data Security Standard for secure
                        payment processing
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Incident Response
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3">
                        Detection & Response
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• 24/7 security monitoring</li>
                        <li>• Automated threat detection</li>
                        <li>• Incident response team</li>
                        <li>• {"<1"} hour response time for critical issues</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">
                        Data Breach Protocol
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Immediate incident containment</li>
                        <li>• Forensic investigation</li>
                        <li>• Regulatory notification (72 hours)</li>
                        <li>• Transparent user communication</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Security Best Practices */}
          <section className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Security Best Practices for Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-3">Account Security</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Use strong, unique passwords</li>
                      <li>• Enable multi-factor authentication</li>
                      <li>• Monitor account activity regularly</li>
                      <li>• Report suspicious activity immediately</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">File Security</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Use local processing for sensitive files</li>
                      <li>• Review file sharing permissions</li>
                      <li>• Regularly audit stored data</li>
                      <li>• Enable automatic data deletion</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Contact & Support */}
          <section className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact & Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-semibold">Security Team</h4>
                        <p className="text-sm text-muted-foreground">
                          Report security issues and vulnerabilities
                        </p>
                        <a
                          href="mailto:security@fileforge.com"
                          className="text-sm text-primary hover:underline"
                        >
                          security@fileforge.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-semibold">Privacy Officer</h4>
                        <p className="text-sm text-muted-foreground">
                          GDPR/CCPA requests and privacy concerns
                        </p>
                        <a
                          href="mailto:privacy@fileforge.com"
                          className="text-sm text-primary hover:underline"
                        >
                          privacy@fileforge.com
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Button className="w-full bg-transparent" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Compliance Documents
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Security Audit Log
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Support Team
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
