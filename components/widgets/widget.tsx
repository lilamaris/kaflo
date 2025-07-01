import * as React from "react";
import { useWidgetTreeStore } from "@/components/providers/widget-tree-store-provider";
import { ConnectDragSource, useDrag, useDrop } from "react-dnd";
import { WidgetDescriptor, WidgetProps, WidgetDnDProps } from "@/lib/type";
import { useRef } from "react";

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
  direction: "vertical",
  justify: "start",
  align: "stretch",
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
  const dragRef = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag<
    WidgetDnDProps,
    void,
    { isDragging: boolean }
  >({
    type: "widget",
    item: {
      component: component || descriptor.component,
      componentProps: componentProps || defaultComponentProps,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(dragRef);

  if (!component) return <WidgetPreview drag={drag} descriptor={descriptor} />;

  const Comp = component;
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

  return (
    <div className="flex flex-col flex-1">
      <Comp
        {...componentProps}
        drag={drag}
        drop={drop}
        isDragging={isDragging}
        isOver={isOver}
        updateWidget={updateWidget}
        removeWidget={removeWidget}
      />
    </div>
  );
}
