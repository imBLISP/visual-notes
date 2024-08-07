import React, {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import classNames from "classnames";
import { cn } from "@repo/utils";
import { useSortable } from "@dnd-kit/sortable";
import { Block as BlockProps } from "@/lib/types";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Input } from "@repo/ui";

// import {removeIcon} from './icons';
// import styles from './Page.module.css';

export enum Position {
  Before = -1,
  After = 1,
}

export enum Layout {
  Horizontal = "horizontal",
  Vertical = "vertical",
  Grid = "grid",
}

export interface Props extends Omit<HTMLAttributes<HTMLButtonElement>, "id"> {
  blockId: string;
  allBlocks: BlockProps[];
  activeId: string;
  sortedIndexes?: string[];
  clone?: boolean;
  // active?: boolean;
  // clone?: boolean;
  // insertPosition?: Position;
  // id: UniqueIdentifier;
  // index?: number;
  // layout: Layout;
  // onRemove?(): void;
}

const PageBlock = forwardRef<HTMLLIElement, Props>(function PageBlock(
  { blockId, allBlocks, activeId = "", sortedIndexes = 0, clone = false },
  ref
) {
  const currentBlock = allBlocks.find((b) => b.id === blockId);
  if (currentBlock?.type != "page") {
    return <></>;
  }
  return (
    <>
      <div className="text-4xl font-bold mb-4 ml-4 text-gray-700">
        {currentBlock?.properties?.title}
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

const blockTypeMap = {
  page: PageBlock,
};

export const Block = forwardRef<HTMLLIElement, Props>(function Block(
  { blockId, allBlocks, activeId = 0, sortedIndexes = 0, clone = false },
  ref
) {
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
  const [hovering, setHovering] = useState(false);

  const currentBlock = allBlocks.find((b) => b.id === blockId);

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
              "transition duration-150 ease-in opacity-0 hover:opacity-100 hover:bg-slate-200 rounded-sm h-full py-1",
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
            className={cn("border-b-4 border-transparent w-full", {
              "border-b-4 border-blue-200":
                over?.id == blockId && over?.id != activeId,
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
    // <li
    //   className={cn(
    //     // styles.Wrapper,
    //     // active && styles.active,
    //     // clone && styles.clone,
    //     // insertPosition === Position.Before && styles.insertBefore,
    //     // insertPosition === Position.After && styles.insertAfter,
    //     // layout === Layout.Vertical && styles.vertical
    //   )}
    //   style={style}
    //   ref={ref}
    // >
    //   <button className="" data-id={id.toString()} {...props} />
    //   {!active && onRemove ? (
    //     <button className="" onClick={onRemove}>
    //         remove
    //       {/* {removeIcon} */}
    //     </button>
    //   ) : null}
    //   {index != null ? (
    //     <span className="">{index}</span>
    //   ) : null}
    // </li>
  );
});

function always() {
  return true;
}
