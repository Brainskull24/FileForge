export const apiKey = [
  {
    id: 1,
    name: "Production API",
    key: "sk_live_...",
    created: "2024-01-15",
    lastUsed: "2 hours ago",
    requests: "1,234",
    status: "Active",
  },
  {
    id: 2,
    name: "Development API",
    key: "sk_test_...",
    created: "2024-01-10",
    lastUsed: "1 day ago",
    requests: "456",
    status: "Active",
  },
  {
    id: 3,
    name: "Mobile App API",
    key: "sk_live_...",
    created: "2023-12-20",
    lastUsed: "Never",
    requests: "0",
    status: "Inactive",
  },
];

export const invoiceData = [
  {
    id: 1,
    date: "2024-01-01",
    amount: "$29.99",
    status: "Paid",
    downloadUrl: "#",
  },
  {
    id: 2,
    date: "2023-12-01",
    amount: "$29.99",
    status: "Paid",
    downloadUrl: "#",
  },
  {
    id: 3,
    date: "2023-11-01",
    amount: "$29.99",
    status: "Paid",
    downloadUrl: "#",
  },
  {
    id: 4,
    date: "2023-10-01",
    amount: "$29.99",
    status: "Refunded",
    downloadUrl: "#",
  },
];

export const paymentMethodsData = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
  {
    id: 2,
    type: "Mastercard",
    last4: "8888",
    expiry: "08/26",
    isDefault: false,
  },
];

export const activeSessions = [
  {
    id: 1,
    device: "Chrome on Windows",
    location: "New York, US",
    lastActive: "Active now",
    current: true,
  },
  {
    id: 2,
    device: "Safari on iPhone",
    location: "New York, US",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: 3,
    device: "Firefox on macOS",
    location: "San Francisco, US",
    lastActive: "1 day ago",
    current: false,
  },
];

export const loginActivity = [
  {
    id: 1,
    timestamp: "2024-01-20 14:30",
    device: "Chrome on Windows",
    location: "New York, US",
    status: "Success",
  },
  {
    id: 2,
    timestamp: "2024-01-20 09:15",
    device: "Safari on iPhone",
    location: "New York, US",
    status: "Success",
  },
  {
    id: 3,
    timestamp: "2024-01-19 18:45",
    device: "Firefox on macOS",
    location: "San Francisco, US",
    status: "Success",
  },
  {
    id: 4,
    timestamp: "2024-01-19 10:20",
    device: "Unknown Device",
    location: "Unknown Location",
    status: "Failed",
  },
];
