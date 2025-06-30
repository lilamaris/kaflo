import * as React from "react";
import MockupBrowser from "@/components/layout/mockup-browser";
import UICanvas, { WidthIndicator } from "@/components/layout/ui-canvas";
import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from "@/components/ui/resizable";
import { ImperativePanelHandle } from "react-resizable-panels";
import { useUIInspectStore } from "../providers/ui-inspect-store-provider";
import { useWidgetTreeStore } from "../providers/widget-tree-store-provider";

export default function UIResponsiveViewer() {
  const { widgets } = useWidgetTreeStore((state) => state);
  const defaultWindowFullSize = 1600;
  const { panelRatio, setPanelRatio, showDebug } = useUIInspectStore(
    (state) => state
  );
  const responsivePanelSize = React.useMemo(
    () => Math.floor(defaultWindowFullSize * (panelRatio / 100)),
    [panelRatio]
  );
  const bpXL = 1280;
  const bpMD = 768;
  const bpSM = 640;
  const breakpoint = React.useMemo(() => {
    if (responsivePanelSize >= bpXL) return "xl";
    if (responsivePanelSize >= bpMD) return "md";
    if (responsivePanelSize >= bpSM) return "sm";
    return "xs";
  }, [responsivePanelSize]);
  const canvasPanelRef = React.useRef<ImperativePanelHandle>(null);

  React.useEffect(() => {
    if (canvasPanelRef.current) {
      canvasPanelRef.current.resize(panelRatio);
    }
  }, [panelRatio]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border flex-1"
    >
      <ResizablePanel
        ref={canvasPanelRef}
        onResize={(size) => setPanelRatio(size)}
        className="flex flex-col"
        defaultSize={panelRatio}
      >
        <div className="p-2 pb-0 rounded-t-lg border-b">
          <MockupBrowser />
        </div>
        {showDebug && <WidthIndicator width={responsivePanelSize} />}
        <main className="flex flex-col relative flex-1 overflow-x-hidden overflow-y-auto p-4">
          <UICanvas />
        </main>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        className="bg-[repeating-linear-gradient(45deg,var(--border)_0px,var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:25px_25px] bg-fixed"
        defaultSize={100 - panelRatio}
      >
        {showDebug ? (
          <div className="flex h-full items-start justify-center p-4 overflow-y-auto">
            <pre className="p-4 bg-background border rounded-lg text-xs text-muted-foreground overflow-x-auto">
              {JSON.stringify(widgets, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center  overflow-y-auto">
            <span className="font-semibold text-muted-foreground p-4 truncate">
              Blank space
            </span>
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
