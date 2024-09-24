import { track, useEditor, Box } from "@tldraw/tldraw";
import { cn } from "@repo/utils";
import useBlock from "@/lib/swr/use-block";
import { useMemo, useState, useRef, useEffect } from "react";
import { BlockEditor } from "@/ui/editor/editor";
import { useResize } from "@/lib/hooks/use-resize";
import { PositionArrow } from "@/ui/icons/canvas/position-arrow";
import { ScrollArea } from "@repo/ui";

const ShowContextToolbar = track(() => {
    const editor = useEditor();

    // testing
    const snapshot = editor.getSnapshot()
    

    console.log("this is the snapshot", snapshot)

    const hoverNoteRef = useRef<HTMLDivElement>(null)
    const { width, height } = useResize(hoverNoteRef)
    // const hoveredShape = editor.getHoveredShape()
    const selectedShapeBounds = editor.getSelectionRotatedPageBounds()
    const selectedShapes = editor.getSelectedShapes()
    const noteId = selectedShapes?.[0]?.meta?.noteId
    const { block: note, loading } = useBlock(noteId as string || null)
    const noteContent = useMemo(() => {
        return {
            type: "doc",
            content: [note?.snapshot?.content?.[0]]
        }
    }, [note])
    // const noteContent = note?.snapshot
    // console.log("this is the original note content", note?.snapshot)
    // console.log("this is the note content", noteContent)

    let show = false
    let coordinates = { x: 0, y: 0 }
    let halfCoordinates = { x: 0, y: 0 }

    if (selectedShapeBounds && !loading && noteId) {
        coordinates = editor.pageToViewport(selectedShapeBounds)
        halfCoordinates = editor.pageToViewport(new Box(selectedShapeBounds.x + selectedShapeBounds.width / 2, selectedShapeBounds.y))

        show = true
    }

    if (noteContent?.content?.length === 0) {
        show = false
    }

    // const hoveredShapeX = hoveredShape?.x
    // const hoveredShapeY = hoveredShape?.y

    // const coordinates = editor.pageToViewport(new Box(hoveredShapeX, hoveredShapeY))

    // console.log("hoveredShape", hoveredShape)

    // if (loading || !note) {
    //     return null
    // }

    return (
        <div
            // className={cn("transition-opacity duration-300 pointer-events-auto rounded-md shadow-md border bg-white pb-0", {
            className={cn("transition-opacity duration-300 pointer-events-auto bg-transparent flex flex-col", {
                "opacity-0": !show,
                "opacity-100": show,
            })}
            style={{
                position: "absolute",
                left: halfCoordinates.x,
                top: coordinates.y - 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: `translate(-50%,-100%)`,
            }}
            onPointerDown={(e) => e.stopPropagation()}
            ref={hoverNoteRef}
        >
            <div className="rounded-sm shadow-sm shadow-stone-200 border bg-white p-2">
                <ScrollArea className="h-full rounded-sm">
                    <BlockEditor
                        initialContent={noteContent}
                        noteId={noteId}
                        ydoc={null}
                        provider={null}
                        hasCollab={false}
                        readOnly={true}
                        className="max-w-64 max-h-32"
                    ></BlockEditor>
                </ScrollArea>
            </div>
            <div>
                <PositionArrow className="relative bottom-[2px]" />
            </div>
            {/* <div className="hover-note" /> */}
        </div>
    );
});

export function HoverNote() {
    return (
        <>
            <ShowContextToolbar />
        </>
    );
}