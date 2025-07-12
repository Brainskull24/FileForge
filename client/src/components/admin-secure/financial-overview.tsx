"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  RefreshCw,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export function FinancialOverview() {
  const revenueMetrics = {
    mrr: 89432,
    mrrGrowth: 12.5,
    arr: 1073184,
    churnRate: 2.3,
    ltv: 2847,
    cac: 127,
  }

  const subscriptionData = [
    { plan: "Free", count: 38245, revenue: 0, percentage: 83.7 },
    { plan: "Pro", count: 6847, revenue: 68470, percentage: 15.0 },
    { plan: "Enterprise", count: 580, revenue: 20962, percentage: 1.3 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Financial Overview</h2>
        <Badge variant="outline" className="text-green-600 border-green-600">
          <TrendingUp className="w-3 h-3 mr-1" />
          Revenue Growing
        </Badge>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${revenueMetrics.mrr.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{revenueMetrics.mrrGrowth}%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Annual Recurring Revenue</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${revenueMetrics.arr.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Projected based on current MRR</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customer Lifetime Value</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${revenueMetrics.ltv}</div>
                <p className="text-xs text-muted-foreground">Average across all plans</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customer Acquisition Cost</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${revenueMetrics.cac}</div>
                <p className="text-xs text-muted-foreground">
                  LTV/CAC ratio: {(revenueMetrics.ltv / revenueMetrics.cac).toFixed(1)}:1
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Revenue by subscription plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subscriptionData.map((plan, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{plan.plan} Plan</span>
                      <span className="font-medium">${plan.revenue.toLocaleString()}/month</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{plan.count.toLocaleString()} subscribers</span>
                      <span>{plan.percentage}% of total</span>
                    </div>
                    <Progress value={plan.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Churn Analysis</CardTitle>
                <CardDescription>Customer retention metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Monthly Churn Rate</span>
                  <span className="text-sm font-medium">{revenueMetrics.churnRate}%</span>
                </div>
                <Progress value={revenueMetrics.churnRate} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Revenue Churn</span>
                  <span className="text-sm font-medium">1.8%</span>
                </div>
                <Progress value={1.8} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Net Revenue Retention</span>
                  <span className="text-sm font-medium text-green-600">108%</span>
                </div>
                <Progress value={108} className="h-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Lifecycle</CardTitle>
                <CardDescription>Track subscription changes and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600">+247</div>
                    <p className="text-sm text-muted-foreground">New Subscriptions</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-blue-600">89</div>
                    <p className="text-sm text-muted-foreground">Upgrades</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-red-600">156</div>
                    <p className="text-sm text-muted-foreground">Cancellations</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              {subscriptionData.map((plan, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {plan.plan} Plan
                      <Badge variant={plan.plan === "Enterprise" ? "default" : "secondary"}>
                        {plan.count.toLocaleString()}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-2xl font-bold">${plan.revenue.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>Market Share</span>
                      <span>{plan.percentage}%</span>
                    </div>
                    <Progress value={plan.percentage} className="h-1" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payment Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.7%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">Requiring attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Refund Requests</CardTitle>
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Transaction</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$127</div>
                <p className="text-xs text-muted-foreground">Per successful payment</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution of payment methods used</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Credit Cards</span>
                    <span className="font-medium">78.3%</span>
                  </div>
                  <Progress value={78.3} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>PayPal</span>
                    <span className="font-medium">15.7%</span>
                  </div>
                  <Progress value={15.7} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Bank Transfer</span>
                    <span className="font-medium">4.2%</span>
                  </div>
                  <Progress value={4.2} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Other</span>
                    <span className="font-medium">1.8%</span>
                  </div>
                  <Progress value={1.8} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Issues</CardTitle>
                <CardDescription>Recent billing problems and resolutions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Expired Cards</span>
                  <span className="text-sm font-medium">23 pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Insufficient Funds</span>
                  <span className="text-sm font-medium">12 pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Disputed Charges</span>
                  <span className="text-sm font-medium">3 pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Processing Errors</span>
                  <span className="text-sm font-medium">9 pending</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecasting</CardTitle>
                <CardDescription>Projected revenue based on current trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Next Month Projection</span>
                  <span className="text-sm font-medium">$94,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Quarterly Projection</span>
                  <span className="text-sm font-medium">$287,400</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Annual Projection</span>
                  <span className="text-sm font-medium">$1,156,800</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Confidence Level</span>
                  <span className="text-sm font-medium text-green-600">87%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Financial Ratios</CardTitle>
                <CardDescription>Important business metrics and ratios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gross Margin</span>
                  <span className="text-sm font-medium">87.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Operating Margin</span>
                  <span className="text-sm font-medium">23.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cash Burn Rate</span>
                  <span className="text-sm font-medium">$45,200/month</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Runway</span>
                  <span className="text-sm font-medium">18 months</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
