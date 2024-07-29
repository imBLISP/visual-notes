import { Workspace, Block } from "@/lib/types";
import {TLShapePartial} from "@tldraw/tldraw"
import { fetcher } from "@repo/utils";
import useSWR from "swr";

export default function useBlockContent(blockId?: string) {
  const { data: blocks, error } = useSWR<Block[]>(
    `/api/blocks/${blockId}/content`,
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

