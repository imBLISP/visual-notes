import { useEditor, Box, track, createShapeId, Point2d } from "tldraw";
import { CirclePlus } from "lucide-react";
import {Button} from "@repo/ui"
import { v4 as uuidv4 } from 'uuid';


const ShowExtendHandles = track(() => {
    const editor = useEditor();
    const selectedShapes = editor.getSelectedShapes();

    const zoom = editor.getZoomLevel();

    if (selectedShapes.length != 1 || zoom < 0.3) return null;

    const shape = selectedShapes[0];
    if (!shape) return null;

    const shapeBounds = editor.getShapePageBounds(shape);
    if (!shapeBounds) return null;

    // const padding = shapeBounds.width * 0.25;
    const padding = 16;
    // const topLeft = editor.pageToViewport(new Box(shapeBounds.x - padding, shapeBounds.y - padding));
    // const bottomRight = editor.pageToViewport(new Box(shapeBounds.x + shapeBounds.width + padding, shapeBounds.y + shapeBounds.height + padding));

    const topLeft = editor.pageToViewport(new Box(shapeBounds.x, shapeBounds.y));
    const bottomRight = editor.pageToViewport(new Box(shapeBounds.x + shapeBounds.width, shapeBounds.y + shapeBounds.height));

    const onExtendHandleDrag = (event: React.DragEvent<HTMLButtonElement>) => {
        
    }

    return (
        <>
            <div className="absolute pointer-events-none"
                style={{
                    left: topLeft.x - padding / 2,
                    top: topLeft.y - padding / 2,
                    height: bottomRight.y - topLeft.y + padding,
                    width: bottomRight.x - topLeft.x + padding,
                }}
            >
                <div className="flex flex-col justify-between h-full w-full">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 ease-in-out flex justify-center items-center">
                        <Button className="w-4 h-4 p-0 rounded-full pointer-events-auto">
                        </Button>
                    </div>
                    <div className="flex justify-between items-center h-full">
                        <div className="h-full opacity-0 hover:opacity-100 transition-opacity duration-200 ease-in-out flex items-center justify-center">
                        <Button className="w-4 h-4 p-0 rounded-full pointer-events-auto">
                        </Button>
                        </div>
                        <div className="h-full opacity-0 hover:opacity-100 transition-opacity duration-200 ease-in-out flex items-center justify-center">
                        <Button 
                            className="w-4 h-4 p-0 rounded-full pointer-events-auto" 
                            onPointerDown={(e) => {
                                const startX = e.clientX;
                                const startY = e.clientY;

                                const viewportBounds = editor.getViewportPageBounds();
                                

                                const arrowId = createShapeId();
                                editor.createShape({
                                    type: 'arrow',
                                    id: arrowId,
                                    props: {
                                        start: {
                                            x: startX,
                                            y: startY,
                                        },
                                        // x: startX,
                                        // y: startY,
                                        // rotation: 0,
                                        // endX: startX,
                                        // endY: startY,
                                    }
                                })
                                const arrow = editor.getShape(arrowId);
                                

                                const handlePointerMove = (moveEvent: PointerEvent) => {
                                    
                                    editor.updateShape({
                                        id: arrow.id,
                                        props: {
                                            end: {
                                                x: moveEvent.clientX,
                                                y: moveEvent.clientY,
                                            }
                                        }
                                    })
                                };
                                
                                const handlePointerUp = () => {
                                    window.removeEventListener('pointermove', handlePointerMove);
                                    window.removeEventListener('pointerup', handlePointerUp);
                                };
                                
                                window.addEventListener('pointermove', handlePointerMove);
                                window.addEventListener('pointerup', handlePointerUp);
                            }}
                        >
                        </Button>
                        </div>
                    </div>
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 ease-in-out flex justify-center items-center">
                        <Button className="w-4 h-4 p-0 rounded-full pointer-events-auto">
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
});

export function ExtendHandle() {
    return (
        <>
            <ShowExtendHandles />
        </>
    );
}