import * as React from "react";
import { useWidgetTreeStore } from "@/components/providers/widget-tree-store-provider";
import { ConnectDragSource, useDrag, useDrop } from "react-dnd";
import {
  WidgetDescriptor,
  WidgetDnDProps,
  LayoutDirection,
  LayoutAlign,
  LayoutJustify,
  Widget,
  WidgetWrapperProps,
  WidgetAttributes,
  WidgetRenderProps,
  ExistWidgetDnDProps,
} from "@/lib/type";
import { useRef } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
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
} from "lucide-react";
import { useUIInspectStore } from "../providers/ui-inspect-store-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function WidgetPreview({
  descriptor,
  renderer,
}: {
  descriptor: WidgetDescriptor;
  renderer: React.ComponentType<WidgetRenderProps>;
}) {
  const dragRef = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag<WidgetDnDProps, void, any>({
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
  dragConnector,
  attributes,
  reorderWidget,
  findWidget,
}: {
  dragConnector: ConnectDragSource;
  attributes: WidgetAttributes;
  reorderWidget: (id: string, atIndex: number) => void;
  findWidget: (id: string) => { widget: Widget; index: number } | null;
}) {
  const { removeWidget } = useWidgetTreeStore((state) => state);
  const { showDebug, showPreview } = useUIInspectStore((state) => state);

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<ExistWidgetDnDProps, void, {}>({
    accept: "widget",
    hover: (item) => {
      if (item.descriptor) return;
      const { id: draggedId } = item.attributes;
      if (!draggedId || draggedId === attributes.id) return;
      const result = findWidget(attributes.id);
      console.log(result);
    },
  });

  drop(ref);
  dragConnector(ref);

  return (
    <div
      ref={ref}
      className={cn(
        "select-none peer cursor-grab flex px-2 items-center gap-2",
        showPreview && "hidden"
      )}
    >
      <GripVertical className="size-3 text-muted-foreground" />
      <h1 className="text-sm font-medium">{attributes.title}</h1>
      <span
        className={cn("text-xs text-muted-foreground", !showDebug && "hidden")}
      >
        {attributes.id}
      </span>
      {attributes.id !== "root" && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeWidget?.(attributes.id)}
          disabled={!removeWidget}
        >
          <Trash2 className="size-3 text-muted-foreground" />
        </Button>
      )}
      <WidgetLayoutMenu id={attributes.id} />
    </div>
  );
}

export default function WidgetWrapper(props: WidgetWrapperProps) {
  if (props.descriptor) {
    // Widget is currently describe mode. never initialized widget.
    return (
      <WidgetPreview descriptor={props.descriptor} renderer={props.renderer} />
    );
  }

  // Widget is currently rendered in the canvas. have widget attributes.
  const { widgets, addWidget, updateWidget, moveWidget } = useWidgetTreeStore(
    (state) => state
  );

  const { renderer, attributes } = props;
  const widget = React.useMemo(() => {
    const { id } = attributes;
    return widgets[id];
  }, [widgets, attributes]);

  const dropRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const findWidget = React.useCallback(
    (id: string) => {
      const widget = widgets[id];
      const parent = widget.parentId ? widgets[widget.parentId] : null;
      if (!parent) return null;
      const widgetAt = parent.childrenId.indexOf(id);
      return {
        widget,
        index: widgetAt,
      };
    },
    [widgets]
  );

  const reorderWidget = React.useCallback(
    (id: string, atIndex: number) => {
      const { widget, index } = findWidget(id) ?? {};
      if (!widget || !index) return;
      updateWidget(widget.parentId ?? "", {
        childrenId: [
          ...widget.childrenId.slice(0, index),
          id,
          ...widget.childrenId.slice(index + 1),
        ],
      });
    },
    [findWidget, updateWidget]
  );

  const [{ isDragging }, drag, preview] = useDrag<
    ExistWidgetDnDProps,
    void,
    any
  >({
    type: "widget",
    item: { attributes, renderer, originalIndex: 0 },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver, isChildrenOver }, drop] = useDrop<WidgetDnDProps, void, any>(
    {
      accept: "widget",
      collect: (monitor) => ({
        isOver: !!monitor.isOver({ shallow: true }),
        isChildrenOver: !!monitor.isOver({ shallow: false }),
      }),
      drop: (item, monitor) => {
        if (monitor.didDrop()) return;
        if (item.descriptor) {
          addWidget(item.renderer, item.descriptor, attributes.id);
          return;
        }

        const { id } = attributes;
        moveWidget(item.attributes.id, id);
      },
    }
  );
  preview(previewRef);
  drag(dragRef);
  drop(dropRef);

  return (
    <div ref={dropRef} className={cn("flex flex-col flex-1")}>
      <WidgetControlHeader
        dragConnector={drag}
        attributes={attributes}
        reorderWidget={reorderWidget}
        findWidget={findWidget}
      />
      <div className={cn("flex flex-1", isOver && "rounded-lg bg-muted")}>
        <props.renderer
          className={cn(
            "transition-all duration-200",
            isDragging && "rounded-lg bg-muted/20 border border-green-500",
            isOver && "rounded-lg border-blue-500 border bg-blue-500/10",
            isChildrenOver && "scale-95"
          )}
          state={widget}
          attributes={attributes}
        />
      </div>
    </div>
  );
}
