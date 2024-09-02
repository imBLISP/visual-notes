import { Block } from "@/lib/types";
import { fetcher } from "@repo/utils";
import useSWR from "swr";

export default function useBlock(blockId: string | null) {
  const { data: block, error } = useSWR<Block>(
    blockId = `/api/blocks/${blockId}`,
    fetcher,
    {
      dedupingInterval: 30000,
    }
  );

  return {
    block,
    error,
    loading: !block && !error,
  };
}