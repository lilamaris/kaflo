"use client";

import {
  createUIInspectStore,
  initUIInspectStore,
  UIInspectStore,
} from "@/stores/ui-inspect-store";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type UIInspectStoreApi = ReturnType<typeof createUIInspectStore>;

export const UIInspectStoreContext = createContext<
  UIInspectStoreApi | undefined
>(undefined);

export interface UIInspectStoreProviderProps {
  children: ReactNode;
}

export default function UIInspectStoreProvider({
  children,
}: UIInspectStoreProviderProps) {
  const storeRef = useRef<UIInspectStoreApi>(null);
  if (storeRef.current === null) {
    storeRef.current = createUIInspectStore(initUIInspectStore());
  }

  return (
    <UIInspectStoreContext.Provider value={storeRef.current}>
      {children}
    </UIInspectStoreContext.Provider>
  );
}

export const useUIInspectStore = <T,>(
  selector: (store: UIInspectStore) => T
): T => {
  const uiInspectStoreContext = useContext(UIInspectStoreContext);

  if (!uiInspectStoreContext) {
    throw new Error(
      `useUIInspectStore must be used within UIInspectStoreProvider`
    );
  }
  return useStore(uiInspectStoreContext, selector);
};
