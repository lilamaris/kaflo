import { LucideIcon } from "lucide-react";
import { ConnectDragSource, ConnectDropTarget } from "react-dnd";

export interface DnDSource {
  drag: ConnectDragSource;
  drop: ConnectDropTarget;
  isDragging: boolean;
  isOver: boolean;
}

export interface WidgetControl {
  updateWidget: (widgetId: string, updatedProps: WidgetProps) => void;
  removeWidget: (widgetId: string) => void;
}

export interface WidgetProps
  extends Partial<DnDSource>,
    Partial<WidgetControl> {
  id: string;
  title: string;
  direction: LayoutDirection;
  justify: LayoutJustify;
  align: LayoutAlign;
}

export interface WidgetDnDProps {
  component: React.ComponentType<WidgetProps>;
  componentProps: WidgetProps;
}

export type LayoutDirection = "vertical" | "horizontal";
export type LayoutJustify = "start" | "center" | "end" | "between";
export type LayoutAlign = "start" | "center" | "end" | "stretch";

export interface WidgetDescriptor {
  icon: LucideIcon;
  label: string;
  description: string;
  component: React.ComponentType<WidgetProps>;
}

export interface Widget {
  parentId?: string;
  childrenId: string[];
  component: React.ComponentType<WidgetProps>;
  componentProps: WidgetProps;
}
