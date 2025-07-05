import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Separator } from "../ui/separator"
import {
  ArrowUpIcon,
  ArrowDownIcon,
  Users,
  CreditCard,
  FileText,
  Zap,
  Activity,
  HeadphonesIcon,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { ActivityFeed } from "./activity-feed"

export function DashboardOverview() {
  const [metrics, ] = useState({
    totalUsers: 45672,
    userGrowth: 12,
    proSubscriptions: 3245,
    enterpriseSubscriptions: 187,
    mrr: 89432,
    churnRate: 2.3,
    filesProcessedToday: 127834,
    processingRate: 2.3,
    successRate: 99.7,
    apiCalls: 2400000,
    rateLimitViolations: 23,
    uptime: 99.98,
    responseTime: 145,
    openTickets: 12,
    pendingTickets: 3,
    avgResponseTime: 1.2,
    satisfaction: 4.8,
  })

  const metricCards = [
    {
      title: "Total Users",
      value: metrics.totalUsers.toLocaleString(),
      change: `+${metrics.userGrowth}% this month`,
      changeType: "positive" as const,
      icon: Users,
      action: "View All Users",
      description: "Active registered users",
    },
    {
      title: "Active Subscriptions",
      value: `${metrics.proSubscriptions.toLocaleString()} Pro | ${metrics.enterpriseSubscriptions} Enterprise`,
      change: `MRR: $${metrics.mrr.toLocaleString()}`,
      changeType: "neutral" as const,
      icon: CreditCard,
      action: "Billing Overview",
      description: `Churn rate: ${metrics.churnRate}%`,
    },
    {
      title: "Files Processed Today",
      value: metrics.filesProcessedToday.toLocaleString(),
      change: `${metrics.processingRate} files/second`,
      changeType: "positive" as const,
      icon: FileText,
      action: "Processing Queue",
      description: `Success rate: ${metrics.successRate}%`,
    },
    {
      title: "API Calls (24h)",
      value: `${(metrics.apiCalls / 1000000).toFixed(1)}M calls`,
      change: `${metrics.rateLimitViolations} rate limit violations`,
      changeType: "negative" as const,
      icon: Zap,
      action: "API Analytics",
      description: "Top endpoints usage",
    },
    {
      title: "System Health",
      value: "All Systems Operational",
      change: `Uptime: ${metrics.uptime}%`,
      changeType: "positive" as const,
      icon: Activity,
      action: "System Status",
      description: `Response time: ${metrics.responseTime}ms avg`,
    },
    {
      title: "Support Tickets",
      value: `${metrics.openTickets} Open | ${metrics.pendingTickets} Pending`,
      change: `Avg response: ${metrics.avgResponseTime}h`,
      changeType: "neutral" as const,
      icon: HeadphonesIcon,
      action: "Support Queue",
      description: `Satisfaction: ${metrics.satisfaction}/5`,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metricCards.map((card, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{card.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                {card.changeType === "positive" && <ArrowUpIcon className="h-3 w-3 text-green-600" />}
                {card.changeType === "negative" && <ArrowDownIcon className="h-3 w-3 text-red-600" />}
                <span
                  className={
                    card.changeType === "positive"
                      ? "text-green-600"
                      : card.changeType === "negative"
                        ? "text-red-600"
                        : ""
                  }
                >
                  {card.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{card.description}</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                {card.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Activity and Quick Stats */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Server Load</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <Progress value={67} className="h-2" />

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Memory Usage</span>
                <span className="text-sm font-medium">43%</span>
              </div>
              <Progress value={43} className="h-2" />

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Storage</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Active Sessions</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Queue Length</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Error Rate</span>
                  <span className="font-medium text-green-600">0.03%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">High API usage detected</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Database backup completed</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Scheduled maintenance in 2 hours</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
