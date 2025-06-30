export const ItemTypes = {
  Preview: "preview",
  Widget: "widget",
};

export type DropItem = {
  id?: string;
  component: React.ComponentType<any>;
  componentProps: WidgetProps;
  sourceId: string;
};

export type WidgetProps = {
  id: string;
  title: string;
  direction: LayoutDirection;
  justify: LayoutJustify;
  align: LayoutAlign;
};

export type LayoutDirection = "vertical" | "horizontal";
export type LayoutJustify = "start" | "center" | "end" | "between";
export type LayoutAlign = "start" | "center" | "end" | "stretch";
