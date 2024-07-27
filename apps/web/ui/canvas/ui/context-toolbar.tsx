import { useNoteModal } from "@/ui/modals/note-modal";
import { Button } from "@repo/ui";
import { DefaultSizeStyle, track, useEditor } from "@tldraw/tldraw";
import { Dispatch, SetStateAction } from "react";
import {Note} from "@/ui/icons/canvas"

const ShowContextToolbar = track(
  ({
    setShowNoteModal,
  }: {
    setShowNoteModal: Dispatch<SetStateAction<boolean>>;
  }) => {
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

    const pageCoordinates = editor.pageToViewport(
      selectionRotatedPageBounds.point
    );

    const zoomLevel = editor.getZoomLevel();

    return (
      <div
        className="absolute pointer-events-auto left-[20px] top-[300px] rounded-sm border bg-white"
        // style={{
        //   top: Math.max(16, pageCoordinates.y - 48),
        //   left: Math.max(16, pageCoordinates.x),
        //   width: selectionRotatedPageBounds.width*zoomLevel,
        // }}
        onPointerDown={(e) => e.stopPropagation}
      >
        <div className="flex flex-col gap-[2px] p-[2px]">
          <Button variant="ghost" className="p-0 w-9 h-9 flex items-center justify-center rounded-sm" onClick={() => setShowNoteModal(true)}>
            <Note className=""/>
          </Button>
        </div>
      </div>
    );
  }
);

export function ContextToolbar() {
  const { setShowNoteModal, ShowNoteModal } = useNoteModal();

  return (
    <>
      <ShowContextToolbar setShowNoteModal={setShowNoteModal} />
      <ShowNoteModal />
    </>
  );
}
