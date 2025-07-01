"use client";

import { useWidgetTreeStore } from "../providers/widget-tree-store-provider";
import WidgetWrapper from "../widgets/widget";

export function WidthIndicator({ width }: { width: number }) {
  return (
    <div className="sticky h-0 z-10 top-5 w-full text-center text-sm">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 top-1/2 border-t border-muted-foreground" />
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[4px] border-t-muted-foreground border-r-[6px] border-r-transparent rotate-90" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[5px] border-t-muted-foreground border-r-[6px] border-r-transparent -rotate-90" />
        <span className="bg-card text-muted-foreground relative border border-muted-foreground z-10 px-2 rounded-md">
          {width} px
        </span>
      </div>
    </div>
  );
}

export default function UICanvas() {
  const { widgets } = useWidgetTreeStore((state) => state);
  const root = widgets.root;

  return (
    <WidgetWrapper renderer={root.renderer} attributes={root.attributes} />
  );
}
