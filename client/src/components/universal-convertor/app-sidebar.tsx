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
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import {
  decodingTools,
  encodingTools,
  fileConversionCategories,
} from "../../data/sidebarConfigs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    advanced: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderToolItem = (tool: any) => (
    <SidebarMenuItem key={tool.id}>
      <SidebarMenuButton
        isActive={selectedTool === tool.id}
        onClick={() => onToolSelect(tool.id)}
        className="group relative"
      >
        <tool.icon className="h-4 w-4" />
        <span className="flex-1 truncate">{tool.name}</span>
        {tool.isPro && (
          <Badge variant="secondary" className="ml-2 text-xs">
            Pro
          </Badge>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar className="border-r">
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

      <SidebarContent className="p-2">
        {/* Decoding Tools */}
        <Collapsible
          open={openSections.decoding}
          onOpenChange={() => toggleSection("decoding")}
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Unlock className="h-4 w-4" />
                  Decoding Tools
                </div>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>{decodingTools.map(renderToolItem)}</SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Encoding Tools */}
        <Collapsible
          open={openSections.encoding}
          onOpenChange={() => toggleSection("encoding")}
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Encoding Tools
                </div>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>{encodingTools.map(renderToolItem)}</SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* File Conversion */}
        <Collapsible
          open={openSections.fileConversion}
          onOpenChange={() => toggleSection("fileConversion")}
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  File Conversion
                </div>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {fileConversionCategories.map(renderToolItem)}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Advanced Tools */}
        {/* <Collapsible
          open={openSections.advanced}
          onOpenChange={() => toggleSection("advanced")}
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Advanced Tools
                </div>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>{advancedTools.map(renderToolItem)}</SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible> */}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              navigate("/settings");
            }}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              navigate("/help");
            }}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
