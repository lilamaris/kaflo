import * as React from "react";
import { useWidgetTreeStore } from "@/components/providers/widget-tree-store-provider";
import { ConnectDragSource, useDrag, useDrop } from "react-dnd";
import {
  WidgetDescriptor,
  WidgetProps,
  WidgetDnDProps,
  LayoutDirection,
  LayoutAlign,
  LayoutJustify,
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

export type WidgetWrapperProps =
  | {
      descriptor: WidgetDescriptor;
      component?: never;
      componentProps?: never;
    }
  | {
      descriptor?: never;
      component: React.ComponentType<WidgetProps>;
      componentProps: WidgetProps;
    };

const defaultComponentProps: WidgetProps = {
  id: "",
  title: "",
  layout: {
    direction: "vertical",
    justify: "start",
    align: "stretch",
  },
};

function WidgetPreview({
  descriptor,
  drag,
}: {
  descriptor: WidgetDescriptor;
  drag: ConnectDragSource;
}) {
  const dragRef = useRef<HTMLDivElement>(null);
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
  componentProps,
}: {
  dragConnector: ConnectDragSource;
  componentProps: WidgetProps;
}) {
  const { removeWidget } = useWidgetTreeStore((state) => state);
  const { showDebug } = useUIInspectStore((state) => state);

  const dragRef = React.useRef<HTMLDivElement>(null);
  dragConnector(dragRef);

  return (
    <div
      ref={dragRef}
      className="select-none peer cursor-grab flex px-2 items-center gap-2"
    >
      <GripVertical className="size-3 text-muted-foreground" />
      <h1 className="text-sm font-medium">{componentProps.title}</h1>
      <span
        className={cn("text-xs text-muted-foreground", !showDebug && "hidden")}
      >
        {componentProps.id}
      </span>
      {componentProps.id !== "root" && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeWidget?.(componentProps.id)}
          disabled={!removeWidget}
        >
          <Trash2 className="size-3 text-muted-foreground" />
        </Button>
      )}
      <WidgetLayoutMenu id={componentProps.id} />
    </div>
  );
}

export default function WidgetWrapper({
  descriptor,
  component,
  componentProps,
}: WidgetWrapperProps) {
  const dragRef = useRef<HTMLDivElement>(null);

  let dragItemSource: WidgetDnDProps;
  if (descriptor) {
    dragItemSource = {
      component: descriptor.component,
      componentProps: {
        ...defaultComponentProps,
        title: `이름 없는 ${descriptor.label}`,
      },
    };
  } else {
    dragItemSource = { component, componentProps };
  }

  const [{ isDragging }, drag] = useDrag<
    WidgetDnDProps,
    void,
    { isDragging: boolean }
  >({
    type: "widget",
    item: dragItemSource,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (!component) return <WidgetPreview drag={drag} descriptor={descriptor} />;

  const Comp = dragItemSource.component;
  const { addWidget, moveWidget } = useWidgetTreeStore((state) => state);

  const [{ isOver }, drop] = useDrop<WidgetDnDProps, void, { isOver: boolean }>(
    {
      accept: "widget",
      collect: (monitor) => ({
        isOver: !!monitor.isOver({ shallow: true }),
      }),
      drop: (item, monitor) => {
        if (monitor.didDrop()) return;
        const { id } = item.componentProps;
        if (id) {
          moveWidget(id, componentProps.id);
        } else {
          addWidget(item.component, item.componentProps, componentProps.id);
        }
      },
    }
  );
  drag(dragRef);

  return (
    <div className="flex flex-col flex-1">
      <WidgetControlHeader
        dragConnector={drag}
        componentProps={dragItemSource.componentProps}
      />
      <Comp
        className={cn(isOver && "border-blue-500")}
        {...dragItemSource.componentProps}
        dropConnector={drop}
      />
    </div>
  );
}
