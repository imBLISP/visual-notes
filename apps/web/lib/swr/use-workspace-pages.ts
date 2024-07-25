import { Pages } from "@/lib/types";
import { fetcher } from "@repo/utils";
import useSWR from "swr";

export default function useWorkspacePages(workspaceId: string) {
  const { data: pages, error } = useSWR<Pages[]>(
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
