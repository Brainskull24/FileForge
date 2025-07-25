export const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  export const exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
  };

  export const creditOperations = [
    { operation: "Basic Encoding/Decoding operation", credits: 5 },
    { operation: "File conversions", credits: 10 },
    { operation: "Batch operation (Coming Soon)", credits: 20 },
  ];

  export const getPricingTiers = (isAnnual: boolean) => [
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

  export const comparisonFeatures = [
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

  export const faqs = [
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