import { Label } from "../ui/label";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Plus, Star, DollarSign, TrendingUp } from "lucide-react";
import api from "../../lib/axios";
import { useAuth } from "../../context/auth";

export function BillingTab() {
  // const [paymentMethods] = useState(paymentMethodsData);
  // const [invoices] = useState(invoiceData);
  const [balance, setBalance] = useState(0);
  const [limit, setLimit] = useState(2000);
  // const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await api.get("/user/credits");
        setBalance(res.data.balance);
        setLimit(res.data.limit);
      } catch (err) {
        // toast.error("Failed to load credit data");
        console.error(err);
      }
    };
    fetchCredits();
  }, []);

  const totalCredits = 500;
  const usedCredits = totalCredits - (user?.credits ?? 0);

  const used = limit - balance;
  const percentUsed = Math.round((used / limit) * 100);
  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Current Subscription
          </CardTitle>
          <CardDescription>
            Your current plan and billing information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Free Plan</h3>
                <Badge variant="default">Active</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Up to 40 file conversions per month</li>
                <li>• Standard processing queue</li>
                <li>• No API access</li>
                <li>• Basic feature set</li>
                <li>• Community support only</li>
              </ul>
            </div>
            <div className="text-right space-y-2">
              <div className="text-2xl font-bold">$0</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
          </div>
          <Button className="w-full" variant="secondary" disabled>
            Upgrade to Pro (Coming Soon)
          </Button>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      {/* <Card>
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
              <div
                key={method.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
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
                    <div className="text-sm text-muted-foreground">
                      Expires {method.expiry}
                    </div>
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
      </Card> */}

      {/* Billing History */}
      {/* <Card>
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
      </Card> */}

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
              <span className="text-2xl font-bold">
                {user?.credits} credits
              </span>
            </div>
            <Progress value={percentUsed} className="w-full" />
            <p className="text-sm text-muted-foreground">
              You've used {usedCredits} of {500} credits this
              month
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" disabled>
              <Plus className="h-4 w-4 mr-2" />
              Purchase Credits
            </Button>
            <Button variant="outline" onClick={() => alert("Coming soon")}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Usage Analytics
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Auto-recharge Settings</Label>
            <p className="text-sm text-muted-foreground">
              Automatically purchase 1,000 credits when balance drops below 100
              credits
            </p>
            <Button variant="outline" size="sm" disabled>
              Configure Auto-recharge
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
