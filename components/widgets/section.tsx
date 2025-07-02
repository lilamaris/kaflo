import * as React from "react";

import { WidgetDescriptor, WidgetRenderAttributes } from "@/lib/type";
import { cn, getLayoutStyle } from "@/lib/utils";
import { LayoutPanelLeft } from "lucide-react";
import { useWidgetTreeStore } from "../providers/widget-tree-store-provider";
import WidgetWrapper from "./widget";
import { Label } from "../ui/label";

export function Section(props: WidgetRenderAttributes) {
  const { widgetId, layout, className = "" } = props;
  const { getWidget } = useWidgetTreeStore((state) => state);

  const childrenWidgets = React.useMemo(() => {
    const widget = getWidget(props.widgetId);
    const childrenIds = widget?.childrenId ?? [];
    return childrenIds.map((id) => getWidget(id)).filter((widget) => !!widget);
  }, [getWidget, props]);

  return (
    <div
      className={cn(
        "flex flex-1 gap-8",
        getLayoutStyle(layout.direction, layout.justify, layout.align),
        className
      )}
    >
      {childrenWidgets.map(({ attributes, renderer }) => (
        <WidgetWrapper
          key={attributes.widgetId}
          renderer={renderer}
          attributes={attributes}
        />
      ))}
    </div>
  );
}

const descriptor: WidgetDescriptor = {
  icon: LayoutPanelLeft,
  label: "섹션",
  description: "섹션 위젯",
};

export default descriptor;
