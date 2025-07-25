import { useEffect, useState } from "react";
import { Camera, Trash2, CheckCircle, Loader2 } from "lucide-react";
import api from "../../lib/axios";
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
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { useAuth } from "../../context/auth";

export function ProfileTab() {
  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [removingAvatar, setRemovingAvatar] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    createdAt: "",
    lastLogin: user?.lastLogin || "",
    accountType: "Free",
    role: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  // Set initial values from user
  useEffect(() => {
    if (!user) return;

    setFormData({
      fullName: user.name || "",
      phone: user.phone || "",
      createdAt: user.createdAt || "",
      lastLogin: user.lastLogin || "",
      accountType: "Free",
      role: user.role || "",
      street: user.address?.street || "",
      city: user.address?.city || "",
      state: user.address?.state || "",
      country: user.address?.country || "",
      postalCode: user.address?.postalCode || "",
    });

    setAvatar(user.photo || null);
    setLoading(false);
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    const [first = "", second = ""] = name.trim().split(" ");
    return (first[0] + (second[0] || "")).toUpperCase();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = async () => {
    setRemovingAvatar(true);
    try {
      await api.delete("/account/user-avatar");
      setAvatar(null);
      setAvatarFile(null);
      toast("Profile Picture removed", {
        description: "Your profile picture has been removed successfully.",
      });
    } catch (err) {
      console.error("Remove avatar error:", err);
      toast("Failed to remove profile picture", {
        description: "An error occurred while removing your profile picture.",
      });
    } finally {
      setRemovingAvatar(false);
    }
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    const form = new FormData();
    form.append("name", formData.fullName);
    form.append("phone", formData.phone);
    form.append("role", formData.role);
    form.append(
      "address",
      JSON.stringify({
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postalCode: formData.postalCode,
      })
    );
    if (avatarFile) form.append("profilePic", avatarFile);

    try {
      const { data } = await api.put("/account/update", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.user) {
        const updated = {
          ...data.user,
          photo: data.user.profilePic || data.user.photo,
        };
        setUser(updated);
        setAvatar(updated.photo || null);
        toast("Profile Updated", {
          description: "Your profile details have been updated successfully.",
        });
      }
    } catch (err) {
      console.error("Profile update failed:", err);
      toast("Failed to update profile", {
        description: "An error occurred while updating your profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Picture */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Update your profile image</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src={avatar || undefined} alt="Profile picture" />
              <AvatarFallback className="text-2xl">
                {getInitials(formData.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="relative">
                  <Camera className="h-4 w-4 mr-2" />
                  Change Avatar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveAvatar}
                  disabled={!avatar || removingAvatar}
                >
                  {removingAvatar ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Removing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                JPG or PNG, max 2MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Info</CardTitle>
          <CardDescription>Update your basic details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="flex gap-2">
                <Input id="email" readOnly value={user?.email || ""} />
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </Badge>
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="street">Street</Label>
              <Input
                id="street"
                value={formData.street}
                onChange={(e) => handleInputChange("street", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleInputChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="working-professional">
                    Working Professional
                  </SelectItem>
                  <SelectItem value="business-owner">Business Owner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveChanges} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
          <CardDescription>General account details</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Created At</Label>
            <p className="text-sm">
              {formData.createdAt
                ? new Date(formData.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
          <div>
            <Label>Last Login</Label>
            <p className="text-sm">
              {formData.lastLogin
                ? new Date(formData.lastLogin).toLocaleString()
                : "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Account Type</Label>
            <Badge className="w-12 text-center">{formData.accountType}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
