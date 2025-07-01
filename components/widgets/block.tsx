import * as React from "react";

import { LayoutGrid } from "lucide-react";

import { cn, getLayoutStyle } from "@/lib/utils";
import { useWidgetTreeStore } from "@/components/providers/widget-tree-store-provider";

import WidgetWrapper from "./widget";
import { WidgetDescriptor, WidgetProps } from "@/lib/type";

export interface BlockAlign {
  direction?: "vertical" | "horizontal";
  justify?: "start" | "center" | "end" | "full";
  align?: "start" | "center" | "end" | "full";
}

export interface BlockProps {
  id: string;
  title: string;
}

export function Block(props: WidgetProps) {
  const { id, title, layout, dropConnector, className } = props;
  const dropRef = React.useRef<HTMLDivElement>(null);
  dropConnector?.(dropRef);

  const { widgets } = useWidgetTreeStore((state) => state);

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
  icon: LayoutGrid,
  label: "블록",
  description: "블록 위젯",
  component: Block,
};

export default descriptor;
