import { Home, Search, Settings } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import airportIcon from "../assets/icons/airportIcon.webp";
import planeIcon from "../assets/icons/planeIcon.webp";
import flightIcon from "../assets/icons/flightIcon.webp";


export const SidebarGroup = () => {
  const navigate = useNavigate();

  // Menu items
  const items = [
    {
      title: "Home",
      onClick: () => navigate("/"),
      icon: Home,
    },
    {
      title: "Airports",
      onClick: () => navigate("/airports"),
      icon: () => <img src={airportIcon} className="w-4.25 h-auto"/>,
    },
    {
      title: "Planes",
      onClick: () => navigate("/planes"), 
      icon: () => <img src={planeIcon} className="w-4.25 h-auto"/>,
    },
    {
      title: "Flights",
      onClick: () => navigate("/flights"),
      icon: () => <img src={flightIcon} className="w-4.25 h-auto"/>,
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