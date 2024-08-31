import { Note } from "@/ui/icons/canvas";
import { useNoteModal } from "@/ui/modals/note-modal";
import { Button } from "@repo/ui";
import { DefaultSizeStyle, track, useEditor } from "@tldraw/tldraw";
import { Dispatch, SetStateAction } from "react";
import { NoteTool } from "@/ui/canvas/toolbar/tools/note-tool"

const ShowContextToolbar = track(() => {
    const editor = useEditor();
    const hoveredShape = editor.getHoveredShape();
    let selectionRotatedPageBounds;
    // if (hoveredShape) {
    //   selectionRotatedPageBounds = editor.getShapePageBounds(hoveredShape);
    // } else {
    selectionRotatedPageBounds = editor.getSelectionRotatedPageBounds();
    // }
    if (!selectionRotatedPageBounds) return null;

    // [2]
    let size;
    // if (hoveredShape) {
    //   size = editor.getShapeStyleIfExists(hoveredShape, DefaultSizeStyle);
    // // } else {
    size = editor.getSharedStyles().get(DefaultSizeStyle);
    // }
    if (!size) return null;

    return (
      <div
        className="absolute pointer-events-auto left-[20px] top-[300px] rounded-sm border bg-white"
        onPointerDown={(e) => e.stopPropagation}
      >
        <div className="flex flex-col gap-[2px] p-[2px]">
          <NoteTool />
        </div>
      </div>
    );
  }
);

export function ContextToolbar() {
  return (
    <>
      <ShowContextToolbar />
    </>
  );
}
