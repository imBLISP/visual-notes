import { fetcher } from "@repo/utils";
import { Block } from "@/lib/zod";
import useSWR from "swr";

export default function useWorkspaceBlocks(workspaceId: string | undefined | null) {
    const { data: pages, error, mutate } = useSWR<Partial<Block>[]>(
        workspaceId ? `/api/workspaces/${workspaceId}/blocks` : null,
        fetcher,
        {
            dedupingInterval: 30000,
        }
    );

    return {
        pages,
        error,
        mutate
    };
}
