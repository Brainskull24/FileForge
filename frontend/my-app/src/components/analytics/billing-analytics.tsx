import { useState } from "react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Progress } from "../ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Switch } from "../ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { CreditCard, Download, Eye, Plus, Settings, TrendingUp, Zap, FileText, Bell, Check, Star } from "lucide-react"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data
const creditUsageData = [
  { month: "Jan", credits: 1200 },
  { month: "Feb", credits: 1800 },
  { month: "Mar", credits: 1500 },
  { month: "Apr", credits: 2200 },
  { month: "May", credits: 1900 },
  { month: "Jun", credits: 2400 },
]

const usageBreakdownData = [
  { name: "File conversions", value: 40, color: "#3b82f6" },
  { name: "Encoding operations", value: 25, color: "#10b981" },
  { name: "Batch processing", value: 20, color: "#f59e0b" },
  { name: "API calls", value: 15, color: "#ef4444" },
]

const billingHistory = [
  { id: "INV-001", date: "2024-06-01", description: "Pro Plan - Monthly", amount: "$29.99", status: "Paid" },
  {
    id: "INV-002",
    date: "2024-05-15",
    description: "Credit Purchase - 1,500 credits",
    amount: "$24.99",
    status: "Paid",
  },
  { id: "INV-003", date: "2024-05-01", description: "Pro Plan - Monthly", amount: "$29.99", status: "Paid" },
  { id: "INV-004", date: "2024-04-01", description: "Pro Plan - Monthly", amount: "$29.99", status: "Failed" },
]

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "month",
    credits: "100",
    features: ["Basic file conversions", "5MB file limit", "Email support", "Standard processing speed"],
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
]

