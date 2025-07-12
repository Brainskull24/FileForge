"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Shield, AlertTriangle, CheckCircle, Lock, Key } from "lucide-react"

export function SecurityCompliance() {
  const securityAlerts = [
    {
      id: "1",
      type: "Failed Login",
      description: "Multiple failed login attempts from IP 192.168.1.100",
      severity: "medium",
      timestamp: new Date("2024-01-20T10:30:00"),
      status: "investigating",
    },
    {
      id: "2",
      type: "API Abuse",
      description: "Rate limit exceeded by user ID 12345",
      severity: "low",
      timestamp: new Date("2024-01-20T09:15:00"),
      status: "resolved",
    },
    {
      id: "3",
      type: "Suspicious Activity",
      description: "Unusual file access pattern detected",
      severity: "high",
      timestamp: new Date("2024-01-20T08:45:00"),
      status: "open",
    },
  ]

  const complianceItems = [
    { name: "GDPR Compliance", status: "compliant", lastAudit: "2024-01-15" },
    { name: "SOC 2 Type II", status: "compliant", lastAudit: "2023-12-01" },
    { name: "ISO 27001", status: "in-progress", lastAudit: "2024-01-10" },
    { name: "HIPAA", status: "compliant", lastAudit: "2023-11-20" },
  ]

  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: "outline",
      medium: "secondary",
      high: "destructive",
    } as const
    return <Badge variant={variants[severity as keyof typeof variants]}>{severity}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      compliant: "default",
      "in-progress": "secondary",
      "non-compliant": "destructive",
    } as const
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Security & Compliance</h2>
        <Badge variant="outline" className="text-green-600 border-green-600">
          <Shield className="w-3 h-3 mr-1" />
          Security Status: Good
        </Badge>
      </div>

      <Tabs defaultValue="security" className="space-y-4">
        <TabsList>
          <TabsTrigger value="security">Security Monitoring</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                <Shield className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94/100</div>
                <Progress value={94} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Excellent security posture</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 medium, 1 high priority</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed Logins (24h)</CardTitle>
                <Lock className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">-23% from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">2FA Adoption</CardTitle>
                <Key className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78.3%</div>
                <Progress value={78.3} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">35,789 users enabled</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Security Alerts</CardTitle>
                <CardDescription>Latest security incidents and threats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <AlertTriangle
                        className={`h-4 w-4 mt-0.5 ${
                          alert.severity === "high"
                            ? "text-red-600"
                            : alert.severity === "medium"
                              ? "text-yellow-600"
                              : "text-blue-600"
                        }`}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{alert.type}</p>
                          {getSeverityBadge(alert.severity)}
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Metrics</CardTitle>
                <CardDescription>Key security performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Vulnerability Scan Score</span>
                  <span className="text-sm font-medium text-green-600">A+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SSL Certificate Status</span>
                  <span className="text-sm font-medium text-green-600">Valid</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Firewall Rules</span>
                  <span className="text-sm font-medium">247 active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Intrusion Attempts Blocked</span>
                  <span className="text-sm font-medium">1,247 today</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Encryption</span>
                  <span className="text-sm font-medium text-green-600">AES-256</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Current compliance with various standards and regulations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {complianceItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle
                          className={`h-5 w-5 ${
                            item.status === "compliant"
                              ? "text-green-600"
                              : item.status === "in-progress"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Last audit: {new Date(item.lastAudit).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Data Protection</CardTitle>
                  <CardDescription>GDPR and privacy compliance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Subject Requests</span>
                    <span className="text-sm font-medium">23 this month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Response Time</span>
                    <span className="text-sm font-medium">2.3 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Retention Compliance</span>
                    <span className="text-sm font-medium text-green-600">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consent Management</span>
                    <span className="text-sm font-medium text-green-600">Active</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Audit Schedule</CardTitle>
                  <CardDescription>Upcoming compliance audits and reviews</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SOC 2 Annual Review</span>
                    <span className="text-sm font-medium">March 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ISO 27001 Certification</span>
                    <span className="text-sm font-medium">April 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GDPR Assessment</span>
                    <span className="text-sm font-medium">May 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Penetration Test</span>
                    <span className="text-sm font-medium">June 2024</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>Recent administrative actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-01-20 10:30:15</TableCell>
                    <TableCell>admin@fileforge.com</TableCell>
                    <TableCell>User Account Modified</TableCell>
                    <TableCell>user_12345</TableCell>
                    <TableCell>192.168.1.100</TableCell>
                    <TableCell>
                      <Badge variant="default">Success</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-01-20 10:25:42</TableCell>
                    <TableCell>support@fileforge.com</TableCell>
                    <TableCell>File Access Granted</TableCell>
                    <TableCell>document_789</TableCell>
                    <TableCell>192.168.1.101</TableCell>
                    <TableCell>
                      <Badge variant="default">Success</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-01-20 10:20:33</TableCell>
                    <TableCell>admin@fileforge.com</TableCell>
                    <TableCell>System Configuration Changed</TableCell>
                    <TableCell>rate_limits</TableCell>
                    <TableCell>192.168.1.100</TableCell>
                    <TableCell>
                      <Badge variant="default">Success</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-01-20 10:15:21</TableCell>
                    <TableCell>unknown</TableCell>
                    <TableCell>Failed Login Attempt</TableCell>
                    <TableCell>admin_panel</TableCell>
                    <TableCell>203.0.113.45</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Failed</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Requests</CardTitle>
                <CardDescription>Data subject requests and processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Export Requests</span>
                  <span className="text-sm font-medium">12 pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Deletion Requests</span>
                  <span className="text-sm font-medium">8 pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Correction Requests</span>
                  <span className="text-sm font-medium">3 pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Processing Time</span>
                  <span className="text-sm font-medium">2.1 days</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Inventory</CardTitle>
                <CardDescription>Overview of data types and storage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Personal Data Records</span>
                  <span className="text-sm font-medium">45,672</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">File Storage (TB)</span>
                  <span className="text-sm font-medium">2.3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Retention Policy</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Automated Deletion</span>
                  <span className="text-sm font-medium text-green-600">Enabled</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
