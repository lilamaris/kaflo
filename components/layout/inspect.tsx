import { useUIInspectStore } from "@/components/providers/ui-inspect-store-provider";
import { Button } from "../ui/button";
import { EllipsisVertical, EyeIcon, Grip, GripVertical } from "lucide-react";

export default function Inspect() {
  const {
    showDebug,
    panelRatio,
    setPanelRatio,
    setShowDebug,
    showPreview,
    setShowPreview,
  } = useUIInspectStore((state) => state);
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col p-4">
        <span className="text-sm text-muted-foreground">
          Set Layout Size ( Current: {panelRatio} )
        </span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={() => setPanelRatio(20)}>
            <EllipsisVertical />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPanelRatio(80)}>
            <GripVertical />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPanelRatio(100)}
          >
            <Grip />
          </Button>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <span className="text-sm text-muted-foreground">Debug</span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDebug(!showDebug)}
          >
            <EyeIcon />
          </Button>
        </div>

        <span className="text-sm text-muted-foreground">Preview</span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            <EyeIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
