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
import { useAuth } from "../../context/auth";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function ProfileTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    language: "",
    createdAt: "",
    lastLogin: "",
    accountType: "Free",
    address: "",
    role: "",
  });

  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`/user/profile/${user?.uid}`);
        setFormData(data);
        setAvatar(data.avatar || user?.name![0]?.toUpperCase());
      } catch (err) {
        alert("Failed to fetch profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user?.uid, user?.name]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    setSaving(true);

    const form = new FormData();
    form.append("fullName", formData.fullName);
    form.append("phone", formData.phone);
    form.append("address", formData.address);
    form.append("role", formData.role);
    // Append other fields if needed

    if (avatarFile) {
      form.append("avatar", avatarFile);
    }

    try {
      const { data } = await api.put("/user/profile", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.avatarUrl) {
        setAvatar(data.avatarUrl);
      }

      alert("Profile updated!");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatar(URL.createObjectURL(file));
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
      {/* Avatar Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Update your profile image</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src={avatar} alt="Profile picture" />
              <AvatarFallback className="text-2xl">U</AvatarFallback>
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
                <Button variant="outline" size="sm" disabled>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
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
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
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
              {new Date(formData.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <Label>Last Login</Label>
            <p className="text-sm">
              {new Date(formData.lastLogin).toLocaleString()}
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
