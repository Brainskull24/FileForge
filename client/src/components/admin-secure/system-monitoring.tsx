"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Activity, Cpu, HardDrive, MemoryStick, Network, Database, Server, Zap } from "lucide-react"

export function SystemMonitoring() {
  const serverMetrics = [
    { name: "Server 1", cpu: 67, memory: 43, disk: 78, status: "healthy" },
    { name: "Server 2", cpu: 45, memory: 67, disk: 56, status: "healthy" },
    { name: "Server 3", cpu: 89, memory: 78, disk: 67, status: "warning" },
    { name: "Server 4", cpu: 34, memory: 45, disk: 89, status: "healthy" },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      healthy: "default",
      warning: "secondary",
      critical: "destructive",
    } as const
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">System Monitoring</h2>
        <Badge variant="outline" className="text-green-600 border-green-600">
          <Activity className="w-3 h-3 mr-1" />
          All Systems Operational
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="servers">Servers</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average CPU Usage</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">58.7%</div>
                <Progress value={58.7} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Across all servers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                <MemoryStick className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">58.2%</div>
                <Progress value={58.2} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">24.3GB / 41.7GB</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72.5%</div>
                <Progress value={72.5} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">1.45TB / 2TB</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Network I/O</CardTitle>
                <Network className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3 GB/s</div>
                <p className="text-xs text-muted-foreground mt-2">↑ 1.2 GB/s ↓ 1.1 GB/s</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Application Performance</CardTitle>
                <CardDescription>Response times and error rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Response Time</span>
                  <span className="text-sm font-medium">145ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">95th Percentile</span>
                  <span className="text-sm font-medium">287ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Error Rate</span>
                  <span className="text-sm font-medium text-green-600">0.03%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Requests/sec</span>
                  <span className="text-sm font-medium">2,847</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Queue Status</CardTitle>
                <CardDescription>Processing queues and backlogs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">File Processing Queue</span>
                  <span className="text-sm font-medium">23 items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Queue</span>
                  <span className="text-sm font-medium">7 items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Background Jobs</span>
                  <span className="text-sm font-medium">156 items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Failed Jobs</span>
                  <span className="text-sm font-medium text-red-600">2 items</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="servers" className="space-y-4">
          <div className="grid gap-4">
            {serverMetrics.map((server, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Server className="h-5 w-5" />
                      <CardTitle className="text-lg">{server.name}</CardTitle>
                    </div>
                    {getStatusBadge(server.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>CPU Usage</span>
                        <span>{server.cpu}%</span>
                      </div>
                      <Progress value={server.cpu} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Memory Usage</span>
                        <span>{server.memory}%</span>
                      </div>
                      <Progress value={server.memory} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Disk Usage</span>
                        <span>{server.disk}%</span>
                      </div>
                      <Progress value={server.disk} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Database Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Query Response Time</span>
                  <span className="text-sm font-medium">12ms avg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Connections</span>
                  <span className="text-sm font-medium">47 / 100</span>
                </div>
                <Progress value={47} />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Slow Queries</span>
                  <span className="text-sm font-medium text-yellow-600">3 in last hour</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database Size</span>
                  <span className="text-sm font-medium">2.3 GB</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cache Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cache Hit Rate</span>
                  <span className="text-sm font-medium text-green-600">94.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Memory Usage</span>
                  <span className="text-sm font-medium">1.2 GB / 2 GB</span>
                </div>
                <Progress value={60} />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Keys Stored</span>
                  <span className="text-sm font-medium">45,672</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Evictions/sec</span>
                  <span className="text-sm font-medium">0.3</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="h-5 w-5" />
                  <span>Network Traffic</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Inbound Traffic</span>
                  <span className="text-sm font-medium">1.2 GB/s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Outbound Traffic</span>
                  <span className="text-sm font-medium">1.1 GB/s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Packet Loss</span>
                  <span className="text-sm font-medium text-green-600">0.01%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Latency</span>
                  <span className="text-sm font-medium">23ms avg</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>CDN Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cache Hit Rate</span>
                  <span className="text-sm font-medium text-green-600">97.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bandwidth Saved</span>
                  <span className="text-sm font-medium">2.1 TB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Edge Locations</span>
                  <span className="text-sm font-medium">156 active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Time</span>
                  <span className="text-sm font-medium">45ms avg</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
