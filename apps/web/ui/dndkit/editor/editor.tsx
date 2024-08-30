import React, { useState, useCallback } from "react";

// dndkit
import { CSS, isKeyboardEvent } from "@dnd-kit/utilities";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    DragStartEvent,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { measuring, dropAnimation } from "@/ui/dndkit/editor/dnd-config";

// slate
import { createEditor, BaseEditor } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'

import type { Block } from "@/lib/types";
import { listRemove, listAfter, listBefore, getSortedBlockIds } from "@/lib/blocks/block-operations"
import { BaseBlock } from "@/ui/dndkit/editor/blocks/base-block";

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}

const initialValue = [
    {
        type: 'paragraph',
        children: [
            { text: 'A line of text in a paragraph.' },
        ],
    },
]


interface EditorProps {
    blockId: string;
    allBlocks: Block[];
    disableFirst?: boolean;
}

export default function Editor({ blockId, allBlocks, disableFirst = false }: EditorProps) {
    const sortedBlockIds: string[] = getSortedBlockIds(blockId, allBlocks);
    const [items, setItems] = useState(sortedBlockIds);
    const [activeId, setActiveId] = useState<string | null>(null);
    const activeIndex = activeId ? items.indexOf(activeId) : -1;
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // slate
    const [editor] = useState(() => withReact(createEditor()));

    const renderElement = (props) => {
        console.log("props", props);
        return <p {...props.attributes}>{...props.children}</p>
    }

    return (
        <div className="ml-12">
            <Slate editor={editor} initialValue={initialValue}>
            <input></input>
                <DndContext
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    measuring={measuring}
                >
                    <SortableContext items={items}>
                        <BaseBlock
                            blockId={blockId}
                            allBlocks={allBlocks}
                            activeId={activeId}
                            activeIndex={activeIndex}
                            disableDrag={disableFirst}
                        />
                    </SortableContext>
                    <DragOverlay dropAnimation={dropAnimation}>
                        {activeId ? (
                            <BaseBlock
                                blockId={activeId}
                                allBlocks={allBlocks}
                                activeId={activeId}
                                activeIndex={activeIndex}
                                clone
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </Slate>
        </div>
    );

    function handleDragStart({ active }: DragStartEvent) {
        console.log("Handle drag start")
        console.log("active", active);
        setActiveId(active.id.toString());
    }

    function handleDragCancel() {
        console.log("cancel");
        setActiveId(null);
    }

    function handleDragEnd({ over }: DragEndEvent) {
        if (over) {
            const overIndex = items.indexOf(over.id.toString());
            console.log(`from ${activeId} to ${over.id.toString()}`)
            if (
                activeId &&
                activeIndex !== overIndex &&
                (!disableFirst || over.id.toString() != blockId)
            ) {
                const newIndex = overIndex;
                // remove activeindex from parents list
                // add active index to overindex's parents list with list after
                listRemove(
                    allBlocks.find((b) => b.id === activeId)?.parentId || "",
                    activeId || "",
                    allBlocks
                );

                if (activeIndex < overIndex) {
                    listAfter(
                        allBlocks.find((b) => b.id === over.id)?.parentId || "",
                        over.id.toString(),
                        activeId,
                        allBlocks
                    );
                }
                else {
                    listBefore(
                        allBlocks.find((b) => b.id === over.id)?.parentId || "",
                        over.id.toString(),
                        activeId,
                        allBlocks
                    );
                }
                console.log("allBlocks", allBlocks);
                setItems((items) => arrayMove(items, activeIndex, newIndex));
            }
        }

        setActiveId(null);
    }
}
