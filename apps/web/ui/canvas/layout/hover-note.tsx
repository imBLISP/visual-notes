import { track, useEditor, Box } from "tldraw";
import { cn } from "@repo/utils";
import useBlock from "@/lib/swr/use-block";
import { useMemo, useState, useRef, useEffect } from "react";
import { BlockEditor } from "@/ui/editor/editor";
import { PositionArrow } from "@/ui/icons/canvas/position-arrow";
import { ScrollArea } from "@repo/ui";
import { Transition } from "@headlessui/react";

const ShowContextToolbar = track(() => {
    const editor = useEditor();

    const hoveredShape = editor.getHoveredShape()
    let hoveredShapeBounds = null
    if (hoveredShape) {
        hoveredShapeBounds = editor.getShapePageBounds(hoveredShape)
    }


    const selectedShapeBounds = editor.getSelectionRotatedPageBounds() || hoveredShapeBounds
    const selectedShapes = editor.getSelectedShapes()
    const noteId = selectedShapes?.[0]?.meta?.noteId || hoveredShape?.meta?.noteId
    const noteBlockId = selectedShapes?.[0]?.meta?.noteBlockId || hoveredShape?.meta?.noteBlockId
    const { block: note, loading } = useBlock(noteId as string || null)
    

    const noteContent = useMemo(() => {
        let hoverContent = note?.snapshot?.content?.[0]
        console.log("@ShowContextToolbar: noteBlockId", noteBlockId)
        if (noteBlockId) {
            console.log("@ShowContextToolbar: noteBlockId", noteBlockId)
            console.log("@ShowContextToolbar: snapshot", note?.snapshot?.content)
            const foundBlock = note?.snapshot?.content?.find((block: any) => block.attrs?.uid === noteBlockId)
            if (foundBlock) {
                hoverContent = foundBlock
            }
            
        }
        return {
            type: "doc",
            content: [hoverContent]
        }
    }, [note, noteBlockId])

    


    // let show = useState
    let show = false
    let coordinates = { x: 0, y: 0 }
    let halfCoordinates = { x: 0, y: 0 }

    const finalBounds = {
        x: selectedShapeBounds?.x || hoveredShapeBounds?.x,
        y: selectedShapeBounds?.y || hoveredShapeBounds?.y,
        width: selectedShapeBounds?.width || hoveredShapeBounds?.width,
        height: selectedShapeBounds?.height || hoveredShapeBounds?.height,
    }

    if (finalBounds && !loading && noteId) {
        coordinates = editor.pageToViewport(new Box(finalBounds.x, finalBounds.y))
        halfCoordinates = editor.pageToViewport(new Box(finalBounds.x + finalBounds.width / 2, finalBounds.y))
        show = true
    }


    if (noteContent?.content?.length === 0) {
        return null
        // setTimeout(() => {
        //     show = false
        // }, 1000);
    }

    return (
        <Transition
            show={show}
            enter="transition-opacity duration-200 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
        >
        <div
            className="transition-opacity duration-1000 ease-in pointer-events-auto bg-transparent flex flex-col"
            style={{
                position: "absolute",
                left: halfCoordinates.x,
                top: coordinates.y - 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: `translate(-50%,-100%)`,
            }}
            onPointerDown={(e) => e.stopPropagation()}
        >
            <div className="rounded-sm shadow-sm shadow-stone-200 border bg-white p-2">
                <ScrollArea className="h-full rounded-sm">
                    <BlockEditor
                        // initialContent={}
                        readOnlyContent={noteContent}
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
        </Transition>
    );
});

export function HoverNote() {
    return (
        <>
            <ShowContextToolbar />
        </>
    );
}