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
import { toast } from "sonner";
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
      toast.error("Please fill all fields");
      return;
    }

    if (passwordStrength < 100) {
      toast.warning("Password is too weak");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);
      await api.put(`/account/update-password`, {
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });
      toast.success("Password updated successfully");
      setPasswords({ current: "", new: "", confirm: "" });
      setPasswordStrength(0);
    } catch (error) {
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwords.current}
              onChange={(e) => handlePasswordChange("current", e.target.value)}
            />
          </div>

          {/* New Password */}
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
                  <span
                    className={`text-sm ${
                      passwordStrength < 50
                        ? "text-red-500"
                        : passwordStrength < 75
                        ? "text-yellow-500"
                        : "text-green-600"
                    }`}
                  >
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwords.confirm}
              onChange={(e) => handlePasswordChange("confirm", e.target.value)}
            />
          </div>

          {/* Password Requirements */}
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

          {/* Submit Button */}
          <Button onClick={handleSubmit} className="w-full">
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
