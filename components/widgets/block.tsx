import * as React from "react";

import { Bookmark, LayoutGrid } from "lucide-react";

import { cn, getLayoutStyle } from "@/lib/utils";
import { useWidgetTreeStore } from "@/components/providers/widget-tree-store-provider";

import WidgetWrapper from "./widget";
import { WidgetDescriptor, WidgetRenderProps } from "@/lib/type";

export function Block(props: WidgetRenderProps) {
  const { attributes, className = "" } = props;

  const { widgets } = useWidgetTreeStore((state) => state);

  const children = React.useMemo(() => {
    if (!widgets[attributes.id]) return null;
    const childrenInScope = widgets[attributes.id].childrenId;
    return childrenInScope.map((childId) => {
      const child = widgets[childId];
      return (
        <WidgetWrapper
          renderer={child.renderer}
          attributes={child.attributes}
          key={childId}
        />
      );
    });
  }, [widgets, attributes.id]);

  return (
    <div
      className={cn(
        "relative flex flex-1 border-border border rounded-lg shadow-md p-4 pt-8",
        getLayoutStyle(
          attributes.layout.direction,
          attributes.layout.justify,
          attributes.layout.align
        ),
        className
      )}
    >
      <div className="absolute top-0 left-0 text-muted-foreground p-2">
        <Bookmark className="size-4" />
      </div>
      <div className="flex flex-1 gap-8">{children}</div>
    </div>
  );
}

const descriptor: WidgetDescriptor = {
  icon: LayoutGrid,
  label: "블록",
  description: "블록 위젯",
};

export default descriptor;
