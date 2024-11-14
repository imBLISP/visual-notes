import { Workspace, Block } from "@/lib/types";
import { fetcher } from "@repo/utils";
import useSWR from "swr";

export default function useBlockContent(blockId?: string | null) {

  const { data: blocks, error } = useSWR<Block[]>(
    blockId ? `/api/blocks/${blockId}/content` : null,
    fetcher,
    {
      dedupingInterval: 1000,
    }
  );

  return {
    blocks,
    error,
    loading: !blocks && !error,
  };
}

