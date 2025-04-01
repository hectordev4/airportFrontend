import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useFlyService } from "@/middleware/Context";

export function AppSidebar() {
  const { baseUrl } = useFlyService(); // Access the base URL from context

  const items = [
    {
      title: "Home",
      url: `${baseUrl}/home`, // Use the base URL dynamically
      icon: Home,
    },
    {
      title: "Airports",
      url: `${baseUrl}/airports`,
      icon: Inbox,
    },
    {
      title: "Flights",
      url: `${baseUrl}/flights`,
      icon: Calendar,
    },
    {
      title: "Planes",
      url: `${baseUrl}/planes`,
      icon: Search,
    },
    {
      title: "About",
      url: `${baseUrl}/about`,
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}