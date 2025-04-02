import {
  Sidebar,
  SidebarContent,
  SidebarGroup as ShadcnSidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import { SidebarGroup } from "@/components/SidebarGroup"; // Import your SidebarGroup

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <ShadcnSidebarGroup>
          <SidebarGroupLabel>Flight Service</SidebarGroupLabel>
          <SidebarGroupContent>
            {/* Render the SidebarGroup component */}
            <SidebarGroup />
          </SidebarGroupContent>
        </ShadcnSidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}