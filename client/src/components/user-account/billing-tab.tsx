import { Label } from "../ui/label";
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
import { useAuth } from "../../context/auth";
import { toast } from "sonner";

export function BillingTab() {
  const { user } = useAuth();

  const totalCredits = 500;
  const usedCredits = totalCredits - (user?.credits ?? 0);

  const used = 500 - (user?.credits ?? 0);
  const percentUsed = Math.round((used / 500) * 100);
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
              You've used {usedCredits} of {500} credits this month
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" disabled>
              <Plus className="h-4 w-4 mr-2" />
              Purchase Credits
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("Feature Coming soon!")}
            >
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
