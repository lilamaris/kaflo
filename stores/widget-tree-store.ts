import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";
import {
  Widget,
  WidgetAttributes,
  WidgetDescriptor,
  WidgetLayout,
  WidgetRenderProps,
} from "@/lib/type";
import { Section } from "@/components/widgets/section";

export type WidgetTreeState = {
  widgets: Record<string, Widget>;
};

export type WidgetTreeActions = {
  addWidget: (
    renderer: React.ComponentType<WidgetRenderProps>,
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
};

export type WidgetTreeStore = WidgetTreeState & WidgetTreeActions;

export const initWidgetTreeStore = (): WidgetTreeState => ({
  widgets: {
    root: {
      parentId: null,
      childrenId: [],
      renderer: Section,
      attributes: {
        id: "root",
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
  const store = createStore<WidgetTreeStore>((set) => ({
    ...initState,
    addWidget: (
      renderer: React.ComponentType<WidgetRenderProps>,
      descriptor: WidgetDescriptor,
      parentId: string | null
    ) => {
      set((state) => {
        console.log(renderer, descriptor, parentId);
        const attributes: WidgetAttributes = {
          id: uuidv4(),
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
          state.widgets[parentId].childrenId.push(attributes.id);
        }
        return {
          widgets: {
            ...state.widgets,
            [attributes.id]: widget,
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
  }));
  return store;
};
