import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";
import {
  Widget,
  WidgetDescriptor,
  WidgetLayout,
  WidgetRenderAttributes,
  WidgetRenderer,
} from "@/lib/type";
import { Section } from "@/components/widgets/section";

export type WidgetTreeState = {
  widgets: Record<string, Widget>;
};

export type WidgetTreeActions = {
  addWidget: (
    renderer: WidgetRenderer,
    descriptor: WidgetDescriptor,
    parentId: string | null
  ) => void;
  removeWidget: (id: string) => void;
  moveWidget: (widgetId: string, parentId: string) => void;
  updateWidget: (widgetId: string, data: Partial<Widget>) => void;
  updateWidgetLayout: (
    widgetId: string,
    updatedLayout: Partial<WidgetLayout>
  ) => void;
  getWidgetWithParentOrder: (
    widgetId: string
  ) => { widget: Widget; orderAt: number } | null;
  getWidget: (widgetId: string) => Widget | null;
  setWidgetOrder: (
    parentWidgetId: string,
    targetWidgetId: string,
    targetIndexAt: number
  ) => void;
};

export type WidgetTreeStore = WidgetTreeState & WidgetTreeActions;

export const initWidgetTreeStore = (): WidgetTreeState => ({
  widgets: {
    root: {
      parentId: null,
      childrenId: [],
      renderer: Section,
      attributes: {
        widgetId: "root",
        title: "최상위 섹션",
        layout: {
          direction: "vertical",
          justify: "center",
          align: "stretch",
        },
      },
    },
  },
});

export const defaultInitState: WidgetTreeState = initWidgetTreeStore();

export const createWidgetTreeStore = (
  initState: WidgetTreeState = defaultInitState
) => {
  const store = createStore<WidgetTreeStore>((set, get) => ({
    ...initState,
    addWidget: (
      renderer: WidgetRenderer,
      descriptor: WidgetDescriptor,
      parentId: string | null
    ) => {
      set((state) => {
        const widgetId = uuidv4();
        const attributes: WidgetRenderAttributes = {
          widgetId,
          title: descriptor.label,
          layout: {
            direction: "vertical",
            justify: "start",
            align: "stretch",
          },
        };
        const widget = {
          parentId,
          childrenId: [],
          renderer,
          attributes,
        };
        if (parentId) {
          state.widgets[parentId].childrenId.push(widgetId);
        }
        return {
          widgets: {
            ...state.widgets,
            [widgetId]: widget,
          },
        };
      });
    },
    removeWidget: (id: string) => {
      set((state) => {
        const widget = state.widgets[id];
        if (widget.parentId) {
          const parentChildrenIds = state.widgets[
            widget.parentId
          ].childrenId.filter((childId) => childId !== id);
          state.widgets[widget.parentId].childrenId = parentChildrenIds;
        }
        const newWidgets = Object.fromEntries(
          Object.entries(state.widgets).filter(([key]) => key !== id)
        );
        return {
          widgets: newWidgets,
        };
      });
    },
    moveWidget: (widgetId: string, newParentId: string) => {
      set((state) => {
        if (widgetId === newParentId) return { widgets: state.widgets };
        const parentId = state.widgets[widgetId].parentId;
        if (!parentId) return { widgets: state.widgets };
        const parentChildrenIds = state.widgets[parentId].childrenId.filter(
          (childId) => childId !== widgetId
        );

        const newParentChildrenIds = new Set([
          ...state.widgets[newParentId].childrenId,
          widgetId,
        ]);

        return {
          widgets: {
            ...state.widgets,
            [parentId]: {
              ...state.widgets[parentId],
              childrenId: parentChildrenIds,
            },
            [newParentId]: {
              ...state.widgets[newParentId],
              childrenId: Array.from(newParentChildrenIds),
            },
            [widgetId]: {
              ...state.widgets[widgetId],
              parentId: newParentId,
            },
          },
        };
      });
    },
    updateWidget: (widgetId: string, data: Partial<Widget>) => {
      set((state) => ({
        widgets: {
          ...state.widgets,
          [widgetId]: {
            ...state.widgets[widgetId],
            ...data,
          },
        },
      }));
    },
    updateWidgetLayout: (
      widgetId: string,
      updatedLayout: Partial<WidgetLayout>
    ) => {
      set((state) => ({
        widgets: {
          ...state.widgets,
          [widgetId]: {
            ...state.widgets[widgetId],
            attributes: {
              ...state.widgets[widgetId].attributes,
              layout: {
                ...state.widgets[widgetId].attributes.layout,
                ...updatedLayout,
              },
            },
          },
        },
      }));
    },
    getWidgetWithParentOrder: (widgetId: string) => {
      const state = get();
      const widget = state.widgets[widgetId];
      if (!widget.parentId) return null;
      const parentWidget = state.widgets[widget?.parentId];
      const orderAt = parentWidget.childrenId.indexOf(widgetId);
      return { widget, orderAt };
    },
    getWidget: (widgetId: string) => {
      const state = get();
      const widget = state.widgets[widgetId];
      return widget;
    },
    setWidgetOrder: (
      parentWidgetId: string,
      targetWidgetId: string,
      targetIndexAt: number
    ) => {
      set((state) => {
        const parentWidget = state.widgets[parentWidgetId];
        const childWidget = state.widgets[targetWidgetId];
        if (!parentWidget || !childWidget) return { widgets: state.widgets };
        const originalIndex = parentWidget.childrenId.indexOf(targetWidgetId);
        const updatedChildrenIds = parentWidget.childrenId.splice(
          targetIndexAt,
          0,
          parentWidget.childrenId.splice(originalIndex, 1)[0]
        );

        return {
          widget: {
            ...state.widgets,
            [parentWidgetId]: {
              ...parentWidget,
              childrenIds: updatedChildrenIds,
            },
          },
        };
      });
    },
  }));
  return store;
};
