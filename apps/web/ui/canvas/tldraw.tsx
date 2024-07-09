"use client";

import {
  Tldraw,

} from "@tldraw/tldraw";
import React from "react";
import {CustomArrowShapeUtil} from "@/ui/canvas/arrow";

const MyCustomShapes = [CustomArrowShapeUtil];

export default function TldrawCanvas() {
  return (
    <div className="h-full w-full">
    <Tldraw
      shapeUtils={MyCustomShapes}
      onMount={(editor) => {
        editor.createShapes([{ type: "custom-arrow", x: 100, y: 100 }]);
      }}
    />
    </div>
  );
}

