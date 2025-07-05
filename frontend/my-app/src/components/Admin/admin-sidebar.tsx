"use client"

import { BarChart3, DollarSign, FileText, Home, Monitor, Shield, Users, Zap } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"

interface AdminSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  userRole: "super_admin" | "admin" | "support"
}

export function AdminSidebar({ activeSection, setActiveSection, userRole }: AdminSidebarProps) {
  const menuItems = [
    {
      title: "Overview",
      icon: Home,
      id: "overview",
      roles: ["super_admin", "admin", "support"],
    },
    {
      title: "User Management",
      icon: Users,
      id: "users",
      roles: ["super_admin", "admin"],
    },
    {
      title: "System Monitoring",
      icon: Monitor,
      id: "monitoring",
      roles: ["super_admin", "admin"],
    },
    {
      title: "Financial Overview",
      icon: DollarSign,
      id: "financial",
      roles: ["super_admin"],
    },
    {
      title: "Security & Compliance",
      icon: Shield,
      id: "security",
      roles: ["super_admin", "admin"],
    },
    {
      title: "Reports & Analytics",
      icon: BarChart3,
      id: "reports",
      roles: ["super_admin", "admin"],
    },
  ]

  const quickActions = [
    {
      title: "Emergency Controls",
      icon: Zap,
      id: "emergency",
      roles: ["super_admin"],
    },
    {
      title: "System Reports",
      icon: FileText,
      id: "system-reports",
      roles: ["super_admin", "admin"],
    },
  ]

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(userRole))
  const filteredQuickActions = quickActions.filter((item) => item.roles.includes(userRole))

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton isActive={activeSection === item.id} onClick={() => setActiveSection(item.id)}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {filteredQuickActions.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredQuickActions.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
