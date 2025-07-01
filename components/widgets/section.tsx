import * as React from "react";

import { WidgetDescriptor, WidgetRenderProps } from "@/lib/type";
import { cn, getLayoutStyle } from "@/lib/utils";
import { LayoutPanelLeft } from "lucide-react";
import { useWidgetTreeStore } from "../providers/widget-tree-store-provider";
import WidgetWrapper from "./widget";

export function Section(props: WidgetRenderProps) {
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
        "flex flex-1 gap-8",
        getLayoutStyle(
          attributes.layout.direction,
          attributes.layout.justify,
          attributes.layout.align
        ),
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
};

export default descriptor;
