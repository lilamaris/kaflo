import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Block } from "@/components/widgets/block";
import { Widget, WidgetProps } from "@/lib/type";

export type WidgetTreeState = {
  widgets: Record<string, Widget>;
};

export type WidgetTreeActions = {
  addWidget: (
    component: React.ComponentType<any>,
    componentProps: WidgetProps,
    parentId?: string
  ) => void;
  removeWidget: (id: string) => void;
  moveWidget: (widgetId: string, parentId: string) => void;
  updateWidget: (widgetId: string, updatedProps: WidgetProps) => void;
};

export type WidgetTreeStore = WidgetTreeState & WidgetTreeActions;

export const initWidgetTreeStore = (): WidgetTreeState => ({
  widgets: {
    root: {
      childrenId: [],
      component: Block,
      componentProps: {
        id: "root",
        title: "최상위 블록",
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
  const store = createStore<WidgetTreeStore>((set) => ({
    ...initState,
    addWidget: (
      component: React.ComponentType<any>,
      componentProps: WidgetProps,
      parentId?: string
    ) => {
      set((state) => {
        const id = uuidv4();
        const widget = {
          parentId,
          childrenId: [],
          component,
          componentProps: { ...componentProps, id },
        };
        if (parentId) {
          state.widgets[parentId].childrenId.push(id);
        }
        return {
          widgets: {
            ...state.widgets,
            [id]: widget,
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
    updateWidget: (widgetId: string, updatedProps: WidgetProps) => {
      set((state) => ({
        widgets: {
          ...state.widgets,
          [widgetId]: {
            ...state.widgets[widgetId],
            componentProps: {
              ...state.widgets[widgetId].componentProps,
              ...updatedProps,
            },
          },
        },
      }));
    },
  }));
  return store;
};
