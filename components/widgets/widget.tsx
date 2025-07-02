import * as React from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  AlignCenter,
  AlignRight,
  AlignLeft,
  StretchVertical,
  Columns2,
  GripVertical,
  Rows2,
  Trash2,
  MoreVertical,
  CircleX,
} from "lucide-react";

import {
  WidgetDescriptor,
  LayoutDirection,
  LayoutAlign,
  LayoutJustify,
  Widget,
  WidgetWrapperProps,
  ExistWidgetDnDProps,
  NewWidgetDnDProps,
  WidgetRenderer,
} from "@/lib/type";
import { cn } from "@/lib/utils";

import { useWidgetTreeStore } from "@/components/providers/widget-tree-store-provider";
import { useUIInspectStore } from "@/components/providers/ui-inspect-store-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function WidgetPreview({
  descriptor,
  renderer,
}: {
  descriptor: WidgetDescriptor;
  renderer: WidgetRenderer;
}) {
  const dragRef = React.useRef<HTMLDivElement>(null);

  const [, drag] = useDrag<NewWidgetDnDProps, void, any>({
    type: "widget",
    item: {
      descriptor,
      renderer,
    },
  });

  drag(dragRef);

  return (
    <div
      ref={dragRef}
      className="flex flex-col border-border border rounded-md p-2 gap-2 items-center hover:bg-muted cursor-pointer"
    >
      <descriptor.icon className="size-4" />
      <span className="text-sm font-medium">{descriptor.label}</span>
      <span className="text-xs text-muted-foreground">
        {descriptor.description}
      </span>
    </div>
  );
}

export function ErrorWidget({ causes }: { causes: string }) {
  return (
    <div className="rounded-lg border border-border shadow-md p-4">
      <div className="flex items-center gap-2">
        <CircleX className="size-4" />
        Oh, No!
      </div>
      <span className="text-muted-foreground text-sm">
        Can not rendered this widget:
      </span>
      <span className="text-destructive text-sm">{causes}</span>
    </div>
  );
}

function JustifyButton({
  id,
  justify,
}: {
  id: string;
  justify: LayoutJustify;
}) {
  const { updateWidgetLayout } = useWidgetTreeStore((state) => state);
  let icon;

  function setJustify(id: string, justify: LayoutJustify) {
    updateWidgetLayout(id, { justify });
  }

  switch (justify) {
    case "start":
      icon = <AlignLeft className="size-3 text-muted-foreground" />;
      break;
    case "center":
      icon = <AlignCenter className="size-3 text-muted-foreground" />;
      break;
    case "end":
      icon = <AlignRight className="size-3 text-muted-foreground" />;
      break;
    case "between":
      icon = <StretchVertical className="size-3 text-muted-foreground" />;
      break;
  }

  return (
    <Button variant="ghost" size="icon" onClick={() => setJustify(id, justify)}>
      {icon}
    </Button>
  );
}

function AlignButton({ id, align }: { id: string; align: LayoutAlign }) {
  const { updateWidgetLayout } = useWidgetTreeStore((state) => state);
  let icon;

  function setAlign(id: string, align: LayoutAlign) {
    updateWidgetLayout(id, { align });
  }

  switch (align) {
    case "start":
      icon = <AlignLeft className="size-3 text-muted-foreground" />;
      break;
    case "center":
      icon = <AlignCenter className="size-3 text-muted-foreground" />;
      break;
    case "end":
      icon = <AlignRight className="size-3 text-muted-foreground" />;
      break;
    case "stretch":
      icon = <StretchVertical className="size-3 text-muted-foreground" />;
      break;
  }

  return (
    <Button variant="ghost" size="icon" onClick={() => setAlign(id, align)}>
      {icon}
    </Button>
  );
}

function DirectionButton({
  id,
  direction,
}: {
  id: string;
  direction: LayoutDirection;
}) {
  const { updateWidgetLayout } = useWidgetTreeStore((state) => state);
  let icon;

  function setDirection(id: string, direction: LayoutDirection) {
    updateWidgetLayout(id, { direction });
  }

  switch (direction) {
    case "vertical":
      icon = <Rows2 className="size-3 text-muted-foreground" />;
      break;
    case "horizontal":
      icon = <Columns2 className="size-3 text-muted-foreground" />;
      break;
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setDirection(id, direction)}
    >
      {icon}
    </Button>
  );
}

