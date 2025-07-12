export const creditUsageData = [
  { month: "Jan", credits: 1200 },
  { month: "Feb", credits: 1800 },
  { month: "Mar", credits: 1500 },
  { month: "Apr", credits: 2200 },
  { month: "May", credits: 1900 },
  { month: "Jun", credits: 2400 },
];

export const usageBreakdownData = [
  { name: "File conversions", value: 40, color: "#3b82f6" },
  { name: "Encoding operations", value: 25, color: "#10b981" },
  { name: "Batch processing", value: 20, color: "#f59e0b" },
  { name: "API calls", value: 15, color: "#ef4444" },
];

export const billingHistory = [
  {
    id: "INV-001",
    date: "2024-06-01",
    description: "Pro Plan - Monthly",
    amount: "$29.99",
    status: "Paid",
  },
  {
    id: "INV-002",
    date: "2024-05-15",
    description: "Credit Purchase - 1,500 credits",
    amount: "$24.99",
    status: "Paid",
  },
  {
    id: "INV-003",
    date: "2024-05-01",
    description: "Pro Plan - Monthly",
    amount: "$29.99",
    status: "Paid",
  },
  {
    id: "INV-004",
    date: "2024-04-01",
    description: "Pro Plan - Monthly",
    amount: "$29.99",
    status: "Failed",
  },
];

export const plans = [
  {
    name: "Free",
    price: "$0",
    period: "month",
    credits: "100",
    features: [
      "Basic file conversions",
      "5MB file limit",
      "Email support",
      "Standard processing speed",
    ],
  },
  {
    name: "Pro",
    price: "$29.99",
    period: "month",
    credits: "2,500",
    features: [
      "All conversion types",
      "100MB file limit",
      "Priority support",
      "Fast processing",
      "API access",
      "Batch processing",
    ],
  },
  {
    name: "Enterprise",
    price: "$99.99",
    period: "month",
    credits: "10,000",
    features: [
      "Unlimited conversions",
      "1GB file limit",
      "24/7 phone support",
      "Fastest processing",
      "Full API access",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
];
