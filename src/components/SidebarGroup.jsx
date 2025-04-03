import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useHandleOnClick } from "./handleSidebar"; // Import the hook

export const SidebarGroup = () => {
  const navigate = useNavigate();
  const { handleOnClick } = useHandleOnClick(); // Get the functions from the hook

  // Menu items
  const items = [
    {
      title: "Home",
      onClick: () => navigate("/"),
      icon: Home,
    },
    {
      title: "Airports",
      onClick: () => {
        navigate("/airports");
        handleOnClick.airports(); // Call function properly
      },
      icon: Inbox,
    },
    {
      title: "Planes",
      onClick: () => {
        navigate("/planes");
        handleOnClick.planes();
      },
      icon: Calendar,
    },
    {
      title: "Flights",
      onClick: () => {
        navigate("/flights");
        handleOnClick.flights();
      },
      icon: Calendar,
    },
    {
      title: "Search",
      onClick: () => navigate("/search"),
      icon: Search,
    },
    {
      title: "Settings",
      onClick: () => navigate("/settings"),
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
