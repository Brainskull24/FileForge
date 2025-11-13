import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "../ui/sidebar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Lock,
  Unlock,
  FileText,
  Zap,
  Settings,
  ChevronDown,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import {
  decodingTools,
  encodingTools,
  fileConversionCategories,
  aiTools,
} from "../../data/sidebarConfigs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Tool {
  id: string;
  name: string;
  Icon: React.ElementType;
  isPro?: boolean;
}

interface AppSidebarProps {
  selectedTool: string | null;
  onToolSelect: (toolId: string) => void;
}

export function AppSidebar({ selectedTool, onToolSelect }: AppSidebarProps) {
  const navigate = useNavigate();

  const [openSections, setOpenSections] = useState({
    decoding: true,
    encoding: true,
    fileConversion: true,
    aiTools: true,
    advanced: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderToolItem = (tool: Tool) => (
    <SidebarMenuItem key={tool.id}>
      <SidebarMenuButton
        isActive={selectedTool === tool.id}
        onClick={() => onToolSelect(tool.id)}
        className="group relative"
      >
        <tool.Icon className="h-4 w-4" />
        <span className="flex-1 truncate">{tool.name}</span>
        {tool.isPro && (
          <Badge variant="secondary" className="ml-2 text-xs">
            Pro
          </Badge>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  const renderCollapsibleSection = (
    sectionKey: keyof typeof openSections,
    label: string,
    Icon: React.ElementType,
    tools: Tool[]
  ) => (
    <Collapsible
      open={openSections[sectionKey]}
      onOpenChange={() => toggleSection(sectionKey)}
    >
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {label}
            </div>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>{tools.map(renderToolItem)}</SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );

  return (
    <Sidebar className="border-r">
      {/* Header */}
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Universal Converter</h2>
            <p className="text-xs text-muted-foreground">
              Simple • Fast • Reliable
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="p-2">
        {renderCollapsibleSection(
          "decoding",
          "Decoding Tools",
          Unlock,
          decodingTools
        )}
        {renderCollapsibleSection(
          "encoding",
          "Encoding Tools",
          Lock,
          encodingTools
        )}
        {renderCollapsibleSection(
          "fileConversion",
          "File Conversion",
          FileText,
          fileConversionCategories
        )}
        {renderCollapsibleSection(
          "aiTools",
          "AI Tools",
          Sparkles,
          aiTools
        )}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t p-4">
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => navigate("/settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
