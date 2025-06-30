"use client";

import AppSidebar from "@/components/layout/appside";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import UIResponsiveViewer from "@/components/layout/ui-responsive-viewer";
import WidgetTreeStoreProvider from "@/components/providers/widget-tree-store-provider";
import { Button } from "@/components/ui/button";
import { Palette, Rocket, Save, Settings } from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Inspect from "@/components/layout/inspect";
import UIInspectStoreProvider from "@/components/providers/ui-inspect-store-provider";

export default function Page() {
  return (
    <WidgetTreeStoreProvider>
      <UIInspectStoreProvider>
        <DndProvider backend={HTML5Backend}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="@container/main h-screen">
              <div className="flex items-center p-1 border-b border-sidebar-border justify-between">
                <div className="flex items-center">
                  <SidebarTrigger />
                  <Button variant="ghost" size="icon" className="size-7">
                    <Save className="size-4" />
                    <span className="sr-only">Save</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="size-7">
                    <Rocket className="size-4" />
                    <span className="sr-only">Deploy</span>
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    User Name Here
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    /
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    Project Name Here
                  </span>
                </div>
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" className="size-7">
                    <Palette className="size-4" />
                    <span className="sr-only">Change Theme</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="size-7">
                    <Settings className="size-4" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </div>
              </div>
              <div className="flex relative flex-col flex-3 p-4 min-h-0">
                <UIResponsiveViewer />
              </div>

              <div className="border-t flex-1">
                <Inspect />
              </div>
            </SidebarInset>
          </SidebarProvider>
        </DndProvider>
      </UIInspectStoreProvider>
    </WidgetTreeStoreProvider>
  );
}
