import { LucideIcon } from "lucide-react";

export type LayoutDirection = "vertical" | "horizontal";
export type LayoutJustify = "start" | "center" | "end" | "between";
export type LayoutAlign = "start" | "center" | "end" | "stretch";

export type WidgetRenderer = React.ComponentType<WidgetRenderAttributes>;

export interface WidgetLayout {
  direction: LayoutDirection;
  justify: LayoutJustify;
  align: LayoutAlign;
}

export interface WidgetRenderAttributes {
  widgetId: string;
  title?: string;
  className?: string;
  layout: WidgetLayout;
}

export interface Widget {
  parentId: string | null;
  childrenId: string[];
  renderer: WidgetRenderer;
  attributes: WidgetRenderAttributes;
}

export interface WidgetDescriptor {
  icon: LucideIcon;
  label: string;
  description: string;
}

export type AbstractWidget = {
  attributes?: never;
  descriptor: WidgetDescriptor;
} & { renderer: WidgetRenderer };

export type ImplementedWidget = {
  attributes: WidgetRenderAttributes;
  descriptor?: never;
} & { renderer: WidgetRenderer };

export interface DnDProps {
  originalIndex: number;
}

export type WidgetWrapperProps = AbstractWidget | ImplementedWidget;
export type NewWidgetDnDProps = AbstractWidget;
export type ExistWidgetDnDProps = ImplementedWidget & DnDProps;
export type WidgetDnDProps = NewWidgetDnDProps | ExistWidgetDnDProps;
