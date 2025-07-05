"use client"

import { Label } from "../../ui/label"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { Progress } from "../../ui/progress"
import { CreditCard, Download, Plus, Trash2, Star, DollarSign, TrendingUp } from "lucide-react"

export function BillingTab() {
  const [paymentMethods] = useState([
    { id: 1, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
    { id: 2, type: "Mastercard", last4: "8888", expiry: "08/26", isDefault: false },
  ])

  const [invoices] = useState([
    { id: 1, date: "2024-01-01", amount: "$29.99", status: "Paid", downloadUrl: "#" },
    { id: 2, date: "2023-12-01", amount: "$29.99", status: "Paid", downloadUrl: "#" },
    { id: 3, date: "2023-11-01", amount: "$29.99", status: "Paid", downloadUrl: "#" },
    { id: 4, date: "2023-10-01", amount: "$29.99", status: "Refunded", downloadUrl: "#" },
  ])

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Current Subscription
          </CardTitle>
          <CardDescription>Your current plan and billing information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Pro Plan</h3>
                <Badge variant="default">Active</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Unlimited file conversions</li>
                <li>• Priority processing</li>
                <li>• API access</li>
                <li>• Advanced features</li>
                <li>• Email support</li>
              </ul>
            </div>
            <div className="text-right space-y-2">
              <div className="text-2xl font-bold">$29.99</div>
              <div className="text-sm text-muted-foreground">per month</div>
              <div className="text-sm text-muted-foreground">Next billing: Feb 1, 2024</div>
            </div>
          </div>
          <Button className="w-full">Change Plan</Button>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {method.type} •••• {method.last4}
                      </span>
                      {method.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">Expires {method.expiry}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <Button variant="outline" size="sm">
                      Set Default
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your past invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.status === "Paid"
                          ? "secondary"
                          : invoice.status === "Refunded"
                            ? "destructive"
                            : "default"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Credit Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Credit Management
          </CardTitle>
          <CardDescription>Manage your processing credits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Current Balance</Label>
              <span className="text-2xl font-bold">1,250 credits</span>
            </div>
            <Progress value={75} className="w-full" />
            <p className="text-sm text-muted-foreground">You've used 750 of 2,000 credits this month</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Purchase Credits
            </Button>
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Usage Analytics
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Auto-recharge Settings</Label>
            <p className="text-sm text-muted-foreground">
              Automatically purchase 1,000 credits when balance drops below 100 credits
            </p>
            <Button variant="outline" size="sm">
              Configure Auto-recharge
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
