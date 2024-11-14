import { Block } from "@/lib/zod";
import { fetcher } from "@repo/utils";
import useSWR from "swr";

export default function useBlockNotes(blockId?: string | null) {

  const { data: notes, error } = useSWR<Block[]>(
    blockId ? `/api/blocks/${blockId}/notes` : null,
    fetcher,
    {
      dedupingInterval: 1000,
    }
  );

  return {
    notes,
    error,
    loading: !notes && !error,
  };
}

