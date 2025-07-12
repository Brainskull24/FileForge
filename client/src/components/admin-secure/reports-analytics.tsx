"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { FileText, Download, Calendar, BarChart3, Users, DollarSign, Activity, Clock } from "lucide-react"

export function ReportsAnalytics() {
  const scheduledReports = [
    {
      name: "Daily System Summary",
      frequency: "Daily",
      lastRun: "2024-01-20 06:00",
      nextRun: "2024-01-21 06:00",
      status: "active",
    },
    {
      name: "Weekly User Activity",
      frequency: "Weekly",
      lastRun: "2024-01-15 08:00",
      nextRun: "2024-01-22 08:00",
      status: "active",
    },
    {
      name: "Monthly Financial Summary",
      frequency: "Monthly",
      lastRun: "2024-01-01 09:00",
      nextRun: "2024-02-01 09:00",
      status: "active",
    },
    {
      name: "Quarterly Business Review",
      frequency: "Quarterly",
      lastRun: "2024-01-01 10:00",
      nextRun: "2024-04-01 10:00",
      status: "active",
    },
  ]

  const recentReports = [
    {
      name: "User Engagement Analysis",
      type: "Custom",
      generatedBy: "John Doe",
      createdAt: "2024-01-20 14:30",
      size: "2.3 MB",
      format: "PDF",
    },
    {
      name: "Revenue Performance Q1",
      type: "Financial",
      generatedBy: "Jane Smith",
      createdAt: "2024-01-19 16:45",
      size: "1.8 MB",
      format: "Excel",
    },
    {
      name: "System Performance Weekly",
      type: "Technical",
      generatedBy: "System",
      createdAt: "2024-01-19 08:00",
      size: "945 KB",
      format: "PDF",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Create Custom Report
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Active schedules</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Exported</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45.7 GB</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Report Views</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,847</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Report Generation</CardTitle>
                <CardDescription>Generate common reports instantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Users className="mr-2 h-4 w-4" />
                    User Activity Report
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Revenue Summary
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Activity className="mr-2 h-4 w-4" />
                    System Performance
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    File Processing Stats
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Latest generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {report.createdAt} • {report.size} • {report.format}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>Automated report generation and delivery</CardDescription>
                </div>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule New Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledReports.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.frequency}</TableCell>
                      <TableCell>{report.lastRun}</TableCell>
                      <TableCell>{report.nextRun}</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create custom reports with drag-and-drop interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">Data Source</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="users">User Data</SelectItem>
                      <SelectItem value="files">File Processing</SelectItem>
                      <SelectItem value="revenue">Revenue Data</SelectItem>
                      <SelectItem value="system">System Metrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Time Range</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                      <SelectItem value="1y">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Format</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button>Generate Report</Button>
                <Button variant="outline">Save Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Report Usage Analytics</CardTitle>
                <CardDescription>Most popular reports and usage patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>User Activity Reports</span>
                    <span className="font-medium">45% of total</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Financial Reports</span>
                    <span className="font-medium">28% of total</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "28%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>System Performance</span>
                    <span className="font-medium">18% of total</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "18%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Custom Reports</span>
                    <span className="font-medium">9% of total</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "9%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Report generation and delivery statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Generation Time</span>
                  <span className="text-sm font-medium">2.3 seconds</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="text-sm font-medium text-green-600">99.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Failed Reports</span>
                  <span className="text-sm font-medium">3 this month</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Delivery Rate</span>
                  <span className="text-sm font-medium text-green-600">98.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage Used</span>
                  <span className="text-sm font-medium">127 GB</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
