import * as React from "react";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  GripVertical,
  Rows2,
  LayoutGrid,
  MoreVertical,
  Pencil,
  Trash2,
  Columns2,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  AlignVerticalSpaceBetween,
  AlignVerticalJustifyEnd,
  StretchVertical,
} from "lucide-react";
import { useDrop, useDrag } from "react-dnd";

import {
  DropItem,
  ItemTypes,
  LayoutAlign,
  LayoutDirection,
  LayoutJustify,
  WidgetProps,
} from "@/lib/type";
import { cn, getLayoutStyle } from "@/lib/utils";
import { useWidgetTreeStore } from "@/components/providers/widget-tree-store-provider";
import { useUIInspectStore } from "@/components/providers/ui-inspect-store-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Widget from "./widget";

export interface BlockAlign {
  direction?: "vertical" | "horizontal";
  justify?: "start" | "center" | "end" | "full";
  align?: "start" | "center" | "end" | "full";
}

export interface BlockProps {
  id: string;
  title: string;
}

export function Block(widgetProps: WidgetProps) {
  const {
    id,
    title = "제목 없는 블록",
    direction,
    justify,
    align,
  } = widgetProps;
  const { widgets, addWidget, moveWidget, removeWidget, updateWidget } =
    useWidgetTreeStore((state) => state);
  const { showDebug } = useUIInspectStore((state) => state);

  const [isTitleEditing, setIsTitleEditing] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState(title);

  const children = React.useMemo(() => {
    if (!widgets[id]) return null;
    const childrenInScope = widgets[id].childrenId;
    return childrenInScope.map((childId) => {
      const child = widgets[childId];
      return (
        <Widget
          component={child.component}
          componentProps={child.componentProps}
          key={childId}
        />
      );
    });
  }, [widgets, id]);

  const setDirection = (id: string, direction: LayoutDirection) => {
    updateWidget(id, { direction });
  };

  const setJustify = (id: string, justify: LayoutJustify) => {
    updateWidget(id, { justify });
  };

  const setAlign = (id: string, align: LayoutAlign) => {
    updateWidget(id, { align });
  };

  const dropRef = React.useRef<HTMLDivElement>(null);
  const dragRef = React.useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop<DropItem, void, { isOver: boolean }>(
    {
      accept: [ItemTypes.Preview, ItemTypes.Widget],
      collect: (monitor) => ({
        isOver: !!monitor.isOver({ shallow: true }),
      }),
      drop: (item: DropItem, monitor) => {
        const { id: sourceId, component, componentProps } = item;
        if (!sourceId) {
          addWidget(component, componentProps, id);
        }
        // if (monitor.didDrop()) return;
        // moveWidget(item.sourceId, id);
      },
    },
    [addWidget, id]
  );

  const [{ isDragging }, drag] = useDrag(
    {
      type: ItemTypes.Preview,
      item: { id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    },
    [id, widgets]
  );

  drag(dragRef);
  drop(dropRef);

  return (
    <div
      className={cn(
        "flex gap-2 flex-col flex-1 shadow-sm overflow-hidden rounded-lg p-1",
        isDragging && "bg-muted/20",
        showDebug &&
          "outline-dashed outline-2 outline-muted-foreground hover:bg-blue-500/10"
      )}
    >
      <div className="flex items-center gap-2 p-1 group">
        <div ref={dragRef} className="cursor-grab rounded-sm bg-muted p-1">
          <GripVertical className="size-3 text-muted-foreground" />
        </div>
        <h1
          ref={dropRef}
          className="text-sm text-muted-foreground flex items-center gap-2 truncate"
        >
          {isTitleEditing ? (
            <Input
              className="m-1 h-[2rem]"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={() => {
                setIsTitleEditing(false);
                updateWidget(id, { title: editTitle });
              }}
            />
          ) : (
            <span>{title}</span>
          )}
          <Button
            variant="ghost"
            className="size-6"
            size="icon"
            onClick={() => setIsTitleEditing(true)}
          >
            <Pencil className="size-3 text-muted-foreground" />
          </Button>
        </h1>
        <div className="flex ml-auto items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-6" size="icon">
                <MoreVertical className="size-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex flex-col gap-2 p-2">
                <Label className="text-xs text-muted-foreground">
                  Direction
                </Label>
                <div className="flex flex-col gap-2 items-center">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDirection(id, "vertical")}
                    >
                      <Rows2 className="size-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDirection(id, "horizontal")}
                    >
                      <Columns2 className="size-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <Label className="text-xs text-muted-foreground">Justify</Label>
                <div className="flex flex-col gap-2 items-center">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setJustify(id, "center")}
                    >
                      <AlignVerticalJustifyCenter className="size-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setJustify(id, "between")}
                    >
                      <AlignVerticalSpaceBetween className="size-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setJustify(id, "start")}
                    >
                      <AlignVerticalJustifyStart className="size-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setJustify(id, "end")}
                    >
                      <AlignVerticalJustifyEnd className="size-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <Label className="text-xs text-muted-foreground">Align</Label>
                <div className="flex flex-col gap-2 items-center">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setAlign(id, "start")}
                    >
                      <AlignLeft className="size-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setAlign(id, "center")}
                    >
                      <AlignCenter className="size-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setAlign(id, "end")}
                    >
                      <AlignRight className="size-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setAlign(id, "stretch")}
                    >
                      <StretchVertical className="size-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            className="size-6"
            size="icon"
            onClick={() => removeWidget(id)}
          >
            <Trash2 className="size-3 text-muted-foreground" />
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-1 gap-2 p-1",
          isOver && "rounded-lg bg-muted/20",
          getLayoutStyle(direction, justify, align)
        )}
      >
        {isOver && (
          <div className="rounded-lg flex-1 bg-muted flex justify-center items-center text-muted-foreground ">
            이 곳에 배치됩니다.
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export const blockPreview = {
  widget: Block,
  Icon: LayoutGrid,
  description: "블록 위젯",
};
