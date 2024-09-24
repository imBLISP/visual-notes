import { Block } from "@/lib/types"

export function listRemove(
    blockId: string,
    childId: string,
    allBlocks: Block[]
) {
    const block = allBlocks.find((b) => b.id === blockId);
    if (!block) {
        return;
    }
    const index = block.content.indexOf(childId);
    if (index > -1) {
        block.content.splice(index, 1);
    }
}

export function listAfter(
    blockId: string,
    afterId: string,
    childId: string,
    allBlocks: Block[]
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

export function listBefore(
    blockId: string,
    beforeId: string,
    childId: string,
    allBlocks: Block[]
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

export function getSortedBlockIds(
    currentBlockId: string,
    allBlocks: Block[]
): string[] {
    let sortedBlockIds: string[] = [];
    let currentBlock = allBlocks.find((b) => b.id === currentBlockId)
    if (!currentBlock)
        return sortedBlockIds;

    sortedBlockIds.push(currentBlock.id);
    for (let nextBlock of currentBlock.content) {
        const nextBlockIds = getSortedBlockIds(nextBlock, allBlocks);
        sortedBlockIds = sortedBlockIds.concat(nextBlockIds);
    }

    return sortedBlockIds;
}
