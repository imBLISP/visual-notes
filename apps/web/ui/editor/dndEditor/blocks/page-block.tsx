import { forwardRef } from "react";
import BaseBlock, { EditorBaseBlockProps } from "@/ui/editor/dndEditor/blocks/base-block"


export default function PageBlock({ blockId, allBlocks, activeId, clone }: EditorBaseBlockProps) {
    // Get current block so we can get block properties
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
                    <BaseBlock
                        blockId={childBlockId}
                        allBlocks={allBlocks}
                        activeId={activeId}
                        clone={clone}
                    ></BaseBlock>
                ))}
            </div>
        </>
    );
}

