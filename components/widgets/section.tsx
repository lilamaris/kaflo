import * as React from "react";

import { WidgetDescriptor, WidgetProps } from "@/lib/type";
import { cn, getLayoutStyle } from "@/lib/utils";
import { LayoutPanelLeft } from "lucide-react";
import { useUIInspectStore } from "../providers/ui-inspect-store-provider";
import { useWidgetTreeStore } from "../providers/widget-tree-store-provider";
import WidgetWrapper from "./widget";

export function Section(props: WidgetProps) {
  const { id, title, layout, dropRef, className } = props;
  const { widgets } = useWidgetTreeStore((state) => state);
  const { showDebug } = useUIInspectStore((state) => state);

  const children = React.useMemo(() => {
    if (!widgets[id]) return null;
    const childrenInScope = widgets[id].childrenId;
    return childrenInScope.map((childId) => {
      const child = widgets[childId];
      return (
        <WidgetWrapper
          component={child.component}
          componentProps={child.componentProps}
          key={childId}
        />
      );
    });
  }, [widgets, id]);

  return (
    <div
      ref={dropRef}
      className={cn(
        "flex flex-1 border-border border rounded-lg p-2 transition-all duration-200 peer-hover:border-green-500",
        "hover-within:bg-blue-500/10",
        getLayoutStyle(layout.direction, layout.justify, layout.align),
        className
      )}
    >
      {children}
    </div>
  );
}

const descriptor: WidgetDescriptor = {
  icon: LayoutPanelLeft,
  label: "섹션",
  description: "섹션 위젯",
  component: Section,
};

export default descriptor;
