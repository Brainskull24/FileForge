import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { UserPlus, FileCheck, Zap, AlertCircle, CreditCard, MessageSquare, Filter } from "lucide-react"

interface Activity {
  id: string
  type: "user_registration" | "file_processing" | "api_spike" | "error" | "payment" | "support"
  title: string
  description: string
  timestamp: Date
  severity: "low" | "medium" | "high"
  user?: string
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // Simulate real-time activity feed
    const generateActivity = (): Activity => {
      const types = ["user_registration", "file_processing", "api_spike", "error", "payment", "support"] as const
      const type = types[Math.floor(Math.random() * types.length)]

      const activityTemplates = {
        user_registration: {
          title: "New user registered",
          description: "User signed up for Pro plan",
          severity: "low" as const,
        },
        file_processing: {
          title: "File processing completed",
          description: "PDF conversion finished successfully",
          severity: "low" as const,
        },
        api_spike: {
          title: "API usage spike detected",
          description: "Endpoint /api/convert experiencing high traffic",
          severity: "medium" as const,
        },
        error: {
          title: "System error occurred",
          description: "Database connection timeout",
          severity: "high" as const,
        },
        payment: {
          title: "Payment processed",
          description: "Monthly subscription payment received",
          severity: "low" as const,
        },
        support: {
          title: "Support ticket created",
          description: "User reported file upload issue",
          severity: "medium" as const,
        },
      }

      return {
        id: Math.random().toString(36).substr(2, 9),
        type,
        ...activityTemplates[type],
        timestamp: new Date(),
        user: `user_${Math.floor(Math.random() * 1000)}`,
      }
    }

    // Initial activities
    const initialActivities = Array.from({ length: 10 }, generateActivity)
    setActivities(initialActivities)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setActivities((prev) => [generateActivity(), ...prev.slice(0, 19)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getActivityIcon = (type: Activity["type"]) => {
    const icons = {
      user_registration: UserPlus,
      file_processing: FileCheck,
      api_spike: Zap,
      error: AlertCircle,
      payment: CreditCard,
      support: MessageSquare,
    }
    return icons[type]
  }

  const getSeverityColor = (severity: Activity["severity"]) => {
    const colors = {
      low: "text-green-600",
      medium: "text-yellow-600",
      high: "text-red-600",
    }
    return colors[severity]
  }

  const filteredActivities = filter === "all" ? activities : activities.filter((activity) => activity.type === filter)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Real-Time Activity Feed</CardTitle>
            <CardDescription>Live system activities and events</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="user_registration">User Registration</SelectItem>
                <SelectItem value="file_processing">File Processing</SelectItem>
                <SelectItem value="api_spike">API Spikes</SelectItem>
                <SelectItem value="error">Errors</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type)
              return (
                <div key={activity.id}>
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full bg-muted ${getSeverityColor(activity.severity)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <Badge
                          variant={
                            activity.severity === "high"
                              ? "destructive"
                              : activity.severity === "medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {activity.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp.toLocaleTimeString()} • {activity.user}
                      </p>
                    </div>
                  </div>
                  {index < filteredActivities.length - 1 && <Separator className="mt-4" />}
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
