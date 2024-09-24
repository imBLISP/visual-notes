import { BaseBlockProps, BaseBlock } from "@/ui/dndkit/editor/blocks/base-block"


export function PageBlock({ blockId, allBlocks, activeId, activeIndex, clone }: BaseBlockProps) {
    // Get current block so we can get block properties
    const currentBlock = allBlocks.find((b) => b.id === blockId);

    if (currentBlock?.type != "page") {
        return <></>;
    }

    return (
        <>
            <div className="text-4xl font-bold mb-4 ml-5 text-gray-700">
                {currentBlock?.properties?.title}
            </div>
            <div>
                {currentBlock.content.map((childBlockId) => (
                    <BaseBlock
                        blockId={childBlockId}
                        allBlocks={allBlocks}
                        activeId={activeId}
                        activeIndex={activeIndex}
                        clone={clone}
                    ></BaseBlock>
                ))}
            </div>
        </>
    );
}

