import { PageBlock } from "@/lib/types";
import { fetcher } from "@repo/utils";
import useSWR from "swr";

export default function useWorkspaceCanvases(workspaceId: string) {
    const { data: pages, error } = useSWR<PageBlock[]>(
        `/api/workspaces/${workspaceId}/pages`,
        fetcher,
        {
            dedupingInterval: 30000,
        }
    );

    return {
        pages,
        error,
    };
}
