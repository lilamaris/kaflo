import * as React from "react";

import { Text } from "lucide-react";
import { useWidgetTreeStore } from "../providers/widget-tree-store-provider";
import WidgetWrapper from "./widget";
import { WidgetRenderProps } from "@/lib/type";

export function Paragraph(props: WidgetRenderProps) {
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
    <div>
        
    </div>
  )
}
