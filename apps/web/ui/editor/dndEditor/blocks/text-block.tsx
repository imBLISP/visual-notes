export default function TextBlock() {
    

  return (
    <>
      <div
        ref={setNodeRef}
        style={{
          transition,
          transform: clone ? CSS.Translate.toString(transform) : "",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
                over?.id == blockId &&
                over?.id != activeId &&
                insertPosition == Position.After,
              "border-t-4 border-t-blue-200":
                over?.id == blockId &&
                over?.id != activeId &&
                insertPosition == Position.Before,
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
}
