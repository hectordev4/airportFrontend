import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useFlyService } from "@/middleware/Context";

export const SidebarGroup = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { getAirports, getFlights, getPlanes } = useFlyService(); // Access fetch functions from context

  // Menu items
  const items = [
    {
      title: "Home",
      onClick: () => navigate("/"), // Navigate to the Home page
      icon: Home,
    },
    {
      title: "Airports",
      onClick: async () => {
        await getAirports(); // Fetch airports data
        navigate("/airports"); // Navigate to the Airports page
      },
      icon: Inbox,
    },
    {
      title: "Planes",
      onClick: async () => {
        await getPlanes(); // Fetch planes data
        navigate("/planes"); // Navigate to the Planes page
      },
      icon: Calendar,
    },
    {
      title: "Flights",
      onClick: async () => {
        await getFlights(); // Fetch flights data
        navigate("/flights"); // Navigate to the Flights page
      },
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