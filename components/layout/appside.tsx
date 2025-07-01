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

import BlockDescriptor from "@/components/widgets/block";
import Widget from "../widgets/widget";

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
                <Widget descriptor={BlockDescriptor} />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
