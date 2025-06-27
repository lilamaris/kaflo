"use client";

import * as React from "react";

export function WidthIndicator({ width }: { width: number }) {
  return (
    <div className="sticky h-0 top-5 w-full text-center text-sm">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 top-1/2 border-t border-muted-foreground" />
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[4px] border-t-muted-foreground border-r-[6px] border-r-transparent rotate-90" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[5px] border-t-muted-foreground border-r-[6px] border-r-transparent -rotate-90" />
        <span className="bg-card text-muted-foreground relative border border-muted-foreground z-10 px-2 rounded-md">
          {width} px
        </span>
      </div>
    </div>
  );
}

export interface UICanvasProps {
  width: number;
  breakpoint: "xl" | "md" | "sm" | "xs";
}
export default function UICanvas({ width, breakpoint }: UICanvasProps) {
  return (
    <>
      <WidthIndicator width={width} />
      <div className="grid grid-cols-4 gap-4 p-4">
        {Array.from({ length: 32 }).map((_, index) => (
          <div
            key={index}
            className="bg-muted rounded-md aspect-square hover:bg-accent-foreground/10 transition-colors"
          ></div>
        ))}
      </div>
    </>
  );
}
