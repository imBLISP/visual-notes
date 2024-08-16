import React, { useState } from "react";
import { cn } from "@repo/utils";
import { useSortable } from "@dnd-kit/sortable";
import { Block } from "@/lib/types";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { always } from "@/ui/dndkit/editor/dnd-config"
import { PageBlock, TextBlock } from "@/ui/dndkit/editor/blocks"

const BlockTypeMap = {
    "page": PageBlock,
    "text": TextBlock,
    "tlshape": (() => <></>)
}

export interface BaseBlockProps {
    blockId: string;
    allBlocks: Block[];
    activeId: string | null;
    activeIndex: number;
    clone?: boolean;
    disableDrag?: boolean;
};

export function BaseBlock({ blockId, allBlocks, activeId, activeIndex, clone = false, disableDrag = false }: BaseBlockProps) {
    const [hovering, setHovering] = useState(false);
    const currentBlock = allBlocks.find((b: Block) => b.id === blockId);
    if (!currentBlock) {
        return null
    }
    const CurrentBlockComponent = BlockTypeMap[currentBlock.type];

    const {
        attributes,
        listeners,
        index,
        isDragging,
        isSorting,
        over,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: blockId,
        animateLayoutChanges: always,
        disabled: disableDrag
    });

    const overId = over?.id;

    return (
        <>
            <div
                ref={setNodeRef}
                style={{
                    transition,
                    transform: clone ? CSS.Translate.toString(transform) : "",
                }}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                <div
                    className={cn("flex flex-row gap-2 items-center h-full", {
                        "text-secondary-foreground/50": clone,
                    })}
                >
                    {
                        !disableDrag &&
                        <div
                            className={cn(
                                "transition duration-100 ease-in opacity-0 hover:opacity-100 hover:bg-gray-100 rounded-sm h-full py-1",
                                { invisible: clone, "opacity-100": hovering }
                            )}
                        >
                            <GripVertical
                                className="text-secondary-foreground/30"
                                size={20}
                                style={{ outlineStyle: "none", "strokeWidth": "1px" }}
                                {...listeners}
                                {...attributes}
                            />
                        </div>
                    }
                    <div
                        style={{ "outlineStyle": "none" }}
                        className={cn("border-y-4 border-transparent w-full", {
                            "border-b-4 border-b-blue-200":
                                overId == blockId && overId != activeId && index > activeIndex && !disableDrag,
                            "border-t-4 border-t-blue-200":
                                overId == blockId && overId != activeId && index < activeIndex && !disableDrag,
                        })}
                    >
                        <CurrentBlockComponent
                            blockId={blockId}
                            allBlocks={allBlocks}
                            activeId={activeId}
                            activeIndex={activeIndex}
                            clone={clone}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
