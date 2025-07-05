import { useState } from "react";
import {
  Check,
  X,
  Shield,
  Clock,
  CreditCard,
  Star,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Link } from "react-router-dom";
export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [credits, setCredits] = useState([100]);
  const [currency, setCurrency] = useState("USD");
  const [showComparison, setShowComparison] = useState(false);

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
  };

  const convertPrice = (price: number) => {
    return Math.round(
      price * exchangeRates[currency as keyof typeof exchangeRates]
    );
  };

  const creditOperations = [
    { operation: "Basic encoding operation", credits: 1 },
    { operation: "Simple file conversion", credits: 2 },
    { operation: "Complex conversion (PDF to Word)", credits: 5 },
    { operation: "Batch operation (per file)", credits: 10 },
  ];

  const calculateOperations = (totalCredits: number) => {
    return creditOperations.map((op) => ({
      ...op,
      count: Math.floor(totalCredits / op.credits),
    }));
  };

  const pricingTiers = [
    {
      name: "Free",
      badge: null,
      badgeVariant: "secondary" as const,
      price: 0,
      subtitle: "Perfect for trying out",
      features: [
        "Basic encoding/decoding",
        "File size limit: 5MB",
        "10 conversions/day",
        "Standard file formats",
        "Community support",
      ],
      cta: "Get Started Free",
      ctaVariant: "outline" as const,
      glow: false,
    },
    {
      name: "Pro",
      badge: "Most Popular",
      price: isAnnual ? 15 : 19,
      badgeVariant: "secondary" as const,
      subtitle: "For professionals",
      features: [
        "Everything in Free",
        "File size limit: 100MB",
        "1,000 credits/month",
        "Batch processing (up to 50 files)",
        "Priority processing",
        "API access (1,000 calls/month)",
        "Email support",
        "Workflow builder",
      ],
      cta: "Start Pro Trial",
      ctaVariant: "default" as const,
      glow: true,
    },
    {
      name: "Enterprise",
      badge: null,
      price: isAnnual ? 79 : 99,
      subtitle: "For teams and businesses",
      features: [
        "Everything in Pro",
        "Unlimited file size",
        "10,000 credits/month",
        "Unlimited batch processing",
        "Custom workflows",
        "Unlimited API calls",
        "Cloud storage integration",
        "Priority support + phone",
        "White-label options",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      ctaVariant: "default" as const,
      glow: false,
    },
  ];

  const comparisonFeatures = [
    {
      feature: "Basic encoding/decoding",
      free: true,
      pro: true,
      enterprise: true,
    },
    {
      feature: "File size limit",
      free: "5MB",
      pro: "100MB",
      enterprise: "Unlimited",
    },
    {
      feature: "Daily conversions",
      free: "10",
      pro: "1,000 credits",
      enterprise: "10,000 credits",
    },
    {
      feature: "Batch processing",
      free: false,
      pro: "Up to 50 files",
      enterprise: "Unlimited",
    },
    {
      feature: "API access",
      free: false,
      pro: "1,000 calls/month",
      enterprise: "Unlimited",
    },
    {
      feature: "Priority processing",
      free: false,
      pro: true,
      enterprise: true,
    },
    { feature: "Workflow builder", free: false, pro: true, enterprise: true },
    {
      feature: "Cloud storage integration",
      free: false,
      pro: false,
      enterprise: true,
    },
    {
      feature: "White-label options",
      free: false,
      pro: false,
      enterprise: true,
    },
    {
      feature: "Support",
      free: "Community",
      pro: "Email",
      enterprise: "Priority + Phone",
    },
  ];

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly.",
    },
    {
      question: "Do unused credits roll over to the next month?",
      answer:
        "Pro plan credits expire at the end of each billing cycle. Enterprise plans can have custom credit rollover policies.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "We offer a 30-day money-back guarantee for all paid plans. No questions asked.",
    },
    {
      question: "How do credits work exactly?",
      answer:
        "Credits are consumed based on the complexity of operations. Simple encoding uses 1 credit, while complex conversions may use 5-10 credits per operation.",
    },
    {
      question: "Are there enterprise discounts available?",
      answer:
        "Yes, we offer volume discounts for enterprise customers. Contact our sales team for custom pricing.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and can arrange invoice billing for enterprise customers.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we're SOC 2 compliant and GDPR compliant. All data is encrypted in transit and at rest.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Absolutely. You can cancel your subscription at any time from your account settings. No cancellation fees.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute top-4 right-4 z-10">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            ← Back to Home
          </Button>
        </Link>
      </div>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Label
              htmlFor="pricing-toggle"
              className={!isAnnual ? "font-semibold" : ""}
            >
              Monthly
            </Label>
            <Switch
              id="pricing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <div className="flex items-center gap-2">
              <Label
                htmlFor="pricing-toggle"
                className={isAnnual ? "font-semibold" : ""}
              >
                Annual
              </Label>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                20% off
              </Badge>
            </div>
          </div>

          {/* Currency Selection */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Label>Currency:</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative ${
                tier.glow ? "ring-2 ring-blue-200 shadow-lg" : ""
              } ${tier.name === "Pro" ? "border-2 border-blue-500" : ""}`}
            >
              {tier.badge && (
                <Badge
                  variant={tier.badgeVariant}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white"
                >
                  {tier.badge}
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-6xl font-bold">
                    {currencySymbols[currency as keyof typeof currencySymbols]}
                    {tier.price === 0 ? "0" : convertPrice(tier.price)}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription className="text-lg mt-2">
                  {tier.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant={tier.ctaVariant} className="w-full" size="lg">
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Promo Code */}
        <div className="flex justify-center mb-16">
          <div className="flex gap-2 max-w-md w-full">
            <Input placeholder="Enter promo code" />
            <Button variant="outline">Apply</Button>
          </div>
        </div>

        {/* Credit System Explanation */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">How Credits Work</h2>
            <p className="text-muted-foreground">
              Credits are consumed based on the complexity of your operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-xl font-semibold mb-4">Credit Costs</h3>
              <div className="space-y-3">
                {creditOperations.map((op, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span>{op.operation}</span>
                    <Badge variant="outline">
                      {op.credits} credit{op.credits > 1 ? "s" : ""}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Credit Calculator</h3>
              <div className="space-y-4">
                <div>
                  <Label>Credits: {credits[0]}</Label>
                  <Slider
                    value={credits}
                    onValueChange={setCredits}
                    max={1000}
                    min={10}
                    step={10}
                    className="mt-2"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">What you can do:</h4>
                  {calculateOperations(credits[0]).map((op, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{op.operation}</span>
                      <span className="font-medium">{op.count} operations</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Toggle */}
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={() => setShowComparison(!showComparison)}
            className="gap-2"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                showComparison ? "rotate-180" : ""
              }`}
            />
            {showComparison ? "Hide" : "Show"} Feature Comparison
          </Button>
        </div>

        {/* Feature Comparison Table */}
        {showComparison && (
          <div className="mb-16 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Feature</TableHead>
                  <TableHead className="text-center">Free</TableHead>
                  <TableHead className="text-center">Pro</TableHead>
                  <TableHead className="text-center">Enterprise</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonFeatures.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.feature}
                    </TableCell>
                    <TableCell className="text-center">
                      {typeof item.free === "boolean" ? (
                        item.free ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        item.free
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {typeof item.pro === "boolean" ? (
                        item.pro ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        item.pro
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {typeof item.enterprise === "boolean" ? (
                        item.enterprise ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        item.enterprise
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-1">30-day guarantee</h3>
            <p className="text-sm text-muted-foreground">
              Money-back guarantee
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-1">No setup fees</h3>
            <p className="text-sm text-muted-foreground">Start immediately</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-1">Cancel anytime</h3>
            <p className="text-sm text-muted-foreground">
              No long-term contracts
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-1">SOC 2 & GDPR</h3>
            <p className="text-sm text-muted-foreground">Enterprise security</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
