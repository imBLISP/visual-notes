import React, { useState } from "react";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    useDndContext,
    MeasuringStrategy,
    DropAnimation,
    defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import type {
    DragStartEvent,
    DragEndEvent,
    MeasuringConfiguration,
    UniqueIdentifier,
} from "@dnd-kit/core";
import {
    arrayMove,
    useSortable,
    SortableContext,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS, isKeyboardEvent } from "@dnd-kit/utilities";

import { Block, Layout, Position } from "./block";
import type { Block as BlockProps } from "@/lib/types";

interface EditorProps {
    layout: Layout;
    pageBlock: BlockProps;
    allBlocks: BlockProps[];
}

const measuring: MeasuringConfiguration = {
    droppable: {
        strategy: MeasuringStrategy.Always,
    },
};

const dropAnimation: DropAnimation = {
    keyframes({ transform }) {
        return [
            { transform: CSS.Transform.toString(transform.initial) },
        ];
    },
    sideEffects: defaultDropAnimationSideEffects({
        className: {
            //   active: pageStyles.active,
        },
    }),
};

function getSortedBlockIds(
    currentBlock: BlockProps,
    allBlocks: BlockProps[]
): string[] {
    let sortedBlockIds: string[] = [];
    sortedBlockIds.push(currentBlock.id);
    for (let block of currentBlock.content) {
        const nextBlock = allBlocks.find((b) => b.id === block);
        if (nextBlock) {
            const nextBlockIds = getSortedBlockIds(nextBlock, allBlocks);
            sortedBlockIds = sortedBlockIds.concat(nextBlockIds);
        }
    }

    return sortedBlockIds;
}

export function Page({ layout, pageBlock, allBlocks }: EditorProps) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const sortedBlockIds: string[] = getSortedBlockIds(pageBlock, allBlocks);
    const [items, setItems] = useState(sortedBlockIds);
    const activeIndex = activeId ? items.indexOf(activeId) : -1;
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    return (
        <div className="ml-12">
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
                sensors={sensors}
                collisionDetection={closestCenter}
                measuring={measuring}
            >
                <SortableContext items={items}>
                    <SortableBlock
                    />
                </SortableContext>
                <DragOverlay dropAnimation={dropAnimation}>
                    {activeId ? (
                        <BlockOverlay
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );

    function handleDragStart({ active }: DragStartEvent) {
        console.log("active", active);
        setActiveId(active.id || null);
    }

    function handleDragCancel() {
        console.log("cancel");
        setActiveId(null);
    }

    function handleDragEnd({ over }: DragEndEvent) {
        console.log("over", over);
        if (over) {
            const overIndex = items.indexOf(over.id);
            if (activeIndex !== overIndex) {
                const newIndex = overIndex;
                // remove activeindex from parents list
                // add active index to overindex's parents list with list after
                console.log("from to", activeId, over.id);
                listRemove(
                    allBlocks.find((b) => b.id === activeId)?.parentId || "",
                    activeId || "",
                    allBlocks
                );
                listAfter(
                    allBlocks.find((b) => b.id === over.id)?.parentId || "",
                    over.id,
                    activeId,
                    allBlocks
                );
                console.log("allBlocks", allBlocks);
                setItems((items) => arrayMove(items, activeIndex, newIndex));
            }
        }

        setActiveId(null);
    }
}

function BlockOverlay({
    id,
    items,
    ...props
}: Omit<BlockProps, 'index'> & { items: UniqueIdentifier[] }) {
    const { activatorEvent, over } = useDndContext();
    const isKeyboardSorting = isKeyboardEvent(activatorEvent);
    const activeIndex = items.indexOf(id);
    const overIndex = over?.id ? items.indexOf(over?.id) : -1;

    return (
        <Block
            id={id}
            {...props}
            clone
            insertPosition={
                isKeyboardSorting && overIndex !== activeIndex
                    ? overIndex > activeIndex
                        ? Position.After
                        : Position.Before
                    : undefined
            }
        />
    );
}

function SortableBlock({
    id,
    activeIndex,
    ...props
}: BlockProps & { activeIndex: number }) {
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
        id,
        animateLayoutChanges: always,
    });

    return (
        <Block
            ref={setNodeRef}
            id={id}
            active={isDragging}
            style={{
                transition,
                transform: isSorting ? undefined : CSS.Translate.toString(transform),
            }}
            insertPosition={
                over?.id === id
                    ? index > activeIndex
                        ? Position.After
                        : Position.Before
                    : undefined
            }
            {...props}
            {...attributes}
            {...listeners}
        />
    );
}


function listRemove(blockId: string, childId: string, allBlocks: BlockProps[]) {
    const block = allBlocks.find((b) => b.id === blockId);
    if (!block) {
        return;
    }
    const index = block.content.indexOf(childId);
    if (index > -1) {
        block.content.splice(index, 1);
    }
}

function listAfter(
    blockId: string,
    afterId: string,
    childId: string,
    allBlocks: BlockProps[]
) {
    const block = allBlocks.find((b) => b.id === blockId);
    if (!block) {
        return;
    }
    const index = block.content.indexOf(afterId);
    if (index > -1) {
        block.content.splice(index + 1, 0, childId);
    }
}

function listBefore(
    blockId: string,
    beforeId: string,
    childId: string,
    allBlocks: BlockProps[]
) {
    const block = allBlocks.find((b) => b.id === blockId);
    if (!block) {
        return;
    }
    const index = block.content.indexOf(beforeId);
    if (index > -1) {
        block.content.splice(index, 0, childId);
    }
}

function always() {
    return true;
}
