import { useState } from "react";
import { Check, X, Shield, Clock, CreditCard, ChevronDown } from "lucide-react";
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
import {
  getPricingTiers,
  currencySymbols,
  exchangeRates,
  creditOperations,
  comparisonFeatures,
  faqs,
} from "../../data/pricingConfigs";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [credits, setCredits] = useState([100]);
  const [currency, setCurrency] = useState("USD");
  const [showComparison, setShowComparison] = useState(false);
  const pricingTiers = getPricingTiers(isAnnual);

  const convertPrice = (price: number) => {
    return Math.round(
      price * exchangeRates[currency as keyof typeof exchangeRates]
    );
  };

  const calculateOperations = (totalCredits: number) => {
    return creditOperations.map((op) => ({
      ...op,
      count: Math.floor(totalCredits / op.credits),
    }));
  };

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
                {tier.name != "Free" ? (
                  <Button
                    variant={tier.ctaVariant}
                    className="w-full"
                    size="lg"
                    disabled
                  >
                    Coming Soon
                  </Button>
                ) : (
                  <Button
                    variant={tier.ctaVariant}
                    className="w-full"
                    size="lg"
                  >
                    Current Plan
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
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
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-1">7-day guarantee</h3>
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
