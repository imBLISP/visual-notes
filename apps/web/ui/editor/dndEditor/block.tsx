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
  const currentBlock = allBlocks.find((b) => b.id === blockId);

  return (
    <>
      <div
        ref={setNodeRef}
        style={{
          transition,
          transform: clone ? CSS.Translate.toString(transform) : "",
        }}
        className={cn("my-1", {
          "border-b": over?.id == blockId && over?.id != activeId,
        })}
        // {...listeners}
      >
        <div
          className={cn("flex flex-row gap-2 items-center", {
            "text-secondary-foreground/50": clone,
          })}
        >
          <GripVertical
            className="text-secondary-foreground/50"
            size={15}
            {...listeners}
            {...attributes}
          />
          <div
            contentEditable={true}
            style={{ "outline-style": "none" }}
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
