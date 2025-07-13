import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Shield } from "lucide-react";
import api from "../../lib/axios";

export function SecurityTab() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
    if (field === "new") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert("Please fill all fields");
      return;
    }

    if (passwordStrength < 100) {
      alert("Password is too weak");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      alert("New password and confirm password do not match");
      return;
    }
    try {
      setLoading(true);
      await api.put(`/account/update-password`, {
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });
      alert("Password updated successfully");
      setPasswords({ current: "", new: "", confirm: "" });
      setPasswordStrength(0);
    } catch (error) {
      alert("Failed to update password");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Change Password
          </CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwords.current}
              onChange={(e) => handlePasswordChange("current", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwords.new}
              onChange={(e) => handlePasswordChange("new", e.target.value)}
            />
            {passwords.new && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Progress value={passwordStrength} className="flex-1" />
                  <span className="text-sm text-muted-foreground">
                    {passwordStrength < 50
                      ? "Weak"
                      : passwordStrength < 75
                      ? "Good"
                      : "Strong"}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwords.confirm}
              onChange={(e) => handlePasswordChange("confirm", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Password Requirements</Label>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className={passwords.new.length >= 8 ? "text-green-600" : ""}>
                • At least 8 characters long
              </li>
              <li
                className={/[A-Z]/.test(passwords.new) ? "text-green-600" : ""}
              >
                • Contains uppercase letter
              </li>
              <li
                className={/[0-9]/.test(passwords.new) ? "text-green-600" : ""}
              >
                • Contains number
              </li>
              <li
                className={
                  /[^A-Za-z0-9]/.test(passwords.new) ? "text-green-600" : ""
                }
              >
                • Contains special character
              </li>
            </ul>
          </div>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Enable Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Use an authenticator app to generate verification codes
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>
          {twoFactorEnabled && (
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="text-center space-y-2">
                <div className="w-32 h-32 bg-muted mx-auto rounded-lg flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">QR Code</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Scan this QR code with your authenticator app
                </p>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full bg-transparent">
                  Generate Backup Codes
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Setup Recovery Options
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card> */}

      {/* Active Sessions */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>
            Manage your active sessions across devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    <span className="font-medium">{session.device}</span>
                    {session.current && (
                      <Badge variant="secondary" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {session.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.lastActive}
                    </span>
                  </div>
                </div>
                {!session.current && (
                  <Button variant="outline" size="sm">
                    Sign Out
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button variant="destructive" className="w-full">
            Sign Out All Other Devices
          </Button>
        </CardContent>
      </Card> */}

      {/* Login Activity */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Login Activity
          </CardTitle>
          <CardDescription>
            Recent login attempts and security events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.timestamp}</TableCell>
                  <TableCell>{activity.device}</TableCell>
                  <TableCell>{activity.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        activity.status === "Success"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}
    </div>
  );
}
