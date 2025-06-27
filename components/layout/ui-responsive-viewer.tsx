import * as React from "react";
import MockupBrowser from "@/components/layout/mockup-browser";
import UICanvas from "@/components/layout/ui-canvas";
import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from "@/components/ui/resizable";
import { Button } from "../ui/button";
import { EllipsisVertical, Grip, GripVertical, Settings } from "lucide-react";
import { ImperativePanelHandle } from "react-resizable-panels";

export default function UIResponsiveViewer() {
  const defaultWindowFullSize = 1600;
  const [canvasPanelSize, setCanvasPanelSize] = React.useState(80);
  const responsivePanelSize = React.useMemo(
    () => Math.floor(defaultWindowFullSize * (canvasPanelSize / 100)),
    [canvasPanelSize]
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
      canvasPanelRef.current.resize(canvasPanelSize);
    }
  }, [canvasPanelSize]);

  return (
    <>
      <div className="absolute top-0 z-10 right-0 bg-background">
        <div className="flex flex-col gap-2 border-b border-l rounded-bl-lg p-4">
          <span className="text-sm text-muted-foreground">
            Set Layout Size ( Current: {breakpoint} )
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCanvasPanelSize(20)}
            >
              <EllipsisVertical />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCanvasPanelSize(80)}
            >
              <GripVertical />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCanvasPanelSize(100)}
            >
              <Grip />
            </Button>
          </div>
        </div>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border flex-1"
      >
        <ResizablePanel
          ref={canvasPanelRef}
          onResize={(size) => setCanvasPanelSize(size)}
          className="flex flex-col"
          defaultSize={canvasPanelSize}
        >
          <div className="p-2 pb-0 rounded-t-lg border-b">
            <MockupBrowser />
          </div>
          <main className="flex flex-col relative flex-1 overflow-x-hidden overflow-y-auto">
            <UICanvas width={responsivePanelSize} breakpoint={breakpoint} />
          </main>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          className="bg-[repeating-linear-gradient(45deg,var(--border)_0px,var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:25px_25px] bg-fixed"
          defaultSize={100 - canvasPanelSize}
        >
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold text-muted-foreground p-4 truncate">
              Blank space
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
