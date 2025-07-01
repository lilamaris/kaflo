import { createStore } from "zustand";

export type UIInspectState = {
  panelRatio: number;
  showDebug: boolean;
  showPreview: boolean;
};

export type UIInspectActions = {
  setPanelRatio: (panelRatio: number) => void;
  setShowDebug: (showDebug: boolean) => void;
  setShowPreview: (showPreview: boolean) => void;
};

export type UIInspectStore = UIInspectState & UIInspectActions;

export const initUIInspectStore = (): UIInspectState => ({
  panelRatio: 80,
  showDebug: true,
  showPreview: false,
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
    setShowPreview: (showPreview: boolean) => {
      set({ showPreview });
    },
  }));
  return store;
};
