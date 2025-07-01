import { LucideIcon } from "lucide-react";
import { ConnectDropTarget } from "react-dnd";

export type LayoutDirection = "vertical" | "horizontal";
export type LayoutJustify = "start" | "center" | "end" | "between";
export type LayoutAlign = "start" | "center" | "end" | "stretch";

export interface WidgetLayout {
  direction: LayoutDirection;
  justify: LayoutJustify;
  align: LayoutAlign;
}

export interface WidgetProps {
  id: string;
  title: string;
  layout: WidgetLayout;
  dropConnector?: ConnectDropTarget;
  className?: string;
}

export interface WidgetDnDProps {
  component: React.ComponentType<WidgetProps>;
  componentProps: WidgetProps;
}

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
