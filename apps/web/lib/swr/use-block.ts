import { Block } from "@/lib/zod";
import { fetcher } from "@repo/utils";
import useSWR from "swr";

export default function useBlock(blockId: string | null) {

  const { data: block, error, mutate } = useSWR<Block>(
    blockId ? `/api/blocks/${blockId}` : null,
    fetcher,
    {
      dedupingInterval: 30000,
    }
  );

  return {
    block,
    error,
    loading: !block && !error,
    mutate,
  };
}