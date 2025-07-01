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
import SectionDescriptor from "@/components/widgets/section";
import WidgetWrapper from "../widgets/widget";
import { Block } from "../widgets/block";
import { Section } from "../widgets/section";

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
              <SidebarMenuItem>
                <WidgetWrapper descriptor={BlockDescriptor} renderer={Block} />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <WidgetWrapper
                  descriptor={SectionDescriptor}
                  renderer={Section}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
