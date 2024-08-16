import React, {
  forwardRef,
  HTMLAttributes,
  useState,
} from "react";
import { cn } from "@repo/utils";
import { useSortable } from "@dnd-kit/sortable";
import { Block as BlockProps } from "@/lib/types";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export enum Position {
  Before = -1,
  After = 1,
}

const blockTypeMap = {
  page: PageBlock,
};

export interface Props extends Omit<HTMLAttributes<HTMLButtonElement>, "id"> {
  id: string;
  allBlocks: BlockProps[];
  activeId: string;
  sortedIndexes?: string[];
  clone?: boolean;
  insertPosition?: Position;
  active?: boolean;
}

export const Block = forwardRef<HTMLLIElement, Props>(function Block(
  { blockId, allBlocks, activeId = 0, sortedIndexes = 0, clone = false, insertPosition },
  ref
) {
  const [hovering, setHovering] = useState(false);
  const currentBlock = allBlocks.find((b) => b.id === blockId);
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
  });

  // check if map contains type
  if (currentBlock && (currentBlock?.type || "") in blockTypeMap) {
    return React.createElement(blockTypeMap[currentBlock?.type], {
      blockId,
      allBlocks,
      activeId,
      sortedIndexes,
      clone,
    });
  }

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
        // {...listeners}
      >
        <div
          className={cn("flex flex-row gap-2 items-center h-full", {
            "text-secondary-foreground/50": clone,
          })}
        >
          <div
            className={cn(
              "transition duration-150 ease-in opacity-0 hover:opacity-100 hover:bg-gray-100 rounded-sm h-full py-1",
              { invisible: clone, "opacity-100": hovering }
            )}
          >
            <GripVertical
              className="text-secondary-foreground/50"
              size={15}
              style={{ outlineStyle: "none" }}
              {...listeners}
              {...attributes}
            />
          </div>
          <div
            contentEditable={true}
            style={{ "outline-style": "none" }}
            className={cn("border-y-4 border-transparent w-full", {
              "border-b-4 border-b-blue-200":
                over?.id == blockId && over?.id != activeId && insertPosition == Position.After,
              "border-t-4 border-t-blue-200":
                over?.id == blockId && over?.id != activeId && insertPosition == Position.Before,
            })}
          >
            {currentBlock.properties.title}
          </div>
        </div>
      </div>
      <div>
        {currentBlock.content.map((childBlockId) => (
          <Block
            blockId={childBlockId}
            allBlocks={allBlocks}
            activeId={activeId}
            clone={clone}
          ></Block>
        ))}
      </div>
    </>
  );
});

function always() {
  return true;
}
