import { DropItem, ItemTypes, RequestType } from "@/lib/type";
import { Heading1, LucideIcon } from "lucide-react";
import { useRef } from "react";
import { useDrag } from "react-dnd";

export interface HeadingProps {
  content: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  textAlign?: "left" | "center" | "right";
  fontWeight?: "light" | "normal" | "bold";
  textDecoration?: "none" | "underline";
}

export function Heading({
  content,
  level,
  textAlign,
  fontWeight,
  textDecoration,
}: HeadingProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const [{ opacity }, drag] = useDrag<
    { component: typeof Heading },
    void,
    { opacity: number }
  >({
    type: ItemTypes.Widget,
    item: {
      component: Heading,
    },
  });

  drag(dragRef);
  const Comp = level ? (`h${level}` as const) : "h1";
  const styleProps = { textAlign, fontWeight, textDecoration };

  return <Comp style={styleProps}>{content ?? "제목"}</Comp>;
}

export const headingPreview = {
  widget: Heading,
  Icon: Heading1,
  description: "제목 위젯",
};

export function WidgetPreview({
  widget,
  Icon,
  description,
}: {
  widget: React.ComponentType<any>;
  Icon: LucideIcon;
  description: string;
}) {
  const dragRef = useRef<HTMLDivElement>(null);
  const [{ opacity }, drag] = useDrag<
    DropItem,
    { completed: boolean },
    { opacity: number }
  >({
    type: ItemTypes.Preview,
    options: { dropEffect: "copy" },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
    item: {
      component: widget,
      componentProps: {},
      description,
    },
  });

  drag(dragRef);

  return (
    <div
      ref={dragRef}
      className="hover:bg-muted border rounded-lg p-2 border-border"
      style={{ opacity }}
    >
      <Icon />
      <h1>{description}</h1>
    </div>
  );
}
