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

export interface WidgetAttributes {
  id: string;
  title: string;
  layout: WidgetLayout;
}

export interface WidgetRenderProps {
  className?: string;
  state: Omit<Widget, "component" | "componentProps">;
  attributes: WidgetAttributes;
}

export interface Widget {
  parentId: string | null;
  childrenId: string[];
  renderer: React.ComponentType<WidgetRenderProps>;
  attributes: WidgetAttributes;
}

export interface WidgetDescriptor {
  icon: LucideIcon;
  label: string;
  description: string;
}

export type WidgetRenderer = {
  renderer: React.ComponentType<WidgetRenderProps>;
};
export type AbstractWidget = {
  attributes?: never;
  descriptor: WidgetDescriptor;
} & WidgetRenderer;

export type ImplementedWidget = {
  attributes: WidgetAttributes;
  descriptor?: never;
} & WidgetRenderer;

export interface DnDProps {
  originalIndex: number;
}

export type WidgetWrapperProps = AbstractWidget | ImplementedWidget;
export type NewWidgetDnDProps = AbstractWidget;
export type ExistWidgetDnDProps = ImplementedWidget & DnDProps;
export type WidgetDnDProps = NewWidgetDnDProps | ExistWidgetDnDProps; 
