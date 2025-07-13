import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Check } from "lucide-react";
import { ProfileTab } from "./profile-tab";
import { SecurityTab } from "./security-tab";
import { BillingTab } from "./billing-tab";
import { PrivacyTab } from "./privacy-tab";
import { useAuth } from "../../context/auth";

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Account Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Check className="h-3 w-3" />
            Last updated
            <span className="text-xs text-muted-foreground ml-1">
              {user?.updatedAt}
            </span>
          </Badge>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 lg:w-auto lg:flex lg:h-auto lg:p-1">
            <TabsTrigger value="profile" className="lg:px-4">
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="lg:px-4">
              Security
            </TabsTrigger>
            {/* <TabsTrigger value="preferences" className="lg:px-4">
              Preferences
            </TabsTrigger> */}
            <TabsTrigger value="billing" className="lg:px-4">
              Billing
            </TabsTrigger>
            {/* <TabsTrigger value="api-keys" className="lg:px-4">
              API Keys
            </TabsTrigger> */}
            <TabsTrigger value="privacy" className="lg:px-4">
              Privacy
            </TabsTrigger>
          </TabsList>

          <div className="lg:flex lg:gap-6">
            {/* Vertical tabs for desktop */}
            <div className="hidden lg:block lg:w-64">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                    activeTab === "profile"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                    activeTab === "security"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  Security
                </button>
                {/* <button
                  onClick={() => setActiveTab("preferences")}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                    activeTab === "preferences"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  Preferences
                </button> */}
                <button
                  onClick={() => setActiveTab("billing")}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                    activeTab === "billing"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  Billing
                </button>
                {/* <button
                  onClick={() => setActiveTab("api-keys")}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                    activeTab === "api-keys"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  API Keys
                </button> */}
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                    activeTab === "privacy"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  Privacy
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1">
              <TabsContent value="profile" className="mt-0">
                <ProfileTab />
              </TabsContent>
              <TabsContent value="security" className="mt-0">
                <SecurityTab />
              </TabsContent>
              {/* <TabsContent value="preferences" className="mt-0">
                <PreferencesTab />
              </TabsContent> */}
              <TabsContent value="billing" className="mt-0">
                <BillingTab />
              </TabsContent>
              {/* <TabsContent value="api-keys" className="mt-0">
                <ApiKeysTab />
              </TabsContent> */}
              <TabsContent value="privacy" className="mt-0">
                <PrivacyTab />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
