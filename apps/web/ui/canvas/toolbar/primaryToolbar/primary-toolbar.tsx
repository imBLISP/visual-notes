import { TooltipButton } from "@repo/ui";
import {
  useEditor,
  useTools,
  GeoShapeGeoStyle,
  useValue,
} from "tldraw";
import { Select, Rectangle, Ellipse, Arrow, Draw, Line, Text } from "@/ui/icons/canvas";
import { createElement, useState } from "react";
import { cn } from "@repo/utils";

const tldrawTools = [
  {
    name: "Select",
    icon: Select,
    shortcut: "V",
    toolId: "select",
    tooltip: "Select",
    tooltipInfo: "S"
  },
  {
    name: "Rectangle",
    icon: Rectangle,
    shortcut: "V",
    toolId: "geo",
    geoId: "rectangle",
    tooltip: "Rectangle",
    tooltipInfo: "R"
  },
  {
    name: "Ellipse",
    icon: Ellipse,
    shortcut: "V",
    toolId: "geo",
    geoId: "ellipse",
    tooltip: "Ellipse",
    tooltipInfo: "E"
  },
  {
    name: "Arrow",
    icon: Arrow,
    shortcut: "V",
    toolId: "arrow",
    tooltip: "Arrow",
    tooltipInfo: "A"
  },
  {
    name: "Line",
    icon: Line,
    shortcut: "V",
    toolId: "line",
    tooltip: "Line",
    tooltipInfo: "L"
  },
  {
    name: "Draw",
    icon: Draw,
    shortcut: "V",
    toolId: "draw",
    tooltip: "Draw",
    tooltipInfo: "D"
  },
  {
    name: "Text",
    icon: Text,
    shortcut: "V",
    toolId: "text",
    tooltip: "Text",
    tooltipInfo: "T"
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
    <>
      <div
        className="absolute left-[20px] p-[2px] top-[20px] rounded-sm border bg-white pointer-events-auto"
        onPointerDown={(e) => e.stopPropagation}
      >
        <div className="flex flex-col gap-[2px]">
          {tldrawTools.map((tool) => (
            <TooltipButton
              tooltip={tool.tooltip}
              tooltipInfo={tool.tooltipInfo}
              sideOffset={10}
              side="right"
              size="icon"
              variant="ghost"
              key={tool.toolId}
              className={cn(
                { "bg-accent": tool.toolId == currentTool.id && (tool.toolId != "geo" || tool.geoId == currentGeoId) },
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
            </TooltipButton>
          ))}
        </div>
      </div>
    </>
  );
}
