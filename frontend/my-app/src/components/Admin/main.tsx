import { useState } from "react"
import { AdminHeader } from "./admin-header"
import { AdminSidebar } from "./admin-sidebar"
import { DashboardOverview } from "./dashboard-overview"
import { UserManagement } from "./user-management"
import { SystemMonitoring } from "./system-monitoring"
import { FinancialOverview } from "./financial-overview"
import { SecurityCompliance } from "./security-compliance"
import { ReportsAnalytics } from "./reports-analytics"
import { SidebarProvider } from "../ui/sidebar"

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const [userRole] = useState<"super_admin" | "admin" | "support">("super_admin")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "users":
        return <UserManagement />
      case "monitoring":
        return <SystemMonitoring />
      case "financial":
        return <FinancialOverview />
      case "security":
        return <SecurityCompliance />
      case "reports":
        return <ReportsAnalytics />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} userRole={userRole} />
        <div className="flex-1 flex flex-col w-full">
          <AdminHeader userRole={userRole} />
          <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