function WidgetLayoutMenu({ id }: { id: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-6" size="icon">
          <MoreVertical className="size-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex gap-2 items-center">
          <div>
            <DropdownMenuLabel>Layout</DropdownMenuLabel>
            <DirectionButton id={id} direction={"vertical"} />
            <DirectionButton id={id} direction={"horizontal"} />
          </div>
          <div>
            <DropdownMenuLabel>Justify</DropdownMenuLabel>
            <JustifyButton id={id} justify={"start"} />
            <JustifyButton id={id} justify={"center"} />
            <JustifyButton id={id} justify={"end"} />
            <JustifyButton id={id} justify={"between"} />
          </div>
          <div>
            <DropdownMenuLabel>Align</DropdownMenuLabel>
            <AlignButton id={id} align={"start"} />
            <AlignButton id={id} align={"center"} />
            <AlignButton id={id} align={"end"} />
            <AlignButton id={id} align={"stretch"} />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function WidgetControlHeader({
  widget,
  onDnDStateChanged,
}: {
  widget: Widget;
  onDnDStateChanged: (state: { isDragging: boolean }) => void;
}) {
  const { attributes, parentId, renderer } = widget;
  const { widgetId } = attributes;

  const { removeWidget, getWidgetWithParentOrder, setWidgetOrder } =
    useWidgetTreeStore((state) => state);
  const { showDebug, showPreview } = useUIInspectStore((state) => state);
  const ref = React.useRef<HTMLDivElement>(null);

  const [dragState, drag] = useDrag<ExistWidgetDnDProps, void, any>({
    type: "widget",
    item: { attributes, renderer, originalIndex: 0 },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<ExistWidgetDnDProps, void, {}>({
    accept: "widget",
    hover: (item) => {
      if (item.descriptor) return;
      const { widgetId: draggedId } = item.attributes;
      if (!widget.parentId) return;
      if (!draggedId || draggedId === widgetId) return;
      const result = getWidgetWithParentOrder(widgetId);
      if (!result) return;
      setWidgetOrder(widget.parentId, draggedId, result.orderAt);
    },
  });

  React.useEffect(() => {
    onDnDStateChanged(dragState);
  }, [dragState]);

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={cn(
        "select-none peer cursor-grab flex px-2 items-center gap-2",
        showPreview && "hidden"
      )}
    >
      <GripVertical className="size-3 text-muted-foreground" />
      <h1 className="text-sm font-medium">{widget.attributes.title}</h1>
      <span
        className={cn("text-xs text-muted-foreground", !showDebug && "hidden")}
      >
        {widgetId}
      </span>
      {widgetId !== "root" && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeWidget?.(widgetId)}
          disabled={!removeWidget}
        >
          <Trash2 className="size-3 text-muted-foreground" />
        </Button>
      )}
      <WidgetLayoutMenu id={widgetId} />
    </div>
  );
}

export default function WidgetWrapper(props: WidgetWrapperProps) {
  const { renderer } = props;

  if (props.descriptor) {
    // Widget is currently describe mode. never initialized widget.
    return <WidgetPreview descriptor={props.descriptor} renderer={renderer} />;
  }

  // Widget is currently rendered in the canvas. have widget attributes.
  const { getWidget, addWidget, moveWidget } = useWidgetTreeStore(
    (state) => state
  );
  const { widgetId, layout, className, title } = props.attributes;
  const [isDragging, setIsDragging] = React.useState(false);
  const dropRef = React.useRef<HTMLDivElement>(null);

  const widget = getWidget(props.attributes.widgetId);
  if (!widget) return <ErrorWidget causes="Widget is not found" />;

  const [{ isOver, isChildrenOver }, drop] = useDrop<
    ExistWidgetDnDProps,
    void,
    any
  >({
    accept: "widget",
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
      isChildrenOver: !!monitor.isOver({ shallow: false }),
    }),
    drop: (item, monitor) => {
      if (monitor.didDrop()) return;
      if (item.descriptor) {
        addWidget(item.renderer, item.descriptor, widgetId);
        return;
      }

      moveWidget(item.attributes.widgetId, widgetId);
    },
  });
  drop(dropRef);

  return (
    <div
      key={widgetId}
      ref={dropRef}
      className={cn("flex flex-col flex-1", isDragging && "opacity-0")}
    >
      <WidgetControlHeader
        widget={widget}
        onDnDStateChanged={(state) => setIsDragging(state.isDragging)}
      />
      <div className={cn("flex flex-1 rounded-lg", isOver && "bg-muted")}>
        <props.renderer
          className={cn(
            "transition-all duration-50 rounded-lg",
            isOver && "border-blue-500 border bg-blue-500/10",
            isChildrenOver && "scale-90"
          )}
          {...props.attributes}
        />
      </div>
    </div>
  );
}
