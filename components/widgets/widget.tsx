import * as React from "react";
import { useWidgetTreeStore } from "@/components/providers/widget-tree-store-provider";
import { useUIInspectStore } from "@/components/providers/ui-inspect-store-provider";
import { DropItem, ItemTypes } from "@/lib/type";
import { useDrag, useDrop } from "react-dnd";
import { GripVertical } from "lucide-react";

export default function Widget({
  component,
  componentProps,
}: {
  component: React.ComponentType<any>;
  componentProps: Record<string, any>;
}) {
  const { id, ...rest } = componentProps;

  const { addWidget } = useWidgetTreeStore((state) => state);
  const dragRef = React.useRef<HTMLDivElement>(null);
  const dropRef = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.Widget,
    item: {
      component,
      componentProps,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop<DropItem, void, { isOver: boolean }>({
    accept: ItemTypes.Widget,
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
    drop: (item: DropItem, monitor) => {
      console.log("Dropped", item);
      const { id: sourceId, component, componentProps } = item;
      if (!sourceId) {
        addWidget(component, componentProps, id);
      }
    },
  });

  drag(dragRef);
  drop(dropRef);

  const Comp = component;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div ref={dragRef} className="cursor-grab rounded-sm bg-muted p-1">
          <GripVertical className="size-3 text-muted-foreground" />
        </div>
      </div>
      <div className="flex flex-1 gap-2">
        <Comp {...componentProps} dropRef={dropRef} />
      </div>
    </div>
  );
}
