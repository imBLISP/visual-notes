import { Button } from "@repo/ui";
import {
  useEditor,
  useTools,
  GeoShapeGeoStyle,
  useValue,
} from "@tldraw/tldraw";
import {Select, Rectangle, Ellipse, Arrow, Draw, Line, Text} from "@/ui/icons/canvas";
import { createElement, useState } from "react";
import { cn } from "@repo/utils";

const tldrawTools = [
  {
    name: "Select",
    icon: Select,
    shortcut: "V",
    toolId: "select",
  },
  {
    name: "Rectangle",
    icon: Rectangle,
    shortcut: "V",
    toolId: "geo",
    geoId: "rectangle",
  },
  {
    name: "Ellipse",
    icon: Ellipse,
    shortcut: "V",
    toolId: "geo",
    geoId: "ellipse",
  },
  {
    name: "Arrow",
    icon: Arrow,
    shortcut: "V",
    toolId: "arrow",
  },
  {
    name: "Line",
    icon: Line,
    shortcut: "V",
    toolId: "line",
  },
  {
    name: "Draw",
    icon: Draw,
    shortcut: "V",
    toolId: "draw",
  },
  {
    name: "Text",
    icon: Text,
    shortcut: "V",
    toolId: "text",
  },
];

export function Toolbar() {
  const editor = useEditor();
  const tools = useTools();
  const [currentGeoId, setCurrentGeoId] = useState("");
  const currentTool = useValue(
    "current tool id",
    () => editor?.getCurrentTool(),
    [editor]
  );

  return (
    <div
      className="absolute left-[20px] p-[2px] top-[20px] rounded-sm border bg-white pointer-events-auto"
      onPointerDown={(e) => e.stopPropagation}
    >
      <div className="flex flex-col gap-[2px]">
        {tldrawTools.map((tool) => (
          <Button
          size="icon"
            variant="ghost"
            key={tool.toolId}
            className={cn(
              { "bg-accent": tool.toolId == currentTool.id && (tool.toolId !="geo" || tool.geoId == currentGeoId)},
              "w-9 p-0 h-9 flex items-center justify-center rounded-sm hover:bg-accent/70"
            )}
            onClick={() => {
              if (tool.toolId == "geo") {
                editor.setStyleForNextShapes(GeoShapeGeoStyle, tool.geoId);
                setCurrentGeoId(tool.geoId || "");
              }
              editor.setCurrentTool(tool.toolId);
            }}
          >
            {createElement(tool.icon)}
          </Button>
        ))}
      </div>
    </div>
  );
}
