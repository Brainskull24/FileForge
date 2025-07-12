import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Progress } from "../ui/progress";
import type { UserCredits } from "./main";
import {
  Bell,
  CreditCard,
  User,
  Settings,
  HelpCircle,
  Crown,
} from "lucide-react";

interface DashboardHeaderProps {
  userCredits: UserCredits;
}

export function DashboardHeader({ userCredits }: DashboardHeaderProps) {
  const creditPercentage = (userCredits.current / userCredits.total) * 100;

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-xl font-bold">Universal Converter</h1>
          <p className="text-sm text-muted-foreground">
            Convert anything, anywhere
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Credits Display */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-sm font-medium">
              {userCredits.current} credits
            </div>
            <Progress value={creditPercentage} className="w-20 h-1" />
          </div>
          <Badge variant={creditPercentage > 20 ? "default" : "destructive"}>
            {creditPercentage.toFixed(0)}%
          </Badge>
        </div>

        {/* Upgrade to Pro */}
        <Button
          size="sm"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Crown className="h-4 w-4 mr-2" />
          Upgrade to Pro
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              Buy Credits
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              Help Center
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
