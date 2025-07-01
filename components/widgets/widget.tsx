import * as React from "react";
import { useWidgetTreeStore } from "@/components/providers/widget-tree-store-provider";
import { ConnectDragSource, useDrag, useDrop } from "react-dnd";
import { WidgetDescriptor, WidgetProps, WidgetDnDProps } from "@/lib/type";
import { useRef } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { GripVertical, Trash2 } from "lucide-react";
import { useUIInspectStore } from "../providers/ui-inspect-store-provider";

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

export default function WidgetWrapper({
  descriptor,
  component,
  componentProps,
}: WidgetWrapperProps) {
  const { showDebug } = useUIInspectStore((state) => state);

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
  const { addWidget, moveWidget, updateWidget, removeWidget } =
    useWidgetTreeStore((state) => state);

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
      <div
        ref={dragRef}
        className="select-none peer cursor-grab flex px-2 items-center gap-2"
      >
        <GripVertical className="size-3 text-muted-foreground" />
        <h1 className="text-sm font-medium">{componentProps.title}</h1>
        <span
          className={cn(
            "text-xs text-muted-foreground",
            !showDebug && "hidden"
          )}
        >
          {componentProps.id}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeWidget?.(componentProps.id)}
          disabled={!removeWidget}
        >
          <Trash2 className="size-3 text-muted-foreground" />
        </Button>
      </div>
      <Comp {...dragItemSource.componentProps} dropConnector={drop} />
    </div>
  );
}
