import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  FileInput,
  Minus,
  Square,
  MoreVertical,
  RotateCcw,
  Search,
  Star,
  XIcon,
} from "lucide-react";

function FirstRow() {
  return (
    <>
      <div className="border bg-muted text-muted-foreground rounded-md p-1">
        <ArrowDown className="size-4" />
      </div>
      <div className="border bg-muted text-muted-foreground rounded-md py-1 px-2 flex items-center gap-2">
        <FileInput className="size-4" />
        <span className="text-xs truncate">New Documents</span>
        <XIcon className=" ml-auto size-4" />
      </div>
      <div className="flex items-center gap-1 ml-auto">
        <div className="hover:bg-muted text-muted-foreground transition-all rounded-xl p-1">
          <Minus className="size-4" />
        </div>
        <div className="hover:bg-muted text-muted-foreground transition-all rounded-xl p-1">
          <Square className="size-4" />
        </div>
        <div className="hover:bg-muted text-muted-foreground transition-all rounded-xl p-1">
          <XIcon className="size-4" />
        </div>
      </div>
    </>
  );
}

function SecondRow() {
  return (
    <>
      <div className="hover:bg-muted text-muted-foreground transition-all rounded-xl p-1">
        <ArrowLeft className="size-4" />
      </div>
      <div className="hover:bg-muted text-muted-foreground transition-all rounded-xl p-1">
        <ArrowRight className="size-4" />
      </div>
      <div className="hover:bg-muted text-muted-foreground transition-all rounded-xl p-1">
        <RotateCcw className="size-4" />
      </div>
      <div className="flex-1 flex items-center w-full rounded-xl bg-muted text-muted-foreground my-2 p-1 cursor-text">
        <div className="hover:bg-foreground/5 text-muted-foreground transition-all rounded-xl p-1">
          <Search className="size-4" />
        </div>
        <div className="flex flex-1 items-center gap-1"></div>
        <div className="hover:bg-foreground/5 text-muted-foreground transition-all rounded-xl p-1">
          <Star className="size-4" />
        </div>
      </div>
      <div className="hover:bg-muted text-muted-foreground transition-all rounded-xl p-1">
        <MoreVertical className="size-4" />
      </div>
    </>
  );
}

export default function MockupBrowser() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <FirstRow />
      </div>
      <div className="flex items-center gap-1">
        <SecondRow />
      </div>
    </div>
  );
}
