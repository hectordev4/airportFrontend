import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

export const SidebarGroup = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Menu items
  const items = [
    {
      title: "Home",
      onClick: () => navigate("/"), // Navigate to the Home page
      icon: Home,
    },
    {
      title: "Airports",
      onClick: () => navigate("/airports"), // Navigate to the Airports page
      icon: Inbox,
    },
    {
      title: "Planes",
      onClick: () => navigate("/planes"), // Navigate to the Planes page
      icon: Calendar,
    },
    {
      title: "Flights",
      onClick: () => navigate("/flights"), // Navigate to the Flights page
      icon: Calendar,
    },
    {
      title: "Search",
      onClick: () => navigate("/search"), // Navigate to the Search page
      icon: Search,
    },
    {
      title: "Settings",
      onClick: () => navigate("/settings"), // Navigate to the Settings page
      icon: Settings,
    },
  ];

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton onClick={item.onClick} className="flex items-center gap-2">
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};