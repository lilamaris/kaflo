import { createStore } from "zustand";

export type UIInspectState = {
  panelRatio: number;
  showDebug: boolean;
};

export type UIInspectActions = {
  setPanelRatio: (panelRatio: number) => void;
  setShowDebug: (showDebug: boolean) => void;
};

export type UIInspectStore = UIInspectState & UIInspectActions;

export const initUIInspectStore = (): UIInspectState => ({
  panelRatio: 50,
  showDebug: false,
});

export const createUIInspectStore = (
  initState: UIInspectState = initUIInspectStore()
) => {
  const store = createStore<UIInspectStore>((set) => ({
    ...initState,
    setPanelRatio: (panelRatio: number) => {
      set({ panelRatio });
    },
    setShowDebug: (showDebug: boolean) => {
      set({ showDebug });
    },
  }));
  return store;
};
