import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import { headingPreview, WidgetPreview } from "../widgets/heading";
// import { blockPreview } from "../widgets/block";
import Profile from "../widgets/profile";

// const widgets = [headingPreview, blockPreview];

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* {widgets.map((widget) => (
                <SidebarMenuItem key={widget.description}>
                  <WidgetPreview
                    widget={widget.widget}
                    Icon={widget.Icon}
                    description={widget.description}
                  />
                </SidebarMenuItem>
              ))} */}
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <Profile />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
