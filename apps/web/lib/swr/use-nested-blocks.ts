import { Block } from "@/lib/zod";
import { fetcher } from "@repo/utils";
import useSWR from "swr";
import { useMemo } from "react";

// blocks have parentIds, we need to build a tree which can be any level deep and fill the content array of the blocks
function buildTree(blocks: Omit<Block, "snapshot">[], workspaceId: string | null) {
  const tree: Omit<Block, "snapshot">[] = [];
  const map = new Map();
  blocks.forEach((block) => {
    map.set(block.id, {...block, content: []});
  });

  console.log("map", map);

  blocks.forEach((block) => {
    if (block.parentId === workspaceId) {
      tree.push(map.get(block.id));
    } else {
      const parent = map.get(block.parentId);
      parent?.content?.push(map.get(block.id));
    }
  });

  return tree;
}

export default function useNestedBlocks(workspaceId: string | null) {
  const { data: blocks, error, mutate } = useSWR<Omit<Block, "snapshot">[]>(
    workspaceId ? `/api/workspaces/${workspaceId}/nestedBlocks` : null,
    fetcher,
    {
      dedupingInterval: 30000,
    }
  );

  // blocks have parentIds, we need to build a tree which can be any level deep and fill the content array of the blocks
  const nestedBlocks = useMemo(() => {
    if (!blocks) return [];
    return buildTree(blocks, workspaceId);
  }, [blocks, workspaceId, mutate]);

  return {
    nestedBlocks,
    error,
    loading: !nestedBlocks && !error,
    mutate,
  };
}