import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Search, Home, Calendar, Settings, Users, FileText, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  isActive?: boolean;
  hasChildren?: boolean;
  children?: SidebarItem[];
  isExpanded?: boolean;
}

const WorkspaceSidebar = () => {
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([
    {
      id: "dashboard",
      name: "Dashboard",
      icon: <Home className="w-4 h-4" />,
      isActive: false,
    },
    {
      id: "workflows",
      name: "Workflows",
      icon: <Zap className="w-4 h-4" />,
      hasChildren: true,
      isExpanded: true,
      children: [
        {
          id: "failed-payment",
          name: "Failed Payment Prevention",
          icon: <div className="w-2 h-2 rounded-full bg-workspace-accent" />,
          isActive: true,
        },
        {
          id: "customer-onboarding",
          name: "Customer Onboarding",
          icon: <div className="w-2 h-2 rounded-full bg-muted-foreground" />,
        },
        {
          id: "lead-scoring",
          name: "Lead Scoring",
          icon: <div className="w-2 h-2 rounded-full bg-muted-foreground" />,
        },
      ],
    },
    {
      id: "calendar",
      name: "Calendar",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: "reports",
      name: "Reports",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: "team",
      name: "Team",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "documents",
      name: "Documents",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "settings",
      name: "Settings",
      icon: <Settings className="w-4 h-4" />,
    },
  ]);

  const toggleExpand = (id: string) => {
    setSidebarItems(items =>
      items.map(item =>
        item.id === id ? { ...item, isExpanded: !item.isExpanded } : item
      )
    );
  };

  const setActive = (id: string) => {
    setSidebarItems(items =>
      items.map(item => ({
        ...item,
        isActive: item.id === id,
        children: item.children?.map(child => ({
          ...child,
          isActive: child.id === id,
        })),
      }))
    );
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">AI</span>
          </div>
          <span className="font-semibold text-sidebar-foreground">AutoFlow</span>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-background border-border"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {sidebarItems.map((item) => (
          <div key={item.id}>
            <Button
              variant="ghost"
              className={`w-full justify-start px-2 py-2 h-auto font-normal ${
                item.isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
              onClick={() => {
                setActive(item.id);
                if (item.hasChildren) {
                  toggleExpand(item.id);
                }
              }}
            >
              <div className="flex items-center gap-2 flex-1">
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </div>
              {item.hasChildren && (
                item.isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )
              )}
            </Button>

            {/* Children */}
            {item.hasChildren && item.isExpanded && (
              <div className="ml-4 mt-1 space-y-1">
                {item.children?.map((child) => (
                  <Button
                    key={child.id}
                    variant="ghost"
                    className={`w-full justify-start px-2 py-1.5 h-auto font-normal text-sm ${
                      child.isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    }`}
                    onClick={() => setActive(child.id)}
                  >
                    <div className="flex items-center gap-2">
                      {child.icon}
                      <span>{child.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Workflow</span>
        </Button>
      </div>
    </aside>
  );
};

export default WorkspaceSidebar;