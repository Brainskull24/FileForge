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
import {
  CreditCard,
  User,
  Settings,
  Crown,
  FileCode,
  TerminalSquare,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "sonner";

export function DashboardHeader() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const MAX_CREDITS = 500;
  const creditPercentage = ((user?.credits ?? 0) / MAX_CREDITS) * 100;

  const handleLogout = async () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout. Try again.");
    }
  };

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
            <div className="text-sm font-medium">{user?.credits} credits</div>
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
          disabled
        >
          <Crown className="h-4 w-4 mr-2" />
          Upgrade to Pro
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate("/account")}>
              <CreditCard className="mr-2 h-4 w-4" />
              My Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/processing-history")}>
              <Settings className="mr-2 h-4 w-4" />
              Processing History
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/api-docs")}>
              <FileCode className="mr-2 h-4 w-4" />
              Explore APIs
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/cli")}>
              <TerminalSquare className="mr-2 h-4 w-4" />
              CLI Tool
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4 text-red-500" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
