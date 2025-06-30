import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LayoutAlign, LayoutDirection, LayoutJustify } from "./type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getLayoutDirection(direction: LayoutDirection): string {
  switch (direction) {
    case "vertical":
      return "flex-col";
    case "horizontal":
      return "flex-row";
    default:
      return "flex-col";
  }
}

function getLayoutJustify(justify: LayoutJustify): string {
  switch (justify) {
    case "start":
      return "justify-start";
    case "center":
      return "justify-center";
    case "end":
      return "justify-end";
    case "between":
      return "justify-between";
    default:
      return "justify-start";
  }
}

function getLayoutAlign(align: LayoutAlign): string {
  switch (align) {
    case "start":
      return "items-start";
    case "center":
      return "items-center";
    case "end":
      return "items-end";
    case "stretch":
      return "items-stretch";
    default:
      return "items-stretch";
  }
}

export function getLayoutStyle(
  direction: LayoutDirection,
  justify: LayoutJustify,
  align: LayoutAlign
) {
  return cn(
    getLayoutDirection(direction),
    getLayoutJustify(justify),
    getLayoutAlign(align)
  );
}
