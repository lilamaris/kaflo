"use client";

import {
  createWidgetTreeStore,
  initWidgetTreeStore,
  WidgetTreeStore,
} from "@/stores/widget-tree-store";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

export type WidgetTreeStoreApi = ReturnType<typeof createWidgetTreeStore>;

export const WidgetTreeStoreContext = createContext<
  WidgetTreeStoreApi | undefined
>(undefined);

export interface WidgetTreeStoreProviderProps {
  children: ReactNode;
}

export default function WidgetTreeStoreProvider({
  children,
}: WidgetTreeStoreProviderProps) {
  const storeRef = useRef<WidgetTreeStoreApi>(null);
  if (storeRef.current === null) {
    storeRef.current = createWidgetTreeStore(initWidgetTreeStore());
  }

  return (
    <WidgetTreeStoreContext.Provider value={storeRef.current}>
      {children}
    </WidgetTreeStoreContext.Provider>
  );
}

export const useWidgetTreeStore = <T,>(
  selector: (store: WidgetTreeStore) => T
): T => {
  const widgetTreeStoreContext = useContext(WidgetTreeStoreContext);

  if (!widgetTreeStoreContext) {
    throw new Error(
      `useWidgetTreeStore must be used within WidgetTreeStoreProvider`
    );
  }
  return useStore(widgetTreeStoreContext, selector);
};
