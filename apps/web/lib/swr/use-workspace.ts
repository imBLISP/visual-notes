import { Workspace } from "@/lib/zod"
import { fetcher } from "@repo/utils";
import useSWR from "swr";

export default function useWorkspaces(workspaceId: string) {
  const { data: workspace, error } = useSWR<Workspace>(
    `/api/workspaces/${workspaceId}`,
    fetcher,
    {
      dedupingInterval: 30000,
    }
  );

  return {
    workspace,
    error,
    loading: !workspace && !error,
  };
}
