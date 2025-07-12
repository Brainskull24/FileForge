"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { MoreHorizontal, Search, UserPlus, Filter, Eye, Edit, Ban } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  registrationDate: Date
  plan: "Free" | "Pro" | "Enterprise"
  lastActivity: Date
  status: "Active" | "Suspended" | "Pending"
  avatar?: string
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      registrationDate: new Date("2024-01-15"),
      plan: "Pro",
      lastActivity: new Date("2024-01-20"),
      status: "Active",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      registrationDate: new Date("2024-01-10"),
      plan: "Enterprise",
      lastActivity: new Date("2024-01-19"),
      status: "Active",
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol@example.com",
      registrationDate: new Date("2024-01-18"),
      plan: "Free",
      lastActivity: new Date("2024-01-18"),
      status: "Pending",
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david@example.com",
      registrationDate: new Date("2024-01-12"),
      plan: "Pro",
      lastActivity: new Date("2024-01-17"),
      status: "Suspended",
    },
    {
      id: "5",
      name: "Eva Brown",
      email: "eva@example.com",
      registrationDate: new Date("2024-01-16"),
      plan: "Pro",
      lastActivity: new Date("2024-01-20"),
      status: "Active",
    },
  ])

  const getStatusBadge = (status: User["status"]) => {
    const variants = {
      Active: "default",
      Suspended: "destructive",
      Pending: "secondary",
    } as const
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  const getPlanBadge = (plan: User["plan"]) => {
    const variants = {
      Free: "outline",
      Pro: "default",
      Enterprise: "secondary",
    } as const
    return <Badge variant={variants[plan]}>{plan}</Badge>
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* User Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,672</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42,341</div>
            <p className="text-xs text-muted-foreground">92.7% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3%</div>
            <p className="text-xs text-muted-foreground">-0.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* User Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Manage and monitor user accounts</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.registrationDate.toLocaleDateString()}</TableCell>
                  <TableCell>{getPlanBadge(user.plan)}</TableCell>
                  <TableCell>{user.lastActivity.toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Ban className="mr-2 h-4 w-4" />
                          Suspend User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