export default function BillingCredits() {
  const [currentPlan,] = useState("Pro")
  const [autoRecharge, setAutoRecharge] = useState(false)
  const [lowBalanceThreshold, setLowBalanceThreshold] = useState("100")
  const [showPlanComparison, setShowPlanComparison] = useState(false)
  const [showAddPayment, setShowAddPayment] = useState(false)

  const currentCredits = 1847
  const monthlyAllowance = 2500
  const creditsUsed = monthlyAllowance - currentCredits
  const usagePercentage = (creditsUsed / monthlyAllowance) * 100

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Billing & Credits</h1>
          <p className="text-muted-foreground mt-2">Manage your subscription and credit usage</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            Current Plan: {currentPlan}
          </Badge>
          <Button variant="outline" onClick={() => setShowPlanComparison(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Manage Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credit Balance Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Credit Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{currentCredits.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Credits remaining</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used this month</span>
                <span>
                  {creditsUsed.toLocaleString()} / {monthlyAllowance.toLocaleString()}
                </span>
              </div>
              <Progress value={usagePercentage} className="h-2" />
              <div className="text-xs text-muted-foreground text-center">
                {usagePercentage.toFixed(1)}% of monthly allowance used
              </div>
            </div>

            <Button className="w-full" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Buy More Credits
            </Button>
          </CardContent>
        </Card>

        {/* Current Subscription */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>Your active plan and billing information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-lg px-3 py-1">
                    {currentPlan} Plan
                  </Badge>
                  <Badge variant="outline">Monthly</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="font-semibold">$29.99/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Next billing</span>
                    <span className="font-semibold">July 1, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Auto-renewal</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Plan Features</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    2,500 monthly credits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    100MB file limit
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    API access
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setShowPlanComparison(true)}>
                Change Plan
              </Button>
              <Button variant="outline">Update Payment Method</Button>
              <Button variant="destructive" size="sm">
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credit Usage Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Usage Trends (Last 6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={creditUsageData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="credits" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Breakdown</CardTitle>
            <CardDescription>Credit usage by operation type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={usageBreakdownData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                    {usageBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-2">
                {usageBreakdownData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                    <span className="font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credit Purchase Options */}
      <Card>
        <CardHeader>
          <CardTitle>Buy More Credits</CardTitle>
          <CardDescription>Choose a credit package that fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-center">Starter Pack</CardTitle>
                <div className="text-center">
                  <div className="text-3xl font-bold">500</div>
                  <div className="text-sm text-muted-foreground">credits</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">$9.99</div>
                  <div className="text-xs text-muted-foreground">$0.02 per credit</div>
                </div>
                <Button className="w-full">Purchase</Button>
              </CardContent>
            </Card>

            <Card className="relative border-primary">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">Best Value</Badge>
              <CardHeader>
                <CardTitle className="text-center">Popular Pack</CardTitle>
                <div className="text-center">
                  <div className="text-3xl font-bold">1,500</div>
                  <div className="text-sm text-muted-foreground">credits</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">$24.99</div>
                  <div className="text-xs text-muted-foreground">$0.017 per credit</div>
                  <Badge variant="secondary" className="text-xs">
                    Save 15%
                  </Badge>
                </div>
                <Button className="w-full">Purchase</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Power Pack</CardTitle>
                <div className="text-center">
                  <div className="text-3xl font-bold">5,000</div>
                  <div className="text-sm text-muted-foreground">credits</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">$79.99</div>
                  <div className="text-xs text-muted-foreground">$0.016 per credit</div>
                  <Badge variant="secondary" className="text-xs">
                    Save 20%
                  </Badge>
                </div>
                <Button className="w-full">Purchase</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5" />
                  <div>
                    <div className="font-medium">•••• •••• •••• 4242</div>
                    <div className="text-sm text-muted-foreground">Expires 12/25</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Default
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowAddPayment(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Card
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Auto-Recharge Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-recharge">Enable Auto-Recharge</Label>
              <Switch id="auto-recharge" checked={autoRecharge} onCheckedChange={setAutoRecharge} />
            </div>

            {autoRecharge && (
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label>Recharge when credits fall below</Label>
                  <Select value={lowBalanceThreshold} onValueChange={setLowBalanceThreshold}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50 credits</SelectItem>
                      <SelectItem value="100">100 credits</SelectItem>
                      <SelectItem value="200">200 credits</SelectItem>
                      <SelectItem value="500">500 credits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Credit package for auto-recharge</Label>
                  <Select defaultValue="popular">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter Pack (500 credits)</SelectItem>
                      <SelectItem value="popular">Popular Pack (1,500 credits)</SelectItem>
                      <SelectItem value="power">Power Pack (5,000 credits)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Billing History
          </CardTitle>
          <CardDescription>View and download your invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input placeholder="Search invoices..." className="sm:max-w-xs" />
              <Select defaultValue="all">
                <SelectTrigger className="sm:max-w-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All transactions</SelectItem>
                  <SelectItem value="subscription">Subscriptions</SelectItem>
                  <SelectItem value="credits">Credit purchases</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingHistory.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.description}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          invoice.status === "Paid"
                            ? "default"
                            : invoice.status === "Failed"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Usage Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Usage Alerts
          </CardTitle>
          <CardDescription>Configure notifications for credit usage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Low Balance Warnings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Email notifications</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>In-app notifications</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>SMS alerts (Pro+)</Label>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Alert Thresholds</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Low balance warning at</Label>
                  <Select defaultValue="20">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10% remaining</SelectItem>
                      <SelectItem value="20">20% remaining</SelectItem>
                      <SelectItem value="30">30% remaining</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Critical balance warning at</Label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5% remaining</SelectItem>
                      <SelectItem value="10">10% remaining</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Comparison Modal */}
      <Dialog open={showPlanComparison} onOpenChange={setShowPlanComparison}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Choose Your Plan</DialogTitle>
            <DialogDescription>Compare features and select the plan that best fits your needs</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.name === "Pro" ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.name === "Pro" && <Star className="w-5 h-5 text-yellow-500" />}
                  </div>
                  <div className="text-3xl font-bold">
                    {plan.price}
                    <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{plan.credits} credits/month</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.name === currentPlan ? "secondary" : "default"}
                    disabled={plan.name === currentPlan}
                  >
                    {plan.name === currentPlan ? "Current Plan" : plan.name === "Free" ? "Downgrade" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Payment Method Modal */}
      <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>Add a new credit card to your account</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input id="card-name" placeholder="John Doe" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="default-payment" />
                <Label htmlFor="default-payment">Set as default payment method</Label>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">Add Card</Button>
                <Button variant="outline" onClick={() => setShowAddPayment(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
